# Types

Many tools need to know what kind of value a given token represents to process it sensibly. Export tools may need to convert or format tokens differently depending on their type. Design tools may present the user with different kinds of input when editing tokens of a certain type (such as color picker, slider, text input, etc.). Style guide generators may use different kinds of previews for different types of tokens.

Since design token files are JSON files, all the basic JSON types are available:

- String
- Number
- Object
- Array
- Boolean
- Null

Additionally, this spec defines a number of more design-focused types. To set a token to one of these types, it MUST have a type property specifying the chosen type. Furthermore, that token's value must then follow rules and syntax for the chosen type as defined by this spec.

If the `type` property is absent, tools MUST treat values as one of the basic JSON types and not attempt to infer any other type from the value.

If a `type` is set, but the value does not match the expected syntax then that token is invalid and an appropriate error should be displayed to the user. To put it another way, the `type` property is a declaration of what kind of values are permissible for the token. (This is similar to typing in programming languages like Java or TypeScript, where a value not compatible with the declared type causes a compilation error).

## Color

Represents a 24bit RGB or 24+8bit RGBA color in the sRGB color space. The `type` property must be set to the string "color". The value must be a string containing a hex triplet/quartet including the preceding # character. To support other color spaces, such as HSL, export tools should convert color tokens to the equivalent value as needed.

For example, initially the color tokens may be defined as such:

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

Then, the output from a tool's conversion to HSL(A) may look something like:

<aside class="example">

```scss
// colors-hex.scss
$majestic-magenta: #ff00ff;
$translucent-shadow: #00000080;

// colors-hsl.scss
$majestic-magenta: hsl(300, 100%, 50%);
$translucent-shadow: hsla(300, 100%, 50%, 0.5);
```

</aside>

## Dimension

Represents an amount of distance in a single dimension in the UI, such as a position, width, height, radius, or thickness. The `type` property must be set to the string "dimension". The value must be a string containing a number (either integer or floating-point) followed by either a "px" or "rem" unit (future spec iterations may add support for additional units).

For example:

<aside class="example">

```json
{
  "spacingStack1X": {
    "value": "0.25rem",
    "type": "dimension"
  }
}
```

</aside>

The "px" and "rem" units are to be interpreted the same way they are in CSS:

- **px**: Represents an idealized pixel on the viewport. The equivalent in Android is dp and iOS is pt. Export tools should therefore convert to these or other equivalent units as needed.
- **rem**: Represents a multiple of the system's default font size (which may be configurable by the user). 1rem is 100% of the default font size. The equivalent of 1rem on Android is 16sp. Not all platforms have an equivalent to rem, so export tools may need to do a lossy conversion to a fixed px size by assuming a default font size (usually 16px) for such platforms.

## Font name

<div class="issue" data-number="53">

A naive approach like the one below may be appropriate for the first stage of the specification, but this may be more complicated than it seems due to platform/OS/browser restrictions.

</div>

Represents a font name or an array of font names (ordered from most to least preferred). The `type` property must be set to the string "font". The value must either be a string value containing a single font name or an array of strings, each being a single font name.

For example:

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

## Duration

Represents the length of time in milliseconds an animation or animation cycle takes to complete, such as 200 milliseconds. The `type` property must be set to the string "duration". The value must be a string containing a number (either integer or floating-point) followed by an "ms" unit. A millisecond is a unit of time equal to one thousandth of a second.

For example:

<aside class="example">

```json
{
  "Duration-100": {
    "value": "100ms",
    "type": "duration"
  },
  "Duration-200": {
    "value": "200ms",
    "type": "duration"
  }
}
```

</aside>

## Cubic Bézier

Represents how the value of an animated property progresses towards completion over the duration of an animation, effectively creating visual effects such as acceleration, deceleration, and bounce. The `type` property must be set to the string "cubic-bezier". The value must be an array containing four numbers. These numbers represent two points (P1, P2) with one x coordinate and one y coordinate each [P1x, P1y, P2x, P2y]. The y coordinates of P1 and P2 can be any real number in the range [-∞, ∞], but the x coordinates are restricted to the range [0, 1].

For example:

<aside class="example">

```json
{
  "Accelerate": {
    "value": [0.5, 0, 1, 1],
    "type": "cubic-bezier"
  },
  "Decelerate": {
    "value": [0, 0, 0.5, 1],
    "type": "cubic-bezier"
  }
}
```

</aside>

## Additional types

<div class="ednote" title="Additional types">
Types still to be documented here are likely to include:

- **Font weight:** might be something like an enum of allowed values ("bold", "normal" etc.) and/or numeric values 0-1000 (like in variable fonts)
- **Font style:** might be an enum of allowed values like ("normal", "italic"...)
- **Border style/stroke style:** maybe an enum (solid, dashed, dotted, etc.) and/or a way to specify dash & gap lengths?
- **Duration:** a time duration, in seconds or milliseconds, e.g. for animations, delays, etc.
- **Percentage/ratio:** e.g. for opacity values, relative dimensions, aspect ratios, etc.
  - Not 100% sure about this since these are really "just" numbers. An alternative might be that we expand the permitted syntax for the "number" type, so for example "1:2", "50%" and 0.5 are all equivalent. People can then use whichever syntax they like best for a given token.
- **File:** for assets - might just be a relative file path / URL (or should we let people also express the mime-type?)
- **Easing definitions:** for animation
</div>
