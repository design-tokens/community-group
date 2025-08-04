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

#### tokens/core.json

```json
{
  "spacing": {
    "small": {
      "value": "{screen.spacing.small}",
      "type": "dimension"
    },
    "medium": {
      "value": "{screen.spacing.medium}",
      "type": "dimension"
    },
    "large": {
      "value": "{screen.spacing.large}",
      "type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "value": "{screen.typography.fontSize}",
      "type": "dimension"
    }
  }
}
```

#### tokens/screens/mobile.json

```json
{
  "spacing": {
    "small": {
      "value": "4px",
      "type": "dimension"
    },
    "medium": {
      "value": "8px",
      "type": "dimension"
    },
    "large": {
      "value": "12px",
      "type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "value": "14px",
      "type": "dimension"
    }
  }
}
```

#### tokens/screens/tablet.json

```json
{
  "spacing": {
    "small": {
      "value": "6px",
      "type": "dimension"
    },
    "medium": {
      "value": "12px",
      "type": "dimension"
    },
    "large": {
      "value": "18px",
      "type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "value": "16px",
      "type": "dimension"
    }
  }
}
```

#### tokens/screens/desktop.json

```json
{
  "spacing": {
    "small": {
      "value": "8px",
      "type": "dimension"
    },
    "medium": {
      "value": "16px",
      "type": "dimension"
    },
    "large": {
      "value": "24px",
      "type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "value": "18px",
      "type": "dimension"
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
      "value": "{screen.spacing.small}",
      "type": "dimension"
    },
    "medium": {
      "value": "{screen.spacing.medium}",
      "type": "dimension"
    },
    "large": {
      "value": "{screen.spacing.large}",
      "type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "value": "{screen.typography.fontSize}",
      "type": "dimension"
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
        "value": "8px",
        "type": "dimension"
      },
      "medium": {
        "value": "16px",
        "type": "dimension"
      },
      "large": {
        "value": "24px",
        "type": "dimension"
      }
    },
    "typography": {
      "fontSize": {
        "value": "18px",
        "type": "dimension"
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
      "value": "8px",
      "type": "dimension"
    },
    "medium": {
      "value": "16px",
      "type": "dimension"
    },
    "large": {
      "value": "24px",
      "type": "dimension"
    }
  },
  "typography": {
    "fontSize": {
      "value": "18px",
      "type": "dimension"
    }
  }
}
```

#### Explanation:

- By changing the "screenSize" modifier, we can generate tokens appropriate for different devices.
- This method centralizes responsive adjustments, making it easier to maintain and update.

</aside>
