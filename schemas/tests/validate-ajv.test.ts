/**
 * Schema validation tests using AJV.
 *
 * Each sub-manifest gets its own AJV instance with only the relevant
 * bundled schema loaded, since the bundled files are self-contained.
 *
 * Requires `pnpm run build` to have been run first so that
 * `dist/` contains the bundled schemas.
 */
import { Ajv, type ErrorObject, type AnySchema } from 'ajv';
import AjvFormats from 'ajv-formats';

const addFormats = AjvFormats.default;
import {
  generateTests,
  loadJson,
  type ValidateContext,
  type TestCase,
} from './helpers.js';

/** Cache of AJV instances per schema path. */
const validators = new Map<string, Ajv>();

/**
 * Get or create an AJV instance for a bundled schema.
 *
 * @param schemaPath - Absolute path to the bundled schema file.
 */
function getValidator(schemaPath: string): Ajv {
  let ajv = validators.get(schemaPath);
  if (!ajv) {
    ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const schema = loadJson<AnySchema>(
      schemaPath,
      `bundled schema ${schemaPath}`,
    );
    ajv.addSchema(schema);
    validators.set(schemaPath, ajv);
  }
  return ajv;
}

/**
 * Format AJV errors into a readable string.
 *
 * @param errors - The error array from `validate.errors`.
 */
function formatErrors(errors: ErrorObject[] | null | undefined): string {
  if (!errors || errors.length === 0) return '  (no errors)';

  return errors
    .map((err) =>
      [
        `  Path: ${err.instancePath || '(root)'}`,
        `  Message: ${err.message}`,
        err.params ? `  Params: ${JSON.stringify(err.params)}` : null,
      ]
        .filter(Boolean)
        .join('\n'),
    )
    .join('\n\n');
}

generateTests(
  (testCase: TestCase, fixturePath: string, ctx: ValidateContext) => {
    const ajv = getValidator(ctx.schemaPath);
    const validate = ajv.getSchema(ctx.subManifest.schemaId);
    if (!validate) {
      throw new Error(`Schema not found: ${ctx.subManifest.schemaId}`);
    }

    const fixture = loadJson(fixturePath, `fixture ${testCase.input}`);
    const isValid = validate(fixture) as boolean;

    return {
      isValid,
      errorDetails: formatErrors(validate.errors),
    };
  },
);
