/**
 * Schema validation tests using the VS Code JSON language service.
 *
 * Validates the bundled schemas against the test-suite fixtures using
 * the same JSON schema engine that powers VS Code's JSON validation.
 * This ensures that users get correct validation when referencing
 * the DTCG schemas via `$schema` in their editor.
 *
 * Requires `pnpm run build` to have been run first so that
 * `dist/` contains the bundled schemas.
 */
import { readFileSync } from 'node:fs';
import { describe } from 'vitest';
import {
  getLanguageService,
  TextDocument,
  type JSONSchema,
  type Diagnostic,
} from 'vscode-json-languageservice';
import {
  generateTests,
  loadJson,
  type ValidateContext,
  type TestCase,
} from './helpers.js';

/**
 * A single shared language service instance.
 * When a schema is passed directly to `doValidation`, no
 * schema request service is needed.
 */
const ls = getLanguageService({});

/**
 * Format VS Code diagnostics into a readable string.
 *
 * @param diagnostics - The diagnostics from validation.
 */
function formatDiagnostics(diagnostics: Diagnostic[]): string {
  if (diagnostics.length === 0) return '  (no diagnostics)';

  return diagnostics
    .map((d) =>
      [
        `  Line ${d.range.start.line}: ${d.message}`,
        d.source ? `  Source: ${d.source}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n\n');
}

describe('vscode-json-languageservice', () => {
  generateTests(
    async (testCase: TestCase, fixturePath: string, ctx: ValidateContext) => {
      const schema = loadJson<JSONSchema>(
        ctx.schemaPath,
        `schema ${ctx.schemaPath}`,
      );

      const content = readFileSync(fixturePath, 'utf-8');
      const textDoc = TextDocument.create(
        'file:///test.json',
        'json',
        0,
        content,
      );
      const jsonDoc = ls.parseJSONDocument(textDoc);
      const diagnostics = await ls.doValidation(
        textDoc,
        jsonDoc,
        undefined,
        schema,
      );

      return {
        isValid: diagnostics.length === 0,
        errorDetails: formatDiagnostics(diagnostics),
      };
    },
    {
      // The VS Code JSON language service only validates a hardcoded set of
      // `format` values (uri, uri-reference, color-hex, date-time, date, time,
      // email, hostname, ipv4, ipv6). The `format: "json-pointer-uri-fragment"`
      // used in the jsonPointerReference definition is silently ignored, so
      // these negative tests pass validation when they should fail. This is
      // spec-compliant — JSON Schema draft-07 treats `format` as an annotation
      // by default, and validation is optional.
      excludeIds: [
        'reference-json-pointer-mixed-ref-syntax',
        'reference-json-pointer-space-in-path',
      ],
    },
  );
});
