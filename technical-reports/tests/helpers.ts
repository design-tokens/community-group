/**
 * Shared utilities for technical report example validation.
 *
 * Extracts JSON/JSONC code blocks from markdown files, classifies
 * them by schema type, and provides validation utilities.
 *
 * Pure infrastructure — no test framework dependencies.
 */
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { globSync } from 'glob';
import {
  parse as parseJsonc,
  type ParseError,
  printParseErrorCode,
} from 'jsonc-parser';
import { Ajv, type ErrorObject } from 'ajv';
import AjvFormats from 'ajv-formats';

const addFormats = AjvFormats.default;

const __dirname = dirname(fileURLToPath(import.meta.url));
const CONFIG_DIR = __dirname;

// ---------------------------------------------------------------------------
// Config types (mirrors tests.config.json)
// ---------------------------------------------------------------------------

/** Schema identifier and local filename within the schema directory. */
export interface SchemaRef {
  /** Canonical `$id` of the JSON Schema. */
  id: string;
  /** Filename within `schemaDir`. */
  filename: string;
}

/** A detection rule that maps content signals to a schema. */
export interface DetectionRule {
  schema: SchemaRef;
  /** JSON property names whose presence indicates this schema type. */
  signals: string[];
}

/** An entry in the exclusion list. */
export interface ExcludeEntry {
  /** Fingerprint of the block to exclude (`file:hash`). */
  id: string;
  /** Human-readable reason for the exclusion. */
  reason: string;
}

/** Root config shape for `tests.config.json`. */
export interface ExamplesConfig {
  /** Glob patterns for markdown files to scan, relative to the tests directory. */
  sources: string[];
  /** Directory containing bundled schemas, relative to the tests directory. */
  schemaDir: string;
  /** Detection rules keyed by type name (e.g. "format", "resolver"). */
  detection: Record<string, DetectionRule>;
  /** Blocks to skip during validation. */
  exclude: ExcludeEntry[];
}

// ---------------------------------------------------------------------------
// Extracted example types
// ---------------------------------------------------------------------------

/** A single code block extracted from a markdown file. */
export interface ExtractedExample {
  /** Source file relative to the package root. */
  file: string;
  /** 1-based index of this code block within the file. */
  blockIndex: number;
  /** 1-based line number of the opening fence in the source file. */
  line: number;
  /** The fenced code language tag. */
  lang: 'json' | 'jsonc';
  /** Raw content of the code block (between the fences). */
  raw: string;
  /** Whether the block contains supported JSONC-only features. */
  hasJsoncFeatures: boolean;
  /** The `$schema` value if declared in the block. */
  schema: string | undefined;
  /** The `<aside class="example" title="...">` title, if present. */
  exampleTitle: string | undefined;
  /** Stable content-based fingerprint (`file:hash8`). */
  fingerprint: string;
  /** Detected schema type key from config, or `undefined` for unclassified. */
  detectedType: string | undefined;
}

/** Result of resolving an example to a validation schema. */
export type SchemaResolution =
  | {
      /** The example can be validated against a known schema. */
      status: 'resolved';
      /** Canonical `$id` of the schema. */
      schemaId: string;
      /** Absolute path to the bundled schema file. */
      schemaPath: string;
    }
  | {
      /** The example declares `$schema`, but it is not configured. */
      status: 'unknown-schema';
      /** The unrecognized `$schema` value from the example. */
      schema: string;
    }
  | {
      /** The example has no `$schema` and did not match detection rules. */
      status: 'unclassified';
    };

// ---------------------------------------------------------------------------
// Config loading
// ---------------------------------------------------------------------------

/**
 * Load and parse the tests config file.
 *
 * @returns The parsed configuration object.
 */
export function loadConfig(): ExamplesConfig {
  const configPath = join(CONFIG_DIR, 'tests.config.json');
  try {
    return JSON.parse(readFileSync(configPath, 'utf-8'));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    throw new Error(`Failed to load tests config at ${configPath}: ${message}`);
  }
}

// ---------------------------------------------------------------------------
// Fingerprinting
// ---------------------------------------------------------------------------

/**
 * Compute a stable fingerprint for a code block.
 *
 * The fingerprint is `file:hash8` where `hash8` is the first 8 hex
 * characters of the SHA-256 digest of the trimmed block content.
 *
 * @param file - Relative file path.
 * @param content - Raw block content.
 * @returns A fingerprint string in the format `file:hash8`.
 */
export function computeFingerprint(file: string, content: string): string {
  const hash = createHash('sha256')
    .update(content.trim())
    .digest('hex')
    .slice(0, 8);
  return `${file}:${hash}`;
}

// ---------------------------------------------------------------------------
// Extraction
// ---------------------------------------------------------------------------

/**
 * Extract all JSON/JSONC code blocks from the configured markdown sources.
 *
 * @param config - The loaded tests config.
 * @returns An array of extracted examples from all matched files.
 */
export function extractExamples(config: ExamplesConfig): ExtractedExample[] {
  const seen = new Set<string>();
  const files: string[] = [];

  for (const pattern of config.sources) {
    for (const match of globSync(pattern, { cwd: CONFIG_DIR })) {
      if (!seen.has(match)) {
        seen.add(match);
        files.push(match);
      }
    }
  }

  const examples: ExtractedExample[] = [];
  for (const file of files.sort()) {
    const filePath = join(CONFIG_DIR, file);
    const content = readFileSync(filePath, 'utf-8');
    // Use a clean display path relative to the package root
    const displayPath = file.replace(/^\.\.\//, '');
    examples.push(...extractBlocksFromFile(content, displayPath, config));
  }

  return examples;
}

/**
 * Extract code blocks from a single markdown file.
 *
 * @param content - The full markdown file content.
 * @param file - Display path for the file (relative to the package root).
 * @param config - The loaded tests config, used for schema detection.
 * @returns An array of extracted examples from the file.
 */
function extractBlocksFromFile(
  content: string,
  file: string,
  config: ExamplesConfig,
): ExtractedExample[] {
  const examples: ExtractedExample[] = [];
  const lines = content.split('\n');

  let inBlock = false;
  let blockLines: string[] = [];
  let blockFenceLine = 0;
  let blockLang: 'json' | 'jsonc' = 'json';
  let blockIndex = 0;
  let currentAsideTitle: string | undefined;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Track <aside class="example" title="..."> wrappers
    const asideMatch = line.match(
      /<aside\s+class="example"(?:\s+title="([^"]*)")?\s*>/,
    );
    if (asideMatch) {
      currentAsideTitle = asideMatch[1] || undefined;
    }
    if (line.includes('</aside>')) {
      currentAsideTitle = undefined;
    }

    // Markdown permits up to three leading spaces before a fenced code block.
    // The info string may also include extra metadata after the language tag,
    // e.g. ```json title="Example". Capture only the language for validation.
    const openingFenceMatch = line.match(/^ {0,3}```(jsonc?)(?:\s+.*)?$/);
    if (!inBlock && openingFenceMatch) {
      inBlock = true;
      blockLang = openingFenceMatch[1] === 'jsonc' ? 'jsonc' : 'json';
      blockFenceLine = i + 1; // 1-based line of the opening fence
      blockLines = [];
      blockIndex++;
    } else if (inBlock && /^ {0,3}```\s*$/.test(line)) {
      inBlock = false;
      const raw = blockLines.join('\n');

      const hasJsoncFeatures = detectJsoncFeatures(raw);
      const schemaMatch = raw.match(/"\$schema"\s*:\s*"([^"]+)"/);
      const schema = schemaMatch?.[1];
      const detectedType = detectType(raw, config);
      const fingerprint = computeFingerprint(file, raw);

      examples.push({
        file,
        blockIndex,
        line: blockFenceLine,
        lang: blockLang,
        raw,
        hasJsoncFeatures,
        schema,
        exampleTitle: currentAsideTitle,
        fingerprint,
        detectedType,
      });
    } else if (inBlock) {
      blockLines.push(line);
    }
  }

  return examples;
}

/**
 * Detect whether a block contains supported JSONC-only features.
 *
 * Tries strict `JSON.parse()` first. If that fails but `jsonc-parser`
 * succeeds without allowing trailing commas, the block contains supported
 * JSONC features such as comments.
 *
 * @param raw - The raw code block content.
 * @returns `true` if the block contains supported JSONC features.
 */
function detectJsoncFeatures(raw: string): boolean {
  try {
    JSON.parse(raw);
    return false;
  } catch {
    const errors: ParseError[] = [];
    parseJsonc(raw, errors, { allowTrailingComma: false });
    // Parseable as supported JSONC but not as strict JSON → has JSONC features
    return errors.length === 0;
  }
}

/**
 * Detect which schema type a block matches based on signal presence.
 *
 * Checks each detection rule's signals against the raw content.
 *
 * @param raw - The raw code block content.
 * @param config - The loaded tests config containing detection rules.
 * @returns The first matching type key, or `undefined` for unclassified blocks.
 */
function detectType(raw: string, config: ExamplesConfig): string | undefined {
  for (const [type, rule] of Object.entries(config.detection)) {
    if (rule.signals.some((signal) => raw.includes(`"${signal}"`))) {
      return type;
    }
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Schema validation
// ---------------------------------------------------------------------------

/** Cache of AJV instances per schema file path. */
const validators = new Map<string, Ajv>();

/**
 * Get a compiled AJV validation function for a schema.
 *
 * @param schemaPath - Absolute path to the bundled schema file.
 * @param schemaId - The `$id` of the schema to retrieve.
 * @returns A compiled AJV validation function for the schema.
 */
export function getSchemaValidator(
  schemaPath: string,
  schemaId: string,
): NonNullable<ReturnType<Ajv['getSchema']>> {
  let ajv = validators.get(schemaPath);
  if (!ajv) {
    ajv = new Ajv({ strict: true, allErrors: true });
    addFormats(ajv);
    const schema = JSON.parse(readFileSync(schemaPath, 'utf-8'));
    ajv.addSchema(schema);
    validators.set(schemaPath, ajv);
  }

  const validate = ajv.getSchema(schemaId);
  if (!validate) {
    throw new Error(`Schema not found: ${schemaId} in ${schemaPath}`);
  }
  return validate;
}

/**
 * Format AJV validation errors into a readable string.
 *
 * @param errors - The array of AJV error objects, or `null`/`undefined`.
 * @returns A formatted multi-line string describing each error.
 */
export function formatAjvErrors(
  errors: ErrorObject[] | null | undefined,
): string {
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

/**
 * Format JSONC parse errors with line/column and source context.
 *
 * `jsonc-parser` reports byte offsets, which are hard to act on in markdown
 * examples. This groups parser errors by offset and adds line/column context
 * with a concise reason.
 *
 * @param raw - The raw code block content.
 * @param errors - JSONC parser errors.
 * @param sourceStartLine - 1-based source line of the opening code fence.
 * @returns A formatted multi-line error report.
 */
export function formatJsoncParseErrors(
  raw: string,
  errors: ParseError[],
  sourceStartLine: number,
): string {
  if (errors.length === 0) return '  (no errors)';

  const grouped = new Map<number, ParseError[]>();
  for (const error of errors) {
    const group = grouped.get(error.offset) ?? [];
    group.push(error);
    grouped.set(error.offset, group);
  }

  return [...grouped.entries()]
    .map(([offset, group]) => {
      const codes = group
        .map((error) => printParseErrorCode(error.error))
        .join(', ');

      const prefix = raw.slice(0, offset);
      const previousNonWhitespace = prefix.match(/\S(?=\s*$)/);
      const isTrailingComma = previousNonWhitespace?.[0] === ',';
      const markerOffset = isTrailingComma
        ? (previousNonWhitespace.index ?? offset)
        : offset;
      const beforeMarker = raw.slice(0, markerOffset).split('\n');
      const line = beforeMarker.length;
      const column = beforeMarker[beforeMarker.length - 1].length + 1;
      const sourceLine = sourceStartLine + line;
      const reason = isTrailingComma ? 'Trailing comma' : codes;

      return (
        `  Line ${sourceLine}, column ${column} ` +
        `(block line ${line}): ${reason}`
      );
    })
    .join('\n\n');
}

// ---------------------------------------------------------------------------
// Exclusion helpers
// ---------------------------------------------------------------------------

/**
 * Find exclusion entries that no longer match any extracted block.
 *
 * @param examples - All currently extracted examples.
 * @param config - The loaded tests config containing the exclusion list.
 * @returns Stale entries whose fingerprints don't appear in the current set of examples.
 */
export function getStaleExclusions(
  examples: ExtractedExample[],
  config: ExamplesConfig,
): ExcludeEntry[] {
  const fingerprints = new Set(examples.map((e) => e.fingerprint));
  return config.exclude.filter((e) => !fingerprints.has(e.id));
}

// ---------------------------------------------------------------------------
// Formatting helpers
// ---------------------------------------------------------------------------

/**
 * Build a human-readable label for a test case.
 *
 * @param block - The extracted example to label.
 * @returns A label string like `[3] "Example title" (line 42)`.
 */
export function formatLabel(block: ExtractedExample): string {
  const title = block.exampleTitle ? `"${block.exampleTitle}" ` : '';
  return `[${block.blockIndex}] ${title}(line ${block.line})`;
}

/**
 * Build a detailed failure message including content and fingerprint.
 *
 * @param block - The extracted example that failed.
 * @param message - The failure description.
 * @returns A multi-line string with file location, content, and exclusion instructions.
 */
export function failureMessage(
  block: ExtractedExample,
  message: string,
): string {
  return [
    '',
    message,
    '',
    `File: ${block.file}`,
    `Line: ${block.line}`,
    `Block: ${block.blockIndex}`,
    block.exampleTitle ? `Example: ${block.exampleTitle}` : null,
    '',
    'Content:',
    block.raw,
    '',
    `To exclude, add to tests.config.json "exclude" array:`,
    `  { "id": "${block.fingerprint}", "reason": "..." }`,
    '',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

// ---------------------------------------------------------------------------
// Schema resolution
// ---------------------------------------------------------------------------

/**
 * Resolve the schema to validate a block against.
 *
 * Checks for an explicit `$schema` first, then falls back to
 * detection-based classification.
 *
 * @param block - The extracted example to resolve a schema for.
 * @param config - The loaded tests config containing detection rules.
 * @returns A schema resolution result describing whether validation is possible.
 */
export function resolveSchema(
  block: ExtractedExample,
  config: ExamplesConfig,
): SchemaResolution {
  // Explicit $schema declared in the block. Unknown explicit schemas are
  // reported separately so typos do not silently downgrade to parse-only tests.
  if (block.schema) {
    for (const rule of Object.values(config.detection)) {
      if (rule.schema.id === block.schema) {
        return {
          status: 'resolved',
          schemaId: rule.schema.id,
          schemaPath: join(CONFIG_DIR, config.schemaDir, rule.schema.filename),
        };
      }
    }
    return { status: 'unknown-schema', schema: block.schema };
  }

  // Detection-based classification
  if (block.detectedType) {
    const rule = config.detection[block.detectedType];
    return {
      status: 'resolved',
      schemaId: rule.schema.id,
      schemaPath: join(CONFIG_DIR, config.schemaDir, rule.schema.filename),
    };
  }

  return { status: 'unclassified' };
}

// ---------------------------------------------------------------------------
// JSONC parsing (re-exported for use in tests)
// ---------------------------------------------------------------------------

export { parseJsonc, printParseErrorCode, type ParseError };
