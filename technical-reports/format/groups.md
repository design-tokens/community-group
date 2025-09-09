# Groups

Groups organize design tokens into logical collections and provide a hierarchical structure for token files. Groups are arbitrary and tools SHOULD NOT use them to infer the type or purpose of design tokens.

## Group Structure

A group is identified as a JSON object that does NOT contain a [`$value`](design-token#name-and-value) property. Groups MAY contain:

- **Child tokens** - Objects with a `$value` property
- **Nested groups** - Objects without a `$value` property
- **Group properties** - Properties prefixed with `$` (e.g., `$description`, `$type`)

**Important:** The presence of a `$value` property definitively identifies an object as a token. If an object contains both `$value` and child tokens/groups, this creates an invalid structure where the object cannot be both a token and a group simultaneously. Tools MUST report this as an error.

## Root Tokens in Groups

Groups MAY contain a **root token** alongside child tokens and nested groups. A root token provides a base value for the group while allowing for variants or extensions.

Groups support root tokens using the reserved name `$root` as the token name:

<aside class="example" title="Root tokens">

```json
{
  "color": {
    "accent": {
      "$root": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.867, 0, 0],
          "hex": "#dd0000"
        }
        // {color.accent.$root} resolves to {"colorSpace": "srgb", "components": [0.867, 0, 0], "hex": "#dd0000"} (the root token)
        // {color.accent} is an invalid token reference (refers to a group, not a token)
      },
      "light": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0.133, 0.133],
          "hex": "#ff2222"
        }
      },
      "dark": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.667, 0, 0],
          "hex": "#aa0000"
        }
      }
    }
  }
}
```

</aside>

**Rationale:** Using `$root` as a reserved token name eliminates ambiguity between group references and token references while maintaining clear, explicit syntax. The `$` prefix prevents naming conflicts with user-defined tokens and aligns with other reserved properties in the specification.

## Group Properties

Groups MAY include the following properties:

| Property       | Required | Description                                                                                                                                                                    |
| -------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `$description` | No       | A plain JSON string describing the group's purpose                                                                                                                             |
| `$type`        | No       | Acts as a default type for tokens within the group that do not explicitly declare their own type. Type inheritance applies to nested groups and their tokens unless overridden |
| `$extends`     | No       | Inherits tokens and properties from another group. MUST NOT reference a token. Syntactic sugar for JSON Schema's `$ref` keyword                                                |

<aside class="example" title="Group description">

```json
{
  "spacing": {
    "$description": "All spacing-related design tokens organized by usage context",
    "margin": {
      /* tokens */
    },
    "padding": {
      /* tokens */
    }
  }
}
```

</aside>

<aside class="example" title="Group type inheritance">

```json
{
  "color": {
    "$type": "color",
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      }
    },
    "secondary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.4, 0.6, 1],
        "hex": "#6699ff"
      }
    },
    "semantic": {
      "success": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0.8, 0.4],
          "hex": "#00cc66"
        }
      },
      "warning": { "$type": "string", "$value": "amber" }
    }
  }
}
```

</aside>

<aside class="example" title="Group extension">

```json
{
  "button": {
    "$type": "color",
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      }
    },
    "text": {
      "$value": {
        "colorSpace": "srgb",
        "components": [1, 1, 1],
        "hex": "#ffffff"
      }
    }
  },
  "button-primary": {
    "$extends": "{button}",
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.8, 0, 0.4],
        "hex": "#cc0066"
      }
    }
  }
}
```

</aside>

<aside class="example" title="JSON Schema equivalence">

```json
{
  "button": {
    "$type": "color",
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      }
    },
    "text": {
      "$value": {
        "colorSpace": "srgb",
        "components": [1, 1, 1],
        "hex": "#ffffff"
      }
    }
  },
  "button-primary": {
    "$extends": "{button}",
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.8, 0, 0.4],
        "hex": "#cc0066"
      }
    }
  }
}
```

</aside>

##### Equivalence to JSON Schema `$ref`

The `$extends` property is semantically equivalent to JSON Schema's `$ref` keyword as specified in [[json-schema-2020-12]] and later versions. The following two group definitions are functionally identical:

**Using `$extends` (Design Token syntax):**

```json
{
  "button-primary": {
    "$extends": "{button}",
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.8, 0, 0.4],
        "hex": "#cc0066"
      }
    },
    "focus": {
      "$value": {
        "colorSpace": "srgb",
        "components": [1, 0.2, 0.6],
        "hex": "#ff3399"
      }
    }
  }
}
```

**Using `$ref` (JSON Schema syntax):**

```json
{
  "button-primary": {
    "$ref": "#/button",
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.8, 0, 0.4],
        "hex": "#cc0066"
      }
    },
    "focus": {
      "$value": {
        "colorSpace": "srgb",
        "components": [1, 0.2, 0.6],
        "hex": "#ff3399"
      }
    }
  }
}
```

##### Reference Resolution and Evaluation

Extension resolution follows a straightforward process:

1. **Find the target:** Resolve the `$extends` reference to locate the target group
2. **Copy inherited content:** Start with all tokens and properties from the target group
3. **Apply local overrides:** Replace any inherited tokens/properties where local ones exist at the same path
4. **Add new content:** Include any local tokens/properties that don't exist in the inherited group

This creates a new resolved group that combines inherited and local content according to the override rules above.

<aside class="note" title="Implementation">
While this specification references JSON Schema `$ref` behavior for technical implementation guidance, the user-visible behavior is the straightforward deep merge described above. Tools may implement this merge behavior directly or by leveraging JSON Schema libraries.
</aside>

##### Inheritance Semantics

Group extension follows **deep merge** behavior where local properties override inherited properties at the same path:

1. **Inheritance:** All tokens and properties from the referenced group are inherited (circular references are not allowed)
2. **Override:** Local tokens and properties replace inherited ones with the same path
3. **Addition:** Local tokens and properties with new paths are added alongside inherited ones

**Override Rules:**

- **Same path = override:** If both the inherited group and local group define a token at the same path, the local definition wins
- **Different paths = merge:** Tokens at different paths coexist in the final result
- **Complete replacement:** When overriding, the entire token definition is replaced (not merged property-by-property)

<aside class="example" title="Override example">

```json
{
  "input": {
    "field": {
      "width": {
        "$type": "dimension",
        "$value": { "value": 12, "unit": "rem" }
      },
      "background": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 1, 1],
          "hex": "#ffffff"
        }
      }
    }
  },
  "input-amount": {
    "$extends": "{input}",
    "field": {
      "width": { "$value": "100px" } // Overrides field.width completely
    }
  }
}
```

</aside>

**Result for `input-amount`:**

| Token              | Final Value                                                                                        |
| :----------------- | :------------------------------------------------------------------------------------------------- |
| `field.width`      | `"100px"` (local override wins)                                                                    |
| `field.background` | `{"colorSpace": "srgb", "components": [1, 1, 1], "hex": "#ffffff"}` (inherited, no local override) |

**Multi-level Override Example:**

<aside class="example" title="Multi-level override">

```json
{
  "base": {
    "color": { "$value": "#blue" },
    "spacing": { "$value": "16px" }
  },
  "extended": {
    "$extends": "{base}",
    "color": { "$value": "#red" }, // Overrides base.color
    "border": { "$value": "1px solid" } // Adds new token
  }
}
```

</aside>

**Result for `extended`:**

- `color` → `"#red"` (overridden)
- `spacing` → `"16px"` (inherited)
- `border` → `"1px solid"` (added)

**Circular Reference Prevention:**

Groups MUST NOT create circular inheritance chains. The following patterns are **invalid**:

<aside class="example" title="Invalid circular reference">

```json
{
  "button": {
    "color": { "$value": "#blue" },
    "border": { "$value": "1px solid" },
    "secondary": {
      "$extends": "{button}" // ❌ Invalid: circular reference
    }
  }
}
```

</aside>

<aside class="example" title="Another circular reference">

```json
{
  "groupA": {
    "$extends": "{groupB}",
    "token": { "$value": "valueA" }
  },
  "groupB": {
    "$extends": "{groupA}", // ❌ Invalid: circular reference
    "token": { "$value": "valueB" }
  }
}
```

</aside>

**Valid inheritance patterns:**

<aside class="example" title="Valid inheritance patterns">

```json
{
  "button": {
    "color": { "$value": "#blue" },
    "border": { "$value": "1px solid" }
  },
  "button-secondary": {
    "$extends": "{button}", // ✅ Valid: references parent group
    "color": { "$value": "#gray" }
  },
  "button-large": {
    "$extends": "{button}", // ✅ Valid: siblings can reference same parent
    "padding": { "$value": "16px" }
  }
}
```

</aside>

##### Supported Reference Formats

`$extends` supports the same reference formats as [design token aliases](#references-and-json-pointer-integration):

- **Relative group references:** `{parent.child}`
- **Absolute group references:** `{.root.group}`
- **Cross-file references:** References to groups in other design token files (implementation-dependent)

##### Error Conditions

`$extends` error handling follows JSON Schema `$ref` error patterns:

- **Unresolvable references:** When the target group cannot be found
- **Invalid targets:** When the reference points to a non-group (e.g., a token)
- **Circular references:** When extension chains create cycles
- **Constraint violations:** When local properties violate inherited constraints

Tools MUST implement the same error detection and reporting patterns used by JSON Schema validators for `$ref` resolution.

##### Implementation Guidance

Tools implementing design token parsing MAY choose to:

1. **Transform to `$ref`:** Convert `$extends` to standard JSON Schema `$ref` syntax and use existing JSON Schema libraries for validation
2. **Native implementation:** Implement `$extends` directly using the same algorithms as JSON Schema `$ref` processing
3. **Hybrid approach:** Use JSON Schema libraries for validation while maintaining design token-specific reference syntax

Regardless of implementation approach, the semantic behavior MUST be equivalent to JSON Schema `$ref` as specified in JSON Schema 2020-12 or later.

##### Relationship to JSON Schema Specifications

This specification defines `$extends` as syntactic sugar for JSON Schema's `$ref` keyword, providing design token-specific reference syntax while maintaining equivalent behavior. The deep merge semantics described above align with how JSON Schema 2020-12 handles `$ref` with sibling properties.

For implementers familiar with JSON Schema, the `$extends` behavior is equivalent to:

- Converting `"$extends": "{group}"` to `"$ref": "#/group"`
- Applying JSON Schema 2020-12 `$ref` resolution with sibling property evaluation

Tools implementing this specification MAY choose to:

1. **Transform approach:** Convert `$extends` to `$ref` and use JSON Schema libraries
2. **Direct implementation:** Implement the deep merge behavior described above
3. **Hybrid approach:** Use JSON Schema for validation while maintaining design token syntax

Regardless of implementation approach, the user-visible behavior MUST match the deep merge semantics described in this specification.

#### `$deprecated`

Groups MAY include an optional `$deprecated` property to mark the entire group as deprecated. This extends to all child tokens within the group unless explicitly overridden.

| Value    | Explanation                                                       |
| -------- | ----------------------------------------------------------------- |
| `true`   | This group is deprecated (no explanation provided)                |
| `string` | This group is deprecated AND this is an explanation               |
| `false`  | This group is NOT deprecated (may override parent group defaults) |

#### `$extensions`

Groups MAY include an optional [`$extensions`](design-token#extensions) property where tools MAY add proprietary, user-, team- or vendor-specific data. Each tool MUST use a vendor-specific key whose value MAY be any valid JSON data.

## Empty Groups

Groups MAY be empty (contain no tokens or nested groups). While they may appear to serve no immediate purpose, they:

- Cause no harm to processing or validation
- Support work-in-progress organization during token development
- May contain metadata via group properties (`$description`, `$extensions`)
- Provide placeholder structure for future token development

<aside class="example" title="Empty group">

```json
{
  "experimental": {
    "$description": "Tokens for experimental features - currently empty",
    "$deprecated": "This group is being phased out"
  }
}
```

</aside>

<aside class="note" title="Token vs Group Ambiguity">
Objects without a `$value` property are interpreted as groups by definition. This can potentially create ambiguity in cases where a token lacks required properties (such as `$value` or a determinable type) and might be incorrectly parsed as an empty group. Tools SHOULD provide clear error messages when an object appears to be an incomplete token rather than an intentional empty group.
</aside>

## References and JSON Pointer Integration

The current [token reference syntax](#references-and-json-pointer-integration) using curly braces (`{group.token}`) is maintained for backward compatibility and developer ergonomics. However, tools MAY also support JSON Pointer notation for advanced use cases.

### Current Reference Syntax (Recommended)

<aside class="example" title="Current reference syntax">

```json
{
  "base": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 0.4, 0.8],
      "hex": "#0066cc"
    }
  },
  "alias": { "$value": "{base}" }
}
```

</aside>

### JSON Pointer Support (Optional)

Tools MAY support JSON Pointer references as defined by [[rfc6901]], using the `$ref` property:

<aside class="example" title="JSON Pointer references">

```json
{
  "base": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 0.4, 0.8],
      "hex": "#0066cc"
    }
  },
  "alias": { "$ref": "#/base" }
}
```

</aside>

<aside class="note">The `$ref` syntax is provided for advanced tooling integration but is not required. The curly brace syntax remains the primary and recommended approach for token references.</aside>

## Processing Rules

### Token Resolution Order

When processing groups, tools MUST follow this resolution order:

1. **Local tokens** - Direct children with `$value` properties
2. **Root tokens** - Tokens with `$root` names
3. **Extended tokens** - Tokens inherited via `$extends` (if not overridden)
4. **Nested groups** - Process recursively

### Path Construction

Token paths are constructed by concatenating group names and token names with periods (`.`). The reserved token name `$root` is included in the path to maintain explicit, unambiguous references.

Examples:

- Token at `/color/accent/$root` → path: `color.accent.$root`
- Token at `/color/accent/light` → path: `color.accent.light`
- Group at `/color/accent` → invalid for token resolution, valid for group operations

### Type Inheritance

Type resolution follows these rules in order of precedence:

1. **Token's explicit [`$type`](design-token#type) property** (highest precedence)
2. **Resolved group's `$type` property** (after extension resolution)
3. **Parent group's `$type` property** (walking up the hierarchy)
4. **Token is invalid** if no type can be determined

**Type Resolution with Extensions:**
Since `$extends` follows JSON Schema `$ref` semantics, type inheritance behavior is determined by constraint validation rather than explicit merge rules. Local type constraints are evaluated alongside inherited constraints according to JSON Schema validation patterns.

<aside class="example" title="Type resolution with extensions">

```json
{
  "base": {
    "$type": "color",
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0.4, 0.8],
        "hex": "#0066cc"
      }
    }
  },
  "extended": {
    "$extends": "{base}",
    "$type": "dimension", // Local constraint
    "spacing": { "$value": { "value": 16, "unit": "px" } }
  }
}
```

</aside>

In this example, the group `extended` must satisfy both its local `$type: "dimension"` constraint and any applicable constraints from the referenced `base` group, following JSON Schema constraint resolution rules.

### Circular Reference Detection

Tools MUST detect and throw an error on circular references in:

- Token [aliases](#references-and-json-pointer-integration) (`{token}` references)
- Group extensions (`$extends` references)
- JSON Pointer references (`$ref` properties, if supported)

Circular reference detection for `$extends` follows the same requirements as JSON Schema `$ref` circular reference detection. Tools SHOULD implement the same algorithms used by JSON Schema validators for cycle detection.

<aside class="example" title="Circular reference detection">

```json
{
  "a": { "$extends": "{b}" },
  "b": { "$extends": "{c}" },
  "c": { "$extends": "{a}" } // Creates circular reference: a → b → c → a
}
```

</aside>

Tools MUST report this as an error affecting groups `a`, `b`, and `c`.

## Migration and Compatibility

This specification is designed to be backward compatible with existing design token files. Tools implementing this specification:

- MUST continue to support existing group syntax
- SHOULD provide warnings for deprecated patterns
- MAY implement new features incrementally
- MUST validate that token names do not conflict with reserved properties

## Examples

### Basic Group with Root Token

<aside class="example" title="Basic group with root token">

```json
{
  "spacing": {
    "$type": "dimension",
    "$description": "Base spacing scale",
    "$root": { "$value": { "value": 16, "unit": "px" } },
    "small": { "$value": { "value": 8, "unit": "px" } },
    "large": { "$value": { "value": 32, "unit": "px" } }
  }
}
```

</aside>

### Group Extension with Override Example

<aside class="example" title="Group extension with override">

```json
{
  "input": {
    "$type": "dimension",
    "field": {
      "width": { "$value": { "value": 100, "unit": "%" } },
      "background": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 1, 1],
          "hex": "#ffffff"
        }
      }
    }
  },
  "input-amount": {
    "$extends": "{input}",
    "field": {
      "width": { "$value": { "value": 100, "unit": "px" } }
    }
  }
}
```

</aside>

**Resolved tokens:**

- `{input-amount.field.width}` → `{ "value": 100, "unit": "px" }` (overridden)
- `{input-amount.field.background}` → `#ffffff` (inherited from input)

This demonstrates the key use case where a component extends a base component but overrides specific tokens while inheriting others.

### Complex Hierarchical Structure

<aside class="example" title="Complex hierarchical structure">

```json
{
  "color": {
    "$type": "color",
    "$description": "Complete color system",
    "brand": {
      "$root": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0.4, 0.8],
          "hex": "#0066cc"
        }
      },
      "light": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0.2, 0.533, 0.867],
          "hex": "#3388dd"
        }
      },
      "dark": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0.267, 0.6],
          "hex": "#004499"
        }
      }
    },
    "semantic": {
      "$extends": "{color.brand}",
      "success": {
        "$root": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0, 0.8, 0.4],
            "hex": "#00cc66"
          }
        },
        "light": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0.2, 0.867, 0.533],
            "hex": "#33dd88"
          }
        },
        "dark": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0, 0.6, 0.267],
            "hex": "#009944"
          }
        }
      },
      "error": {
        "$root": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0.8, 0, 0],
            "hex": "#cc0000"
          }
        },
        "light": {
          "$value": {
            "colorSpace": "srgb",
            "components": [1, 0.2, 0.2],
            "hex": "#ff3333"
          }
        },
        "dark": {
          "$value": {
            "colorSpace": "srgb",
            "components": [0.6, 0, 0],
            "hex": "#990000"
          }
        }
      }
    }
  }
}
```

</aside>

This structure creates tokens accessible as:

- `{color.brand.$root}` → `{"colorSpace": "srgb", "components": [0, 0.4, 0.8], "hex": "#0066cc"}`
- `{color.brand.light}` → `{"colorSpace": "srgb", "components": [0.2, 0.533, 0.867], "hex": "#3388dd"}`
- `{color.semantic.success.$root}` → `{"colorSpace": "srgb", "components": [0, 0.8, 0.4], "hex": "#00cc66"}`
- `{color.semantic.error.dark}` → `{"colorSpace": "srgb", "components": [0.6, 0, 0], "hex": "#990000"}`

## Use-cases

### File authoring & organization

Groups let token file authors better organize their token files. Related tokens can be nested into groups to align with the team's naming conventions and/or mental model. When manually authoring files, using groups is also less verbose than a flat list of tokens with repeating prefixes.

For example:

<aside class="example" title="Organized token groups">

```json
{
  "brand": {
    "color": {
      "$type": "color",
      "acid green": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 1, 0.4]
        }
      },
      "hot pink": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0, 1]
        }
      }
    },
    "typeface": {
      "$type": "fontFamily",
      "primary": {
        "$value": "Comic Sans MS"
      },
      "secondary": {
        "$value": "Times New Roman"
      }
    }
  }
}
```

</aside>

...is likely to be more convenient to type and, arguably, easier to read, than:

<aside class="example" title="Flat token structure">

```json
{
  "brand-color-acid-green": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 1, 0.4]
    }
  },
  "brand-color-hot-pink": {
    "$type": "color",
    "$value": {
      "colorSpace": "srgb",
      "components": [1, 0, 1]
    }
  },
  "brand-typeface-primary": {
    "$value": "Comic Sans MS",
    "$type": "fontFamily"
  },
  "brand-typeface-secondary": {
    "$value": "Times New Roman",
    "$type": "fontFamily"
  }
}
```

</aside>

### GUI tools

Tools that let users pick or edit tokens via a GUI MAY use the grouping structure to display a suitable form of progressive disclosure, such as a collapsible tree view.

<figure id="figure-group-progressive-disclosure">
  <img src="./group-progressive-disclosure.png" alt="" />
  <figcaption>Progressive disclosure groups</figcaption>
</figure>

### Translation tools

Token names are not guaranteed to be unique within the same file. The same name can be used in different groups. Also, translation tools MAY need to export design tokens in a uniquely identifiable way, such as variables in code. Translation tools SHOULD therefore use design tokens' paths as these _are_ unique within a file.

For example, a [=translation tool=] like [Style Dictionary](https://amzn.github.io/style-dictionary/) might use the following design token file:

<aside class="example" title="Translation tool input">

```json
{
  "brand": {
    "color": {
      "$type": "color",
      "acid green": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 1, 0.4]
        }
      },
      "hot pink": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0, 1]
        }
      }
    },
    "typeface": {
      "$type": "fontFamily",
      "primary": {
        "$value": "Comic Sans MS"
      },
      "secondary": {
        "$value": "Times New Roman"
      }
    }
  }
}
```

</aside>

...and output it as Sass variables like so by concatenating the path to create variable names:

<aside class="example" title="Translation tool output">

```scss
$brand-color-acid-green: #00ff66;
$brand-color-hot-pink: #ff00ff;
$brand-typeface-primary: 'Comic Sans MS';
$brand-typeface-secondary: 'Times New Roman';
```

</aside>
