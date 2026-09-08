# @dtcg/test-suite

Conformance test fixtures for the DTCG Format and Resolver specifications. These fixtures serve two purposes:

1. **Schema validation**, testing the bundled JSON schemas from `@dtcg/schemas`
2. **Implementation testing**, providing standardized test cases for third-party tools implementing the DTCG specifications

## Structure

```
tests/
└── 2025.10/                       Spec version
    ├── manifest.json              Root manifest referencing all sub-manifests
    ├── format/
    │   ├── manifest.json          Format test manifest
    │   ├── positive/              Valid token files (PositiveEvaluationTest)
    │   └── negative/              Invalid token files (NegativeEvaluationTest)
    └── resolver/
        ├── manifest.json          Resolver test manifest
        ├── positive/              Valid resolver files (PositiveEvaluationTest)
        └── negative/              Invalid resolver files (NegativeEvaluationTest)
```

## Usage

### For external tool developers

The test fixtures are plain JSON files. Clone this repo and use the `manifest.json` files to discover test cases.

### Internal testing

The `@dtcg/schemas` package runs these fixtures against the bundled schemas:

```sh
pnpm --filter @dtcg/schemas run build
pnpm --filter @dtcg/schemas run test
```

See `schemas/README.md` for details.

## Manifest format

### Root manifest (`manifest.json`)

References all sub-manifests:

```json
{
  "name": "Design Tokens Test Suite",
  "description": "Test fixtures for DTCG specifications",
  "version": "2025.10",
  "manifests": [
    {
      "id": "format",
      "file": "format/manifest.json",
      "description": "Tests for the Format specification"
    }
  ]
}
```

### Sub-manifests (`format/manifest.json`, `resolver/manifest.json`)

Each sub-manifest contains individual test cases:

```json
{
  "name": "Format Specification Tests",
  "description": "Validation tests for DTCG token format",
  "version": "2025.10",
  "schemaId": "https://www.designtokens.org/schemas/2025.10/format.json",
  "tests": [
    {
      "id": "color-srgb-basic",
      "type": "PositiveEvaluationTest",
      "name": "Basic sRGB color token",
      "purpose": "Verifies that a simple color token with sRGB color space is valid",
      "input": "positive/color-srgb-basic.json",
      "features": ["color", "srgb"]
    }
  ]
}
```

### Test entry properties

| Property   | Required | Description                                                     |
| ---------- | -------- | --------------------------------------------------------------- |
| `id`       | Yes      | Unique identifier for the test (e.g., `"color-srgb-basic"`)     |
| `type`     | Yes      | Either `"PositiveEvaluationTest"` or `"NegativeEvaluationTest"` |
| `name`     | Yes      | Human-readable test name                                        |
| `purpose`  | Yes      | Explanation of what the test verifies                           |
| `input`    | Yes      | Path to test fixture file (relative to manifest)                |
| `features` | No       | Array of features being tested (e.g., `["color", "srgb"]`)      |

## Test types

### PositiveEvaluationTest

Tests that **should pass** validation. These are examples of valid design tokens or resolver files according to the specification.

### NegativeEvaluationTest

Tests that **should fail** validation. These demonstrate invalid structures, missing required properties, or constraint violations.

## Test organization

Tests are organized into folders by their **primary feature**. Each test goes into the folder of the main feature being tested.

### Format tests

**Token type folders:**
`colors`, `dimensions`, `fontFamily`, `fontWeight`, `durations`, `cubicBezier`, `numbers`, `strokeStyles`, `borders`, `transitions`, `shadows`, `gradients`, `typography`

**Cross-cutting concern folders:**

- `references`, reference resolution (`{token}` and `#/json/pointer`)
- `groups`, group behavior, nesting, `$extends`
- `metadata`, token-level `$description`, `$deprecated`, `$extensions`
- `token-name`, token naming rules

**Allowed features:**

- Token types: `color`, `dimension`, `fontFamily`, `fontWeight`, `duration`, `cubicBezier`, `number`, `strokeStyle`, `border`, `transition`, `shadow`, `gradient`, `typography`
- Color spaces: `srgb`, `srgb-linear`, `hsl`, `hwb`, `lab`, `lch`, `oklab`, `oklch`, `display-p3`, `rec2020`, `prophoto-rgb`, `a98-rgb`, `xyz-d50`, `xyz-d65`
- Cross-cutting: `references`, `json-pointer`, `groups`, `type-inheritance`, `extends`, `metadata`, `token-name`, `composite`, `preprocessing-required`

Use `preprocessing-required` for tests that need reference resolution, type inheritance, or `$extends` processing before validation.

### Resolver tests

**Resolver component folders:**
`sets`, `modifiers`, `resolution-order`, `metadata`

**Allowed features:**
`sets`, `modifiers`, `resolution-order`, `metadata`, `contexts`, `inline`, `reference`, `preprocessing-required`

Use `preprocessing-required` for resolver tests that need circular-reference detection, duplicate-name checking, or other processing beyond static schema validation.

## Adding test cases

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full fixture style guide. In short:

1. Add `.json` fixture files to the appropriate `tests/<version>/<schema>/positive/` or `tests/<version>/<schema>/negative/` directory.
2. Follow the naming, structure, and description conventions in the contributing guide.
3. Add a corresponding entry in the relevant `manifest.json`.
