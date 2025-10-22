---
title: Design Tokens Glossary
pageTitle: '<abbr title="Design Tokens Community Group">DTCG</abbr> Glossary'
layout: ../layouts/Markdown.astro
---

<!-- cSpell:words gradial -->

This glossary contains high-level definitions, leaving out technical details on purpose. Part of the DTCG's mission is to write those technical definitions in the form of specifications.

## C

### Composite design tokens

Composite design tokens contain values that represent more than one design decision.

#### Examples

- **Text Style:** composed of font size, weight, family, line height, and letter-spacing
- **Border:** composed of color, width, and style
- **Gradient:** linear/gradial, at least 2 colors, a direction
- **Shadow:** x-direction, y-direction, color, blur, spread

## D

### Design token

The single source of truth to name and store a design decision, distributed so teams can use it across design tools and coding languages.

### Design token alias

A token value that is a reference to another token.

#### Example

- color.text.primary’s value uses an alias:

```json
color.palette.black: #000000
color.text.primary: ${color.palette.black}
```

### Design token name

A label assigned to a design decision.

#### Examples

- text-color-primary
- font-size-title

### Design token group

Author-defined categorizations applied to related sets of tokens.

#### Examples

- A brand color palette
- A list of viewport sizes
- A component’s themeable style properties.

### Design token properties

Additional data describing the token’s value or the token as a whole.

#### Examples

- [Design token type](#design-token-type)
- Description
- Metadata
- Vendor

### Design token schema

Rules for writing tokens that are used to determine if the syntax is valid.

### Design token translation tool

A tool that translates token sets from one format (such as YAML) to a range of other formats (such as CSS custom properties, Sass, Swift, Sketch palettes…).

#### Examples

- Style Dictionary
- Terrazzo
- Theo

### Design token type

A classification applied to the **value** of a token.

#### Examples

- Color
- Size
- Font

### Design token value

A context-specific value assigned to a design token name.

#### Examples

- a hex or rgb color
- a px, rem, or sp font size

### Design tool

A tool for visual design creation and editing.

#### Examples

- Photoshop
- Illustrator
- Inkscape
- UXPin
- Sketch
- Figma
- Marvel

## V

### Variable

Generic term describing the most common way (but not the only way) a design token is formatted and used in code.

### Vendor

Company shipping design tool(s), in a position to implement the design token specification, such as Adobe, Framer, UXPin, Figma, Sketch, and many others.

#### Examples

- CSS custom property
- Sass variable
- JavaScript variable
- Android resource
