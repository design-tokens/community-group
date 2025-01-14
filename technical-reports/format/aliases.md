# Aliases (References)

Instead of having explicit values, tokens can reference the value of another token. To put it another way, a token can be an alias for another token. This spec considers the terms "alias" and "reference" to be synonyms and uses them interchangeably.

Aliases are useful for:

- Expressing design choices
- Eliminating repetition of values in token files (<abbr title="Don’t Repeat Yourself">DRY</abbr>ing up the code)

At any part of the schema, you MAY refer to another part of the schema with an object that has a `$ref` key and a valid [JSON pointer string](https://datatracker.ietf.org/doc/html/rfc6901). This syntax is borrowed from [JSON Schema (2020-12)](https://json-schema.org/draft/2020-12/json-schema-core#name-schema-references).

### Referencing Tokens

You MAY reference values in the same file by starting with the fragment character (`#`) followed by the token path, separated by forward slashes:

<aside class="example">

```json
{
  "color": {
    "blue": {
      "4": { "$value": "#218bff", "$type": "color" }
    },
    "brand": {
      "$description": "Brand color",
      "$ref": "#/color/blue/4"
    }
  }
}
```

`color.brand` aliases `color.blue.4`, and SHOULD always share its value (even at runtime).

</aside>

### Aliasing Non-tokens

It’s not just tokens that may be referenced; any part of the document may be referenced. For example, groups:

<aside class="example">

```json
{
  "color": {
    "gray": {
      "1": { "$value": "#101010", "$type": "color" },
      "2": { "$value": "#202020", "$type": "color" },
      "3": { "$value": "#404040", "$type": "color" },
      "4": { "$value": "#808080", "$type": "color" }
    },
    "grey": { "$ref": "#/color/gray" }
  }
}
```

In this example, `color.grey.1` would be an alias for `color.gray.1`, `color.grey.2` would alias `color.gray.2`, etc.

</aside>

Any group or property (`$type`, `$value`, `$description`, `$extension`, etc.) may all be referenced, so long as the final resolved value results in a valid schema.

### Aliasing Tokens in Other Files

Aliasing tokens from other files is possible by specifing a URL, either relative (`./relative/path.json`) or absolute (`https://example.com/api/v1/tokens.json`).

To only use part of a JSON structure, you MAY use the fragment character (`#`) after the URL, followed by [the token path](#referencing-tokens).

<aside class="example">

```json
{
  "space": {
    "sm": {
      "$description": { "$ref": "./shared.json#/space/sm/$description" },
      "$value": { "$ref": "./shared.json#/space/sm/$value" },
      "$type": { "$ref": "./shared.json#/space/sm/$type" }
    }
  },
  "typography": {
    "$ref": "https://example.com/api/v1/tokens/typography.json"
  }
}
```

</aside>

If there is no `#` character, the entire file will be loaded. So this means files MAY contain partial or incomplete schemas. The same rules apply—it MUST resolve to a valid, complete schema in the end.

## Additional Info

When a tool needs the actual value of a token it MUST resolve all aliases and references, i.e. lookup the token being referenced and fetch its value.

Tooling MUST allow `$ref` to have sibling values that act as overrides. In case of a conflict, tooling MUST keep the sibling values to `$ref`, i.e. `$ref` is resolved first, then any sibling keys are applied.

<p class="ednote" title="JSON Schema 2020-12">
JSON Schema 2020-12 was chosen over 2019-09 because it allows sibling overrides alongside `$ref`.
</p>

Tools SHOULD preserve all references, and only resolve them whenever the actual value needs to be retrieved.

<aside class="example">

For example, if a token named `color.text.primary` was an alias of `color.palette.black`, the following CSS SHOULD be generated:

##### ✅ Recommended

```css
:root {
  --color-palette-black: #000000;
  --color-text-primary: var(--color-palette-black);
}
```

##### ❌ Not Recommended

```css
:root {
  --color-palette-black: #000000;
  --color-text-primary: #000000;
}
```

</aside>

Aliases MAY reference other aliases. In this case, tools MUST follow each reference until they find a token with an explicit value. Circular references are not allowed. If a design token file contains circular references, then the value of all tokens in that chain is unknown and an appropriate error or warning message SHOULD be displayed to the user.
