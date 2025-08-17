# Resolver Resolution Example

<aside class="example">

```json
{
  "name": "Example Resolver",
  "sets": [
    {
      "name": "foundation",
      "values": ["foundation.json"]
    },
    {
      "values": ["components/button.json"]
    }
  ],
  "modifiers": [
    {
      "name": "theme",
      "type": "enumerated",
      "values": [
        {
          "name": "light",
          "values": ["themes/light.json"]
        },
        {
          "name": "dark",
          "values": ["themes/dark.json"]
        }
      ],
      "meta": {
        "default": "light",
        "alias": "theme"
      }
    }
  ]
}
```

#### Input

```json
{
  "theme": "dark"
}
```

foundation.json

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color"
      }
    }
  }
}
```

components/button.json

```json
{
  "button": {
    "background": {
      "$value": "{theme.accent}",
      "$type": "color"
    },
    "padding": {
      "$value": "8px",
      "$type": "dimension"
    }
  }
}
```

themes/dark.json

```json
{
  "accent": {
    "$value": "#00FF00",
    "$type": "color"
  }
}
```

#### Resolution Step 1: Input Validation

1. Confirm that "theme" is a defined modifier.
2. Verify that "dark" is a valid value for the "theme" modifier.

#### Resolution Step 2: Base Set Flattening

<ol start="3">

<li>

Load foundation.json and components/button.json. File paths MUST be resolved relative to the location of the resolver file.

</li>

</ol>

Merge (flatten) tokens, resulting in:

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color"
      }
    }
  },
  "button": {
    "background": {
      "$value": "{theme.accent}",
      "$type": "color"
    },
    "padding": {
      "$value": "8px",
      "$type": "dimension"
    }
  }
}
```

#### Resolution Step 3: Modifier Application

<ol start="4">
  <li>Apply the "theme" modifier with value "dark".</li>
  <li>Load themes/dark.json.</li>
</ol>

Apply aliasing as per meta.alias ("theme"), resulting in:

```json
{
  "theme": {
    "accent": {
      "$value": "#00FF00",
      "$type": "color"
    }
  }
}
```

#### Resolution Step 4: Alias Resolution

<p class="note">Alias resolution is performed on the fully merged set of tokens, after all base sets and modifiers have been applied. This allows for aliases to reference tokens from any loaded file. </p>

- Resolve {theme.accent} in button.background.
- Replace with #00FF00.

#### Resolution Step 5: Conflict Resolution</h4>

- No conflicting tokens in this example.

#### Resolution Step 6: Final Output

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": "#FF0000",
        "$type": "color"
      }
    }
  },
  "button": {
    "background": {
      "$value": "#00FF00",
      "$type": "color"
    },
    "padding": {
      "$value": "8px",
      "$type": "dimension"
    }
  }
}
```

</aside>
