# @dtcg/schemas

Source JSON Schemas for the DTCG Format and Resolver specifications. Split into multiple files for maintainability, bundled into single self-contained files for hosting.

## Structure

```
src/              Source schemas (split files with $ref)
dist/             Bundled output (generated, gitignored)
scripts/          Build tooling
schemas.config.json  Bundle configuration
```

## Usage

```sh
pnpm --filter @dtcg/schemas run build
```

This registers all source schemas, bundles each entry schema into a single file, and writes the output to both `dist/` and `../www/public/schemas/`.

## Configuration

Edit `schemas.config.json` to add versions or entry schemas:

```json
{
  "versions": [
    {
      "version": "2025.10",
      "entrySchemas": [
        {
          "id": "https://www.designtokens.org/schemas/2025.10/format.json",
          "filename": "format.json"
        }
      ]
    }
  ],
  "sourceDir": "src",
  "distDir": "dist",
  "outputDirs": ["dist", "../www/public/schemas"]
}
```

- **`versions[].version`**: the DTCG specification version (e.g. `"2025.10"`). Determines the subdirectory under `sourceDir` and each output dir.
- **`versions[].entrySchemas`**: the root schemas to bundle for this spec version. Each entry produces one self-contained output file with all `$ref`s resolved. `id` is the schema's `$id` URI, `filename` is the output filename.
- **`sourceDir`**: directory containing the split source schemas, relative to this package.
- **`distDir`**: directory for bundled output, relative to this package.
- **`outputDirs`**: all paths (relative to this package) where bundled schemas are written. Each gets a `<version>/` subdirectory.

## Adding a new schema version

See [CONTRIBUTING.md](CONTRIBUTING.md).
