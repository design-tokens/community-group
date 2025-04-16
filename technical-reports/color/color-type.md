# Color type

Represents a color.

## Format

For color tokens, the `$type` property MUST be set to the string `color`.

The `$value` property can then be used to specify the details of the color, The `$value` object contains the following properties:

- `colorSpace` (required): A string that specifices the [=color space=] or [=color model=]. For supported color spaces, see the [supported color spaces](#supported-color-spaces) section below.
- `components` (required): An array representing the color [=components=]. The number of components depends on the color space. Each element of the array MUST be either:
  - A number
  - The 'none' keyword
- `alpha` (optional): A number that represents the [=alpha=] value of the color. This value is between `0` and `1`, where `0` is fully transparent and `1` is fully opaque. If omitted, the alpha value of the color MUST be assumed to be 1 (fully opaque).
- `hex` (optional): A string that represents a fallback value of the color. The fallback color MUST be formatted in [6 digit CSS hex color notation](https://www.w3.org/TR/css-color-4/#hex-notation) format to avoid conflicts with the provided alpha value.

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

When specifying a color in some color spaces, a value of `0` could be ambiguous. For example, in the HSL color space, colors with a [=hue=] of `0` are red; while a single color like `hsl(0, 0, 50)` would not be rendered as red, it may be treated as a completely desaturated red when interpolated with other colors. Therefore, in certain color spaces, `0` is insufficient to indicate that there is no value for a given component.

[[[css-color-4]]] has introduced the `none` keyword to indicate that a component is missing, or not applicable. For example, in the HSL color space, the `none` keyword may be used to indicate that there is no angle value for the color; a color with a hue value of `none` MAY be rendered differently from a color with a hue angle of `0`, or result in different colors when [interpolating](https://www.w3.org/TR/css-color-4/#interpolation-missing).

#### Using the `none` keyword

The `none` keyword MAY be used in the `components` array to indicate that a component is not applicable or not specified.

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

Contrast this with the following example where the Hue is specified as `0`:

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

While both examples will render as white, the first example is more explicit about the fact that the hue is not applicable. This is important when interpolating between colors or mixing colors, where using colors with components of `0` or `none` can yield different results.

## Supported Color spaces

The following values are supported for the `colorSpace` property. The `components` array will vary depending on the color space.

<aside class="ednote" title="Syntax for expressing ranges">
<p>
In this table, brackets `[]` indicate that an extrema are included, parentheses `()` indicate that the [extrema](https://en.wikipedia.org/wiki/Maximum_and_minimum) are excluded. For example, in the HSL color space, [hue is in the range of \[0 - 360\)](https://www.w3.org/TR/css-color-4/#hue-syntax), which means that `0` MAY be used but `360` MUST NOT be used.

</p>
</aside>

<table class="data">
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
            <td>Lightness</td>
            <td>[0 - 100]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>[-Infinity - Infinity]<a href="#fn-1">*</a></td>
        </tr>
        <tr>
            <td>B</td>
            <td>[-Infinity - Infinity]<a href="#fn-1">*</a></td>
        </tr>
        <!-- LCH -->
        <tr>
            <th scope="rowgroup" rowspan="3">LCH</th>
            <td rowspan="3">`"lch"`</td>
            <td>Lightness</td>
            <td>[0 - 100]</td>
        </tr>
        <tr>
            <td>Chroma</td>
            <td>[0 - Infinity]<a href="#fn-2">**</a></td>
        </tr>
        <tr>
            <td>Hue</td>
            <td>[0 - 360)</td>
        </tr>
        <!-- OKLAB -->
        <tr>
            <th scope="rowgroup" rowspan="3">OKLAB</th>
            <td rowspan="3">`"oklab"`</td>
            <td>Lightness</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>A</td>
            <td>[-Infinity - Infinity]<a href="#fn-3">†</a></td>
        </tr>
        <tr>
            <td>B</td>
            <td>[-Infinity - Infinity]<a href="#fn-3">†</a></td>
        </tr>
        <!-- OKLCH -->
        <tr>
            <th scope="rowgroup" rowspan="3">OKLCH</th>
            <td rowspan="3">`"oklch"`</td>
            <td>Lightness</td>
            <td>[0 - 1]</td>
        </tr>
        <tr>
            <td>Chroma</td>
            <td>[0 - Infinity]<a href="#fn-4">‡</td>
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
            <td rowspan="3">`"xyz-d65"`</td>
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
  <span><span id="fn-1">*</span> In CIELAB, A and B are unbounded but in practice don't exceed -160 to 160</span><br />
  <span><span id="fn-2">**</span> In LCH, C is unbounded but in practice doesn't exceed 230</span><br />
  <span><span id="fn-3">†</span> In OKLAB, A and B are unbounded but in practice don't exceed -0.5 to 0.5</span><br/>
  <span><span id="fn-4">‡</span> In OKLCH, Chroma is unbounded but in practice doesn't exceed 0.5</span>
</div>

<aside class="ednote" title="Precision in examples">
<p>The examples below have varying degrees of precision (i.e. numbers after the decimal). This is done to ensure that the 'fallback' color is exactly the same as the defined color when converted to HEX. In practice, the numbers used to define each component can have any degree of precision.</p>
</aside>

<aside class="ednote" title="Optional values in examples">
<p>The examples below are given with all optional values (alpha, hex) included for the purpose of completness. Defining the alpha property for fully-opaque colors is not required, see [[[#format]]].</p>
</aside>

<aside class="ednote" title="How does this conform to CSS Color Module 4?">
<p>To provide a logically consistent approach without creating ambiguity around the format, this spec takes the following approach:</p>
<ul> 
<li>If CSS Color Module 4 allows a color space to be referenced by **both** a named function (like `srgb()`) **and** a keyword in the `color()` function, use the format intended for the `color()` function.</li>
<li>If CSS Color Module 4 only defines a color space **either** as a named function (like `hwb()`) **or** a keyword in the `color()` function (like `rec-2020`), use the syntax indicated.</li>
<li>If CSS Color Module 4 allows **both** unit values (like `50`) **and** percentages (like `50%`) for a component, use the unit value.</li>
</ul>
<p>Using this spec as a reference allows us to focus on the design and implementation of the tokens themselves, rather than the underlying color science.</p>
</aside>

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

For more information on the sRGB color space, see [[[srgb]]].

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

For more information on the sRGB linear color space, see [[[srgb]]].

### HSL

HSL is a [=color model=] that is a polar transformation of sRGB, supported as early as CSS Color Level 3.

#### Components

`[Hue, Saturation, Lightness]`

- Hue: A number from `0` up to (but not including) `360`, but representing the [=hue=] angle of the color on the color wheel.
- Saturation: A number between `0` and `100` representing the percentage of color [=saturation=].
- Lightness: A number between `0` and `100` representing the percentage of [=lightness=].

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

For more information on the HSL color space, see [[[hsl]]].

### HWB

Another [=color model=], a polar transformation of sRGB.

#### Components

`[Hue, Whiteness, Blackness]`

- Hue: A number from `0` up to (but not including) `360` representing the angle of the color on the color wheel.
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

For more information on the HWB color space, see [HWB — A More Intuitive Hue-Based Color Model](http://alvyray.com/Papers/CG/HWB_JGTv208.pdf).

### CIELAB

CIELAB is a color space that is designed to be perceptually uniform.

#### Components

`[L, A, B]`

- L: A number between `0` and `100` representing the percentage of lightness of the color.
- A: A signed number representing the green-red axis of the color.
- B: A signed number representing the blue-yellow axis of the color.

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

For more information on the CIELAB color space, see [[[cielab]]].

### LCH

LCH is a cylindrical representation of CIELAB.

#### Components

`[L, C, Hue]`

- L: A number between `0` and `100` representing the percentage of lightness of the color.
- C: A number representing the chroma of the color.
- Hue: A number from `0` up to (but not including) `360` representing the angle of the color on the color wheel.

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

For more information on the LCH color space, see [the CIELAB and LCH section of CSS Color Module Level 4](https://www.w3.org/TR/css-color-4/#cie-lab).

### OKLAB

OKLAB is a perceptually uniform [=color space=] that is designed to be more accurate than CIELAB.

#### Components

`[L, A, B]`

- L: A number between `0` and `1` representing the lightness of the color.
- A: A signed number representing the green-red axis of the color.
- B: A signed number representing the blue-yellow axis of the color.

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

For more information on the OKLAB color space, see [OKLAB: A Perceptually Uniform Color Space](https://bottosson.github.io/posts/oklab/).

### OKLCH

OKLCH is a cylindrical [=color model=] of OKLAB.

#### Components

`[L, Chroma, Hue]`

- L: A number between `0` and `1` representing the lightness of the color.
- Chroma: A number representing the chroma of the color.
- Hue: A number from `0` up to (but not including) `360` representing the angle of the color on the color wheel.

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

For more information on the OKLCH color space, see [OKLAB: A Perceptually Uniform Color Space](https://bottosson.github.io/posts/oklab/).

### Display P3

Display P3 is a [=color space=] that is designed to be used in displays with a wide color [=gamut=]. It is based on the P3 color space used in digital cinema.

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

For more information on the Display P3 color space, see [the definition of Display P3](https://www.color.org/chardata/rgb/DisplayP3.xalter).

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

To learn more about the A98 color space, see the [Adobe RGB color space article on Wikipedia](https://en.wikipedia.org/wiki/Adobe_RGB_color_space).

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

For more information on the ProPhoto RGB color space, see [Design and Optimization of the ProPhoto RGB Color Encodings
](https://www.realtimerendering.com/blog/2011-color-and-imaging-conference-part-vi-special-session/).

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

For more information on the Rec 2020 color space, see [[[Rec.2020]]].

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
      "colorSpace": "xyz-d65",
      "components": [0.5929, 0.2848, 0.9699],
      "alpha": 1,
      "hex": "#ff00ff"
    }
  }
}
```

</aside>

For more information on the XYZ-D65 color space, see [[[COLORIMETRY]]].

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

For more information on the XYZ-D50 color space, see [[[COLORIMETRY]]].

## Future color space support

Future versions of this spec may add support for additional color spaces, depending on adoption and support in design tools.
