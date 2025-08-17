# Example 3: Responsive Design

<aside class="example" title="Responsive Design Resolver">

Scenario: A design system needs to support responsive design by adjusting spacing and typography based on screen sizes—mobile, tablet, and desktop. We want to manage these variations using modifiers.

### Resolver Definition

```json
{
  "name": "Responsive Design Resolver",
  "sets": [
    {
      "name": "core",
      "values": ["tokens/core.json"]
    }
  ],
  "modifiers": [
    {
      "name": "screenSize",
      "type": "enumerated",
      "values": [
        {
          "name": "mobile",
          "values": ["tokens/screens/mobile.json"]
        },
        {
          "name": "tablet",
          "values": ["tokens/screens/tablet.json"]
        },
        {
          "name": "desktop",
          "values": ["tokens/screens/desktop.json"]
        }
      ],
      "meta": {
        "default": "mobile",
        "alias": "screen"
      }
    }
  ]
}
```

### Token Files

tokens/core.json

```json
{
  "spacing": {
    "small": {
      "v$alue": "{screen.spacing.small}"
    },
    "medium": {
      "$value": "{screen.spacing.medium}"
    },
    "large": {
      "$value": "{screen.spacing.large}"
    }
  },
  "typography": {
    "fontSize": {
      "$value": "{screen.typography.fontSize}"
    }
  }
}
```

tokens/screens/mobile.json

```json
{
  "spacing": {
    "small": {
      "$value": { "value": 4, "unit": "px" },
      "$type": "dimension"
    },
    "medium": {
      "$value": { "value": 8, "unit": "px" },
      "$type": "dimension"
    },
    "large": {
      "$value": { "value": 12, "unit": "px" },
      "$type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "$value": { "value": 14, "unit": "px" },
      "$type": "dimension"
    }
  }
}
```

tokens/screens/tablet.json

```json
{
  "spacing": {
    "small": {
      "$value": { "value": 6, "unit": "px" },
      "$type": "dimension"
    },
    "medium": {
      "$value": { "value": 12, "unit": "px" },
      "$type": "dimension"
    },
    "large": {
      "$value": { "value": 18, "unit": "px" },
      "$type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "$value": { "value": 16, "unit": "px" },
      "$type": "dimension"
    }
  }
}
```

tokens/screens/desktop.json

```json
{
  "spacing": {
    "small": {
      "$value": { "value": 8, "unit": "px" },
      "$type": "dimension"
    },
    "medium": {
      "$value": { "value": 16, "unit": "px" },
      "$type": "dimension"
    },
    "large": {
      "$value": { "value": 24, "unit": "px" },
      "$type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "$value": { "value": 18, "unit": "px" },
      "$type": "dimension"
    }
  }
}
```

### Input

```json
{
  "screenSize": "desktop"
}
```

### Resolution Steps

#### Input Validation<

- Confirm that "screenSize" is a defined modifier.
- Verify that "desktop" is a valid value for the "screenSize" modifier.

#### Base Set Flattening<

Load tokens/core.json.

Tokens:

```json
{
  "spacing": {
    "small": {
      "$value": "{screen.spacing.small}"
    },
    "medium": {
      "$value": "{screen.spacing.medium}"
    },
    "large": {
      "$value": "{screen.spacing.large}"
    }
  },
  "typography": {
    "fontSize": {
      "$value": "{screen.typography.fontSize}"
    }
  }
}
```

#### Modifier Application

Apply the "screenSize" modifier with value "desktop".

Load tokens/screens/desktop.json.

Apply aliasing as per meta.alias ("screen"), resulting in:

```json
{
  "screen": {
    "spacing": {
      "small": {
        "$value": { "$value": 8, "unit": "px" },
        "$type": "dimension"
      },
      "medium": {
        "$value": { "$value": 16, "unit": "px" },
        "$type": "dimension"
      },
      "large": {
        "$value": { "value": 24, "unit": "px" },
        "$type": "dimension"
      }
    },
    "typography": {
      "fontSize": {
        "$value": { "value": 18, "unit": "px" },
        "$type": "dimension"
      }
    }
  }
}
```

#### Alias Resolution

- Resolve {screen.spacing.small} in spacing.small:
  - Replace with 8px.
- Resolve {screen.spacing.medium} in spacing.medium:
  - Replace with 16px.
- Resolve {screen.spacing.large} in spacing.large:
  - Replace with 24px.
- Resolve {screen.typography.fontSize} in typography.fontSize:
  - Replace with 18px.

#### Conflict Resolution

No conflicts in this example.

#### Final Output

```json
{
  "spacing": {
    "small": {
      "$value": { "$value": 8, "unit": "px" },
      "$type": "dimension"
    },
    "medium": {
      "$value": { "value": 16, "unit": "px" },
      "$type": "dimension"
    },
    "large": {
      "$value": { "value": 24, "unit": "px" },
      "$type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "$value": { "value": 18, "unit": "px" },
      "$type": "dimension"
    }
  }
}
```

#### Explanation:

- By changing the "screenSize" modifier, we can generate tokens appropriate for different devices.
- This method centralizes responsive adjustments, making it easier to maintain and update.

</aside>
