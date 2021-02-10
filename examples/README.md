# Example design token files

**Warning**: The files within this directory are examples based on a **very early draft** of our eventual format specification. They are only intended to illustrate some concepts we are exploring. Every aspect of them may change!

---

- **`01-flat-untyped-tokens.json`**:
  - Each token has a `"value"` property which has either an explicit value (e.g. `"#fff000"`) or a reference to another token (in the form `"{other-token-name}"`).
  - There is no explicit type information, values like `"#ff0000"` and `"1px"` are just JSON strings.
- **`02-grouped-untyped-tokens.json`**:

  - Same as `01-flat-untyped-tokens.json`, except that the tokens have now been nested into groups.
  - Note: For cases where one of a group of related tokens didn't have a suffix, one has been added. For example:

    ```jsonc
    {
      // Flat:
      "color_accent_strong": {
        /*...*/
      },
      "color_accent": {
        /*...*/
      },
      "color_accent_weak": {
        /*...*/
      },

      // Grouped:
      "color": {
        "accent": {
          "strong": {
            /* ... */
          },
          "normal": {
            /* ... */
          },
          "weak": {
            /* ... */
          }
        }
      }
    }
    ```

- **`03-grouped-typed-tokens.json`**:
  - Same as `01-flat-untyped-tokens.json`, except that tokens with values now have an additional `type` property which explicitly sets their type to one of the ones defined in our spec. In some cases, the corresponding values have been tweaked to match the syntax mandated by the draft spec.
  - Alias tokens inherit the type of the token they reference.
