# Example design token files

**Warning**: The files within this directory are examples based on a **very early draft** of our eventual format specification. They are only intended to illustrate some concepts we are exploring. Every aspect of them may change!

---

## File descriptions
- **`01-flat-structure.json`**:
  - All tokens are defined at the root level.
  - Each token has a `"value"` property which has either an explicit value (e.g. `"#fff000"`) or a reference to another token (in the form `"{other-token-name}"`) and an explicit type.
- **`02-grouped-structure.json`**:
  - Same as above, except that the tokens have now been nested into groups.
- **`03-composite-tokens.json`**:
  - Same as above, except that a composite type (`{my-types.text-style}`) has been defined and the individual tokens within the `text-style` group have been converted into 2 tokens (`heading` and `paragraph`) which are of the `{my-types.text-style}` composite type.
- **`04-group-types.json`**:
  - Same as above, except that groups containing tokens which are all of the same type, have had that type set at the group level. The tokens within then inherit the nearest parent group's type.
  - Functionally, this file is identical to the previous example. However, moving the types to the group level makes it less verbose.

## Example translation to code
### SASS
Export tools should use a token's full path and concatenate the segments to produce a unique variable name. If we assume that the export tool has been configured to:

- kebab-case the concatenated token path to generate the SASS variable name
- dereference aliases

...then we might expect both the 1st and 2nd examples to produce output along these lines:

```scss
$text-style-heading-size: 1.563rem;
$text-style-heading-color: #212529;
$text-style-heading-font: "Helvetica Neue";
$text-style-heading-weight: bold;
$text-style-heading-line-height: 1.2;
```

Note how the values have been automatically converted to appropriate (S)CSS syntax: The size and color are not quoted, but the font name is. The `700` weight has been convered to the more common `bold` keyword equivalent. This is all possible due to the tokens' `type` attribute.

Without any further configuration, an export tool may also produce the above output for the 3rd and 4th examples, where `text-style.heading` is a composite token. This is because for any composite types that the export tool does not have special knowledge of, it can fall back to taking the sub values (`size`, `color`, etc.) and appending those to create individual SASS variables.

However, a user could potentially configure the export tool to convert tokens with the user-defined, composite type `{my-types.text-style}` to SASS mixins (perhaps by supplying a template for the mixin). In that case, the output could become:

```scss
@mixin text-style-heading {
  font-size: 1.563rem;
  color: #212529;
  font-family: "Helvetica Neue";
  font-weight: bold;
  line-height: 1.2;
}
```

