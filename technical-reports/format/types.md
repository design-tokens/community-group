# Types

## Color

<div class="issue">
Should the specification list specific naming patterns (i.e. component-category-property-state) or leave it open-ended, with recommendations?
</div>

Represents a 24bit RGB or 24+8bit RGBA color in the sRGB color space (future spec iterations may add support for other color spaces and/or higher precision). The type property must be set to the string “color”. The value must be a string containing a hex triplet/quartet including the preceding # character. For example:

<aside class="example">

```json
{
  "Majestic magenta": {
    "value": "#ff00ff",
    "type": "color"
  },
  "Translucent shadow": {
    "value": "#00000088",
    "type": "color"
  }
}
```

</aside>

## Dimension

Represents an amount of distance in a single dimension in the UI, such as a position, width, height, radius, or thickness. The type property must be set to the string “dimension”. The value must be a string containing a number (either integer or floating-point) followed by either a “px” or “rem” unit (future spec iterations may add support for additional units). For example:

<aside class="example">

```json
{
  "Majestic magenta": {
    "value": "0.25rem",
    "type": "dimension"
  }
}
```

</aside>

<div class="issue">
What sizing unit(s) make the most sense for implementers to support (pt, px, dp, rem, em, unitless…) as a first step, and in the future?
</div>

The “px” and “rem” units are to be interpreted the same way they are in CSS:

- **px**: Represents an idealized pixel on the viewport. The equivalent in Android is dp and iOS is pt. Export tools should therefore convert to these or other equivalent units as needed.
- **rem**: Represents a multiple of the system’s default font size (which may be configurable by the user). 1rem is 100% of the default font size. The equivalent of 1rem on Android is 16sp. Not all platforms have an equivalent to rem, so export tools may need to do a lossy conversion to a fixed px size by assuming a default font size (usually 16px) for such platforms.

## Font name

<div class="issue">

This may be more complicated than it seems due to platform/OS/browser restrictions. Is a naive approach like the one below appropriate for the first stage of the specification, or should we delay it for a future iteration of the specification?

</div>

Represents a font name or an array of font names (ordered from most to least preferred). The type property must be set to the string “font”. The value must either be a string value containing a single font name or an array of strings, each being a single font name. For example:

<aside class="example">

```json
{
  "Primary font": {
    "value": "Comic Sans MS",
    "type": "font"
  },
  "Body font": {
    "value": ["Helvetica", "Arial"],
    "type": "font"
  }
}
```

</aside>

## Other types (future versions of the specification)

<div class="issue">
For the first iteration of the specification, should any types other than color, dimensions, (and maybe typography) be supported?
</div>

Types still to be documented here are likely to include:

- **Font weight:** might be something like an enum of allowed values ("bold", "normal" etc.) and/or numeric values 0-1000 (like.in variable fonts)
- **Font style:** might be an enum of allowed values like ("normal", "italic"...)
- **Border style/stroke style:** maybe an enum (solid, dashed, dotted, etc.) and/or a way to specify dash & gap lengths?
- **Duration:** a time duration, in seconds or milliseconds, e.g. for animations, delays, etc.
- **Percentage/ratio:** e.g. for opacity values, relative dimensions, aspect ratios, etc.
  - Not 100% sure about this since these are really "just" numbers. An alternative might be that we expand the permitted syntax for the "number" type, so for example "1:2", "50%" and 0.5 are all equivalent. People can then use whichever syntax they like best for a given token.
- **File:** for assets - might just be a relative file path / URL (or should we let people also express the mime-type?)
- **Easing definitions:** for animation
