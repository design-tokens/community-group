# The color type

Represents a 24bit RGB or 24+8bit RGBA color in the sRGB color space. The `$type` property MUST be set to the string `color`. The value MUST be a string containing a hex triplet/quartet including the preceding `#` character. To support other color spaces, such as HSL, translation tools SHOULD convert color tokens to the equivalent value as needed.

For example, initially the color tokens MAY be defined as such:

<aside class="example">

```json
{
  "Majestic magenta": {
    "$value": "#ff00ff",
    "$type": "color"
  },
  "Translucent shadow": {
    "$value": "#00000080",
    "$type": "color"
  }
}
```

</aside>
