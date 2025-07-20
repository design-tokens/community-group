# Resolution

Resolution is done by a design tool that takes the Resolver and applies the [input](#input) to produce the final JSON file of tokens. In a nutshell, it follows the formula **Resolver + Input = Resolution**.

Tools MUST apply the resolution logic as specified.

## Resolution logic

<aside class="ednote" title="Changes">

From the previous version, the following steps were removed for the following reasons:

4. **Aliasing and namespacing**: “Alias” here was used as a synonym for “namespace” rather than its original format definition, so we consolidated on “namespace.” Further, “namespace” was already defined and applied in the previous step: _Modifier application_. So this was redundant.
5. **Alias resolution** and **Circular reference detection**: The tokens format already outlines these steps, so they are not part of the Resolver module. By this step, we already have a flattened JSON structure that is identical to the original format. So describing alias resolution further, if we so choose, should be done in the [format](../format/) instead.
6. **Conflict resolution**: This step was redundant, already described in **Set flattening** and **Modifier application.** As the previous steps were written, we can’t have conflicts at this stage because resolution was a requirement.

</aside>

The resolution process involves the following steps:

1.  **Input validation**: Ensure the provided [Input](#input) matches the expected modifiers and their acceptable values.
1.  **Set flattening**: Load and merge the token [sets](#sets).
1.  **Modifier application**: Apply the selected modifiers based on the [Inputs](#inputs).
1.  **Final output**: Produce a flat, resolved set of tokens.

### Input validation

Input Validation

- Inputs MUST only specify valid values for modifiers:
  - Each key of the object MUST correspond to the `name` of a defined modifier
  - The `value` MUST be a `string` for an [enumerated modifier](#enumerated), and a `boolean` for an [include modifier](#include).
- For [enumerated modifiers](#enumerated), the input `string` MUST be a valid option in `values`.

### Set flattening

Tools MUST load each set in array order. Within each set, [&lt;token-defs&gt;](#token-defs) MUST be loaded in array order. In the case of conflict, later occurrences override previous ones.

At the end of this step, the final result MUST be in valid [Tokens format](../format/) with the exception of [alias](../format/#alias-reference) resolution (aliases don’t have to be valid until the [Modifier](#modifier-application) step).

### Modifier application

Tools MUST load each modifier in order. For each modifier, tools MUST:

1. Apply the `namespace` specified, if any
1. Flatten the [&lt;token-defs&gt;](#token-defs) in array order. In the case of conflict, later occurrences override previous ones.
1. Apply the output of each modifier to the current tokens. In case of conflicts with sets, any tokens declared in the modifier will overwrite previous declarations.

At the end of this step, the final result MUST be in valid [Tokens format](../format/) and with valid [aliases](../format/#alias-reference).

### Final output

<aside class="ednote" title="Changes">

Note: the example in this section had to be cleaned up, converted to DTCG format, and with ambiguous or erroneous values corrected. Please point out any misinterpretation of the previous example.

</aside>

The end result is a valid [Tokens format](../format/) JSON object.

<aside class="example" title="Brand Theme Resolver">

#### resolver.json

```json
{
  "name": "Brand Theming Resolver",
  "sets": [
    {
      "name": "base",
      "values": ["tokens/base.json"]
    },
    {
      "values": ["tokens/components.json"]
    }
  ],
  "modifiers": [
    {
      "name": "brand",
      "type": "enumerated",
      "values": [
        {
          "name": "brandA",
          "values": ["tokens/brands/brandA.json"]
        },
        {
          "name": "brandB",
          "values": ["tokens/brands/brandB.json"]
        }
      ],
      "namespace": "brand"
    }
  ]
}
```

#### tokens/base.json

```json
{
  "color": {
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "hex": "#000000"
      },
      "$type": "color"
    }
  },
  "font": {
    "family": {
      "$value": ["Arial", "sans-serif"],
      "$type": "fontFamily"
    }
  }
}
```

#### tokens/components.json

```json
{
  "button": {
    "background": { "$value": "{brand.color.primary}" },
    "fontFamily": { "$value": "{brand.font.family}" }
  },
  "header": {
    "color": { "$value": "{brand.color.secondary}" }
  }
}
```

#### tokens/brand/brandA.json

```json
{
  "color": {
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [1, 0.34, 0.2],
        "hex": "#ff5733"
      },
      "$type": "color"
    },
    "secondary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.78, 0, 0.22],
        "hex": "#c70039"
      },
      "$type": "color"
    }
  },
  "font": {
    "family": {
      "$value": ["Helvetica Neue", "sans-serif"],
      "$type": "fontFamily"
    }
  }
}
```

#### tokens/brand/brandB.json

```json
{
  "color": {
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.12, 0.38, 0.55],
        "hex": "#1f618d"
      },
      "$type": "color"
    },
    "secondary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.157, 0.455, 0.65],
        "hex": "#2874a6"
      },
      "$type": "color"
    }
  },
  "font": {
    "family": {
      "$value": ["Times New Roman", "serif"],
      "$type": "fontFamily"
    }
  }
}
```

#### Input

```json
{
  "brand": "brandB"
}
```

#### Resolution

In this final Resolution, take note of the following:

- The `namespace` was applied, resulting in `brand.`-prefixed tokens
- Without the `namespace`, there would have been a conflict on `color.primary`. Since modifiers take precedent, the final value would been the one from `brand/brandB.json`.
- Since the input requested `brandB`, no tokens from `brand/brandA.json` were used.

```json
{
  "color": {
    "primary": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "hex": "#000000"
      },
      "$type": "color"
    }
  },
  "font": {
    "family": {
      "$value": ["Times New Roman", "serif"],
      "$type": "fontFamily"
    }
  },
  "button": {
    "background": { "$value": "{brand.color.primary}" },
    "fontFamily": { "$value": "{brand.font.family}" }
  },
  "header": {
    "color": { "$value": "{brand.color.secondary}" }
  },
  "brand": {
    "color": {
      "primary": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0.34, 0.2],
          "hex": "#ff5733"
        },
        "$type": "color"
      },
      "secondary": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0.78, 0, 0.22],
          "hex": "#c70039"
        },
        "$type": "color"
      }
    },
    "font": {
      "family": {
        "$value": ["Helvetica Neue", "sans-serif"],
        "$type": "fontFamily"
      }
    }
  }
}
```

</aside>
