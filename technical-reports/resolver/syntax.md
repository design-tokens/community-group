# Syntax

## Root level properties

A resolver document contains the following properties at the root level:

| Name                            | Type                   | Required | Description                                     |
| :------------------------------ | :--------------------- | :------: | :---------------------------------------------- |
| [**name**](#name)               | `string`               |          | A short, human-readable name for the document.  |
| [**version**](#version)         | `YYYY-MM-DD`           |    Y     | Version. Must be `2025-10-01`.                  |
| [**description**](#description) | `string`               |          | A human-readable description for this document. |
| [**sets**](#sets)               | Map[`string`, Set]     |          | Definition of sets.                             |
| [**modifiers**](#modifiers)     | Map[`string, Modifier] |          | Definition of modifiers.                        |
| [**composition**](#composition) | `ReferenceObject[]`    |    Y     | Resolution of sets and modifiers.               |

### Name

The document MAY provide a human-readable `name` at the root level. This is helpful to distinguish one resolver document from another, in case the filename itself isn’t enough.

### Version

The document MUST provide a version at the root level, and it MUST be `2025-11-01`. This is reserved for future versions in case breaking changes are introduced.

### Description

The document MAY provide a `description` at the root level. This may be used to add additional explanation or context not present in [name](#name).

### Sets

A set is a collection of design tokens in [DTCG format](../format/). A set MUST contain a `sources` array with tokens declared directly, or a [reference object](#reference-objects) pointing to a JSON file containing design tokens, or any combination of the two.

A set MAY include a `description` describing the purpose of the set.

If the array declares multiple sources, they will be merged in array order, meaning if a token is declared multiple times, the last occurrence in the array will be the final value. Tools MUST respect array ordering.

<aside class="example" title="Sets comprising remote files and inline tokens">

```json
{
  "sets": {
    "color": {
      "description": "Color tokens",
      "sources": [
        { "$ref": "base/legacy.json" },
        { "$ref": "base/foundation.json" },
        { "$ref": "base/color-ramps.json" },
        { "$ref": "base/semantic.json" }
      ]
    },
    "size": {
      "description": "Dimension, margin, and spacing tokens",
      "sources": [
        {
          "space": {
            "base": {
              "100": {
                "$type": "dimension",
                "$value": { "value": 2, "unit": "rem" }
              }
            }
          }
        }
      ]
    }
  }
}
```

</aside>

### Modifiers

A modifier is similar to a [set](#sets), but allows for conditional inclusion via the [contexts](#contexts) map.

#### Contexts

A modifier MUST declare a `contexts` map of a `string` value to an array of token sources. The array of tokens sources MUST be a [ReferenceObject](#reference-objects), inline tokens, or any combination of the two.

A modifier SHOULD have two or more `contexts`, since one is the equivalent of a [set](#sets). A modifier MUST NOT have an empty `contexts` map. Tools SHOULD throw an error for modifiers with only 1 context. Tools MUST throw an error for modifiers with 0 contexts.

Like [sets](#sets), array order MUST be respected such that in case of conflict, the last occurrence of a token in the array produces the final value.

A modifier MAY reference a [set](#sets) inside a context value. However a modifier MUST NOT reference any other modifier, not even another context inside the same modifier.

<aside class="example" title="Color theme modifier">

```json
{
  "modifiers": {
    "theme": {
      "description": "Color theme",
      "contexts": {
        "light": [{ "$ref": "theme/light.json" }],
        "lightHighContrast": [
          { "$ref": "theme/light.json" },
          { "$ref": "theme/dark-high-contrast.json" }
        ],
        "dark": [{ "$ref": "theme/dark.json" }],
        "darkHighContrast": [
          { "$ref": "theme/dark.json" },
          { "$ref": "theme/dark-high-contrast.json" }
        ]
      },
      "default": "light"
    }
  }
}
```

</aside>

<aside class="example" title="Modifier referencing a set">

A modifier MAY reference a [set](#sets) inside a context value. This is equivalent to the `sources` being inlined in the same array. For example, the following:

```json
{
  "sets": {
    "baseSize": {
      "sources": [{ "$ref": "size/base.json" }]
    }
  },
  "modifiers": {
    "size": {
      "description": "Application size",
      "contexts": {
        "small": [
          { "$ref": "#/sets/baseSize" },
          { "$ref": "device/mobile.json" },
          { "$ref": "typography/mobile.json" }
        ],
        "medium": [
          { "$ref": "#/sets/baseSize" },
          { "$ref": "device/tablet.json" },
          { "$ref": "typography/base.json" }
        ],
        "large": [
          { "$ref": "#/sets/baseSize" },
          { "$ref": "device/desktop.json" },
          { "$ref": "typography/base.json" }
        ]
      }
    }
  }
}
```

Is equivalent to:

```json
{
  "sets": {
    "baseSize": {
      // …
    }
  },
  "modifiers": {
    "size": {
      "description": "Application size",
      "contexts": {
        "small": [
          { "$ref": "size/base.json" },
          { "$ref": "device/mobile.json" },
          { "$ref": "typography/mobile.json" }
        ],
        "medium": [
          { "$ref": "size/base.json" },
          { "$ref": "device/tablet.json" },
          { "$ref": "typography/base.json" }
        ],
        "large": [
          { "$ref": "size/base.json" },
          { "$ref": "device/desktop.json" },
          { "$ref": "typography/base.json" }
        ]
      }
    }
  }
}
```

</aside>

#### Description

A modifier MAY declare a human-readable `description`.

#### Default

A modifier MAY declare a `default` value that MUST match one of the keys in `contexts`. Tools MUST throw an error if the value is not present in `contexts`.

#### Resolution count

The number of possible [=resolutions=] a document may generate may be predicted with the product of all `contexts` across all modifiers.

<aside class="example" title="Calculating resolutions">

- If a document had 2 modifiers that each had 2 `contexts`, that resolver may produce 4 resolutions, or 2 × 2.
- If a document had 3 modifiers with 4, 3, and 2 `contexts` respectively, that resolver may produce 24 resolutions, or 4 × 3 × 2.

</aside>

### Composition

The `composition` key is an array of [sets](#sets) and [modifiers](#modifiers) ordered to produce the final result of tokens. The order is significant, with tokens later in the array overriding any tokens that came before them, in case of conflict.

<aside class="example" title="Composing sets and modifiers together">

Given a `composition` that consists of multiple sets and modifiers:

```json
{
  "sets": {
    "size": {
      "sources": [{ "$ref": "foundation/size.json" }]
    },
    "typography": {
      "sources": [{ "$ref": "foundation/typography.json" }]
    },
    "animation": {
      "sources": [{ "$ref": "foundation/animation.json" }]
    }
  },
  "modifiers": {
    "theme": {
      "description": "Color theme",
      "contexts": {
        "light": [{ "$ref": "theme/light.json" }],
        "lightHighContrast": [
          { "$ref": "theme/light.json" },
          { "$ref": "theme/dark-high-contrast.json" }
        ],
        "dark": [{ "$ref": "theme/dark.json" }],
        "darkHighContrast": [
          { "$ref": "theme/dark.json" },
          { "$ref": "theme/dark-high-contrast.json" }
        ]
      },
      "default": "light"
    }
  },
  "composition": [
    { "$ref": "#/sets/size" },
    { "$ref": "#/sets/typography" },
    { "$ref": "#/sets/animation" },
    { "$ref": "#/modifiers/theme" }
  ]
}
```

This merely describes multiple final results of tokens. We’ll need an [input](#inputs) to produce the final sets.

Given the following inputs, we would get the following resolution order:

<table><thead><tr><th>Input</th><th>Result</th></tr></thead><tbody><tr><th>

```json
{ "theme": "light" }
```

</th><td>

1. `foundation/size.json`
1. `foundation/typography.json`
1. `foundation/animation.json`
1. `theme/light.json`

</td></tr><tr><th>

```json
{ "theme": "lightHighContrast" }
```

</th><td>

1. `foundation/size.json`
1. `foundation/typography.json`
1. `foundation/animation.json`
1. `theme/light.json`
1. `theme/light-high-contrast.json`

</td><tr><th>

```json
{ "theme": "dark" }
```

</th><td>

1. `foundation/size.json`
1. `foundation/typography.json`
1. `foundation/animation.json`
1. `theme/dark.json`

</td></tr><tr><th>

```json
{ "theme": "darkHighContrast" }
```

</th><td>

1. `foundation/size.json`
1. `foundation/typography.json`
1. `foundation/animation.json`
1. `theme/dark.json`
1. `theme/dark-high-contrast.json`

</td></tr></tr></tbody></table>

In case of any conflict, the last occurrence of a design token produces the final value.

</aside>

<aside class="example" title="Empty array in modifiers">

Modifiers MAY contain empty context arrays:

```json
{
  "modifiers": {
    // …
    "debug": {
      "description": "Enable debug mode",
      "contexts": {
        "false": [],
        "true": [{ "$ref": "debug.json" }]
      }
    }
  },
  "composition": [
    // …
    { "$ref": "#/modifiers/debug" }
  ]
}
```

This would then load an additional `debug.json` file if it received a `{ "debug": "true" }` [input](#inputs).

</aside>

#### Inline sets and modifiers

In `composition`, a [set](#sets) or [modifier](#modifiers) MAY be declared inline, so long as `name` and `type` keys are added to the object:

| Property | Type                  | Required | Description                                                                   |
| :------- | :-------------------- | :------: | :---------------------------------------------------------------------------- |
| **name** | `string`              |    Y     | A unique name that MUST NOT conflict with any other `name` in `compositions`. |
| **type** | `"set" \| "modifier"` |    Y     | MUST be `"set"` or `"modifier"` according to the type.                        |

Tools MUST throw an error in the case where `name` or `type` are missing from an inline object, or if `name` is duplicated among any objects.

<aside class="ednote" title="Name">

When sets and modifiers appear in their respective root level `sets` and `modifiers` keys, it is valid for a set to share a name with a modifier. It is only invalid to duplicate a `name` inside the `composition` array.

</aside>

<aside class="example" title="Composition with inline sets and modifiers">

```json
{
  "composition": [
    {
      "type": "set",
      "name": "Size",
      "sources": [{ "$ref": "foundation/size.json" }]
    },
    {
      "type": "set",
      "name": "Typography",
      "sources": [{ "$ref": "foundation/typography.json" }]
    },
    {
      "type": "set",
      "name": "Animation",
      "sources": [{ "$ref": "#/sets/Animation" }]
    },
    {
      "type": "modifier",
      "name": "Theme",
      "description": "Color theme",
      "contexts": {
        "light": [{ "$ref": "theme/light.json" }],
        "lightHighContrast": [
          { "$ref": "theme/light.json" },
          { "$ref": "theme/dark-high-contrast.json" }
        ],
        "dark": [{ "$ref": "theme/dark.json" }],
        "darkHighContrast": [
          { "$ref": "theme/dark.json" },
          { "$ref": "theme/dark-high-contrast.json" }
        ]
      },
      "default": "light"
    }
  ]
}
```

</aside>

Inline sets and modifiers MUST NOT be referenced in any way. Tools SHOULD throw an error when a [reference object](#reference-objects) points to a composition item.

<aside class="example" title="Invalid inline set reference">

The following [reference object](#reference-objects) pointer is invalid regardless of where it appears:

```json
{ "$ref": "#/composition/4" }
```

This is very likely to create an invalid reference, no matter if it appears in [sets](#sets) (circular dependency), [modifiers](#modifiers) (circular dependency), or in another place in the [composition](#composition) array (infinite recursion). The times where this would not cause an invalid reference are rare, and the slightest change may turn it into a circular reference.

</aside>

<section class="informative">

#### Ordering of sets and modifiers

The `composition` array allows for any ordering of sets and modifiers to the user’s choosing. However, in the scenario that many sets must appear after the modifiers to resolve conflicts, it is likely a [smell](https://en.wikipedia.org/wiki/Code_smell) of unpredictable and brittle token organization. Ideally, modifiers handle conditional values so well they require few or no overrides (see [orthogonality](#orthogonal-orthogonality)). In practical terms, this means that

</section>

## Reference objects

When referring to another JSON document or a structure within the same document, a reference object MUST be used. This is described in [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core#ref) as an object with a key of `$ref` whose string is a valid JSON pointer as described in [[RFC6901]].

Tools MUST resolve all reference objects in a resolver document.

Reference objects MUST NOT be circular, neither referencing other pointers that reference itself, nor referencing any parent node of the reference object.

<aside class="example" title="Valid reference objects">

Common examples of reference objects include:

<table><thead><tr><th>Code</th><th>Result</th></tr></thead><tbody><tr><th>

```json
{ "$ref": "#/sets/MySet" }
```

</th><td>

References `sets/MySet` within the same document.

</td></tr><tr><th>

```json
{ "$ref": "path/to/example.json" }
```

</th><td>

References the entire contents of `./path/to/example.json`, relative to this document.

</td></tr><tr><th>

```json
{ "$ref": "example.json#sets/MySet" }
```

</th><td>

References only a part of `example.json`: `sets/MySet`.

</td></tr><tr><th>

```json
{ "$ref": "https://my-server.com/tokens.json" }
```

</th><td>

References a remote file hosted at a publicly-available URL.

</td></tr></tbody></table>

</aside>

<aside class="example" title="Invalid reference objects">

```json
{
  "foo": {
    "bar": { "$ref": "#/baz/bat" }
  },
  "baz": {
    "bat": { "$ref": "#/foo/bar" }
  }
}
```

This example is invalid because both `foo/bar` and `baz/bat` reference one another and therefore have no final value.

```json
{
  "foo": {
    "bar": {
      "baz": { "$ref": "#/foo/bar" }
    }
  }
}
```

A single reference object that references its parent is invalid because it will include itself and infinitely recurse.

</aside>

### Invalid pointers

A pointer MAY point anywhere within the same document, with the exception of the following:

1. Only [composition](#composition) may reference a modifier (`#/modifiers/…`). Sets and modifiers MUST NOT reference another modifier.
   - Referencing a modifier from a set could cause [inputs](#inputs) to apply conditional logic to a structure that can’t support it, therefore it’s not allowed.
   - Referencing a modifier from another modifier would mean a single input applies to unexpected modifiers, therefore it’s not allowed.
1. A reference object MUST NOT point to anything in the [composition](#composition) array (`#/composition/…`). Composition, by its nature, references many other parts of the document. Duplicating any part of composition will produce complex, hard-to-predict chains.

Tools MUST throw an error if encountering any invalid pointers.

### Extending

As [JSON Schema 2020-12](https://json-schema.org/draft/2020-12/json-schema-core#ref) allows, other keys MAY exist on a reference object alongside `$ref`. In these scenarios, the local keys alongside `$ref` MUST be treated as overrides.

<aside class="example" title="Extending with $ref">

As a generic example:

```json
{
  "animal": {
    "color": "brown",
    "legs": 4
  },
  "lizard": {
    "color": "green",
    "$ref": "#/animal",
    "size": "small"
  }
}
```

The final value of `#/lizard` will be equivalent to:

```json
{
  "color": "green",
  "legs": 4,
  "size": "small"
}
```

Key order does not matter. Since `color` is declared locally, it will replace the value in `#/animal`. Also adding the new property of `size` will append to the final value.

</aside>

If a key alongside `$ref` declares an object or array, tools MUST flatten these shallowly, meaning objects and arrays are not merged.

## $extensions

An `$extensions` object MAY be added to any [set](#sets), [modifier](#modifiers), or [inline set/modifier](#inline-sets-and-modifiers), to declare arbitrary metadata that is up to individual tools to either use or ignore.

If provided, `$extensions` MUST be an object with the keys being vendor-specific namespaces. This allows multiple tools to use this metadata without conflict.

<aside class="example" title="Set with $extensions">

Here is an example where a set contains arbitrary metadata for the `figma.com` vendor:

```json
{
  "sets": {
    "color": {
      "sources": [
        { "$ref": "colors/ramps.json" },
        { "$ref": "colors/semantic.json" }
      ],
      "$extensions": {
        "figma.com": {
          "sourceFile": "https://figma.com/file/xxxxxx",
          "updatedAt": "2025-11-01"
        }
      }
    }
  }
}
```

</aside>

## $defs

Tools MAY allow defining structures in JSON Schema [$defs](https://json-schema.org/understanding-json-schema/structuring#defs) but is not a requirement, and ultimately is up to the tool to decide.

<aside class="ednote" title="$defs">

Using `$defs` is undefined behavior as far as this specification is concerned, so it is up to users and toolmakers to either define a usage or avoid entirely. The specification intentionally avoids using `$defs` so there will be no chance of future conflict.

</aside>
