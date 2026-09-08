/**
 * Shared test infrastructure for schema validation tests.
 *
 * Provides types, config loading, manifest parsing, and test
 * generation utilities used by all validator-specific test files.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

// ---------------------------------------------------------------------------
// Manifest types (mirrors the structure in test-suite)
// ---------------------------------------------------------------------------

/** A single test case entry in a sub-manifest. */
export interface TestCase {
  /** Unique identifier for the test. */
  id: string;
  /** Whether the fixture should pass or fail validation. */
  type: 'PositiveEvaluationTest' | 'NegativeEvaluationTest';
  /** Human-readable test name. */
  name: string;
  /** Explanation of what the test verifies. */
  purpose: string;
  /** Path to the fixture file, relative to the sub-manifest directory. */
  input: string;
  /** Optional list of features exercised by this test. */
  features?: string[];
}

/** A sub-manifest for a single schema (format or resolver). */
export interface SubManifest {
  name: string;
  version: string;
  /** The `$id` of the schema to validate against. */
  schemaId: string;
  tests: TestCase[];
}

/** The root manifest that references all sub-manifests. */
export interface RootManifest {
  name: string;
  version: string;
  manifests: Array<{
    id: string;
    file: string;
  }>;
}

// ---------------------------------------------------------------------------
// Config type (mirrors schemas.config.json)
// ---------------------------------------------------------------------------

export interface SchemasConfig {
  versions: Array<{
    version: string;
    entrySchemas: Array<{
      id: string;
      filename: string;
    }>;
  }>;
  sourceDir: string;
  /** Directory containing bundled schema output, relative to the package root. */
  distDir: string;
  /** Directory containing test-suite fixtures, relative to the package root. */
  testSuiteDir: string;
  outputDirs: string[];
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/**
 * Parse a JSON file with a clear error on failure.
 *
 * @param filePath - Absolute path to the JSON file.
 * @param label - Human-readable label used in error messages.
 */
export function loadJson<T>(filePath: string, label: string): T {
  try {
    return JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load ${label} at ${filePath}: ${message}`);
  }
}

/**
 * Build a descriptive failure message for a test case.
 *
 * @param testCase - The test case that failed.
 * @param fixture - The fixture content (string or parsed object).
 * @param schemaId - The `$id` of the schema used.
 * @param errorDetails - Formatted error/diagnostic details.
 */
export function failureMessage(
  testCase: TestCase,
  fixture: unknown,
  schemaId: string,
  errorDetails: string,
): string {
  const expected =
    testCase.type === 'PositiveEvaluationTest' ? 'Valid' : 'Invalid';
  const actual =
    testCase.type === 'PositiveEvaluationTest' ? 'Invalid' : 'Valid';

  const fixtureStr =
    typeof fixture === 'string' ? fixture : JSON.stringify(fixture, null, 2);

  return [
    '',
    `Test: ${testCase.name}`,
    `Purpose: ${testCase.purpose}`,
    `Schema: ${schemaId}`,
    '',
    `Expected: ${expected}`,
    `Actual: ${actual}`,
    '',
    'Fixture:',
    fixtureStr,
    '',
    'Errors:',
    errorDetails,
    '',
  ].join('\n');
}

// ---------------------------------------------------------------------------
// Config and paths
// ---------------------------------------------------------------------------

export const config = loadJson<SchemasConfig>(
  join(ROOT_DIR, 'schemas.config.json'),
  'schemas config',
);

export const DIST_DIR = join(ROOT_DIR, config.distDir);
export const TEST_SUITE_DIR = join(ROOT_DIR, config.testSuiteDir);

// ---------------------------------------------------------------------------
// Test generation
// ---------------------------------------------------------------------------

/** Context passed to each validator's test callback. */
export interface ValidateContext {
  /** The sub-manifest being tested. */
  subManifest: SubManifest;
  /** Absolute path to the bundled schema file. */
  schemaPath: string;
  /** Absolute directory containing the sub-manifest (for resolving fixture paths). */
  manifestDir: string;
}

/**
 * Result of validating a single fixture.
 */
export interface ValidationResult {
  /** Whether the fixture passed validation. */
  isValid: boolean;
  /** Formatted error/diagnostic details for failure messages. */
  errorDetails: string;
}

/** Options for customizing test generation. */
export interface GenerateTestsOptions {
  /**
   * Test case IDs to exclude from the generated suite.
   * Matching tests are omitted rather than skipped.
   */
  excludeIds?: string[];
}

/**
 * Generate test suites from manifests, delegating validation to a callback.
 *
 * Iterates all versions and sub-manifests from config, filters out
 * preprocessing-required tests, and calls the provided `runTest`
 * function for each fixture.
 *
 * @param runTest - Validator-specific function that validates a fixture
 *   and returns whether it's valid and any error details.
 * @param options - Optional settings for excluding tests.
 */
export function generateTests(
  runTest: (
    testCase: TestCase,
    fixturePath: string,
    ctx: ValidateContext,
  ) => Promise<ValidationResult> | ValidationResult,
  options: GenerateTestsOptions = {},
): void {
  const excludeIdSet = new Set(options.excludeIds ?? []);
  for (const { version, entrySchemas } of config.versions) {
    const versionDir = join(TEST_SUITE_DIR, version);
    const rootManifest = loadJson<RootManifest>(
      join(versionDir, 'manifest.json'),
      `root manifest for ${version}`,
    );

    describe(`v${version}`, () => {
      for (const { id, file } of rootManifest.manifests) {
        const manifestPath = join(versionDir, file);
        const manifestDir = dirname(manifestPath);
        const subManifest = loadJson<SubManifest>(
          manifestPath,
          `${id} manifest`,
        );

        const entry = entrySchemas.find((e) => e.id === subManifest.schemaId);
        if (!entry) {
          throw new Error(
            `No bundled schema found for $id "${subManifest.schemaId}". ` +
              `Known ids: ${entrySchemas.map((e) => e.id).join(', ')}`,
          );
        }

        const schemaPath = join(DIST_DIR, version, entry.filename);

        const excludedTestCases = subManifest.tests.filter((t) =>
          excludeIdSet.has(t.id),
        );
        const includedTestCases = subManifest.tests.filter(
          (t) => !excludeIdSet.has(t.id),
        );
        const testCases = includedTestCases.filter(
          (t) => !t.features?.includes('preprocessing-required'),
        );
        const preprocessingRequiredTestCases = includedTestCases.filter((t) =>
          t.features?.includes('preprocessing-required'),
        );

        const ctx: ValidateContext = { subManifest, schemaPath, manifestDir };

        describe(subManifest.name, () => {
          it.each(testCases)('$name', async (testCase) => {
            const fixturePath = join(manifestDir, testCase.input);
            const result = await runTest(testCase, fixturePath, ctx);
            const shouldBeValid = testCase.type === 'PositiveEvaluationTest';

            expect(
              result.isValid,
              failureMessage(
                testCase,
                loadJson(fixturePath, `fixture ${testCase.input}`),
                subManifest.schemaId,
                result.errorDetails,
              ),
            ).toBe(shouldBeValid);
          });

          it.skip.each(preprocessingRequiredTestCases)(
            '$name (requires preprocessing)',
            () => {},
          );

          it.skip.each(excludedTestCases)(
            '$name (excluded by validator)',
            () => {},
          );
        });
      }
    });
  }
}
