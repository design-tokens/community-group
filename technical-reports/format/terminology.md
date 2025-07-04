# Terminology

These definitions are focused on the technical aspects of the specification, aimed at implementers such as [=design tool=] vendors. Definitions for designers and developers are available at [designtokens.org](https://www.designtokens.org/glossary/).

## (Design) Token

A (Design) Token is information associated with a human readable name, at minimum a name/value pair.

For example:

- `color-text-primary: #000000;`
- `font-size-heading-level-1: 44px;`

The name may be associated with additional [Token Properties](#design-token-properties).

<h2 id="design-token-properties">(Design) Token Properties</h2>

Information associated with a token name.

For example:

- Value
- Type
- Description

Additional metadata may be added by tools and design systems to extend the format as needed.

## <dfn>Design tool</dfn>

A design tool is a tool for visual design creation and editing.

For example:

- Bitmap image manipulation programs:
  - [Photoshop](https://www.adobe.com/products/photoshop.html)
  - [Affinity Photo](https://affinity.serif.com/photo)
  - [Paint.net](https://www.getpaint.net/)
- Vector graphics tools:
  - [Illustrator](https://www.adobe.com/products/illustrator.html)
  - [Inkscape](https://inkscape.org/)
- UI design, wireframing and prototyping tools:
  - [Adobe XD](https://www.adobe.com/products/xd.html)
  - [UXPin](https://www.uxpin.com/)
  - [Sketch](https://www.sketch.com/)
  - [Figma](https://www.figma.com/)
  - ...

## <dfn>Translation tool</dfn>

Design token translation tools translate token data from one format to another.

For example:

- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Terrazzo](https://github.com/terrazzoapp/terrazzo)
- ...

## <dfn>Documentation tool</dfn>

A documentation tool is a tool for documenting design tokens usage.

For example:

- [Storybook](https://storybook.js.org/)
- [Zeroheight](https://zeroheight.com)
- [Backlight](https://backlight.dev/)
- [Supernova](https://www.supernova.io/)
- [Knapsack](https://www.knapsack.cloud/)
- ...

## Type

A token's type is a predefined categorization applied to the token's value.

For example:

- Color
- Size
- Duration

Token tools can use Types to infer the purpose of a token.

For example:

- A [=translation tool=] might reference a token's type to convert the source value into the correct platform-specific format.
- A visual [=design tool=] might reference type to present tokens in the appropriate part of their UI - as in, color tokens are listed in the color picker, font tokens in the text styling UI's fonts list, and so on.

## Group

A group is a set of tokens belonging to a specific category.

For example:

- Brand
- Alert
- Layout

Groups are arbitrary and tools SHOULD NOT use them to infer the type or purpose of design tokens.

## Alias (Reference)

A design token's value can be a reference to another token. The same value can have multiple names or _aliases_.

The following Sass example illustrates this concept:

```scss
$color-palette-black: #000000;
$color-text-primary: $color-palette-black;
```

The value of `$color-text-primary` is `#000000`, because `$color-text-primary` _references `$color-palette-black`_. We can also say `$color-text-primary` is an _alias_ for `$color-palette-black.`

## Composite (Design) Token

A design token whose value is made up of multiple, named child values. Composite tokens are useful for closely related style properties that are always applied together. For example, a typography style might be made up of a font name, font size, line height, and color.

Here's [an example of a composite shadow token](https://design-tokens.github.io/community-group/format/#example-composite-token-example):

```json
{
  "shadow-token": {
    "$type": "shadow",
    "$value": {
      "color": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "alpha": 0.5,
          "hex": "#000000"
        }
      },
      "offsetX": { "value": 0.5, "unit": "rem" },
      "offsetY": { "value": 0.5, "unit": "rem" },
      "blur": { "value": 1.5, "unit": "rem" },
      "spread": { "value": 0, "unit": "rem" }
    }
  }
}
```
