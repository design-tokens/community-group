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
    }
  ]
}
```

</aside>

## Modifiers

<aside class="issue">

- If modifiers may refer to sets by name, then there should be a dilineation between the set name `string` and a URL `string`.
  - For example, could a user name a set `colors.json`? Could they do that if there was also a file at that location?
- If sets may be used by name, then it should be a key–value map so the names are unique. There is no need for ordering, if another place determines the order.

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

## $extensions

An `$extensions` object MAY be added to any [set](#set), [modifier](#modifier), or object in this spec to declare arbitrary metadata ignored by tooling. Its purpose in a resolver is the same as [in the format](../format/#extensions).
