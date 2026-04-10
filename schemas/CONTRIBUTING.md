# Contributing a New Schema Version

This guide covers how to add a new version of the DTCG schemas alongside the existing ones (e.g. adding `2026.04` next to `2025.10`).

## Prerequisites

Make sure you can build the current schemas first:

```sh
pnpm --filter @dtcg/schemas run build
```

## Steps

### 1. Create the source directory

Copy the existing version as a starting point, then make your changes:

```sh
cp -r src/2025.10 src/<new-version>
```

### 2. Update `$id` URIs

Every schema file under `src/<new-version>/` contains a `$id` with the version baked in. Update all of them to reflect the new version. For example:

```
https://www.designtokens.org/schemas/2025.10/format.json
```

becomes:

```
https://www.designtokens.org/schemas/<new-version>/format.json
```

This applies to the entry schemas (`format.json`, `resolver.json`) and all sub-schemas they reference (`format/token.json`, `format/values/color.json`, `resolver/set.json`, etc.).

### 3. Apply spec changes

Update the schemas to reflect the new version of the technical report. This means adding, removing, or modifying type definitions, properties, and constraints to match the spec changes for that version.

### 4. Update `const` values

Some schemas pin the version as a `const`. For example, `resolver.json` has:

```json
"version": {
  "const": "2025.10"
}
```

Update this to match the new version string.

### 5. Register the version in `schemas.config.json`

Add a new entry to the `versions` array:

```json
{
  "version": "<new-version>",
  "entrySchemas": [
    {
      "id": "https://www.designtokens.org/schemas/<new-version>/format.json",
      "filename": "format.json"
    },
    {
      "id": "https://www.designtokens.org/schemas/<new-version>/resolver.json",
      "filename": "resolver.json"
    }
  ]
}
```

The build script reads this config to know which versions to bundle.

### 6. Build

```sh
pnpm --filter @dtcg/schemas run build
```

The build bundles each entry schema into a single self-contained file under `dist/<new-version>/` and copies it to `www/public/schemas/<new-version>/`.

## Structure reference

```
src/
  <version>/
    format.json            Entry schema for the format spec
    format/
      group.json
      groupOrToken.json
      token.json
      tokenType.json
      values/
        border.json
        color.json
        ...
    resolver.json          Entry schema for the resolver spec
    resolver/
      modifier.json
      resolutionOrder.json
      set.json
dist/                      Generated output (gitignored)
schemas.config.json        Version and entry schema configuration
```
