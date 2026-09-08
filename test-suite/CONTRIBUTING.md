# Contributing Test Fixtures

This guide covers the style and structure rules for test fixtures in the `@dtcg/test-suite` package. All fixtures must follow these rules to keep the suite consistent and easy to navigate.

## `$schema`

Every fixture **must** include a `$schema` property as the first key, set to the canonical schema URL for the specification it belongs to. This is the same URL used as the `schemaId` in the corresponding manifest file.

## `$description`

Every fixture **must** include a root-level `$description` (or `description` for resolver fixtures) with a prefix indicating the test type:

- **PositiveEvaluationTest:** Prefix with `POSITIVE:` followed by a short, factual statement of what the fixture demonstrates.

  ```
  "POSITIVE: sRGB color with alpha transparency"
  ```

- **NegativeEvaluationTest:** Prefix with `NEGATIVE:` followed by a concise statement of the violation.

  ```
  "NEGATIVE: Alpha value exceeds maximum of 1"
  ```

Keep descriptions to a single sentence. Don't repeat constraint ranges unless they are non-obvious.

## Token and group naming

### Positive fixtures

Use the **token type name** as the root key, not a semantic name:

| ✅ Do           | ❌ Don't                          |
| --------------- | --------------------------------- |
| `"color"`       | `"brand-primary"`, `"text-color"` |
| `"dimension"`   | `"spacing"`, `"size"`             |
| `"number"`      | `"lineHeight"`, `"value"`         |
| `"fontFamily"`  | `"font"`, `"typeface"`            |
| `"fontWeight"`  | `"weight"`, `"boldness"`          |
| `"cubicBezier"` | `"easing"`, `"curve"`             |
| `"duration"`    | `"timing"`, `"speed"`             |
| `"border"`      | `"outline"`, `"divider"`          |
| `"shadow"`      | `"elevation"`, `"drop"`           |
| `"gradient"`    | `"background"`, `"fill"`          |
| `"strokeStyle"` | `"stroke"`, `"line"`              |
| `"transition"`  | `"animation"`, `"motion"`         |
| `"typography"`  | `"type"`, `"heading"`             |

When a fixture contains **multiple tokens of the same type**, use the pluralized type name as a wrapper group (e.g., `"dimensions"`, `"fontWeights"`).

**Exception:** Reference, group, and metadata tests that inherently need multiple groups or specific names for the test scenario to work may use descriptive names (e.g., `"colors"` and `"semantic"` in a reference test, or `"base-button"` and `"primary-button"` in an `$extends` test).

### Negative fixtures

Use `"invalid-{type}"` as the root key for the token or group that contains the violation:

```
"invalid-color", "invalid-dimension", "invalid-border", etc.
```

**Exceptions:** use a different name only when the name itself is part of what's being tested:

- Self-reference tests (the token name must match the reference target)
- Token-name violation tests (the invalid name is the point of the test)
- Circular reference tests (multiple tokens need distinct, descriptive names)

## One concern per fixture

Each fixture should test **exactly one thing**. Don't combine multiple edge cases or unrelated features in a single file. The manifest `id`, `name`, and `purpose` should all clearly reflect that single concern.

## Minimal fixtures

Keep fixtures as small as possible so the reader can instantly see what is being tested.

- Don't include optional properties unless they are the subject of the test. For example, don't add `"hex"` to a color unless the test is specifically about the `"hex"` property.
- Don't add `$description`, `$deprecated`, or `$extensions` to inner tokens unless they are the subject of the test.

### Standard filler values

When a fixture needs valid sub-values just to satisfy a composite type's requirements, use these consistent minimal values:

| Type         | Filler value                                      |
| ------------ | ------------------------------------------------- |
| Color        | `{"colorSpace": "srgb", "components": [0, 0, 0]}` |
| Dimension    | `{"value": 0, "unit": "px"}`                      |
| Duration     | `{"value": 0, "unit": "ms"}`                      |
| Number       | `0`                                               |
| Font family  | `"sans-serif"`                                    |
| Font weight  | `400`                                             |
| Cubic Bézier | `[0, 0, 1, 1]`                                    |
| Stroke style | `"solid"`                                         |

This makes the interesting part of the fixture, the thing actually being tested, stand out immediately.

## File naming

- **Positive fixtures:** `{what}.json` within the type folder (e.g., `positive/colors/srgb-basic.json`)
- **Negative fixtures:** `{type}-{what}.json` within the type folder (e.g., `negative/colors/color-alpha-out-of-range.json`)

## Manifest entry

Every fixture must have a corresponding entry in the relevant `manifest.json`. See the [test-suite README](./README.md) for the manifest structure, property table, and full list of allowed feature values.

### `id`

Use kebab-case. Start with the primary feature category, then describe the specific concern:

```
"color-srgb-basic"
"border-missing-color"
"reference-json-pointer-to-group"
"group-extends-nested-override"
```

For negative reference tests involving a sub-feature (JSON Pointer, composite), prefix with `reference-` and include the sub-feature:

```
"reference-json-pointer-trailing-slash"
"reference-composite-ref-wrong-subvalue-type"
```

IDs must be unique within a manifest.

### `type`

Must match the fixture location: `"PositiveEvaluationTest"` for fixtures in `positive/`, `"NegativeEvaluationTest"` for fixtures in `negative/`.

### `name`

A short, human-readable title. Don't repeat the word "test" or "token"; the context is clear from the manifest.

| ✅ Do                             | ❌ Don't                                         |
| --------------------------------- | ------------------------------------------------ |
| `"HSL color with 'none' keyword"` | `"Test for HSL color token with none keyword"`   |
| `"Border missing color property"` | `"NegativeEvaluationTest: border missing color"` |

### `purpose`

Start with `"Verifies that …"` and explain the specific behavior being asserted. One sentence.

```
"Verifies that HSL hue must be in range [0, 360), not including 360"
"Verifies that tokens can reference other tokens using curly brace syntax {token.path}"
```

### `features`

The features array tells implementors which spec capabilities a test exercises. It is also used by the test runner: tests tagged `preprocessing-required` are skipped during schema-only validation because they require reference resolution, type inheritance, or similar processing that a JSON Schema validator cannot perform.

#### Deciding which features to include

**1. Always include the primary token type** being tested.

A color test gets `"color"`, a border test gets `"border"`, etc. For negative metadata or group tests that happen to use a color token as a vehicle, the primary feature is the cross-cutting concern (`"metadata"`, `"groups"`), not the token type.

**2. Include the color space** for color fixtures.

```json
"features": ["color", "oklch"]
```

**3. Add `"composite"`** when the test exercises a type that has sub-values (border, shadow, gradient, transition, typography, or the object form of strokeStyle). Don't add it for simple types that merely appear as fillers inside a composite.

```json
"features": ["shadow", "composite"]
```

**4. Tag cross-cutting concerns** when they are the point of the test.

| Feature              | When to use                                                               |
| -------------------- | ------------------------------------------------------------------------- |
| `"references"`       | Any test about `{curly.brace}` aliases or `$ref` with JSON Pointer        |
| `"json-pointer"`     | Specifically exercises `$ref` / `#/pointer` syntax (subset of references) |
| `"groups"`           | Group nesting, empty groups, root-level tokens                            |
| `"type-inheritance"` | Tokens inheriting `$type` from a parent group                             |
| `"extends"`          | `$extends` between groups                                                 |
| `"metadata"`         | `$description`, `$deprecated`, `$extensions`, or unknown-property tests   |
| `"token-name"`       | Token naming rule violations                                              |

**5. Add `"preprocessing-required"`** when the test **cannot** be validated by a JSON Schema alone.

This includes:

- Reference resolution (curly-brace aliases, chained references, circular references)
- Type inheritance from parent groups
- `$extends` processing
- Circular-reference detection in resolver sets/modifiers
- Duplicate-name checking in resolver resolution orders

If you're unsure, ask: _"Could a tool validate this test correctly using only the JSON Schema, without resolving references or processing inheritance?"_ If the answer is no, add the flag.

**6. Only tag features that are actively exercised**, not features present as filler.

A shadow-missing-color test has dimension fillers, but `"dimension"` should not be in its features because the test is about the missing color, not about dimensions:

```json
{
  "id": "shadow-missing-color",
  "features": ["shadow", "composite"]
}
```

#### Resolver features

Resolver tests follow the same principles. Use `"sets"`, `"modifiers"`, `"contexts"`, `"resolution-order"`, `"inline"`, `"reference"`, and `"metadata"` as appropriate. See the [README](./README.md#resolver-tests) for the full allowed list.
