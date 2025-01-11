# Aliases / references

Instead of having explicit values, tokens can reference the value of another token. To put it another way, a token can be an alias for another token. This spec considers the terms "alias" and "reference" to be synonyms and uses them interchangeably.

Aliases are useful for:

- Expressing design choices
- Eliminating repetition of values in token files (<abbr title="Don’t Repeat Yourself">DRY</abbr>ing up the code)

At any part of the schema, you may refer to another part of the schema with a reference. This follows the usage of `$ref` from the [JSON Schema 2020-12 specification](https://json-schema.org/draft/2020-12/json-schema-core).

### Referencing tokens

You may reference values in the same file by starting with the fragment character (`#`) followed by the token path, all separated by forward slashes:

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

Would resolve to:

```json
{
  "color": {
    "blue": {
      "4": { "$value": "#218bff", "$type": "color" }
    },
    "brand": {
      "$description": "Brand color",
      "$value": "#218bff",
      "$type": "color"
    }
  }
}
```

</aside>

In other words, `$ref` will act as if it’s importing the object it’s pointing to, with any sibling values being kept.

Tooling MUST allow `$ref` to have sibling values that act as overrides. In case of a conflict, tooling MUST keep the sibling values to `$ref` (in other words, `$ref` is resolved first, then any sibling keys are applied).

<p class="ednote" title="JSON Schema 2020-12">
JSON Schema 2020-12 was chosen over 2019-09 because it allows sibling overrides alongside `$ref`.
</p>

### Referencing non-tokens

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

Would resolve to:

```json
{
  "color": {
    "gray": {
      "1": { "$value": "#101010", "$type": "color" },
      "2": { "$value": "#202020", "$type": "color" },
      "3": { "$value": "#404040", "$type": "color" },
      "4": { "$value": "#808080", "$type": "color" }
    },
    "grey": {
      "1": { "$value": "#101010", "$type": "color" },
      "2": { "$value": "#202020", "$type": "color" },
      "3": { "$value": "#404040", "$type": "color" },
      "4": { "$value": "#808080", "$type": "color" }
    }
  }
}
```

</aside>

Any group or property (`$type`, `$value`, `$description`, `$extension`, etc.) may all be referenced, so long as the final resolved value results in a valid schema.

### Remote files

Referencing remote files may be done by using a valid URL for `$ref`. This may be a relative URL or an absolute URL. To optionally reference a sub-schema, use the fragment character `#` at the end of the URL, and [complete the reference as you would normally](#referencing-tokens).

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

## Additional info

When a tool needs the actual value of a token it MUST resolve all aliases and references - i.e. lookup the token being referenced and fetch its value.

Tools SHOULD preserve references and therefore only resolve them whenever the actual value needs to be retrieved. For instance, in a [=design tool=], changes to the value of a token being referenced by aliases SHOULD be reflected wherever those aliases are being used.

Aliases MAY reference other aliases. In this case, tools MUST follow each reference until they find a token with an explicit value. Circular references are not allowed. If a design token file contains circular references, then the value of all tokens in that chain is unknown and an appropriate error or warning message SHOULD be displayed to the user.
