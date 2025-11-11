/**
 * ⚠️ WARNING! This is just an implementation of the resolver spec
 * for demo purposes. It is subject to change, or possibly fall out
 * of sync with the specification. In case of a deviation, prefer
 * the official specification over this example library.
 */
import z from 'zod/v4';
import type { DTCGTokens, Resolver, ResolverImpl } from './types.js';
import { mergeTokens } from './utils.js';

const tokenMapSchema = z.looseObject({});

function validateTokenMap<T extends Record<string, any>>(tokenMap: unknown): T {
  return tokenMapSchema.parse(tokenMap) as T;
}
const refObject = z.object({ $ref: z.string({ error: 'required' }) });
const tokenSetSchema = z.object({
  description: z.optional(z.string()),
  sources: z.array(refObject, { error: 'Missing "sources"' }),
});
const modifierSetSchema = z.object({
  description: z.optional(z.string()),
  contexts: z.record(
    z.string({ error: 'Expected string' }),
    z.array(refObject),
    {
      error: 'Missing "contexts"',
    },
  ),
  default: z.optional(z.string({ error: 'Expected string' })),
});
const resolverSchema = z.object({
  name: z.string({ error: 'Missing "name"' }),
  version: z.literal('2025.10', { error: 'Unsupported version' }),
  description: z.optional(z.string({ error: 'Expected string' })),
  sets: z.optional(z.record(z.string(), tokenSetSchema)),
  modifiers: z.optional(z.record(z.string(), modifierSetSchema)),
  resolutionOrder: z.array(refObject, { error: 'missing resolutionOrder' }),
});

function validateResolver(resolver: unknown): Resolver {
  try {
    return resolverSchema.parse(resolver);
  } catch (err) {
    if (err instanceof z.ZodError) {
      console.error(
        'Resolver validation:',
        JSON.stringify(err.format(), null, 2),
      );
    } else {
      console.error(err);
    }
    throw err;
  }
}

export function createResolver<T extends Record<string, any> = DTCGTokens>(
  tokenMapRaw: Record<string, T>,
  resolverRaw: Resolver,
): ResolverImpl<T> {
  const tokenMap = validateTokenMap<T>(tokenMapRaw);
  const resolver = validateResolver(resolverRaw);
  if (!Object.keys(tokenMap ?? {}).length) {
    throw new Error(`Empty token map! No tokens to resolve`);
  }

  return {
    getSet(name) {
      if (!resolver.sets?.[name]) {
        throw new Error(`No such set "${name}"`);
      }
      return resolver.sets[name];
    },
    getModifier(name) {
      if (!resolver.modifiers?.[name]) {
        throw new Error(`No such modifier "${name}"`);
      }
      return resolver.modifiers[name];
    },
    apply(input) {
      let tokens = {} as T;
      for (const next of resolver.resolutionOrder) {
        if (next.$ref.includes('#/sets/')) {
          const set = this.getSet(next.$ref.replace('#/sets/', ''));
          for (const source of set.sources) {
            if (!tokenMapRaw[source.$ref]) {
              throw new Error(`Could not resolve ${source.$ref}`);
            }
            tokens = mergeTokens(tokens, tokenMapRaw[source.$ref]);
          }
          continue;
        }

        const modifierName = next.$ref.replace('#/modifiers/', '');
        const modifier = this.getModifier(modifierName);
        if (
          typeof modifier.default === 'string' &&
          !(modifier.default in modifier.contexts)
        ) {
          throw new Error(
            `Invalid default ${modifier.default} is not a valid context`,
          );
        }
        if (
          typeof input[modifierName] !== 'string' &&
          typeof modifier.default !== 'string'
        ) {
          throw new Error(
            `${modifierName}: Expected string, received ${input[modifierName]}`,
          );
        }
        const context =
          modifier.contexts[input[modifierName] ?? modifier.default];
        for (const source of context) {
          if (!tokenMapRaw[source.$ref]) {
            throw new Error(`Could not resolve ${source.$ref}`);
          }
          tokens = mergeTokens(tokens, tokenMapRaw[source.$ref]);
        }
      }

      return tokens;
    },
  };
}
