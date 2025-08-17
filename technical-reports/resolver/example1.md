# Example 1: Brand Theming

<aside class="example">

Scenario: A company has multiple brands—Brand A and Brand B. Each brand has its own color palette and typography. Components like buttons and headers need to adapt based on the selected brand.

<aside class="issue">

These examples could be moved to the Resolver Spec netlify app for better presentation. If it uses Astro, interactive code tabs could be added to make the examples more engaging and easier to understand through hands-on exploration.

</aside>

### Resolver Definition

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
      "meta": {
        "default": "brandA",
        "alias": "brand"
      }
    }
  ]
}
```

### Token Files</h3>

#### tokens/base.json

```json
{
  "color": {
    "text": {
      "primary": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "hex": "#000000"
        },
        "$type": "color"
      }
    }
  },
  "font": {
    "family": {
      "default": {
        "$value": ["Arial", "sans-serif"],
        "$type": "fontFamily"
      }
    }
  }
}
```

#### tokens/components.json

```json
{
  "button": {
    "background": {
      "$value": "{brand.color.primary}"
    },
    "fontFamily": {
      "$value": "{brand.font.family}"
    }
  },
  "header": {
    "color": {
      "$value": "{brand.color.secondary}"
    }
  }
}
```

#### tokens/brands/brandA.json

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

#### tokens/brands/brandB.json

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
        "components": [0.156, 0.455, 0.65],
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

### Input

```json
{
  "brand": "brandB"
}
```

### Resolution Steps<

#### Input Validation

- Confirm that "brand" is a defined modifier.
- Verify that "brandB" is a valid value for the "brand" modifier.

#### Base Set Flattening<

Load tokens/base.json and tokens/components.json.

Merge tokens:

```json
{
  "color": {
    "text": {
      "primary": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "hex": "#000000"
        },
        "$type": "color"
      }
    }
  },
  "font": {
    "family": {
      "default": {
        "$value": ["Arial", "sans-serif"],
        "$type": "fontFamily"
      }
    }
  },
  "button": {
    "background": {
      "$value": "{brand.color.primary}"
    },
    "fontFamily": {
      "$value": "{brand.font.family}"
    }
  },
  "header": {
    "color": {
      "$value": "{brand.color.secondary}"
    }
  }
}
```

#### Modifier Application

Apply the "brand" modifier with value "brandB".

Load tokens/brands/brandB.json.

Apply aliasing as per meta.alias ("brand"), resulting in:

```json
{
  "brand": {
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
}
```

#### Alias Resolution

- Resolve {brand.color.primary} in button.background:
  - Replace with #1F618D.
- Resolve {brand.font.family} in button.fontFamily:
  - Replace with 'Times New Roman', serif.
- Resolve {brand.color.secondary} in header.color:
  - Replace with #2874A6.

#### Conflict Resolution

No conflicts in this example.

#### Final Output

```json
{
  "color": {
    "text": {
      "primary": {
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0, 0],
          "hex": "#000000"
        },
        "$type": "color"
      }
    }
  },
  "font": {
    "family": {
      "default": {
        "$value": ["Arial", "sans-serif"],
        "$type": "fontFamily"
      }
    }
  },
  "button": {
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.12, 0.38, 0.55],
        "hex": "#1f618d"
      },
      "$type": "color"
    },
    "fontFamily": {
      "$value": ["Times New Roman", "serif"],
      "$type": "fontFamily"
    }
  },
  "header": {
    "color": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.157, 0.455, 0.65],
        "hex": "#2874a6"
      },
      "$type": "color"
    }
  }
}
```

#### Explanation:

- By changing the "brand" modifier, we can switch between different brand themes without altering the base token definitions.
- The resolver efficiently manages the brand-specific overrides and applies them to components.

</aside>
