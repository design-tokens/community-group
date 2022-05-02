# Terminology

These definitions are focused on the technical aspects of the specification, aimed at implementers such as [=design tool=] vendors. Definitions for designers and developers are available at [designtokens.org](https://www.designtokens.org/glossary/).

## (Design) Token

Information associated with a name, at minimum a name/value pair.

Few examples:

- `color-text-primary: #000000;`
- `font-size-heading-level-1: 44px;`

The name may be associated with additional [Token Properties](#design-token-properties).

<h2 id="design-token-properties">(Design) Token Properties</h2>

Information associated with a token name.

For example:

- Value
- Type
- Metadata
- Description

## <dfn>Design tool</dfn>

Visual design creation and editing tools.

This includes:

- Bitmap image manipulation programs:
  - Photoshop
  - Affinity Photo
  - Paint.net
- Vector graphics tools:
  - Illustrator
  - Inkscape
- UI design and prototyping tools:
  - Adobe XD
  - UXPin
  - Sketch
  - Figma
  - ...

## <dfn>Translation tool</dfn>

Token translation tools are tools that translate token data from one format to another.

Few examples:

- [Theo](https://github.com/salesforce-ux/theo)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Diez](https://diez.org/)
- [Specify](https://specifyapp.com/)

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

## Groups

Sets of tokens belonging to a specific category.

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
