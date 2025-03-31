# Color type

Represents a color.

## Format

For color tokens, the `$type` property MUST be set to the string `color`.

The `$value` property can then be used to specify the details of the color, The `$value` object contains the following properties:

- `colorSpace` (required): A string that specifices the color space. For supported color spaces, see the [supported color spaces](#supported-color-spaces) section below.
- `components` (required): An array representing the color components. The number of components depends on the color space. Each element of the array MUST be either:
  - A number
  - The 'none' keyword
- `alpha` (optional): A number that represents the alpha value of the color. This value is between `0` and `1`, where `0` is fully transparent and `1` is fully opaque.
- `hex` (optional): A string that represents a fallback value of the color. The fallback color MUST be formatted in [6 digit CSS hex color notation](https://www.w3.org/TR/css-color-4/#hex-notation) format to avoid conflicts with the provided alpha value.

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
      "hex": "#000000"
    }
  }
}
```

</aside>

### The `none` keyword

The `none` keyword MAY be used in the `components` array to indicate that a component is not applicable or not specified. This is useful for colors that do not require all components to be specified.
For example, in the HSL color space, the `none` keyword MAY be used to indicate that there is no angle value for the color, which will be interpretted differently from a color with a hue angle of 0.

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
  }
}
```

</aside>

Contrast this with the following example where the Hue is specified as 0:

<aside class="example">

```json
{
  "White": {
    "$type": "color",
    "$value": {
      "colorSpace": "hsl",
      "components": [0, 0, 100],
      "alpha": 1,
      "hex": "#ffffff"
    }
  }
}
```

</aside>

While both examples will render as white, the first example is more explicit about the fact that the hue is not applicable. This is important when interpolating between colors or mixing colors, as using each color in a can yield different results.

## Supported Color spaces

The following values are supported for the `colorSpace` property. The `components` array will vary depending on the color space.

<table class="def">
    <thead>
        <tr>
            <th scope="col">Color Space</th>
            <th scope="col">Key</th>
            <th scope="col" colspan="2">Values</th>
        </tr>
    </thead>
    <tbody>
        <!-- sRGB -->
        <tr>
            <th scope="rowgroup" rowspan="3">sRGB</th>
            <td rowspan="3">`"srgb"`</td>
            <td>Red</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- sRGB linear -->
        <tr>
            <th scope="rowgroup" rowspan="3">sRGB linear</th>
            <td rowspan="3">`"srgb-linear"`</td>
            <td>Red</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- HSL -->
        <tr>
            <th scope="rowgroup" rowspan="3">HSL</th>
            <td rowspan="3">`"hsl"`</td>
            <td>Hue</td>
            <td>[0 - 360)</td>
        </tr>
        <tr>
            <td>Saturation</td>
            <td>[0 - 100]</td>
        </tr>
        <tr>
            <td>Lightness</td>
            <td>[0 - 100]</td>
        </tr>
        <!-- HWB -->
        <tr>
            <th scope="rowgroup" rowspan="3">HWB</th>
            <td rowspan="3">`"hwb"`</td>
            <td>Hue</td>
            <td>[0 - 360)</td>
        </tr>
        <tr>
            <td>Whiteness</td>
            <td>[0 - 100]</td>
        </tr>
        <tr>
            <td>Blackness</td>
            <td>[0 - 100]</td>
        </tr>
        <!-- CIELAB -->
        <tr>
            <th scope="rowgroup" rowspan="3">CIELAB</th>
            <td rowspan="3">`"lab"`</td>
            <td>L</td>
            <td>[0 - 100]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>[-Infinity - Infinity]*</td>
        </tr>
        <tr>
            <td>B</td>
            <td>[-Infinity - Infinity]*</td>
        </tr>
        <!-- LCH -->
        <tr>
            <th scope="rowgroup" rowspan="3">LCH</th>
            <td rowspan="3">`"lch"`</td>
            <td>L</td>
            <td>[0 - 100]</td>
        </tr>
        <tr>
            <td>C</td>
            <td>[0-Infinity]**</td>
        </tr>
        <tr>
            <td>Hue</td>
            <td>[0-360]</td>
        </tr>
        <!-- OKLAB -->
        <tr>
            <th scope="rowgroup" rowspan="3">OKLAB</th>
            <td rowspan="3">`"oklab"`</td>
            <td>L</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>[-Infinity to Infinity]**</td>
        </tr>
        <tr>
            <td>B</td>
            <td>[-Infinity to Infinity]†</td>
        </tr>
        <!-- OKLCH -->
        <tr>
            <th scope="rowgroup" rowspan="3">OKLCH</th>
            <td rowspan="3">`"oklch"`</td>
            <td>L</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Chroma</td>
            <td>[0 - Infinity]‡</td>
        </tr>
        <tr>
            <td>Hue</td>
            <td>[0 - 360)</td>
        </tr>
        <!-- Display P3 -->
        <tr>
            <th scope="rowgroup" rowspan="3">Display P3</th>
            <td rowspan="3">`"display-p3"`</td>
            <td>Red</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- A98 RGB -->
        <tr>
            <th scope="rowgroup" rowspan="3">A98 RGB</th>
            <td rowspan="3">`"a98-rgb"`</td>
            <td>Red</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- ProPhoto RGB -->
        <tr>
            <th scope="rowgroup" rowspan="3">ProPhoto RGB</th>
            <td rowspan="3">`"prophoto-rgb"`</td>
            <td>Red</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- Rec 2020 -->
        <tr>
            <th scope="rowgroup" rowspan="3">Rec 2020</th>
            <td rowspan="3">`"rec2020"`</td>
            <td>Red</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Green</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Blue</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- XYZ-D65 -->
        <tr>
            <th scope="rowgroup" rowspan="3">XYZ-D65</th>
            <td rowspan="3">`"xyz"`</td>
            <td>X</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Y</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Z</td>
            <td>[0 - 1]</td>
        </tr>
        <!-- XYZ-D50 -->
        <tr>
            <th scope="rowgroup" rowspan="3">XYZ-D50</th>
            <td rowspan="3">`"xyz-d50"`</td>
            <td>X</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Y</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Z</td>
            <td>[0 - 1]</td>
        </tr>
    </tbody>
</table>
<div>
  <span>* In CIELAB, A and B are unbounded but in practice don't exceed -160 to 160</span><br />
  <span>** In LCH, C is unbounded but in practice doesn't exceed 230</span><br />
  <span>† In OKLAB, A and B are unbounded but in practice don't exceed -0.5 to 0.5</span>
  <span>‡ In OKLCH, Chroma is unbounded but in practice doesn't exceed 0.5</span>
</div>

<details class="note">
<summary>A note about precision in examples</summary>
<p>The examples below have varying degrees of precision (i.e. numbers after the decimal). This is done to ensure that the 'fallback' color is exactly the same as the defined color when converted to HEX. In practice, the numbers used to define each component can have any degree of precision.</p>
</details>

<details class="note">
<summary>How does this conform to CSS Color Module 4?</summary>
<p>To provide a logically consistent approach without creating ambiguity around the format, this spec takes the following approach:</p>
<ul> 
<li>If CSS Color Module 4 allows a color space to be referenced by **both** a named function (like `srgb()`) **and** a keyword in the `color()` function, use the format intended for the `color()` function.</li>
<li>If CSS Color Module 4 only defines a color space **either** as a named function (like `hwb()`) **or** a keyword in the `color()` function (like `rec-2020`), use the syntax indicated.</li>
<li>If CSS Color Module 4 allows **both** unit values (like `50`) **and** percentages (like `50%`) for a component, use the unit value.</li>
</ul>
<p>Using this spec as a reference allows us to focus on the design and implementation of the tokens themselves, rather than the underlying color science.</p>
</details>

### sRGB

sRGB was the standard color space for all CSS colors before CSS Color Module 4. It is the most widely used color space on the web, and is the default color space for most design tools.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [1, 0, 1],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### sRGB linear

sRGB linear is a linearized version of sRGB. It is used in some design tools to represent colors in a linear color space.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb-linear",
      "components": [1, 0, 1],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### HSL

HSL is a polar transformation of sRGB, supported as early as CSS Color Level 3.

#### Components

`[Hue, Saturation, Lightness]`

- Hue: A number between `0` (inclusive) and `360` (exclusive) representing the angle of the color on the color wheel.
- Saturation: A number between `0` and `100` representing the percentage of color saturation.
- Lightness: A number between `0` and `100` representing the percentage of lightness.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "hsl",
      "components": [330, 100, 50],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### HWB

Another polar transformation of sRGB.

#### Components

`[Hue, Whiteness, Blackness]`

- Hue: A number between `0` (inclusive) and `360` (exclusive) representing the angle of the color on the color wheel.
- Whiteness: A number between `0` and `100` representing the percentage of white in the color.
- Blackness: A number between `0` and `100` representing the percentage of black in the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "hwb",
      "components": [330, 0, 0],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### CIELAB

CIELAB is a color space that is designed to be perceptually uniform.

#### Components

`[L, A, B]`

- L: A number between `0` and `100` representing the percentage of lightness of the color.
- A: A signed number between representing the green-red axis of the color.
- B: A signed number between representing the blue-yellow axis of the color.

A and B are theoretically unbounded, but in practice don't exceed -160 to 160.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "lab",
      "components": [60.17, 93.54, -60.5],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### LCH

LCH is a cylindrical representation of CIELAB.

#### Components

`[L, C, Hue]`

- L: A number between `0` and `100` representing the percentage of lightness of the color.
- C: A number representing the chroma of the color.
- Hue: A number between `0` (inclusive) and `360` (exclusive) representing the angle of the color on the color wheel.

The minimum value of C is `0`, which represents a neutral color (gray), and its maximum is theoretically unbounded, but in practice doesn't exceed 230.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "lch",
      "components": [60.17, 111.4, 327.11],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### OKLAB

OKLAB is a perceptually uniform color space that is designed to be more accurate than CIELAB.

#### Components

`[L, A, B]`

- L: A number between `0` and `1` representing the lightness of the color.
- A: A signed number between representing the green-red axis of the color.
- B: A signed number between representing the blue-yellow axis of the color.

Like in CIELAB, A and B are theoretically unbounded, but in practice don't exceed -0.5 to 0.5.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "oklab",
      "components": [0.701, 0.2746, -0.169],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### OKLCH

OKLCH is a cylindrical representation of OKLAB.

#### Components

`[L, Chroma, Hue]`

- L: A number between `0` and `1` representing the lightness of the color.
- Chroma: A number representing the chroma of the color.
- Hue: A number between `0` (inclusive) and `360` (exclusive) representing the angle of the color on the color wheel.

Like in LCH, the minimum value of Chroma is `0`, which represents a neutral color (gray), and its maximum is theoretically unbounded, but in practice doesn't exceed 0.5.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "oklch",
      "components": [0.7016, 0.3225, 328.363],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### Display P3

Display P3 is a color space that is designed to be used in displays with a wide color gamut. It is based on the P3 color space used in digital cinema.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "display-p3",
      "components": [1, 0, 1],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### A98 RGB

A98 RGB is a color space that is designed to be used in displays with a wide color gamut. It is based on the Adobe RGB color space.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "a98-rgb",
      "components": [1, 0, 1],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### ProPhoto RGB

ProPhoto RGB is a color space that is designed to be used in displays with a wide color gamut. It is based on the ProPhoto RGB color space.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "prophoto-rgb",
      "components": [1, 0, 1],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### Rec 2020

Rec 2020 is a color space that is designed to be used in displays with a wide color gamut. It is based on the Rec 2020 color space.

#### Components

`[Red, Green, Blue]`

- Red: A number between `0` and `1` representing the red component of the color.
- Green: A number between `0` and `1` representing the green component of the color.
- Blue: A number between `0` and `1` representing the blue component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "rec2020",
      "components": [1, 0, 1],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### XYZ-D65

XYZ-D65 is a color space that is designed to be able to represent all colors that can be perceived by the human eye. It is a fundamental color space — all other spaces can be converted to and from XYZ. It is based on the CIE 1931 color space, using the D65 illuminant. XYZ is not commonly used in design tools, but is useful for color conversions.

#### Components

`[X, Y, Z]`

- X: A number between `0` and `1` representing the X component of the color.
- Y: A number between `0` and `1` representing the Y component of the color.
- Z: A number between `0` and `1` representing the Z component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "xyz",
      "components": [0.5929, 0.2848, 0.9699],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

### XYZ-D50

XYZ-D50 is similar to XYZ-D65, but uses the D50 illuminant.

#### Components

`[X, Y, Z]`

- X: A number between `0` and `1` representing the X component of the color.
- Y: A number between `0` and `1` representing the Y component of the color.
- Z: A number between `0` and `1` representing the Z component of the color.

<aside class="example">

```json
{
  "Hot pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "xyz-d50",
      "components": [0.5791, 0.2831, 0.728],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

## Future color space support

Future versions of this spec MAY add support for additional color spaces, depending on adoption and support in design tools.
