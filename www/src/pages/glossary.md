---
title: Design Tokens Glossary
pageTitle: '<abbr title="Design Tokens Community Group">DTCG</abbr> Glossary'
layout: ../layouts/Markdown.astro
---

This glossary contains high-level definitions, leaving out technical details on purpose. Part of the DTCG's mission is to write those technical definitions in the form of specifications.

## A

### Alias

A token value that is a reference to another token.

#### Example

The value of `color.text.primary` is `#000000`, because it references `color.palette.black`:

```json
{
  "color": {
    "palette": {
      "black": {
        "$type": "color",
        "$value": "#000000"
      }
    },
    "text": {
      "primary": {
        "$type": "color",
        "$value": "{color.palette.black}"
      }
    }
  }
}
```

## C

### Composite design tokens

A design token whose value is made up of multiple, named child values. Composite tokens are useful for closely related style properties that are always applied together.

#### Examples

- **Typography:** font name, font size, line height, and color
- **Border:** color, width, and style
- **Gradient:** linear/radial, at least 2 colors, a direction
- **Shadow:** x-direction, y-direction, color, blur, spread

### Composition

An ordered array of sets and modifiers that determines how tokens are combined to produce the final result. The order is significant, with tokens later in the array overriding any tokens that came before them in case of conflict.

### Context

A specific condition within a modifier that determines which tokens to apply. Each context maps to a set of token values.

#### Examples

- In a theme modifier: "light", "dark", "lightHighContrast"
- In a size modifier: "mobile", "tablet", "desktop"

## D

### Design token

The single source of truth to name and store a design decision, distributed so teams can use it across design tools and coding languages.

#### Examples

- text-color-primary
- font-size-title

### Design token file

A JSON file containing design tokens, typically using the `.tokens` or `.tokens.json` file extension. Design token files use the media type `application/design-tokens+json` or `application/json`.

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

### Documentation tool

A tool for documenting design token usage and presenting tokens to teams.

#### Examples

- Storybook
- Zeroheight
- Backlight
- Supernova
- Knapsack

## G

### Group

Author-defined categorizations applied to related sets of tokens.

#### Examples

- A brand color palette
- A list of viewport sizes
- A component’s themeable style properties.

## I

### Input

A JSON-serializable object passed to a resolver that specifies which context values to use for each modifier, determining which resolution will be produced.

#### Example

```json
{ "theme": "dark", "size": "mobile" }
```

## M

### Modifier

A conditional set of design tokens that can be applied based on context. Modifiers allow for conditional inclusion of tokens via contexts (such as "light" or "dark" themes, "mobile" or "desktop" sizes).

#### Examples

- **Theme modifier:** light, dark, high contrast
- **Size modifier:** mobile, tablet, desktop
- **Debug mode:** enabled or disabled

## N

### Name

A label assigned to a design decision.

## P

### Property

Additional data describing the token’s value or the token as a whole.

#### Examples

- [Type](#Type)
- Description
- Extensions

## R

### Reference

See [A](#Alias).

### Resolution

A single possible permutation of a resolver document. Each resolution maps to a specific input and produces a final set of tokens and token values.

#### Example

A resolver with a theme modifier (light/dark) and a size modifier (mobile/desktop) can produce 4 different resolutions: light-mobile, light-desktop, dark-mobile, and dark-desktop.

### Resolver

A JSON document that extends the design tokens format to work with tokens in multiple contexts. A resolver combines multiple token sets and applies conditional logic through modifiers to produce different token outputs based on input parameters.

#### Example

A resolver can load different color tokens for "light" vs "dark" themes, different size tokens for "mobile" vs "desktop" devices, or enable debug tokens based on a flag.

### Resolver file

A JSON file with the `.resolver.json` extension that contains sets, modifiers, and composition rules for generating context-specific design tokens.

## S

### Schema

Rules for writing tokens that are used to determine if the syntax is valid.

### Set

A collection of design tokens in DTCG format. Sets can contain tokens declared directly inline, references to JSON files containing design tokens, or any combination of the two.

## T

### Translation tool

A tool that translates token data from one format to another (such as converting design token files to CSS custom properties, Sass variables, Swift code, etc.).

#### Examples

- Style Dictionary
- Terrazzo

### Type

A predefined classification applied to a token's value. Token tools can use types to infer the purpose of a token and convert values into the correct platform-specific format.

#### Examples

- Color
- Dimension
- Duration
- Font family

#### Usage

- A translation tool might use a token's type to convert the value into the correct platform-specific format
- A design tool might use type to present tokens in the appropriate part of their UI (color tokens in the color picker, font tokens in text styling, etc.)

## V

### Value

A context-specific value assigned to a design token name.

#### Examples

- a hex or rgb color
- a px, rem, or sp font size

### Variable

Generic term describing the most common way (but not the only way) a design token is formatted and used in code.

#### Examples

- CSS custom property
- Sass variable
- JavaScript variable
- Android resource

### Vendor

Company shipping design tool(s), in a position to implement the design token specification, such as Adobe, Framer, UXPin, Figma, Sketch, and many others.
