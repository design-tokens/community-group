# Syntax

## Resolver file

A resolver is a JSON object with the following properties:

| Name                            | Type                     | Required | Description                                               |
| :------------------------------ | :----------------------- | :------: | :-------------------------------------------------------- |
| [**name**](#name)               | `string`                 |          | A short, human-readable name for the resolver.            |
| [**description**](#description) | `string`                 |          | Additional information about the resolver’s purpose.      |
| [**sets**](#sets)               | [Set[]](#set)            |    Y     | Array of token subsets used as the base for resolution.   |
| [**modifiers**](#modifiers)     | [Modifier[]](#modifiers) |          | Array of modifiers that may provide [=alternate values=]. |

## Name

A resolver MAY provide a human-readable name. This is used to identify the resolver.

<aside class="example" title="name">

```json
{
  "name": "Marketing Design System"
}
```

</aside>

## Description

A resolver MAY provide additional information.

<aside class="example" title="name">

```json
{
  "name": "Marketing Design System",
  "description": "Last updated Summer 2025. Copyright Foo Corporation."
}
```

</aside>

## Sets

A resolver MUST provide an array of sets that combine to form the minimum set of design tokens. A set is an object with the following properties:

| Name       | Type                              | Required | Description                          |
| :--------- | :-------------------------------- | :------: | :----------------------------------- |
| **name**   | `string`                          |          | An optional identifier for this set. |
| **values** | [&lt;token-defs&gt;](#token-defs) |    Y     | The tokens that belong to this set.  |

<aside class="example" title="Sets">

```json
{
  "sets": [
    {
      "name": "color",
      "values": [
        "base/legacy.json"
        "base/foundation.json",
        "base/color-ramps.json",
        "base/semantic.json",
      ]
    },
    {
      "name": "typography",
      "values": [
        "base/scale.json",
        "base/web.json"
      ]
    },
    {
      "values": [
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
  ]
}
```

</aside>

<aside class="ednote" title="Proposal">

Some examples of the resolver spec used set names in the `modifiers` array to not only load sets by name, but also enforce a more granular order. But that syntax is missing. So

## Proposal A: add set name syntax

Adding an explicit way to reference a set that does NOT conflict with URLs, and does NOT conflict with the DTCG spec provides more functionality at no cost:

```json
{
  "sets": [{ "name": "color", "values": [] }],
  "modifiers": [
    {
      "name": "theme",
      "values": [{ "name": "light", "values": [{ "$set": "color" }] }]
    }
  ]
}
```

But the tradeoff here is likely **No sets load by default and MUST be loaded via include modifiers** (otherwise, we’d have to add an “exclude” modifier which complicates things further).

## Proposal B: simplify

Alternately, if we decide **all sets are always included, no matter what,** then we reduce `sets` to a [&lt;token-defs&gt;](#token-defs) array:

```json
{
  "sets": ["color.json", "typography.json"]
}
```

</aside>

## Modifiers

A resolver MAY provide an array of modifiers that extend, append, and/or override the final token values. A modifier is an object with the following properties:

| Name     | Type                        |                            Required                            | Description               |
| :------- | :-------------------------- | :------------------------------------------------------------: | :------------------------ |
| **name** | `string`                    |                               Y                                | The name of the modifier. |
| **type** | `"enumerated" \| "include"` | The type of modifier (default: [enumerated](#enumerated-type)) |                           |

### Enumerated type

An enumerated modifier adds the following additional properties:

| Name               | Type      | Required | Description                                                                |
| :----------------- | :-------- | :------: | :------------------------------------------------------------------------- |
| **values**         | `Input[]` |    Y     | The inputs required for this modifier.                                     |
| **meta**           | `Object`  |          | Additional data for this modifier                                          |
| **meta.default**   | `string`  |          | Declare the default value of the input, if none is provided.               |
| **meta.namespace** | `string`  |          | Namespace all tokens with a valid [token name](../format/#name-and-value). |

An enumerated modifier that allows users to omit an [input](#input) value MUST specify a default value.

<aside class="example" title="Enumerated modifier">

```json
{
  "modifiers": [
    {
      "name": "theme",
      "type": "enumerated",
      "values": [
        {
          "name": "light",
          "values": ["themes/light.json"]
        },
        {
          "name": "dark",
          "values": ["themes/dark.json"]
        }
      ],
      "meta": {
        "default": "light",
        "namespace": "theme"
      }
    }
  ]
}
```

For inputs, the following inputs will provide the following result:

- `{ "theme": "light": }` → `["themes/light.json"]`
- `{ "theme": "dark": }` → `["themes/dark.json"]`
- `{}` → `["themes/light.json"]` (default specified in `meta.default`)

</aside>

<aside class="ednote">

Proposal for modified syntax:

```json
{
  "modifiers": [
    {
      "name": "theme",
      "type": "enumerated",
      "inputs": {
        "light": { "values": ["themes/light.json"] },
        "dark": { "values": ["themes/dark.json"] }
      },
      "default": "light"
    }
  ]
}
```

- Removes structural problem where the schema can’t enforce `values`’ names are unique.
- Rename `values` → `inputs` to reduce contextual use of “value” having different syntax in 3+ places.
  - Also reinforces the name “inputs” which are referred to in other places
- `meta` key removed for conflicting purposes—in some parts of the original specification it was schemaless; in others it held crucial information like aliasing & defaults
- Move `meta.default` → `default` and `meta.namespace` → `namespace`

</aside>

### Include type

An include modifier adds the following additional properties:

| Name       | Type      | Required | Description                            |
| :--------- | :-------- | :------: | :------------------------------------- |
| **values** | `Input[]` |    Y     | The inputs required for this modifier. |
| **meta**   | `Object`  |          | Additional data for this modifier      |

This type of modifier is used to conditionally include a set of tokens. The `values` array for an include modifier contains objects with a `name` and a corresponding list of `values` (file paths or inline tokens) that will be included if that name is present in the input.

<aside class="example" title="Include modifier">

```json
{
  "modifiers": [
    {
      "name": "features",
      "type": "include",
      "values": [
        {
          "name": "experimental-feature-x",
          "values": ["features/feature-x.json"]
        }
      ]
    }
  ]
}
```

</aside>

<aside class="ednote">

The input syntax for include is ambiguous. The language “will be included if that name is present in the input” suggests that multiple values may be provided. But what is the proper syntax?

- `{ "features": "foo,bar,baz" }`
- `{ "features": ["foo", "bar", "baz"] }`

</aside>

### Inputs

An [=input=] is a mapping of modifier names to modifier values declared in any resolver. Inputs are not part of the resolver file itself, rather, provided to the tool alongside the resolver. A resolver that declares any modifiers MUST be consumed with an input as options.

An input SHOULD be serializable to a JSON object. Meaning, an input MAY be expressed in any programming language, but that expression should be easily converted back into a JSON object. Related concepts would include an [object in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or a [dictionary in Python](https://docs.python.org/3/tutorial/datastructures.html#dictionaries).

Tools that load a resolver that declares modifiers SHOULD throw an error if an accompanying input is not provided.

<aside class="example" title="Inputs">

Given the following modifiers:

```json
{
  "modifiers": [
    {
      "name": "theme",
      "type": "enumerated",
      "values": [
        { "name": "light", "values": ["light.json"] },
        { "name": "dark", "values": ["dark.json"] }
      ]
    },
    {
      "name": "size",
      "type": "enumerated",
      "values": [
        { "name": "default", "values": ["size-default.json"] },
        { "name": "large", "values": ["size-large.json"] }
      ]
    },
    {
      "name": "beta",
      "type": "include",
      "values": [{ "name": "enabled", "values": ["beta.json"] }]
    }
  ]
}
```

A **valid** input would follow the schema: all keys correspond to the `name` of each modifier. The values are valid options as designated by the modifier.

```json
{
  "theme": "light",
  "size": "large",
  "beta": "enabled"
}
```

An **invalid** input would either add unspecified keys that don’t correspond to any modifier, and/or provide values that aren’t declared valid by any modifier type.

```json
{
  "theme": "blue",
  "foo": "bar"
}
```

</aside>

<aside class="example" title="Tool consuming input">

Using an imaginary tool written in JavaScript, we would consume [the previous example](#example-inputs) like so:

```js
import tokenTool from './token-tool.js';

tokenTool.loadResolver(
  /* Path to resolver */
  './resolver.json',

  /* Input */
  {
    theme: 'dark',
    size: 'default',
  },
);
```

This imaginary tool has a `loadResolver()` method that takes as its parameters:

1. A filepath to the resolver in the first position, and
2. The input object in its 2nd position.

The tool then combines the resolver + inputs to produce its final [=resolution=].

</aside>

### Namespacing

Namespacing allows for automatic prefixing of token names

<aside class="issue">

**Auto-namespacing Concerns:** The automatic application of namespacing for modifiers introduces significant complexity and potential issues:

- Requires pre-resolution conflict checking across all sets and modifiers
- Modifier JSON must be complete sets to avoid undefined token references
- Risk of infinite loops if modifiers reference tokens in other modifier namespaces
- Backwards compatibility issues requiring extensive token renames in existing design systems

**Alternative Approach:** Consider removing auto-namespacing for modifiers and using shared merging logic between sets and modifiers for better compatibility and simplicity.

</aside>

**Example:**

<aside class="example">

Given a tokens `size.json`:</p>

```json
{
  "sm": {
    "$value": { "value": 1, "unit": "px" },
    "$type": "dimension"
  },
  "lg": {
    "$value": { "$value": 10, "unit": "px" },
    "$type": "dimension"
  }
}
```

By applying an alias in the modifier's meta.alias, we can namespace these tokens:

```json
{
  "modifiers": [
    {
      "name": "size",
      "type": "include",
      "values": [
        {
          "name": "default",
          "values": ["size.json"]
        }
      ],
      "meta": {
        "namespace": "spacing"
      }
    }
  ]
}
```

Resulting in the final token names `spacing.sm` and `spacing.lg`.

</aside>

<aside class="issue">

If the `meta.namespace` behavior described above is normative/required behavior, it should not be part of the generic `meta` property but should be defined as part of the formal schema. Alternatively, if this is just an example of tooling-specific behavior, it should be clearly called out as such and not presented as part of the core specification.

</aside>

## &lt;token-defs&gt;

An array consisting of:

- `string` which MUST be a valid URI pointing to a valid Tokens JSON file, or
- Inline objects that MUST follow valid [format](../format/).

Any other inputs are invalid.

The array order is significant, where tokens with the same name overwrite previous instances of that token, if any.

<aside class="example" title="&lt;token-defs&gt;">

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
            "$value": {
              "colorSpace": "srgb",
              "components": [0, 0, 0.9]
            }
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

## $extensions

An `$extensions` object MAY be added to any [set](#set), [modifier](#modifier), or object in this spec to declare arbitrary metadata ignored by tooling. Its purpose in a resolver is the same as [in the format](../format/#extensions).
