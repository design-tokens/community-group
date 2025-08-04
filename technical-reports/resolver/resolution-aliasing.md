# Resolution Aliasing

Aliasing allows for dynamic namespacing or renaming of token paths during resolution. This is particularly useful when integrating external token sets or avoiding naming conflicts.

<aside class="issue">

**Namespace vs Alias Terminology:** Should the `alias` property be renamed to `namespace` to avoid confusion with token aliases (references to other tokens)?

**Redundancy with Modifier Names:** The `meta.alias` property may be redundant since modifiers already have a `name` property that could serve the same namespacing purpose.

**Auto-namespacing Concerns:** The automatic application of namespacing for modifiers introduces significant complexity and potential issues:

- Requires pre-resolution conflict checking across all sets and modifiers
- Modifier JSON must be complete sets to avoid undefined token references
- Risk of infinite loops if modifiers reference tokens in other modifier namespaces
- Backwards compatibility issues requiring extensive token renames in existing design systems

**Alternative Approach:** Consider removing auto-namespacing for modifiers and using shared merging logic between sets and modifiers for better compatibility and simplicity.

</aside>

**Example:**

<aside class="example">

Given a token set size.json:</p>

```json
{
  "sm": {
    "value": "1px",
    "type": "dimension"
  },
  "lg": {
    "value": "10px",
    "type": "dimension"
  }
}
```

By applying an alias in the modifier's meta.alias, we can namespace these tokens:

```json
{
  "modifiers": [
    {
      "name": "size",
      "type": "include",
      "values": [
        {
          "name": "default",
          "values": ["size.json"]
        }
      ],
      "meta": {
        "alias": "spacing"
      }
    }
  ]
}
```

Resulting in tokens accessible via spacing.sm and spacing.lg.

<aside class="issue">

If the `meta.alias` behavior described above is normative/required behavior, it should not be part of the generic `meta` property but should be defined as part of the formal schema. Alternatively, if this is just an example of tooling-specific behavior, it should be clearly called out as such and not presented as part of the core specification.

</aside>

</aside>

<aside class="example">

Source: <a href="https://resolver-spec.netlify.app/reference/schema/">https://resolver-spec.netlify.app/reference/schema/</a>

```json
{
  "$id": "https://schemas.tokens.studio/prototype/resolver.json",
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "description": "Resolver Specification",
  "$defs": {
    "tokenSet": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "values": {
          "type": "array",
          "items": {
            "type": "string"
          }
        }
      },
      "required": ["values"]
    },
    "modifier": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string"
        },
        "values": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "name": {
                "type": "string"
              },
              "values": {
                "type": "array",
                "items": {
                  "type": "string"
                }
              }
            },
            "required": ["name", "values"]
          }
        },
        "meta": {
          "type": "object",
          "additionalProperties": true
        }
      },
      "required": ["name", "values"]
    }
  },
  "type": "object",
  "properties": {
    "name": {
      "type": "string"
    },
    "description": {
      "type": "string"
    },
    "sets": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/tokenSet"
      }
    },
    "modifiers": {
      "type": "array",
      "items": {
        "$ref": "#/$defs/modifier"
      }
    }
  },
  "required": ["sets", "modifiers"]
}
```

</aside>
