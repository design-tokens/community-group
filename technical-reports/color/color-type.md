# Color type

## Format

Colors can be represented through various formats. For color tokens, the `$type` property MUST be set to the string `color`. The `$value` property can then be used to specify the details of the color, including color space, alpha settings, and more. The `$value` object contains the following properties:

- `$hex` (required): the hex color to use as the default or a guaranteed fallback
- `$colorSpace` (optional): An object detailing an alternative color space to be used to interpret the color, if supported

The `$colorSpace` object has the following properties:

- `$name` (required): the name of the color space (either rgb, srgb, hsl, or lch)
- `$components` (required): the non-alpha pieces of the color, listed as an array of floating-point numbers or integers
- `$alpha` (optional): the alpha component of the color, listed as a floating-point number integer in the range of 0 to 1. If omitted, color is assumed to be fully opaque

## Hex - required support

For the color value, the required fallback format to represent color through design tokens is a [hex triplet/quartet](https://www.w3.org/TR/css-color-4/#typedef-hex-color) value. A hex triplet is a 6-digit, 24 bit, hexadecimal number that represents Red, Green, and Blue values as `#RRGGBB`. An eight-character hex will include the alpha value in the last 2 characters. If no alpha value is specified, it is assumed the color if fully opaque.

For the initial version of this spec, we expect tools to support Hex values, at minimum. The `$value` property is an object that MUST include a `$hex` property containing a hex value, including the preceding `#` character. To support other color spaces, such as HSL, additional properties can be specified, as demonstrated below.

| Pros                                       | Cons                                   |
| ------------------------------------------ | -------------------------------------- |
| Easily recognized among tools and browsers | Cannot specify alpha value for opacity |

For example, initially color tokens may be defined as such:

<aside class="example">

```json
{
  "Majestic magenta": {
    "$type": "color",
    "$value": {
      "$hex": "#ff00ff"
    }
  },
  "Translucent shadow": {
    "$type": "color",
    "$value": {
      "$hex": "#00000080"
    }
  }
}
```

</aside>

Then, the output file may look something like:

<aside class="example">

```scss
// colors-hex.scss
$majestic-magenta: #ff00ff;
$translucent-shadow: #00000080;
```

</aside>

## Other color space options

### sRGB

Formatted in R (red), G (green), B (blue) and (A) alpha. Red, green, and blue values can range from `0` to `255`, and the alpha value ranges from `0` to `1` (such as `0.5`) or a percentage (such as `50%`) where `1` or `100%` is full opacity.

| Pros                                          | Cons                                                                                                                                                                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can define alpha value with color directly    | It is not perceptually uniform, and is difficult to create variants (lighter or darker, more or less vivid etc) by tweaking its parameters. [Learn more about RGBA issues.](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/) |
| Alpha value is easy to comprehend at a glance |                                                                                                                                                                                                                                               |

For example, initially color tokens may be defined as such:

<aside class="example">

```json
{
  "Majestic magenta": {
    "$type": "color",
    "$value": {
      "$hex": "#c44587",
      "$colorSpace": {
        "name": "srgb",
        "$components": [196, 69, 135]
      }
    }
  },
  "Simple sage": {
    "$type": "color",
    "$value": {
      "$hex": "#b4d8a7",
      "$colorSpace": {
        "name": "srgb",
        "$components": [180, 216, 167],
        "$alpha": 0.75
      }
    }
  }
}
```

</aside>

Then, the output from a tool’s conversion to RGBA may look something like:

<aside class="example">

```scss
// colors-rgba.scss
$majestic-magenta: rgba(196, 69, 135, 1);
$simple-sage: rgba(180, 216, 167, 0.75);
```

</aside>

### HSL

Formatted in H (hue), S (saturation), L (lightness) and an optional (A) alpha. Hue ranges from `0` to `360`, saturation and lightness are percentage values that range from `0` to `1`, where `0.5` would equal `50%`. The optional alpha value also ranges from `0` to `1` (such as `0.8`) where `1` is full opacity (which is the default value if a value isn’t provided).

| Pros                                                  | Cons                                                                                                                    |
| ----------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| It is easy to understand and compare to other formats | Alpha parameter is not supported in all browsers [(IE 11)](https://caniuse.com/mdn-css_types_color_hsl_alpha_parameter) |

<aside class="example">

```json
{
  "Majestic magenta": {
    "$type": "color",
    "$value": {
      "$hex": "#c44587",
      "$colorSpace": {
        "name": "hsl",
        "$components": [329, 0.52, 0.52]
      }
    }
  },
  "Simple sage": {
    "$type": "color",
    "$value": {
      "$hex": "#b4d8a7",
      "$colorSpace": {
        "name": "hsl",
        "$components": [104, 0.39, 0.75],
        "$alpha": 0.75
      }
    }
  }
}
```

</aside>

Then, the output variables may look like:

<aside class="example">

```scss
// colors-hsl.scss
$majestic-magenta: hsl(329, 52%, 52%);
$simple-sage: hsl(104, 39%, 74%, 0.75);
```

</aside>

### Hex8

Hex8 uses two extra digits, known as the alpha value, to change the transparency of the color. The format follows `#RRGGBBAA`. [Learn more about alpha values in hex codes](https://www.digitalocean.com/community/tutorials/css-hex-code-colors-alpha-values#adding-an-alpha-value-to-css-hex-codes).

| Pros                              | Cons                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Can define alpha value with color | Less commonly used                                                                                           |
|                                   | Alpha value is not immediately obvious (needs calculation)                                                   |
|                                   | Not available in older versions of Internet Explorer ([caniuse reference](https://caniuse.com/css-rrggbbaa)) |

<aside class="example">

```json
{
  "Majestic magenta": {
    "$type": "color",
    "$value": {
      "$hex": "#c4458780"
    }
  },
  "Simple sage": {
    "$type": "color",
    "$value": {
      "$hex": "#b4d8a780"
    }
  }
}
```

</aside>

Then, the output variables may look like:

<aside class="example">

```scss
// colors-hex.scss
$majestic-magenta: #c4458780;
$simple-sage: #b4d8a780;

// colors-rgba.scss
$majestic-magenta: rgba(196, 69, 135, 0.5);
$simple-sage: rgba(180, 216, 167, 0.5);
```

</aside>

### LCH (Lightness Chroma Hue)

Formatted in L (lightness), C (chroma), H (hue) and an optional (A) alpha. Hue ranges from `0` to `360`, saturation and lightness are percentage values that range from `0%` to `100%`, and the optional alpha value ranges from `0` and `1` (such as `0.5`) or as a percentage (such as `50%`) where `1` or `100%` is full opacity (which is the default value if a value isn’t provided).

| Pros                                       | Cons                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| Access to 50% more colors (P3 color space) | Colors more perceptually uniform, so it can be harder to distinguish values |

---

## Future color type support

The initial version of the Design Token format will focus on widely-supported color spaces (such as Hex, RGB, HSL, and Hex8). Support for Hex is required, while other format options are optional.

### Backwards compatibility

While future versions of this spec may add support for color spaces like LCH, OKLCH, OKLAB, CAM16, Display P-3, etc., using these color spaces may result in a lack of support from tools. We plan to rely on a Hex back-up when colors need to be downgraded due to lack of support. Please keep this in mind when defining tokens in these more experimental color spaces.
