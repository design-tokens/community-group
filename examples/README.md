# Example design token files

**Warning**: The files within this directory are examples based on a **very early draft** of our eventual format specification. They are only intended to illustrate some concepts we are exploring. Every aspect of them may change!

---

- **`01-flat-untyped-tokens.json`**:
  - Each token has a `"value"` property which has either an explicit value (e.g. `"#fff000"`) or a reference to another token (in the form `"{other-token-name}"`).
  - There is no explicit type information, values like `"#ff0000"` and `"1px"` are just JSON strings.
