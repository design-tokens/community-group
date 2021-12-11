# Composite types

The types defined in the previous chapters such as color and dimension all have singular values. For example, the value of a color token is _one_ color. However, there are other aspects of UI designs that are a combination of multiple values. For instance, a shadow style is a combination of a color, X & Y offsets, a blur radius and a spread radius.

Every shadow style has the exact same parts (color, X & Y offsets, etc.), but their respective values will differ. Furthermore, each part's value (which is also known as a "sub-value") is always of the same type. A shadow's color must always be a [color](#color) value, its X offset must always be a [dimension](#dimension) value, and so on. Shadow styles are therefore combinations of values _that follow a pre-defined structure_. In other words, shadow styles are themselves a type. We call types like this **composite types**.

Specifically, a composite type has the following characteristics:

- Its value is an object or array containing sub-values.
- For object values, each sub-value has a pre-defined name and type.
- For array values, all elements of the array are sub-values that have the same pre-defined type.
- Sub-values may be explicit values (e.g. `"#ff0000"`) or references to other design tokens that have sub-value's type (e.g. `"{some.other.token}"`).

A design token whose type happens to be a composite type is sometimes also called a composite (design) token. Besides their type, there is nothing special about composite tokens. They can have all the other additional properties like [description](#description) or [extensions](#extensions). They can also be referenced by other design tokens.

<aside class="example" title="Composite token example">

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

Represents a border style. The type property must be set to the string “border”. The value must be an object with the following properties:

- `color`: The color of the border. The value of this property must be a valid [color value](#color) or a reference to a color token.
- `width`: The width or thickness of the border. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `style`: The border's style, for example "solid" or "dashed". The value of this property must be a valid JSON string or a reference to a string token.

<aside class="example" title="Border composite token examples">

```json
{
  "border": {
    "heavy": {
      "type": "border",
      "value": {
        "color": "#36363600",
        "width": "3px",
        "style": "solid"
      }
    },
    "focusring": {
      "type": "border",
      "value": {
        "color": "{color.focusring}",
        "width": "1px",
        "style": "dashed"
      }
    }
  }
}
```

</aside>

# Transition

TO-DO

# Shadow

Represents a shadow style. The type property must be set to the string “shadow”. The value must be an object with the following properties:

- `color`: The color of the shadow. The value of this property must be a valid [color value](#color) or a reference to a color token.
- `x`: The horizontal offset that shadow has from the element it is applied to. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `y`: The vertical offset that shadow has from the element it is applied to. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `blur`: The blur radius that is applied to the shadow. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `spread`: The amount by which to expand or contract the shadow. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.

# Gradient Stop

Represents an individual stop on a color gradient. In practice, this type is unlikely to be useful by itself, but it is required by the [gradient type](#gradient). The value must be an object with the following properties:

- `color`: The color value at the stop's position on the gradient. The value of this property must be a valid [color value](#color) or a reference to a color token.
- `position`: The position of the stop along the gradient's axis. The value of this property must be a valid number value or reference to a number token. The number values must be in the range [0, 1], where 0 represents the start position of the gradient's axis and 1 the end position. If a number value outside of that range is given, it MUST be considered as if it were clamped to the range [0, 1]. For example, a value of 42 should be treated as if it were 1, i.e. the end position of the gradient axis. Similarly, a value of -99 should be treated as if it were 0, i.e. the start position of the gradient axis.

# Gradient

Represents a color gradient. The value must be an array of [gradient stops](#gradient-stop). If there are no stops at the very beginning or end of the gradient axis (i.e. with `position` 0 or 1, respectively), then the color from the stop closest to each end should be extended to that end of the axis.

<aside class="example" title="Gradient token example">

```json
{
  "blue-to-red": {
    "type": "gradient",
    "value": [
      {
        "color": "#0000ff",
        "pos": 0
      },
      {
        "color": "#ff0000",
        "pos": 1
      }
    ]
  }
}
```

Describes a gradient that goes from blue to red:

<div style="height: 2rem; background: linear-gradient(90deg, #0000ff, #ff0000);"></div>

</aside>

<aside class="example" title="Gradient token with omitted start stop example">

```json
{
  "mostly-yellow": {
    "type": "gradient",
    "value": [
      {
        "color": "#ffff00",
        "pos": 0.666
      },
      {
        "color": "#ff0000",
        "pos": 1
      }
    ]
  }
}
```

Describes a gradient that is solid yellow for the first 2/3 and then fades to red:

<div style="height: 2rem; background: linear-gradient(90deg, #ffff00 66.6%, #ff0000);"></div>

</aside>

<aside class="example" title="Gradient token using references example">

```json
{
  "brand-primary": {
    "type": "color",
    "value": "#99ff66"
  },

  "position-end": {
    "value": 1
  },

  "brand-in-the-middle": {
    "type": "gradient",
    "value": [
      {
        "color": "#000000",
        "pos": 0
      },
      {
        "color": "{brand-primary}",
        "pos": 0.5
      },
      {
        "color": "#000000",
        "pos": "{position-end}"
      }
    ]
  }
}
```

Describes a color token called "brand-primary", which is referenced as the mid-point of a gradient is black at either end.

<div style="height: 2rem; background: linear-gradient(90deg, #000000, #99ff66, #000000);"></div>

</aside>

# Typography

Represents a typographic style. The type property must be set to the string “typography”. The value must be an object with the following properties:

- `fontName`: The typography's font. The value of this property must be a valid [font name](#font-name) or a reference to a font name token.
- `fontSize`: The size of the typography. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `fontWeight`: The weight of the typography. The value of this property must be a valid JSON string or a reference to a string token.
- `letterSpacing`: The horizontal spacing between characters. The value of this property must be a valid [dimension value](#dimension) or a reference to a dimension token.
- `lineHeight`: The vertical spacing between lines of typography. The value of this property must be a valid JSON string or a reference to a string token.

<aside class="example" title="Typography composite token examples">

```json
{
  "type styles": {
    "heading-level-1": {
      "type": "typography",
      "value": {
        "fontName": "Roboto",
        "fontSize": "42px",
        "fontWeight": "700",
        "letterSpacing": "0.1px",
        "lineHeight": "1.2"
      }
    },
    "microcopy": {
      "type": "typography",
      "value": {
        "fontName": "{font.serif}",
        "fontSize": "{font.size.smallest}",
        "fontWeight": "{font.weight.normal}",
        "letterSpacing": "0px",
        "lineHeight": "1"
      }
    }
  }
}
```

</aside>
