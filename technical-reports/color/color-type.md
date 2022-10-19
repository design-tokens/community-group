# Color type

## Hex - required support

Colors can be represented through various formats. For color tokens, the type property must be set to the string “color”. For the value, the most common format to represent color through design tokens is a hex triplet. A hex triplet is a 6-digit, 24 bit, hexadecimal number that represents Red, Green, and Blue values as `#RRGGBB`. For the initial version of this spec, we expect tools to support Hex values, at minimum.

| Pros                                       | Cons                                   |
| ------------------------------------------ | -------------------------------------- |
| Easily recognized among tools and browsers | Cannot specify alpha value for opacity |

For example, initially color tokens may be defined as such:

<aside class="example">

```json
{
  "Majestic magenta": {
    "value": "#ff00ff",
    "type": "color"
  },
  "Simple sage": {
    "value": "#abcabc",
    "type": "color"
  }
}
```

</aside>

Then, the output from a tool’s conversion to HSL may look something like:

<aside class="example">

```scss
// colors-hex.scss
$majestic-magenta: #ff00ff;
$simple-sage: #abcabc;

// colors-hsl.scss
$majestic-magenta: ​hsl(300, 100%, 50%);
$translucent-shadow: ​hsl(153, 23%, 73%);
```

</aside>

## Other value options

### RGBA

Formatted in R (red), G (green), B (blue) and (A) alpha. Red, green, and blue values can range from 0 to 255 and alpha values can range from 0 and 1 (i.e 0.5) or a percentage (i.e 50%) where 1 or %100 is full opacity.

| Pros                                          | Cons                                                                                                                                                                                                                                          |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Can define alpha value with color directly    | It is not perceptually uniform, and is difficult to create variants (lighter or darker, more or less vivid etc) by tweaking its parameters. [Learn more about RGBA issues.](https://lea.verou.me/2020/04/lch-colors-in-css-what-why-and-how/) |
| Alpha value is easy to comprehend at a glance |                                                                                                                                                                                                                                               |

For example, initially color tokens may be defined as such:

<aside class="example">

```json
{
  "Majestic magenta": {
    "value": {
      "red": 255,
      "green": 0,
      "blue": 255,
      "alpha": 1
    },
    "type": "color"
  },
  "Simple sage": {
    "value": {
      "red": 171,
      "green": 202,
      "blue": 188,
      "alpha": "50%"
    },
    "type": "color"
  }
}
```

</aside>

Then, the output from a tool’s conversion to RGBA may look something like:

<aside class="example">

```scss
// colors-rgba.scss
$majestic-magenta: rgba(255, 0, 255, 1);
$translucent-shadow: rgba(171, 202, 188, 50%);
```

</aside>

### HSL

Formatted in H (hue), S (saturation), L (lightness) and an optional (A) alpha. Hue values range from 0 to 360, saturation and lightness are percentage values that go from 0% to 100%, and alpha value can range from 0 and 1 (i.e 0.5) or a percentage (i.e 50%) where 1 or 100% is full opacity (which is the default value if a value isn’t provided).

| Pros                                                  | Cons                                  |
| ----------------------------------------------------- | ------------------------------------- |
| It is easy to understand and compare to other formats | Not supported in all browsers (IE 11) |

<aside class="example">

```json
{
  "Majestic magenta": {
    "h": 300,
    "s": "100%",
    "l": "50%",
    "a": "100%",
    "type": "color"
  },
  "Simple sage": {
    "h": 100,
    "s": "27%",
    "l": "57%",
    "a": "100%",
    "type": "color"
  }
}
```

</aside>

Then, the output variables may look like:

<aside class="example">

```scss
// colors-rgba.scss
$majestic-magenta: hsl(300, 100%, 50%, 1);
$simple-sage: hsl(100, 27%, 57%);
```

</aside>

### Hex8

Hex8 uses two extra digits, known as the alpha value, to change the transparency of the color. The format follows `#RRGGBBAA`. [Learn more about alpha values in hex.](https://www.digitalocean.com/community/tutorials/css-hex-code-colors-alpha-values#adding-an-alpha-value-to-css-hex-codes)

| Pros                              | Cons                                                                                                         |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| Can define alpha value with color | Less commonly used                                                                                           |
|                                   | Alpha value is not immediately obvious (needs calculation)                                                   |
|                                   | Not available in older versions of Internet Explorer ([caniuse reference](https://caniuse.com/css-rrggbbaa)) |

<aside class="example">

```json
{
  "Majestic magenta": {
    "value": "#ff00ff80",
    "type": "color"
  },
  "Simple sage": {
    "value": "#abcabc80",
    "type": "color"
  }
}
```

</aside>

Then, the output variables may look like:

<aside class="example">

```scss
// colors-hex.scss
$majestic-magenta: #ff00ff80;
$simple-sage: #abcabc80;

// colors-rgba.scss
$majestic-magenta: rgba(255, 0, 255, 0.5);
$simple-sage: rgba(171, 202, 188, 0.5);
```

</aside>

### LCH (Lightness Chroma Hue)

Formatted in L (lightness), C (chroma), H (hue) and an optional (A) alpha. Hue values range from 0 to 360, saturation and lightness are percentage values that go from 0% to 100%, and alpha value can range from 0 and 1 (i.e., 0.5) or a percentage (i.e., 50%) where 1 or %100 is full opacity (which is the default value if a value isn’t provided).

| Pros                                       | Cons                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------- |
| Access to 50% more colors (P3 color space) | Colors more perceptually uniform, so it can be harder to distinguish values |
|                                            | Limited browser support (Safari only)                                       |

---

## Future color type support

The initial version of the Design Token format will focus on widely-supported color spaces (i.e., Hex, RGB, HSL and Hex8). Support for Hex is required, while other format options are optional.

### Backwards compatibility

While future versions of this spec may add support for color spaces like OKLCH, OKLAB, CAM16, Display P-3, etc., using these color spaces may result in a lack of support from tools. We plan to rely on a Hex back-up when colors need to be downgraded due to lack of support. Please keep this in mind when defining tokens in these more experimental color spaces.
