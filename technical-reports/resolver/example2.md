# Example 2: Component States

<aside class="example" title="Responsive Design Resolver">

Scenario: A design system includes buttons that change appearance based on their state—default, hover, active, and disabled. We want to manage these state-specific styles using modifiers.

### Resolver Definition

```json
{
  "name": "Component States Resolver",
  "sets": [
    {
      "values": ["tokens/components/button.json"]
    }
  ],
  "modifiers": [
    {
      "name": "state",
      "type": "enumerated",
      "values": [
        {
          "name": "default",
          "values": ["tokens/states/default.json"]
        },
        {
          "name": "hover",
          "values": ["tokens/states/hover.json"]
        },
        {
          "name": "active",
          "values": ["tokens/states/active.json"]
        },
        {
          "name": "disabled",
          "values": ["tokens/states/disabled.json"]
        }
      ],
      "meta": {
        "default": "default"
      }
    }
  ]
}
```

### Token Files

tokens/components/button.json

```json
{
  "button": {
    "background": {
      "$value": "{state.background}"
    },
    "textColor": {
      "$value": "{state.textColor}"
    },
    "borderColor": {
      "$value": "{state.borderColor}"
    }
  }
}
```

tokens/states/default.json

```json
{
  "background": {
    "$value": {
      "colorSpace": "srgb",
      "components": [1, 1, 1]
    },
    "$type": "color"
  },
  "textColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 0, 0]
    },
    "$type": "color"
  },
  "borderColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.8, 0.8, 0.8],
      "hex": "#cccccc"
    },
    "$type": "color"
  }
}
```

tokens/states/hover.json

```json
{
  "background": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.93, 0.93, 0.93],
      "hex": "#f0f0f0"
    },
    "$type": "color"
  },
  "textColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 0, 0]
    },
    "$type": "color"
  },
  "borderColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.73 0.73, 0.73],
      "hex": "#bbbbbb",
    },
    "$type": "color"
  }
}
```

tokens/states/active.json

```json
{
  "background": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.878, 0.878, 0.878],
      "hex": "#e0e0e0"
    },
    "$type": "color"
  },
  "textColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 0, 0]
    },
    "$type": "color"
  },
  "borderColor": {
    "value": {
      "colorSpace": "srgb",
      "components": [0.666, 0.666, 0.666],
      "hex": "#aaaaaa"
    },
    "$type": "color"
  }
}
```

tokens/states/disabled.json

```json
{
  "background": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.976, 0.976, 0.976],
      "hex": "#f9f9f9"
    },
    "$type": "color"
  },
  "textColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.466, 0.466, 0.466],
      "hex": "#777777"
    },
    "$type": "color"
  },
  "borderColor": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0.866, 0.866, 0.866],
      "hex": "#dddddd"
    },
    "$type": "color"
  }
}
```

### Input

```json
{
  "state": "hover"
}
```

### Resolution Steps

#### Input Validation

- Confirm that "state" is a defined modifier.
- Verify that "hover" is a valid value for the "state" modifier.

#### Base Set Flattening

Load tokens/components/button.json.

Tokens:

```json
{
  "button": {
    "background": {
      "$value": "{state.background}"
    },
    "textColor": {
      "$value": "{state.textColor}"
    },
    "borderColor": {
      "$value": "{state.borderColor}"
    }
  }
}
```

#### Modifier Application

Apply the "state" modifier with value "hover".

Load tokens/states/hover.json.

Tokens under the "state" namespace:

```json
{
  "state": {
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.94, 0.94, 0.94],
        "hex": "#f0f0f0"
      },
      "$type": "color"
    },
    "textColor": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0, 0]
      },
      "$type": "color"
    },
    "borderColor": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.73, 0.73, 0.73],
        "hex": "#bbb"
      },
      "$type": "color"
    }
  }
}
```

#### Alias Resolution

- Resolve {state.background} in button.background:
  - Replace with #F0F0F0.
- Resolve {state.textColor} in button.textColor:
  - Replace with #000000.
- Resolve {state.borderColor} in button.borderColor:
  - Replace with #BBBBBB.

#### Conflict Resolution

No conflicts in this example.

#### Final Output

```json
{
  "button": {
    "background": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.94, 0.94, 0.94],
        "hex": "#f0f0f0"
      },
      "$type": "color"
    },
    "textColor": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "hex": "#000000"
      },
      "$type": "color"
    },
    "borderColor": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0.73, 0.73, 0.73],
        "hex": "#bbbbbb"
      },
      "$type": "color"
    }
  }
}
```

#### Explanation:

- By changing the "state" modifier, we can easily generate the tokens for different button states.

- This approach keeps state-specific styles organized and separate from component definitions.

</aside>
