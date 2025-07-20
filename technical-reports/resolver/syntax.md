# Syntax

A resolver MUST be in JSON format. It MUST be an object containing:

| Key             | Type         | Required | Description                                    |
| :-------------- | :----------- | :------: | :--------------------------------------------- |
| **name**        | `string`     |          | A human-readable name for this resolver.       |
| **description** | `string`     |          | A longer explanation describing this resolver. |
| **sets**        | `Set[]`      |    Y     | An array of [sets](#sets).                     |
| **modifiers**   | `Modifier[]` |    Y     | An array of [modifiers](#modifiers).           |

<aside class="example" title="Empty resolver">

```json
{
  "name": "My resolver",
  "description": "This is an example.",
  "sets": [],
  "modifiers": []
}
```

</aside>

## Name

The `name` key MAY provide a human-readable name for this resolver as a `string`.

## Description

The `description` key MAY provide an extended explanation, or notes relevant to this resolver as a `string`.

## Sets

<aside class="ednote" title="TODO">

The following items need clarification:

- `name` is unused in the current version, and is OPTIONAL. Is there any use in keeping it?
- Are the order in which sets declared meaningful? Or is the order arbitrary, only determined during Resolution?
- Are any `name`s not allowed? Can a set be named, e.g. `colors.json`?

</aside>

Sets describe tokens in a significant order. The order in which

The `sets` key MUST be an array of objects with the following properties:

| Key        | Type                              | Required | Description                                                                                            |
| :--------- | :-------------------------------- | :------: | :----------------------------------------------------------------------------------------------------- |
| **name**   | `string`                          |          | An identifier for the set. It may be omitted. If specified, it MUST be unique among other set `name`s. |
| **values** | [&lt;token-defs&gt;](#token-defs) |    Y     | The [&lt;token-defs&gt;](#token-defs) that are merged in the specified order.                          |

<aside class="example" title="2 sets">

```json
{
  "sets": [
    {
      "name": "foundation",
      "values": ["base/colors.json", "base/size.json", "base/typography.json"]
    },
    {
      "name": "components",
      "values": ["components/button.json", "components/card.json"]
    }
  ]
}
```

</aside>

<aside class="example" title="External files and inline tokens used in a set">

```json
{
  "sets": [
    {
      "values": [
        "colors.json",
        "size.json",
        {
          "color": {
            "base": {
              "blue": {
                "100": {
                  "$type": "color",
                  "$value": { "colorSpace": "srgb", "components": [0, 0, 0.9] }
                }
              }
            }
          }
        }
      ]
    }
  ]
}
```

</aside>

### Name

The `name` key of a set MAY provide a unique identifier for the set. Any declared `name`s MUST be unique among all sets.

### Values

<aside class="ednote" title="TODO">

The following items need clarification:

- Must strings be [valid URIs](https://www.rfc-editor.org/rfc/rfc3986)?
- Are sets allowed to include one another via their `name`s?

</aside>

The `values` key MUST be [&lt;token-defs&gt;](#token-defs).

## Modifiers

<aside class="ednote" title="TODO">

The following items need clarification:

- If a modifier loads a set by name, how can it be distinguished from a JSON file?
  - Are set `name`s allowed to end in `.json`?
- Is the order in which modifiers are declared significant, given that they must be orthogonal?
  - How are name conflicts detected?
  - Would a key–value mapping make more sense?
- Alternately, if modifiers don’t have to be orthogonal, why define the concept? Is that represented in the specification?
- Originally, default values were not part of the specification, and were to be handled by toolmakers. Is this still the case?

</aside>

The `modifiers` key MUST be an array of objects with the following properties:

| Key           |            Type             | Required | Description                                                                                                 |
| :------------ | :-------------------------: | :------: | :---------------------------------------------------------------------------------------------------------- |
| **name**      |          `string`           |    Y     | A unique identifier referring to this modifier.                                                             |
| **type**      | `"enumerated" \| "include"` |    Y     | The logic applied by the modifier. See [Type](#type) for definition.                                        |
| **values**    |                             |    Y     | See [Type](#type) for each corresponding shape.                                                             |
| **namespace** |          `string`           |          | An OPTIONAL prefix for all token names. It MUST follow [valid Token naming](../format/#aliases-references). |

### Name

The `name` key of a modifier MUST be unique among modifiers.

### Type

<aside class="ednote" title="TODO">

The following items need clarification:

- Previous versions referred to an `"alias"` type of modifier. Should that be defined?

</aside>

The `type` key of a modifier determines the type of modifier, and determines the syntax allowed in `value`.

#### Enumerated

<aside class="ednote" title="TODO">

The following items need clarification:

- Should `values` be an object of key–values instead?
- The keys `name` and `values` are duplicated and nested, and mean different things in different contexts. Could there be better, more unique keys to avoid confusion?

</aside>

An “enumerated” modifier outlines a key–value mapping of `string` values to [&lt;token-defs&gt;](#token-defs). It requires a `string` for [Input](#input). The `values` key MUST be an array of objects with the following properties:

| Key        | Type                              | Required | Description                                                                    |
| :--------- | :-------------------------------- | :------: | :----------------------------------------------------------------------------- |
| **name**   | `string`                          |    Y     | A unique name for this enumerated value.                                       |
| **values** | [&lt;token-defs&gt;](#token-defs) |    Y     | The [&lt;token-defs&gt;](#token-defs) that apply when this value is requested. |

<aside class="example" title="Color theme">

Given the `theme` modifier:

```json
{
  "modifiers": [
    {
      "name": "theme",
      "type": "enumerated",
      "values": [
        {
          "name": "light",
          "values": ["theme/light.json"]
        },
        {
          "name": "light-high-contrast",
          "values": ["theme/light-hc.json"]
        },
        {
          "name": "dark",
          "values": ["theme/dark.json"]
        },
        {
          "name": "dark-high-contrast",
          "values": ["theme/dark-hc.json"]
        }
      ]
    }
  ]
}
```

It enables the following [=input=]s:

- `{ "theme": "light" }` applies `["theme/light.json"]`
- `{ "theme": "light-high-contrast" }` applies `["theme/light-hc.json"]`
- `{ "theme": "dark" }` applies `["theme/dark.json"]`
- `{ "theme": "dark-high-contrast" }` applies `["theme/dark-hc.json"]`

</aside>

#### Include

<aside class="ednote" title="TODO">

The following items need clarification:

- It’s unclear what Input a `"include"` modifier needs. Is it a boolean?
- Is it necessary to nest `values` inside `values` here? Could a terser syntax be followed?

</aside>

An “include” modifier specifies conditional [&lt;token-defs&gt;](#token-defs). It requires a `boolean` for [Input](#input). The `values` key MUST be an array of objects with the following keys:

| Key        | Type                              | Required | Description                                                                     |
| :--------- | :-------------------------------- | :------: | :------------------------------------------------------------------------------ |
| **name**   | `string`                          |          | OPTIONAL name for this subset.                                                  |
| **values** | [&lt;token-defs&gt;](#token-defs) |    Y     | The [&lt;token-defs&gt;](#token-defs) that apply when this modifier is enabled. |

<aside class="example" title="Color theme">

Given the `reduced-motion` modifier:

```json
{
  "modifiers": [
    {
      "name": "reduced-motion",
      "type": "include",
      "values": [{ "value": ["a11y/reduced-motion.json"] }]
    }
  ]
}
```

It enables the following [=input=]s:

- `{ "reduced-motion": true }` includes `a11y/reduced-motion.json` in the final resolution.
- `{ "reduced-motion": false }` omits `a11y/reduced-motion.json` from the final resolution.

</aside>

### Namespace

<aside class="ednote" title="Changes">

The previous version had the syntax as `meta.alias`, which conflicts with the earlier definition of “meta is arbitrary metadata and follows no schema.” A metadata key can’t both be schemaless and follow a strict schema required by the format.

</aside>

A `namespace` MAY be provided that prefixes all tokens declared. Any type of modifier MAY declare a namespace. A namespace MUST be a valid period-delimited (`.`) token identifier:

<aside class="example" title="Namespaced modifier">

```json
{
  "modifiers": [
    {
      "name": "brand",
      "type": "enumerated",
      "values": [
        { "name": "brand1", "values": ["brand1.json"] },
        { "name": "brand2", "values": ["brand2.json"] }
      ],
      "namespace": "color.brand"
    }
  ]
}
```

Here, assuming `brand1.json` contained a token named `text.default`, it would then become `color.brand.text.default`. All other token names in that file MUST be prefixed the same way.

</aside>

<aside class="example" title="Valid and invalid namespaces">

- `theme.light`: **Valid**
- `brand1`: **Valid**
- `{size.large}`: ❌ **Invalid**. Names MUST NOT contain curly brackets `{` and `}`.

</aside>

## &lt;token-defs&gt;

An array consisting of:

- `string` which MUST be a [valid URI](https://www.rfc-editor.org/rfc/rfc3986) pointing to a valid Tokens JSON file, or
- Inline objects that MUST follow the JSON [format](../format/).

Any other inputs are invalid.

The array order is significant, where the files are merged in order. In case of a conflict, the last value in the array will overwrite any previous values.

<aside class="example" title="&lt;token-defs&gt; example">

```json
[
  "base/colors.json",
  "theme/light.json",
  {
    "color": {
      "base": {
        "blue": {
          "100": {
            "$type": "color",
            "$value": { "colorSpace": "srgb", "components": [0, 0, 0.9] }
          }
        }
      }
    }
  },
  "base/size.json",
  "base/typography.json"
]
```

</aside>

## Input

An external JSON object defined _outside_ the [=Resolver=], used to produce the final [Resolution](#resolution). An Input MUST be a JSON object whose keys are the `name`s of all [modifiers](#modifiers), and whose values MUST be one of:

- `string` for an [Enumerated modifier](#enumerated)
- `boolean` (true/false) for an [Include modifier](#include)

<aside class="example" title="Example Input">

Given the following Input, `"theme"` and `"size"` [Enumerated modifiers](#enumerated) were required, as well as a `"reduced-motion"` [Include modifier](#include).

```json
{
  "theme": "dark",
  "size": "large",
  "reduced-motion": false
}
```

</aside>

Inputs MUST NOT be defined within the resolver.

## Extensions

<aside class="ednote" title="Changes">

A previous version of the spec listed `meta` as the metadata key for use. But it was changed to `$extensions` for the following reasons:

1. Parity with the format module
2. Ease of definition. Before, `meta` was only allowed at specific levels (sets, modifiers) and not others (root level, modifier values). It’s repetitive redefining it on all the allowed levels. But with a `$`-prefixed key, we can unilaterally allow it anywhere without conflict.

</aside>

The OPTIONAL `$extensions` property is an object where tools MAY add proprietary, user-, team- or vendor-specific data as a key to any object. In a Resolver, it MAY be added to:

- The root level of the Resolver
- A [Set](#sets) object
- A [Modifier](#modifiers) object
- A modifier value object

This is identical to [$extensions](../format/#extensions) defined in the format.
