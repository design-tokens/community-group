# Syntax

## Resolver file

A resolver is a JSON object with the following properties:

| Name                            | Type                | Required | Description                                          |
| :------------------------------ | :------------------ | :------: | :--------------------------------------------------- |
| [**name**](#name)               | `string`            |          | A short, human-readable name for the resolver.       |
| [**version**](#version)         | `YYYY-MM-DD`        |    Y     | Version, expressed as a ISO 8601 date.               |
| [**description**](#description) | `string`            |          | Additional information about the resolver’s purpose. |
| [**tokens**](#tokens)           | (Set \| Modifier)[] |    Y     | Resolution order of tokens.                          |

Users SHOULD name resolver files with a `.resolver.json` syntax.

## Name

A resolver MAY provide a human-readable name. This is used to identify the resolver.

<aside class="example" title="name">

```json
{
  "name": "Marketing Design System"
}
```

</aside>

## Version

MUST be `2025-10-01`. Reserved for future versions in case breaking changes are introduced.

```json
{
  "name": "Marketing Design System",
  "version": "2025-10-01"
}
```

## Description

A resolver MAY provide additional information.

<aside class="example" title="name">

```json
{
  "name": "Marketing Design System",
  "version": "2025-10-01",
  "description": "Last updated Summer 2025. Copyright Foo Corporation."
}
```

</aside>

## Tokens

The tokens key is an array that may contain any combination of [sets](#set) and [modifiers](#modifier). The order is significant, with tokens later in the array overriding any tokens that came before them, in case of conflict.

<aside class="example" title="Tokens order">

[Sets](#set) and [modifiers](#modifier) MAY be declared in any order. However, it should be noted that the order will affect the final result, as explained in [resolution logic](#resolution-logic). The following tokens could be different:

- Set 1, Modifier A, Modifier B, Set 2
- Set 1, Set 2, Modifier A, Modifier B

It all depends on whether or not there are [conflicts](#conflict-resolution-flattening) in the token names.

</aside>

### Set

| Name        | Type                              | Required | Description                                |
| :---------- | :-------------------------------- | :------: | :----------------------------------------- |
| **type**    | `"set"`                           |    Y     | MUST be `"set"`.                           |
| **name**    | `string`                          |          | Optional human-readable name for this set. |
| **sources** | [&lt;token-defs&gt;](#token-defs) |    Y     | The tokens that belong to this set.        |

<aside class="example" title="Sets">

```json
{
  "tokens": [
    {
      "type": "set",
      "sources": [
        "base/legacy.json",
        "base/foundation.json",
        "base/color-ramps.json",
        "base/semantic.json"
      ]
    },
    {
      "type": "set",
      "name": "typography",
      "sources": ["base/scale.json", "base/web.json"]
    },
    {
      "type": "set",
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
  ]
}
```

</aside>

#### Shortened syntax

File strings from `sources` MAY be hoisted into the top-level [tokens](#tokens) array as a simpler syntax.

Inline tokens (objects) MUST NOT ever be declared in [tokens](#tokens). An object inside [tokens](#tokens) MUST be either a [set](#set) or [modifier](#modifier).

<aside class="example" title="Shortened syntax">

All of the following are equivalent, and will result in the exact same final tokens because the order is preserved. The grouping is at the user’s discretion, and is only used for the purposes of organization.

```json
{
  "tokens": [
    "base/legacy.json",
    "base/foundation.json",
    "base/color-ramps.json",
    "base/semantic.json"
  ]
}
```

```json
{
  "tokens": [
    {
      "type": "set",
      "sources": [
        "base/legacy.json",
        "base/foundation.json",
        "base/color-ramps.json",
        "base/semantic.json"
      ]
    }
  ]
}
```

```json
{
  "tokens": [
    { "type": "set", "sources": ["base/legacy.json"] },
    { "type": "set", "sources": ["base/foundation.json"] },
    { "type": "set", "sources": ["base/color-ramps.json"] },
    { "type": "set", "sources": ["base/semantic.json"] }
  ]
}
```

</aside>

### Modifier

A modifier can be thought of as a “conditional set,” where its contents depends on an external [input](#input). T

| Name        | Type                                | Required | Description                                                                                     |
| :---------- | :---------------------------------- | :------: | :---------------------------------------------------------------------------------------------- |
| **type**    | `"modifier"`                        |    Y     | This MUST be `"modifier"`.                                                                      |
| **name**    | `string`                            |    Y     | The name of the modifier. This MUST be unique among other modifiers in the same file.           |
| **context** | `Record<string, &lt;token-set&gt;>` |    Y     | A key–value map of [contexts](#contexts) to [&lt;token-defs&gt;](#token-defs).                  |
| **default** | `string`                            |          | Optional default value. MAY be provided in case the [input](#input) doesn’t require this value. |

Tools MUST throw an error if 2 modifiers with the same name are declared in [tokens](#tokens).

<aside class="example" title="Modifier">

```json
{
  "tokens": [
    {
      "type": "modifier",
      "name": "theme",
      "context": {
        "light": ["themes/light.json"],
        "dark": ["themes/dark.json"]
      },
      "default": "light"
    }
  ]
}
```

For inputs, the following inputs will provide the following result:

- `{ "theme": "light": }` → `["themes/light.json"]`
- `{ "theme": "dark": }` → `["themes/dark.json"]`
- `{}` → `["themes/light.json"]` (default specified in `default`)

</aside>

## Inputs

An [=input=] is a mapping of modifier names to modifier values declared in any resolver. Inputs are not part of the resolver file itself, rather, provided to the tool alongside the resolver. A resolver that declares any modifiers MUST be consumed with an input as options.

An input SHOULD be serializable to a JSON object. Meaning, an input MAY be expressed in any programming language, but that expression should be easily converted back into a JSON object. Related concepts would include an [object in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or a [dictionary in Python](https://docs.python.org/3/tutorial/datastructures.html#dictionaries).

Tools that load a resolver that declares modifiers SHOULD throw an error if an accompanying input is not provided.

<aside class="example" title="Inputs">

Given the following modifiers:

```json
{
  "tokens": [
    {
      "type": "modifier",
      "name": "theme",
      "context": [
        "light": ["light.json"],
        "dark": ["dark.json"]
      ]
    },
    {
      "type": "modifier",
      "name": "size",
      "context": {
        "default": ["size-default.json"],
        "large": ["size-large.json"]
      }
    },
    {
      "type": "modifier",
      "name": "beta",
      "context": {
        "false": [],
        "true": ["beta.json"],
      }
    }
  ]
}
```

A **valid** input would follow the schema: all keys correspond to the `name` of each modifier. The values are valid options as designated by the modifier.

```json
{
  "theme": "light",
  "size": "large",
  "beta": "true"
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

### Orthogonality

Modifiers are said to be [=orthogonal=] when they do not operate on the same set of tokens. In practical terms, if modifiers are orthogonal, then the order in which they are applied isn’t significant since they will produce the same values.

Implementors SHOULD make modifiers orthogonal. Tools MAY decide how to handle non-orthogonal modifiers.

<aside class="example" title="Non-orthogonal modifiers">

Given the following modifiers:

1. A **theme** modifier has the values **light** and **dark**. Among its values, it provides a value for the `color.button` token.
2. A **brand** modifier has the values **brandA** and **brandB**. Among its values, it provides a value for the `color.button` token.

Both modifiers both provide conflicting values for the `color.button` token, so its final value will be determined by the order:

1. If **theme** is applied last, it will produce the value for `color.button`.
2. If **brand** is applied last, it will produce the value for `color.button`.

These two modifiers are said to be non-orthogonal because the order in which they are applied produces different results.

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
