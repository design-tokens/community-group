// placeholder for an actual DTCG type
// cSpell:words figma
export type DTCGTokens = Record<string, any>;

export interface Resolver {
  name?: string;
  version: '2025.10';
  description?: string;
  sets?: Record<string, TokensSet>;
  modifiers?: Record<string, Modifier>;
  resolutionOrder: RefObject[];
}

export interface ResolverImpl<T extends Record<string, any>> {
  getSet: (name: string) => TokensSet;
  getModifier: (name: string) => Modifier;
  apply(input: Record<string, string>): T;
}

export interface RefObject {
  $ref: string;
}

export interface TokensSet {
  description?: string;
  sources: RefObject[];
}

export interface Modifier {
  description?: string;
  contexts: Record<string, RefObject[]>;
  default?: string;
}

export type Preset = 'figma-sds' | 'github-primer';
