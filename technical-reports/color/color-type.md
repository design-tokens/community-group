# Color type

## Format

For color tokens, the `$type` property MUST be set to the string `color`.

The `$value` property can then be used to specify the details of the color, The `$value` object contains the following properties:

- `colorSpace` (required): A string that specifices the color space. For supported color spaces, see the [supported color spaces](#supported-color-spaces) section below.
- `components` (required): An array representing the color components. The number of components depends on the color space. Each element of the array can be either:
  - A number
  - The 'none' keyword
- `alpha` (optional): A number that represents the alpha value of the color. This value is between `0` and `1`, where `0` is fully transparent and `1` is fully opaque.
- `fallback` (optional): A string that represents a fallback value of the color in [CSS hex color notation](https://www.w3.org/TR/css-color-4/#hex-notation) format. The fallback color MUST omit the alpha value, since alpha is specified in the `alpha` property. The fallback value is used when the color cannot be represented in the specified color space.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [255, 0, 255],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  },
  "Translucent shadow": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 0, 0],
      "alpha": 0.5,
      "hex": "#00000080"
    }
  }
}
```

</aside>

### The `none` keyword

The `none` keyword can be used in the `components` array to indicate that a component is not applicable or not specified. This is useful for colors that do not require all components to be specified.
For example, in the HSL color space, the `none` keyword can be used to indicate that there is no angle value for the color, which may be interpretted differently from a color with a hue angle of 0.

<aside class="example">

```json
{
  "White": {
    "$type": "color",
    "$value": {
      "colorSpace": "hsl",
      "components": ["none", 0, 100],
      "alpha": 1,
      "hex": "#ffffff"
    }
  },
  "Black": {
    "$type": "color",
    "$value": {
      "colorSpace": "hsl",
      "components": ["none", 0, 0],
      "alpha": 1,
      "hex": "#000000"
    }
  }
}
```

</aside>

## Supported Color spaces

The following values are supported for the `colorSpace` property. The `components` array will vary depending on the color space.

| Color space | Value         |
| ----------- | ------------- |
| sRGB        | `srgb`, `rgb` |
| HSL         | `hsl`         |
| HWB         | `hwb`         |
| LAB         | `lab`         |
| LCH         | `lch`         |
| OKLAB       | `oklab`       |
| OKLCH       | `oklch`       |
| Display P3  | `display-p3`  |
| XYZ         | `xyz`         |

<details class="note">
<summary>A note about precision in examples</summary>
<p>The examples below have varying degrees of precision (i.e. numbers after the decimal). This is done to ensure that the 'fallback' color is exactly the same as the defined color when converted to HEX. In practice, the numbers used to define each component can have any degree of precision.</p>
</details>

### sRGB

sRGB was the standard color space for all CSS colors before CSS Color Module 4. It is the most widely used color space on the web, and is the default color space for most design tools.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `255` representing the red component of the color.
- Green: A number between `0` and `255` representing the green component of the color.
- Blue: A number between `0` and `255` representing the blue component of the color.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [255, 0, 255],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### HSL

HSL is a polar transformation of sRGB, supported as early as CSS Color Level 3.

#### Components

`[Hue, Saturation, Lightness]`

- Hue: A number between `0` and `360` representing the angle of the color on the color wheel.
- Saturation: A number between `0` and `100` representing the percentage of color saturation.
- Lightness: A number between `0` and `100` representing the percentage of lightness.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "hsl",
      "components": [330, 100, 50],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### HWB

Another polar transformation of sRGB.

#### Components

`[Hue, Whiteness, Blackness]`

- Hue: A number between `0` and `360` representing the angle of the color on the color wheel.
- Whiteness: A number between `0` and `100` representing the percentage of white in the color.
- Blackness: A number between `0` and `100` representing the percentage of black in the color.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "hwb",
      "components": [330, 0, 0],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### LAB

cieLAB is a color space that is designed to be perceptually uniform.

#### Components

`[L, A, B]`

- L: A number between `0` and `100` representing the lightness of the color.
- A: A signed number between representing the green-red axis of the color.
- B: A signed number between representing the blue-yellow axis of the color.

A and B are theoretically unbounded, but in practice don't exceed -160 to 160.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "lab",
      "components": [60.17, 93.54, -60.5],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### LCH

LCH is a cylindrical representation of cieLAB.

#### Components

`[L, Chroma, Hue]`

- L: A number between `0` and `100` representing the lightness of the color.
- Chroma: A number representing the chroma of the color.
- Hue: A number between `0` and `360` representing the angle of the color on the color wheel.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "lch",
      "components": [60.17, 111.4, 327.11],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### OKLAB

OKLAB is a perceptually uniform color space that is designed to be more accurate than cieLAB.

#### Components

`[L, A, B]`

- L: A number between `0` and `1` representing the lightness of the color.
- A: A signed number between representing the green-red axis of the color.
- B: A signed number between representing the blue-yellow axis of the color.

Like in LAB, A and B are theoretically unbounded, but in practice don't exceed -0.5 to 0.5.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "oklab",
      "components": [0.701, 0.2746, -0.169],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### OKLCH

OKLCH is a cylindrical representation of OKLAB.

#### Components

`[L, Chroma, Hue]`

- L: A number between `0` and `1` representing the lightness of the color.
- Chroma: A number representing the chroma of the color.
- Hue: A number between `0` and `360` representing the angle of the color on the color wheel.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "oklch",
      "components": [0.7016, 0.3225, 328.363],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### Display P3

Display P3 is a color space that is designed to be used in displays with a wide color gamut. It is based on the P3 color space used in digital cinema.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "display-p3",
      "components": [1, 0, 1],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

### XYZ

XYZ is a color space that is designed to be able to represent all colors that can be perceived by the human eye. It is a fundamental color space — all other spaces can be converted to and from XYZ. It is based on the CIE 1931 color space, using the D65 illuminant. XYZ is not commonly used in design tools, but is useful for color conversions.

#### Components

`[X, Y, Z]`

- X: A number between `0` and `1` representing the X component of the color.
- Y: A number between `0` and `1` representing the Y component of the color.
- Z: A number between `0` and `1` representing the Z component of the color.

#### Example

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "xyz",
      "components": [0.5929, 0.2848, 0.9699],
      "alpha": 1,
      "fallback": "#ff00ff"
    }
  }
}
```

## Future color space support

Future versions of this spec may add support for additional color spaces, depending on adoption and support in design tools.
