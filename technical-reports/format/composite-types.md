# Composite types

The types defined in the previous chapters such as color and dimension all have singular values. For example, the value of a color token is _one_ color. However, there are other aspects of UI designs that are a combination of multiple values. For instance, a shadow style is a combination of a color, X & Y offsets, a blur radius and a spread radius.

Every shadow style has the exact same parts (color, X & Y offsets, etc.), but their respective values will differ. Furthermore, each part's value (which is also known as a "sub-value") is always of the same type. A shadow's color must always be a [color](#color) value, its X offset must always be a [dimension](#dimension) value, and so on. Shadow styles are therefore combinations of values _that follow a pre-defined structure_. In other words, shadow styles are themselves a type. We call types like this **composite types**.

Specifically, a composite type has the following characteristics:

- Its value is an object containing sub-values.
- Each sub-value has a pre-defined name and type.
- Sub-values may be explicit values (e.g. `"#ff0000"`) or references to other design tokens that have sub-value's type (e.g. `"{some.other.token}"`).

A design token whose type happens to be a composite type is sometimes also called a composite (design) token. Besides their type, there is nothing special about composite tokens. They can have all the other additional properties like [description](#description) or [extensions](#extensions). They can also be referenced by other design tokens.

<aside class="example" title="Composite token exmple">

```json
{
  "shadow-token": {
    "type": "shadow",
    "value": {
      "color": "#00000088",
      "x": "0.5rem",
      "y": "0.5rem",
      "blur": "1.5rem",
      "spread": "0rem"
    }
  }
}
```

</aside>

<aside class="example" title="Advanced composite token example">

```json
{
  "space": {
    "small": {
      "type": "dimension",
      "value": "0.5rem"
    }
  },

  "color": {
    "shadow-050": {
      "type": "color",
      "value": "#00000088"
    }
  },

  "shadow": {
    "medium": {
      "type": "shadow",
      "description": "A composite token where some sub-values are references to tokens that have the correct type and others are explicit values",
      "value": {
        "color": "{color.shadow-050}",
        "x": "{space.small}",
        "y": "{space.small}",
        "blur": "1.5rem",
        "spread": "0rem"
      }
    }
  },

  "component": {
    "card": {
      "box-shadow": {
        "description": "This token is an alias for the composite token {shadow.medium}",
        "value": "{shadow.medium}"
      }
    }
  }
}
```

</aside>

## Groups versus composite tokens

At first glance, groups and composite tokens might look very similar. However, they are intended to solve different problems and therefore have some important differences:

- **[Groups](#groups)** are for arbitrarily grouping tokens for the purposes of naming and/or organization.
  - They impose no rules or restrictions on how many tokens or nested groups you put within them, what they are called, or what the types of the tokens within should be. As such, tools MUST NOT try to infer any special meaning or typing of tokens based on a group they happen to be in.
  - Different design systems are likely to group their tokens differently.
  - You can think of groups as containers that exist "outside" of design tokens.
- **Composite tokens** are individual design tokens whose values are made up of several sub-values.
  - Since they are design tokens, they can be referenced by other design tokens. This is not true for groups.
  - Their type must be one of the composite types defined in this specification. Therefore their names and types of their sub-values are pre-defined. Adding additional sub-values or setting values that don't have the correct type make the composite token invalid.
  - Tools MAY provide specialised functionality for composite tokens. For example, a design tool may let the user pick from a list of all available shadow tokens when applying a drop shadow effect to an element.

# Border

TO-DO

# Transition

TO-DO

# Shadow

Represents a shadow style. The type property must be set to the string “shadow”. The value must be an object with the following properties:

- `color`: The color of the shadow. The value of this property must be a valid [color value](#color) or a reference to a color token.
- `x`: The horizontal offset that shadow has from the element it is applied to. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `y`: The vertical offset that shadow has from the element it is applied to. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `blur`: The blur radius that is applied to the shadow. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `spread`: The amount by which to expand or contract the shadow. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.

# Gradient

TO-DO

# Text style

TO-DO
