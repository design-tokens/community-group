/**
 * Example validation tests for technical report code blocks.
 *
 * Extracts JSON/JSONC examples from the markdown source files and
 * validates them against the DTCG JSON Schemas.
 *
 * Requires `pnpm --filter @dtcg/schemas run build` to have been
 * run first so that bundled schemas are available.
 *
 * Three tiers of validation:
 * 1. **Parseable**: Every block parses as valid JSONC.
 * 2. **Lang tag lint**: `json`-tagged blocks must not contain JSONC features.
 * 3. **Schema validation**: Blocks with `$schema` or detected signals
 *    validate against the appropriate JSON Schema.
 *
 * See `tests.config.json` for configuration and exclusions.
 */
import { describe, it, expect } from 'vitest';
import {
  loadConfig,
  extractExamples,
  getStaleExclusions,
  resolveSchema,
  getSchemaValidator,
  formatLabel,
  failureMessage,
  formatAjvErrors,
  parseJsonc,
  printParseErrorCode,
  type ParseError,
} from './helpers.js';

const config = loadConfig();
const examples = extractExamples(config);
const excludeSet = new Set(config.exclude.map((e) => e.id));

// ---------------------------------------------------------------------------
// Stale exclusion check
// ---------------------------------------------------------------------------

const stale = getStaleExclusions(examples, config);
if (stale.length > 0) {
  describe('Stale exclusions', () => {
    for (const entry of stale) {
      it(`exclusion "${entry.id}" is stale`, () => {
        expect.fail(
          `Exclusion no longer matches any extracted block.\n` +
            `Original reason: "${entry.reason}"\n\n` +
            `The block may have been edited or removed.\n` +
            `Please remove this entry from tests.config.json.`,
        );
      });
    }
  });
}

// ---------------------------------------------------------------------------
// Test generation
// ---------------------------------------------------------------------------

// Group by file for organized output
const byFile = new Map<string, (typeof examples)[number][]>();
for (const example of examples) {
  const group = byFile.get(example.file) ?? [];
  group.push(example);
  byFile.set(example.file, group);
}

for (const [file, blocks] of byFile) {
  describe(file, () => {
    for (const block of blocks) {
      if (excludeSet.has(block.fingerprint)) continue;

      const label = formatLabel(block);

      // Parse once per block, reuse across all tiers
      const parseErrors: ParseError[] = [];
      const parsed = parseJsonc(block.raw, parseErrors, {
        allowTrailingComma: false,
      });

      // Tier 1: Parseable as JSONC
      it(`${label} — parses as valid JSONC`, () => {
        if (parseErrors.length > 0) {
          const errorDetails = parseErrors
            .map(
              (e) =>
                `  Offset ${e.offset}: ${printParseErrorCode(e.error)} (length: ${e.length})`,
            )
            .join('\n');
          expect.fail(
            failureMessage(block, `JSONC parse errors:\n${errorDetails}`),
          );
        }
      });

      // Tier 2: Lang tag correctness
      if (block.lang === 'json' && block.hasJsoncFeatures) {
        it(`${label} — should use \`jsonc\` tag`, () => {
          expect.fail(
            failureMessage(
              block,
              `Block is tagged \`json\` but contains JSONC features ` +
                `(comments or trailing commas). Change the tag to \`jsonc\`.`,
            ),
          );
        });
      }

      // Tier 3: Schema validation
      const resolved = resolveSchema(block, config);
      if (resolved) {
        const source = block.schema
          ? '$schema field'
          : `detected signals (${block.detectedType})`;

        it(`${label} — validates against schema (${source})`, () => {
          // Skip if Tier 1 would already fail
          if (parseErrors.length > 0) return;

          const validate = getSchemaValidator(
            resolved.schemaPath,
            resolved.schemaId,
          );
          const valid = validate(parsed);
          if (!valid) {
            expect.fail(
              failureMessage(
                block,
                `Schema validation failed.\n\n` +
                  `Schema: ${resolved.schemaId}\n` +
                  `Detection: ${source}\n\n` +
                  `Errors:\n${formatAjvErrors(validate.errors)}`,
              ),
            );
          }
        });
      }
    }
  });
}
