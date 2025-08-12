# Syntax

## &lt;token-defs&gt;

An array consisting of:

- `string` which MUST be a valid URI pointing to a valid Tokens JSON file, or
- Inline objects that MUST follow the JSON format.

Any other inputs are invalid.

The array order is significant, where the files are merged in order. In case of a conflict, the last value in the array will overwrite any previous values.

<aside class="example">

```json
[
  "base/colors.json",
  "theme/light.json",
  {
    "color": {
      "base": {
        "blue": {
          "100": {
            "$type": "color",
            "$value": { "colorSpace": "srgb", "components": [0, 0, 0.9] }
          }
        }
      }
    }
  },
  "base/size.json",
  "base/typography.json"
]
```

</aside>
