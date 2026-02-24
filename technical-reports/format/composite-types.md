# Composite types

The types defined in the previous chapters such as color and dimension all have singular values. For example, the value of a color token is _one_ color. However, there are other aspects of UI designs that are a combination of multiple values. For instance, a shadow style is a combination of a color, X & Y offsets, a blur radius and a spread radius.

Every shadow style has the exact same parts (color, X & Y offsets, etc.), but their respective values will differ. Furthermore, each part's value (which is also known as a "sub-value") is always of the same type. A shadow's color must always be a [color](#color) value, its X offset must always be a [dimension](#dimension) value, and so on. Shadow styles are therefore combinations of values _that follow a pre-defined structure_. In other words, shadow styles are themselves a type. Types like this are called **composite types**.

Specifically, a composite type has the following characteristics:

- Its value is an object or array, potentially containing nested objects or arrays, following a pre-defined structure where the properties of the (nested) object(s) or the elements of the (nested) arrays are sub-values.
- Sub-values may be explicit values (e.g. `color` values) or references to other design tokens that have the sub-value's type (e.g. `"{some.other.token}"`).

### Array aliasing in composite types

When a composite type contains array properties, each element in the array may be either an explicit value or a reference to a token of the appropriate type. References in arrays resolve to single values and do not cause array expansion or flattening. This allows for flexible composition where some array elements are references while others are explicit values.

Array aliasing follows these principles:

1. **Single value resolution**: References in arrays always resolve to a single value of the appropriate type, never to arrays themselves.
2. **No flattening**: When referencing an array, the entire referenced array is treated as a single element in the referencing array.
3. **Type safety**: Each array element (explicit or referenced) must conform to the expected sub-value type for that composite type.
4. **Mixed composition**: Arrays may freely mix explicit values and references.

For example, a shadow token with an array value can mix references to other shadow tokens with explicit shadow objects:

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "layered-shadow": {
    "$type": "shadow",
    "$value": [
      "{base.shadow}",
      {
        "color": "{brand.accent}",
        "offsetX": { "value": 4, "unit": "px" },
        "offsetY": { "value": 4, "unit": "px" },
        "blur": { "value": 8, "unit": "px" },
        "spread": { "value": 0, "unit": "px" }
      }
    ]
  }
}
```

A design token whose type happens to be a composite type is sometimes also called a composite (design) token. Besides their type, there is nothing special about composite tokens. They can have all the other additional properties like [`$description`](#description) or [`$extensions`](#extensions). They can also be referenced by other design tokens.

<aside class="example" title="Composite token example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "shadow-token": {
    "$type": "shadow",
    "$value": {
      "color": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "alpha": 0.5,
        "hex": "#000000"
      },
      "offsetX": { "value": 0.5, "unit": "rem" },
      "offsetY": { "value": 0.5, "unit": "rem" },
      "blur": { "value": 1.5, "unit": "rem" },
      "spread": { "value": 0, "unit": "rem" }
    }
  }
}
```

</aside>

<aside class="example" title="Advanced composite token example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "space": {
    "small": {
      "$type": "dimension",
      "$value": { "value": 0.5, "unit": "rem" }
    }
  },

  "color": {
    "shadow-050": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "alpha": 0.5,
        "hex": "#000000"
      }
    }
  },

  "shadow": {
    "medium": {
      "$type": "shadow",
      "$description": "A composite token where some sub-values are references to tokens that have the correct type and others are explicit values",
      "$value": {
        "color": "{color.shadow-050}",
        "offsetX": "{space.small}",
        "offsetY": "{space.small}",
        "blur": { "value": 1.5, "unit": "rem" },
        "spread": { "value": 0, "unit": "rem" }
      }
    }
  },

  "component": {
    "card": {
      "box-shadow": {
        "$description": "This token is an alias for the composite token {shadow.medium}",
        "$value": "{shadow.medium}"
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
  - Tools MAY provide specialized functionality for composite tokens. For example, a [=design tool=] may let the user pick from a list of all available shadow tokens when applying a drop shadow effect to an element.

## Stroke style

Represents the style applied to lines or borders. The `$type` property MUST be set to the string `strokeStyle`. The value MUST be either:

- a string value as defined in the corresponding section below, or
- an object value as defined in the corresponding section below

<div class="issue" data-number="98" title="Stroke style type feedback">
  Is the current specification for stroke styles fit for purpose? Does it need more sub-values (e.g. equivalents to SVG's `stroke-linejoin`, `stroke-miterlimit` and `stroke-dashoffset` attributes)?
</div>

### String value

String stroke style values MUST be set to one of the following, pre-defined values:

- `solid`
- `dashed`
- `dotted`
- `double`
- `groove`
- `ridge`
- `outset`
- `inset`

These values have the same meaning as the equivalent ["line style" values in CSS](https://drafts.csswg.org/css-backgrounds/#typedef-line-style). As per the CSS spec, their exact rendering is therefore implementation specific. For example, the length of dashes and gaps in the `dashed` style may vary between different tools.

<aside class="example" title="String stroke style example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "focus-ring-style": {
    "$type": "strokeStyle",
    "$value": "dashed"
  }
}
```

</aside>

### Object value

Object stroke style values MUST have the following properties:

- `dashArray`: An array of [dimension values](#dimension) and/or references to dimension tokens, which specify the lengths of alternating dashes and gaps. Each element in the array must be either an explicit dimension value or a reference to a dimension token. If an odd number of values is provided, then the list of values is repeated to yield an even number of values.
- `lineCap`: One of the following pre-defined string values: `"round"`, `"butt"` or `"square"`. These values have the same meaning as those of [the `stroke-linecap` attribute in SVG](https://www.w3.org/TR/SVG11/painting.html#StrokeLinecapProperty).

<aside class="example" title="Object stroke style example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "alert-border-style": {
    "$type": "strokeStyle",
    "$value": {
      "dashArray": [
        { "value": 0.5, "unit": "rem" },
        { "value": 0.25, "unit": "rem" }
      ],
      "lineCap": "round"
    }
  }
}
```

</aside>

<aside class="example" title="Object stroke style example using references" id="example-stroke-style-obj-ref">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "notification-border-style": {
    "$type": "strokeStyle",
    "$value": {
      "dashArray": ["{dash-length-medium}", { "value": 0.25, "unit": "rem" }],
      "lineCap": "butt"
    }
  },

  "mixed-dash-style": {
    "$type": "strokeStyle",
    "$value": {
      "dashArray": [
        "{dash-length-long}",
        "{dash-gap-short}",
        { "value": 0.125, "unit": "rem" },
        "{dash-gap-short}"
      ],
      "lineCap": "round"
    }
  },

  "dash-length-medium": {
    "$type": "dimension",
    "$value": {
      "value": 10,
      "unit": "px"
    }
  },

  "dash-length-long": {
    "$type": "dimension",
    "$value": { "value": 1, "unit": "rem" }
  },

  "dash-gap-short": {
    "$type": "dimension",
    "$value": { "value": 0.25, "unit": "rem" }
  }
}
```

</aside>

### Fallbacks

The string and object values are mutually exclusive means of expressing stroke styles. For example, some of the string values like `inset` or `groove` cannot be expressed in terms of a `dashArray` and `lineCap` as they require some implementation-specific means of lightening or darkening the _color_ for portions of a border or outline. Conversely, a precisely defined combination of `dashArray` and `lineCap` sub-values is not guaranteed to produce the same visual result as the `dashed` or `dotted` keywords as they are implementation-specific.

Furthermore, some tools and platforms may not support the full range of stroke styles that design tokens of this type can represent. When displaying or exporting a `strokeStyle` token whose value they don't natively support, they should therefore fallback to the closest approximation that they do support.

The specifics of how a "closest approximation" is chosen are implementation-specific. However, the following examples illustrate what fallbacks tools MAY use in some scenarios.

<aside class="example" title="Fallback for object stroke style">

CSS does not allow detailed control of the dash pattern or line caps on dashed borders. So, a tool exporting the `"notification-border-style"` design token from the [example in the previous section](#example-stroke-style-obj-ref), might use the CSS `dashed` line style as a fallback:

```css
:root {
  --notification-border-style: dashed;
}
```

</aside>

<aside class="example" title="Fallback for string stroke style">

Some [=design tools=] like Figma don't support inset, outset or double style lines. When a user applies a `stroke-style` token with those values, such tools might therefore fallback to displaying a solid line instead.

</aside>

## Border

Represents a border style. The `$type` property MUST be set to the string `border`. The value MUST be an object with the following properties:

- `color`: The color of the border. The value of this property MUST be a valid [color value](#color) or a reference to a color token.
- `width`: The width or thickness of the border. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `style`: The border's style. The value of this property MUST be a valid [stroke style value](#stroke-style) or a reference to a stroke style token.

<aside class="example" title="Border composite token examples">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "border": {
    "heavy": {
      "$type": "border",
      "$value": {
        "color": {
          "colorSpace": "srgb",
          "components": [0.218, 0.218, 0.218]
        },
        "width": {
          "value": 3,
          "unit": "px"
        },
        "style": "solid"
      }
    },
    "focusring": {
      "$type": "border",
      "$value": {
        "color": "{color.focusring}",
        "width": {
          "value": 1,
          "unit": "px"
        },
        "style": {
          "dashArray": [
            { "value": 0.5, "unit": "rem" },
            { "value": 0.25, "unit": "rem" }
          ],
          "lineCap": "round"
        }
      }
    }
  }
}
```

</aside>

<div class="issue" data-number="99" title="Border type feedback">
  Is the current specification for borders fit for purpose? Does it need more sub-values to account for features like outset, border images, multiple borders, etc. that some platforms and [=design tools=] have?
</div>

## Transition

Represents a animated transition between two states. The `$type` property MUST be set to the string `transition`. The value MUST be an object with the following properties:

- `duration`: The duration of the transition. The value of this property MUST be a valid [duration](#duration) value or a reference to a duration token.
- `delay`: The time to wait before the transition begins. The value of this property MUST be a valid [duration](#duration) value or a reference to a duration token.
- `timingFunction`: The timing function of the transition. The value of this property MUST be a valid [cubic Bézier curve](#cubic-bezier) value or a reference to a cubic Bézier curve token.

<aside class="example" title="Transition composite token examples">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "transition": {
    "emphasis": {
      "$type": "transition",
      "$value": {
        "duration": { "value": 200, "unit": "ms" },
        "delay": { "value": 0, "unit": "ms" },
        "timingFunction": [0.5, 0, 1, 1]
      }
    }
  }
}
```

</aside>

<div class="issue" data-number="103" title="Transition type feedback">
  Is the current specification for transitions fit for purpose? Are these transitions parameters by themselves useful considering that they don't let you specify what aspect of a UI is being transitioned and what the start and end states are?
</div>

## Shadow

Represents a shadow style. The `$type` property MUST be set to the string `shadow`. The value MUST be either:

- a single shadow object with the properties defined below, or
- an array of shadow objects and/or references to shadow tokens

When the value is an array, each element must be either an explicit shadow object or a reference to another shadow token. References in the array resolve to single shadow objects and do not cause array flattening.

Each shadow object (whether explicit or referenced) MUST have the following properties:

- `color`: The color of the shadow. The value of this property MUST be a valid [color value](#color) or a reference to a color token.
- `offsetX`: The horizontal offset that shadow has from the element it is applied to. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `offsetY`: The vertical offset that shadow has from the element it is applied to. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `blur`: The blur radius that is applied to the shadow. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `spread`: The amount by which to expand or contract the shadow. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `inset`: (optional) Whether this shadow is inside the containing shape (“inner shadow”), rather than a “drop shadow” or “box shadow” which is rendered outside the container (default, or `false`).

<aside class="example" title="Shadow token example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "shadow-token": {
    "$type": "shadow",
    "$value": {
      "color": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "alpha": 0.5
      },
      "offsetX": { "value": 0.5, "unit": "rem" },
      "offsetY": { "value": 0.5, "unit": "rem" },
      "blur": { "value": 1.5, "unit": "rem" },
      "spread": { "value": 0, "unit": "rem" }
    }
  },
  "layered-shadow": {
    "$type": "shadow",
    "$value": [
      {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "alpha": 0.1
        },
        "offsetX": { "value": 0, "unit": "px" },
        "offsetY": { "value": 24, "unit": "px" },
        "blur": { "value": 22, "unit": "px" },
        "spread": { "value": 0, "unit": "px" }
      },
      {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "alpha": 0.2
        },
        "offsetX": { "value": 0, "unit": "px" },
        "offsetY": { "value": 42.9, "unit": "px" },
        "blur": { "value": 44, "unit": "px" },
        "spread": { "value": 0, "unit": "px" }
      },
      {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "alpha": 0.3
        },
        "offsetX": { "value": 0, "unit": "px" },
        "offsetY": { "value": 64, "unit": "px" },
        "blur": { "value": 64, "unit": "px" },
        "spread": { "value": 0, "unit": "px" }
      }
    ]
  },

  "mixed-reference-shadow": {
    "$type": "shadow",
    "$value": [
      "{base.shadow}",
      {
        "color": "{brand.accent}",
        "offsetX": { "value": 2, "unit": "px" },
        "offsetY": { "value": 2, "unit": "px" },
        "blur": { "value": 4, "unit": "px" },
        "spread": { "value": 1, "unit": "px" }
      },
      "{highlight.shadow}"
    ]
  },
  "inner-shadow": {
    "$type": "shadow",
    "$value": {
      "color": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "alpha": 0.5
      },
      "offsetX": { "value": 2, "unit": "px" },
      "offsetY": { "value": 2, "unit": "px" },
      "blur": { "value": 4, "unit": "px" },
      "spread": { "value": 0, "unit": "px" },
      "inset": true
    }
  }
}
```

</aside>

<div class="issue" data-number="100" title="Shadow type feedback">
  Is the current specification for shadows fit for purpose? Does it need to support multiple shadows, as some tools and platforms do?
</div>

## Gradient

Represents a color gradient. The `$type` property MUST be set to the string `gradient`. The value MUST be an array of gradient stop objects and/or references to gradient tokens. Each element in the array must be either an explicit gradient stop object or a reference to a gradient token. References resolve to single gradient objects and do not cause array flattening.

Each gradient stop object (whether explicit or referenced) MUST have the following structure:

- `color`: The color value at the stop's position on the gradient. The value of this property MUST be a valid [color value](#color) or a reference to a color token.
- `position`: The position of the stop along the gradient's axis. The value of this property MUST be a valid number value or reference to a number token. The number values must be in the range [0, 1], where 0 represents the start position of the gradient's axis and 1 the end position. If a number value outside of that range is given, it MUST be considered as if it were clamped to the range [0, 1]. For example, a value of 42 should be treated as if it were 1, i.e. the end position of the gradient axis. Similarly, a value of -99 should be treated as if it were 0, i.e. the start position of the gradient axis.

If there are no stops at the very beginning or end of the gradient axis (i.e. with `position` 0 or 1, respectively), then the color from the stop closest to each end should be extended to that end of the axis.

<aside class="example" title="Gradient token example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "blue-to-red": {
    "$type": "gradient",
    "$value": [
      {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 1]
        },
        "position": 0
      },
      {
        "color": {
          "colorSpace": "srgb",
          "components": [1, 0, 0]
        },
        "position": 1
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
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "mostly-yellow": {
    "$type": "gradient",
    "$value": [
      {
        "color": {
          "colorSpace": "srgb",
          "components": [1, 1, 0]
        },
        "position": 0.666
      },
      {
        "color": {
          "colorSpace": "srgb",
          "components": [1, 0, 0]
        },
        "position": 1
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
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "brand-primary": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 1, 0.4]
    }
  },

  "position-end": {
    "$type": "number",
    "$value": 1
  },

  "brand-in-the-middle": {
    "$type": "gradient",
    "$value": [
      {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 0]
        },
        "position": 0
      },
      {
        "color": "{brand-primary}",
        "position": 0.5
      },
      {
        "color": {
          "colorSpace": "srgb",
          "components": [0, 0, 0]
        },
        "position": "{position-end}"
      }
    ]
  },

  "gradient-with-references": {
    "$type": "gradient",
    "$value": [
      "{gradient.start-stop}",
      {
        "color": "{brand.secondary}",
        "position": 0.333
      },
      "{gradient.end-stop}"
    ]
  },

  "gradient": {
    "start-stop": {
      "$type": "gradient",
      "$value": [
        {
          "color": { "colorSpace": "srgb", "components": [1, 1, 1] },
          "position": 0
        }
      ]
    },
    "end-stop": {
      "$type": "gradient",
      "$value": [
        {
          "color": { "colorSpace": "srgb", "components": [0, 0, 0] },
          "position": 1
        }
      ]
    }
  }
}
```

Describes a color token called "brand-primary", which is referenced as the mid-point of a gradient is black at either end.

<div style="height: 2rem; background: linear-gradient(90deg, #000000, #00ff66, #000000);"></div>

</aside>

<div class="issue" data-number="101" title="Gradient type feedback">
  Is the current specification for gradients fit for purpose? Does it need to also specify the type of gradient (.e.g linear, radial, conical, etc.)?
</div>

## Typography

Represents a typographic style. The `$type` property MUST be set to the string `typography`. The value MUST be an object with the following properties:

- `fontFamily`: The typography's font. The value of this property MUST be a valid [font family value](types#font-family) or a reference to a font family token.
- `fontSize`: The size of the typography. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `fontWeight`: The weight of the typography. The value of this property MUST be a valid [font weight](types#font-weight) or a reference to a font weight token.
- `letterSpacing`: The horizontal spacing between characters. The value of this property MUST be a valid [dimension value](#dimension) or a reference to a dimension token.
- `lineHeight`: The vertical spacing between lines of typography. The value of this property MUST be a valid [number value](types#number) or a reference to a number token. The number SHOULD be interpreted as a multiplier of the `fontSize`.

<aside class="example" title="Typography composite token examples">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "type styles": {
    "heading-level-1": {
      "$type": "typography",
      "$value": {
        "fontFamily": "Roboto",
        "fontSize": {
          "value": 42,
          "unit": "px"
        },
        "fontWeight": 700,
        "letterSpacing": {
          "value": 0.1,
          "unit": "px"
        },
        "lineHeight": 1.2
      }
    },
    "microcopy": {
      "$type": "typography",
      "$value": {
        "fontFamily": "{font.serif}",
        "fontSize": "{font.size.smallest}",
        "fontWeight": "{font.weight.normal}",
        "letterSpacing": {
          "value": 0,
          "unit": "px"
        },
        "lineHeight": 1
      }
    }
  }
}
```

</aside>

<div class="issue" data-number="102" title="Typography type feedback">

Is the current specification for typography styles fit for purpose? [Should the `lineHeight` sub-value use a number value, dimension or a new lineHeight type](https://github.com/design-tokens/community-group/pull/86#discussion_r768137006)?

</div>
