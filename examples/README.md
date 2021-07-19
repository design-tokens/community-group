# Example design token files

**Warning**: The files within this directory are examples based on a **very early draft** of our eventual format specification. They are only intended to illustrate some concepts we are exploring. Every aspect of them may change!

---

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
