# Aliases / References

Instead of having explicit values, tokens can reference the value of another token. To put it another way, a token can be an alias for another token. This spec considers the terms "alias" and "reference" to be synonyms and uses them interchangeably.

Aliases are useful for:

- Expressing design choices
- Eliminating repetition of values in token files (DRYing up the code)
- Creating semantic relationships between tokens
- Maintaining consistency across related values

## Reference Syntax

Design tokens support two distinct syntaxes for referencing content within token files:

### Curly Brace Syntax (Token References)

The curly brace syntax is specifically designed for referencing **complete token values** and always resolves to the `$value` property of the target token.

<aside class="example" title="Alias Syntax">

```json
{
  "colors": {
    "blue": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      },
      "$type": "color"
    }
  },
  "semantic": {
    "primary": {
      "$value": "{colors.blue}",
      "$type": "color"
    }
  }
}
```

</aside>

In this example, `{colors.blue}` resolves to the entire color object `{"colorSpace": "srgb", "components": [0, 0.4, 0.8], "hex": "#0066cc"}`.

**Important:** Curly brace references can ONLY target complete tokens (objects with `$value` properties), not individual properties within token values or arbitrary document locations.

### JSON Pointer Syntax (Required Support)

For advanced use cases requiring access to specific properties within token values or other parts of the document structure, tokens MUST support JSON Pointer notation as defined by [[rfc6901]], using the `$ref` property. Tools implementing this specification MUST support JSON Pointer syntax.

<aside class="example">

```json
{
  "colors": {
    "blue": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      },
      "$type": "color"
    }
  },
  "semantic": {
    "primary": {
      "$ref": "#/colors/blue/$value",
      "$type": "color"
    },
    "primaryHue": {
      "$ref": "#/colors/blue/$value/components/0",
      "$type": "number"
    }
  }
}
```

</aside>

In this example:

- `"$ref": "#/colors/blue/$value"` is equivalent to `"{colors.blue}"`
- `"$ref": "#/colors/blue/$value/components/0"` accesses just the red component (0) of the blue color

**Key Differences:**

| Aspect            | Curly Brace `{token}`     | JSON Pointer `$ref`         |
| ----------------- | ------------------------- | --------------------------- |
| **Targets**       | Complete tokens only      | Any document location       |
| **Implicit path** | Always appends `/$value`  | Explicit full path required |
| **Use case**      | Token-to-token references | Property-level references   |
| **Syntax**        | `{group.token}`           | `#/group/token/$value`      |

## Reference Resolution

When a tool needs the actual value of a token it MUST resolve the reference - i.e. lookup the token being referenced and fetch its value. Tools SHOULD preserve references and therefore only resolve them whenever the actual value needs to be retrieved. For instance, in a [=design tool=], changes to the value of a token being referenced by aliases SHOULD be reflected wherever those aliases are being used.

### Resolution Algorithms

**For Curly Brace References:**

1. **Parse reference:** Extract token path from `{group.token}`
2. **Split path:** Convert to segments `["group", "token"]`
3. **Navigate to token:** Find the target token object
4. **Validate token:** Ensure target has `$value` property
5. **Return token value:** Extract and return the `$value` content
6. **Check for cycles:** Maintain stack of resolving references

**For JSON Pointer References:**

1. **Parse JSON Pointer:** Extract path segments from `#/path/to/target`
2. **Traverse document:** Navigate through each path segment
3. **Apply JSON Pointer rules:**
   - Numeric segments in array contexts become array indices
   - All segments in object contexts become property names
   - Handle escaped characters (`~0`, `~1`)
4. **Validate target:** Ensure the final target exists and is accessible
5. **Return value:** Extract and return the resolved value

### Chained References

Aliases MAY reference other aliases. In this case, tools MUST follow each reference until they find a token with an explicit value.

<aside class="example" title="Chained References">

```json
{
  "base": {
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      },
      "$type": "color"
    }
  },
  "semantic": {
    "brand": {
      "$value": "{base.primary}"
    },
    "link": {
      "$value": "{semantic.brand}"
    }
  }
}
```

</aside>

In this example, `{semantic.link}` resolves to the same color value as `{base.primary}` by following the chain: `semantic.link` → `semantic.brand` → `base.primary`.

### Circular References

References MUST NOT be circular. If a design token file contains circular references, then the value of all tokens in that chain is unknown and an appropriate error or warning message SHOULD be displayed to the user.

<aside class="example">

```json
{
  "a": { "$value": "{b}" },
  "b": { "$value": "{c}" },
  "c": { "$value": "{a}" } // Creates circular reference: a → b → c → a
}
```

</aside>

Tools MUST detect and report this as an error affecting all tokens in the circular chain.

## Property-Level References

JSON Pointer syntax enables references to specific properties within composite tokens, not just entire token values. This enables fine-grained reuse of token components while maintaining semantic relationships.

**Important:** Property-level references require JSON Pointer syntax (`$ref`) and cannot be expressed using curly brace syntax.

### Color Component References

<aside class="example" title="Color Component References">

```json
{
  "base": {
    "blue": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.2, 0.4, 0.9],
        "hex": "#3366e6"
      },
      "$type": "color"
    }
  },
  "semantic": {
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [
          { "$ref": "#/base/blue/$value/components/0" },
          { "$ref": "#/base/blue/$value/components/1" },
          0.7
        ],
        "hex": "#3366b3"
      },
      "$type": "color"
    },
    "secondary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [
          { "$ref": "#/base/blue/$value/components/0" },
          { "$ref": "#/base/blue/$value/components/1" },
          0.5
        ],
        "hex": "#336680"
      },
      "$type": "color"
    }
  }
}
```

</aside>

In this example:

- `semantic.primary` keeps the same red and green components as `base.blue` but uses a different blue component (0.7)
- `semantic.secondary` keeps the same red and green components as `base.blue` but uses a different blue component (0.5)
- Changes to the hue of `base.blue` will automatically propagate to both semantic colors

### Dimension Component References

<aside class="example" title="Dimension Component References">

```json
{
  "base": {
    "spacing": {
      "$value": { "value": 16, "unit": "px" },
      "$type": "dimension"
    }
  },
  "layout": {
    "small": {
      "$value": {
        "value": { "$ref": "#/base/spacing/$value/value" },
        "unit": "rem"
      },
      "$type": "dimension"
    },
    "large": {
      "$value": {
        "value": 32,
        "unit": { "$ref": "#/base/spacing/$value/unit" }
      },
      "$type": "dimension"
    }
  }
}
```

</aside>

In this example:

- `layout.small` uses the same numeric value as `base.spacing` (16) but with a different unit (`rem`)
- `layout.large` uses the same unit as `base.spacing` (`px`) but with a different numeric value (32)

### Typography Component References

<aside class="example" title="Typography Component References">

```json
{
  "base": {
    "text": {
      "$value": {
        "fontFamily": ["Helvetica", "Arial", "sans-serif"],
        "fontSize": { "value": 16, "unit": "px" },
        "fontWeight": 400,
        "lineHeight": 1.5
      },
      "$type": "typography"
    }
  },
  "headings": {
    "h1": {
      "$value": {
        "fontFamily": { "$ref": "#/base/text/$value/fontFamily" },
        "fontSize": { "value": 32, "unit": "px" },
        "fontWeight": 700,
        "lineHeight": { "$ref": "#/base/text/$value/lineHeight" }
      },
      "$type": "typography"
    },
    "h2": {
      "$value": {
        "fontFamily": { "$ref": "#/base/text/$value/fontFamily" },
        "fontSize": { "value": 24, "unit": "px" },
        "fontWeight": 600,
        "lineHeight": { "$ref": "#/base/text/$value/lineHeight" }
      },
      "$type": "typography"
    }
  }
}
```

</aside>

In this example:

- Both headings inherit the `fontFamily` and `lineHeight` from `base.text`
- Each heading defines its own `fontSize` and `fontWeight`
- Changes to the base font family or line height automatically affect all headings

## JSON Pointer Path Construction and Resolution

JSON Pointer syntax provides direct access to any location within the design token document structure, following standard JSON Pointer rules as defined by [[rfc6901]].

### Path Construction Rules

- **Root reference:** `#/` (refers to the document root)
- **Object properties:** `/` separates each level (e.g., `#/group/token/$value`)
- **Array indices:** Numeric indices for array elements (e.g., `#/color/$value/components/0`)
- **Special characters:** Must be escaped according to JSON Pointer rules:
  - `~` becomes `~0`
  - `/` becomes `~1`

### Token Value Access Patterns

Since design tokens store their values in `$value` properties, JSON Pointer paths to token values follow a predictable pattern:

| JSON Pointer                        | Equivalent Curly Brace Reference | Description              |
| ----------------------------------- | -------------------------------- | ------------------------ |
| `#/colors/blue/$value`              | `{colors.blue}`                  | Complete token value     |
| `#/colors/blue/$value/hex`          | N/A                              | Hex property of color    |
| `#/colors/blue/$value/components/0` | N/A                              | First component of color |
| `#/colors/blue/$type`               | N/A                              | Token type metadata      |

### Resolution Algorithm for JSON Pointer

1. **Parse JSON Pointer:** Extract path segments from `#/path/to/target`
2. **Traverse document:** Navigate through each path segment
3. **Apply JSON Pointer rules:**
   - Numeric segments in array contexts become array indices
   - All segments in object contexts become property names
   - Handle escaped characters (`~0`, `~1`)
4. **Validate target:** Ensure the final target exists and is accessible
5. **Return value:** Extract and return the resolved value

### Curly Brace Resolution Algorithm

1. **Parse reference:** Extract token path from `{group.token}`
2. **Split path:** Convert to segments `["group", "token"]`
3. **Navigate to token:** Find the target token object
4. **Validate token:** Ensure target has `$value` property
5. **Return token value:** Extract and return the `$value` content
6. **Check for cycles:** Maintain stack of resolving references

### Error Conditions

Tools MUST report errors for:

- **Invalid syntax:** Malformed curly braces or JSON Pointer syntax
- **Unresolvable paths:** Target path does not exist in document
- **Invalid token references:** Curly brace syntax targeting non-tokens
- **Circular references:** Reference chains that loop back to themselves
- **Type mismatches:** Referenced value incompatible with expected type

### Path Examples

| Token Path           | JSON Pointer             | Curly Brace Syntax       |
| -------------------- | ------------------------ | ------------------------ |
| Root token "primary" | `#/primary`              | `{primary}`              |
| Nested token         | `#/colors/blue`          | `{colors.blue}`          |
| Array element        | `#/color/components/0`   | not supported            |
| Property with space  | `#/brand colors/primary` | `{brand colors.primary}` |
| Property with slash  | `#/my~1group/token`      | `{my/group.token}`       |

## Implementation Guidance

### For Tool Authors

Tools implementing design token parsing MUST:

1. **Support curly brace syntax** as the primary reference mechanism for token-to-token references
2. **Support JSON Pointer syntax** for document-level references and property access
3. **Validate reference targets** to ensure they point to valid tokens (for curly brace) or valid document locations (for JSON Pointer)
4. **Resolve references** according to the resolution algorithms defined in this specification ([Resolution Algorithms](#resolution-algorithms))
5. **Detect circular references** before attempting resolution
6. **Preserve references** in memory/storage and resolve only when values are needed
7. **Propagate changes** from referenced tokens to all aliases

### Disambiguation Examples

<aside class="example">

```json
{
  "ambiguous": {
    "data": [10, 20, 30],
    "metadata": {
      "0": "Info about first item",
      "1": "Info about second item"
    }
  }
}
```

</aside>

**Clear resolution:**

| Reference                | Result                    | Notes                                    |
| :----------------------- | :------------------------ | :--------------------------------------- |
| `#/ambiguous/data/0`     | `10`                      | JSON Pointer array index                 |
| `{ambiguous.metadata.0}` | `"Info about first item"` | curly brace object property              |
| `{ambiguous.data.0}`     | Error                     | curly braces cannot access array indices |
| `{ambiguous.metadata.2}` | Error                     | property "2" doesn't exist               |

### Error Conditions

Tools MUST report errors for:

- **Invalid reference syntax:** Malformed curly braces or JSON Pointer syntax
- **Unresolvable references:** Target path does not exist
- **Circular references:** Reference chains that loop back to themselves
- **Type mismatches:** Referenced property type incompatible with token type
- **Invalid property paths:** Attempting to reference non-existent properties

## Relationship to JSON Schema

The reference syntax defined in this specification provides compatibility with JSON Schema patterns while serving the specific needs of design token authoring:

- **JSON Pointer compatibility:** Direct support for RFC 6901 JSON Pointer notation enables integration with JSON Schema tooling
- **Design token semantics:** Curly brace references provide token-specific syntax optimized for common token-to-token relationships
- **Complementary approaches:** Both syntaxes serve different use cases within the design token ecosystem

**Important:** While JSON Pointer references (`$ref`) in design tokens follow the same syntax as JSON Schema `$ref`, curly brace references (`{token}`) are design token-specific and provide different semantics (automatic `$value` resolution and token-only targeting) compared to standard JSON Schema references.

---

_This specification provides a flexible, standards-based approach to token references that balances author ergonomics with technical precision, enabling both simple token aliases and sophisticated property-level relationships._
