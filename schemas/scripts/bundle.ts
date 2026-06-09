/**
 * Schema bundler for the DTCG specification.
 *
 * Reads split JSON Schema source files, registers them with hyperjump,
 * and bundles each entry schema into a single self-contained file with
 * all `$ref`s resolved via embedded `$id` anchors.
 *
 * Configuration is read from `schemas.config.json` in the package root.
 */
import {
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
  mkdirSync,
} from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import * as prettier from 'prettier';
import {
  registerSchema,
  type SchemaObject,
} from '@hyperjump/json-schema/draft-07';
import { bundle } from '@hyperjump/json-schema/bundle';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = join(__dirname, '..');

/** A root schema to bundle into a single output file. */
interface EntrySchema {
  /** The schema's `$id` URI used to look it up in the hyperjump registry. */
  id: string;
  /** The output filename (e.g. `"format.json"`). */
  filename: string;
}

/** Configuration for a single DTCG specification version. */
interface VersionConfig {
  /** The specification version (e.g. `"2025.10"`). Maps to `src/<version>/` and `<outputDir>/<version>/`. */
  version: string;
  /** The root schemas to bundle for this version. */
  entrySchemas: EntrySchema[];
}

/** Top-level configuration loaded from `schemas.config.json`. */
interface SchemasConfig {
  /** One entry per DTCG specification version to bundle. */
  versions: VersionConfig[];
  /** Directory containing the split source schemas, relative to the package root. */
  sourceDir: string;
  /** Output directories relative to the package root. Each gets a `<version>/` subdirectory. */
  outputDirs: string[];
}

const config: SchemasConfig = JSON.parse(
  readFileSync(join(ROOT_DIR, 'schemas.config.json'), 'utf-8'),
);

/**
 * Recursively collect all `.json` files under a directory.
 *
 * @param dir - The directory to search.
 * @returns An array of absolute file paths.
 */
function findJsonFiles(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    if (statSync(fullPath).isDirectory()) {
      results.push(...findJsonFiles(fullPath));
    } else if (entry.endsWith('.json')) {
      results.push(fullPath);
    }
  }
  return results;
}

/**
 * Register every source schema in a directory with hyperjump
 * so the bundler can resolve cross-file `$ref`s by `$id`.
 *
 * @param sourceDir - The directory containing the split source schemas.
 * @returns The number of schemas registered.
 */
function registerAllSchemas(sourceDir: string): number {
  const files = findJsonFiles(sourceDir);
  let registeredCount = 0;

  for (const file of files) {
    const schema: SchemaObject = JSON.parse(readFileSync(file, 'utf-8'));
    if (typeof schema.$id === 'string') {
      registerSchema(schema, schema.$id);
      registeredCount += 1;
      console.log(`  Registered: ${schema.$id}`);
    }
  }

  return registeredCount;
}

/**
 * Bundle a single root schema into a self-contained file and write
 * it to every output directory.
 *
 * @param schemaId - The `$id` URI of the root schema to bundle.
 * @param filename - The output filename.
 * @param outputDirs - Directories to write the bundled file to.
 */
async function bundleSchema(
  schemaId: string,
  filename: string,
  outputDirs: string[],
): Promise<void> {
  console.log(`\nBundling ${schemaId}...`);

  const bundled = await bundle(schemaId, {
    alwaysIncludeDialect: true,
    definitionNamingStrategy: 'uri',
  });

  for (const dir of outputDirs) {
    const outputPath = join(dir, filename);
    mkdirSync(dirname(outputPath), { recursive: true });
    const json = await prettier.format(JSON.stringify(bundled, null, 2), {
      parser: 'json',
      filepath: outputPath,
    });
    writeFileSync(outputPath, json);
    console.log(`  Written: ${outputPath}`);
  }
}

async function main(): Promise<void> {
  for (const { version, entrySchemas } of config.versions) {
    console.log(`\n=== Version ${version} ===`);

    const sourceDir = join(ROOT_DIR, config.sourceDir, version);
    const outputDirs = config.outputDirs.map((dir) =>
      join(ROOT_DIR, dir, version),
    );

    console.log('\nRegistering source schemas...');
    const count = registerAllSchemas(sourceDir);
    console.log(`Registered ${count} schemas.`);

    for (const { id, filename } of entrySchemas) {
      await bundleSchema(id, filename, outputDirs);
    }
  }

  console.log('\nDone!');
}

main().catch((err: unknown) => {
  console.error('Bundle failed:', err);
  process.exit(1);
});
