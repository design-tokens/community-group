# Types

Many tools need to know what kind of value a given token represents to process it sensibly. Translation tools MAY need to convert or format tokens differently depending on their type. [=Design tools=] MAY present the user with different kinds of input when editing tokens of a certain type (such as color picker, slider, text input, etc.). Style guide generators MAY use different kinds of previews for different types of tokens.

This spec defines a number of design-focused types and every design token MUST use one of these types. Furthermore, that token's value MUST then follow rules and syntax for the chosen type as defined by this spec.

A token's type can be set directly by giving it a `$type` property specifying the chosen type. Alternatively, it can inherit a type from one of its parent groups, or be an alias of a token that has the desired type.

If no explicit type has been set for a token, tools MUST consider the token invalid and not attempt to infer any other type from the value.

If an explicit type is set, but the value does not match the expected syntax then that token is invalid and an appropriate error SHOULD be displayed to the user. To put it another way, the `$type` property is a declaration of what kind of values are permissible for the token. (This is similar to typing in programming languages like Java or TypeScript, where a value not compatible with the declared type causes a compilation error).

## Color

Represents a color in the UI. For details on how to represent colors, see the [Color](../color) module.

## Dimension

Represents an amount of distance in a single dimension in the UI, such as a position, width, height, radius, or thickness. The `$type` property MUST be set to the string `dimension`. The value MUST be an object containing a numeric `value` (integer or floating-point) and `unit` of measurement (`"px"` or `"rem"`).

| Key     |   Type   | Required | Description                                                        |
| :------ | :------: | :------: | :----------------------------------------------------------------- |
| `value` | `number` |    Y     | An integer or floating-point value representing the numeric value. |
| `unit`  | `string` |    Y     | Unit of distance. Supported values: `"px"`, `"rem"`.               |

For example:

<aside class="example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "spacing-stack-0": {
    "$value": {
      "value": 0,
      "unit": "px"
    },
    "$type": "dimension"
  },
  "spacing-stack-1": {
    "$value": {
      "value": 0.5,
      "unit": "rem"
    },
    "$type": "dimension"
  }
}
```

</aside>

### Validation

- `$value.unit` may only be `"px"` or `"rem"`.
  - **px**: Represents an idealized pixel on the viewport. The equivalent in Android is `dp` and iOS is `pt`. Translation tools SHOULD therefore convert to these or other equivalent units as needed.
  - **rem**: Represents a multiple of the system's default font size (which MAY be configurable by the user). 1rem is 100% of the default font size. The equivalent of 1rem on Android is 16sp. Not all platforms have an equivalent to rem, so translation tools MAY need to do a lossy conversion to a fixed px size by assuming a default font size (usually 16px) for such platforms.
- `$value.unit` is still required even if `$value.value` is `0`.

## Font family

<div class="issue" data-number="53">

A naive approach like the one below may be appropriate for the first stage of the specification, but this could be more complicated than it seems due to platform/OS/browser restrictions.

</div>

Represents a font name or an array of font names (ordered from most to least preferred). The `$type` property MUST be set to the string `fontFamily`. The value MUST either be a string value containing a single font name or an array of strings, each being a single font name.

For example:

<aside class="example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "Primary font": {
    "$value": "Comic Sans MS",
    "$type": "fontFamily"
  },
  "Body font": {
    "$value": ["Helvetica", "Arial", "sans-serif"],
    "$type": "fontFamily"
  }
}
```

</aside>

## Font weight

Represents a font weight. The `$type` property MUST be set to the string `fontWeight`. The value must either be a number value in the range [1, 1000] or one of the pre-defined string values defined in the table below.

Lower numbers represent lighter weights, and higher numbers represent thicker weights, as per the [OpenType `wght` tag specification](https://docs.microsoft.com/en-us/typography/opentype/spec/dvaraxistag_wght). The pre-defined string values are aliases for specific numeric values. For example `100`, `"thin"` and `"hairline"` are all the exact same value.

| numeric value | string value aliases         |
| ------------- | ---------------------------- |
| `100`         | `thin`, `hairline`           |
| `200`         | `extra-light`, `ultra-light` |
| `300`         | `light`                      |
| `400`         | `normal`, `regular`, `book`  |
| `500`         | `medium`                     |
| `600`         | `semi-bold`, `demi-bold`     |
| `700`         | `bold`                       |
| `800`         | `extra-bold`, `ultra-bold`   |
| `900`         | `black`, `heavy`             |
| `950`         | `extra-black`, `ultra-black` |

Number values outside of the [1, 1000] range and any other string values, including ones that differ only in case, are invalid and MUST be rejected by tools.

Example:

<aside class="example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "font-weight-default": {
    "$value": 350,
    "$type": "fontWeight"
  },
  "font-weight-thick": {
    "$value": "extra-bold",
    "$type": "fontWeight"
  }
}
```

</aside>

## Duration

Represents the length of time in milliseconds an animation or animation cycle takes to complete, such as 200 milliseconds. The `$type` property MUST be set to the string `duration`. The value MUST be an object containing a numeric `value` (either integer or floating-point) and a `unit` of milliseconds (`"ms"`) or seconds (`"s"`). A millisecond is a unit of time equal to one thousandth of a second.

| Key     |   Type   | Required | Description                                                          |
| :------ | :------: | :------: | :------------------------------------------------------------------- |
| `value` | `number` |    Y     | An integer or floating-point value representing the numeric value.   |
| `unit`  | `string` |    Y     | Unit of time. Supported values: `"ms"` (millisecond), `"s"`(second). |

For example:

<aside class="example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "Duration-Quick": {
    "$value": {
      "value": 100,
      "unit": "ms"
    },
    "$type": "duration"
  },
  "Duration-Long": {
    "$value": { "value": 1.5, "unit": "s" },
    "$type": "duration"
  }
}
```

</aside>

### Validation

- `$value.unit` may only be `"ms"` or `"s"`

## Cubic Bézier

Represents how the value of an animated property progresses towards completion over the duration of an animation, effectively creating visual effects such as acceleration, deceleration, and bounce. The `$type` property MUST be set to the string `cubicBezier`. The value MUST be an array containing four numbers. These numbers represent two points (P1, P2) with one x coordinate and one y coordinate each [P1x, P1y, P2x, P2y]. The y coordinates of P1 and P2 can be any real number in the range [-∞, ∞], but the x coordinates are restricted to the range [0, 1].

For example:

<aside class="example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "Accelerate": {
    "$value": [0.5, 0, 1, 1],
    "$type": "cubicBezier"
  },
  "Decelerate": {
    "$value": [0, 0, 0.5, 1],
    "$type": "cubicBezier"
  }
}
```

</aside>

## Number

Represents a number. Numbers can be positive, negative and have fractions. Example uses for number tokens are [gradient stop positions](composite-types#gradient) or unitless line heights. The `$type` property MUST be set to the string `number`. The value MUST be a JSON number value.

<aside class="example">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/format.json",
  "line-height-large": {
    "$value": 2.3,
    "$type": "number"
  }
}
```

</aside>

<section class="informative">

## Additional types

Types still to be documented here are likely to include:

- **Font style:** might be an enum of allowed values like ("normal", "italic"...)
- **Percentage/ratio:** e.g. for opacity values, relative dimensions, aspect ratios, etc.
  - Not 100% sure about this since these are really "just" numbers. An alternative might be that we expand the permitted syntax for the "number" type, so for example "1:2", "50%" and 0.5 are all equivalent. People can then use whichever syntax they like best for a given token.
- **File:** for assets - might just be a relative file path / URL (or should we let people also express the mime-type?)

</section>
