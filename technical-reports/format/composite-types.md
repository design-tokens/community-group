# Composite types

<p class="ednote" title="This section will be revisited">
  Note: this proposal may not be in scope for the first version of the specification and requires further discussion.
</p>

The types described in the previous chapter are all for singular values (a color, a dimension, etc.). However, it can often be useful to group related values as a single token so that they can be used or referenced as a single unit. A typical example of this is a “typography style” as found in many design tools, which is a combination of the font name, weight, style, and color.

AND: A combination of the above two examples. Mutually exclusive composites. (Grid styles)

Other examples might be:

- **color pairs**, e.g. a combo of foreground and background color
- **shadows**, e.g. a combination of color, blur (a dimension value), x & y offsets (also dimension values),, and opacity (a number value)
- **border styles**, e.g. a combination of color, style & thickness
- **color schemes**
- **text styles**, e.g. a combination of font and other font properties

<aside class="example" title="Custom type definitions">

```json
{
  "my types": {
    "color pair": {
      "type": "typedef",
      "value": {
        "foreground": {
          "type": "color",
          "required": true
        },
        "background": {
          "type": "color",
          "required": true
        }
      }
    }
  },

  "layer style": {
    "body": {
      "type": "{my types.color pair}",
      "value": {
        "foreground": "#333333",
        "background": "#ffffff"
      }
    },
    "card": {
      "type": "{my types.color pair}",
      "value": {
        "foreground": "#111111",
        "background": "#eeeeee"
      }
    }
  }
}
```

</aside>

## Benefits of composite types over groups

At first glance, groups and composite types might look very similar. However, they are intended to solve different problems and therefore have some important differences:

- Groups are for arbitrarily grouping tokens for the purposes of naming and/or organization.
  - They impose no rules or restrictions on how many tokens or nested groups you put within them, what they are called, or what the types of the tokens within should be. As such, tools MUST NOT try to infer any special meaning or typing of tokens based on a group they happen to be in.
  - Different design systems are likely to group their tokens differently.
  - You can think of groups as containers that exist "outside" of design tokens.
- Composite tokens are individual tokens whose value is made up of several sub-values following a predefined structure.
  - The values of different composite tokens that share the same type are guaranteed to have the same internal structure (unlike multiple groups, where there is no guarantee whatsoever of how their contents are structured). Tools can therefore check their validity and potentially apply specialized processing or presentation to composite tokens.
  - You can think of a composite type as something "inside" an individual token.

## Type checking

Just as with “normal” types for tokens, using a custom, composite type will allow tools to check that the values you use match the expected type. In our color pair example above, attempting to do the following would be invalid and tools should ignore the token and show an error to the user, since “Comic Sans MS” is not a valid color value.

<aside class="example" title="Invalid type">

```json
{
  "broken-token": {
    "type": "{my types.color pair}",
    "value": {
      "foreground": "Comic Sans MS",
      "background": "#eeeeee"
    }
  }
}
```

</aside>

Likewise, IDEs can offer appropriate auto-completions to users that manually author design token files.

## Tool support

Since composite types are user-defined, tools cannot provide specialized handling of them since they have no advanced knowledge of the type declarations. Here are some suggested strategies to get the most value out of user-defined composite types:

### Fallbacks

Given that composite types are ultimately composed of the core design token types, tools that encounter unfamiliar composite tokens could fall back to treating their individual values as separate tokens. In effect, the composite token would be treated the same way as a group of tokens.

Using the color pair type as an example, an export tool like Style Dictionary could just export 2 color variables for it. A token file like this…

<aside class="example" title="JSON source">

```json
{
  "My token": {
    "type": "{my types.color pair}",
    "value": {
      "foreground": "#333333",
      "background": "#ffffff"
    }
  }
}
```

</aside>

….might be exported to Sass like this:

<aside class="example" title="Sass output with fallback">

```css
$my-token-foreground: #333333;
$my-token-background: #ffffff;
```

</aside>

In a similar vein, a GUI tool can "pluck" out the individual values of a composite token and use them as it would normally.

E.g. a design tool like Figma might not have the concept of a color pair, so it can't do anything special with tokens of that type. However, that doesn't prevent it from displaying the foreground and background colors of those tokens alongside any plain color tokens in a color picker.

### Appending custom type definitions

While a tool that imports a token file containing user-defined type definitions that it doesn't understand might not be able to do anything special with them, there's nothing stopping tools that export or modify token files from adding their own type definitions to the file alongside tokens of that type.

For example, imagine Sketch wanted to export all layer styles from a Sketch document to a token file. The Sketch app could have a built-in type definition that corresponds to layer styles. Perhaps something like this:

<aside class="example" title="Custom type definitions for Sketch">

```json
{
  "sketch layer style": {
    "type": "typedef",
    "value": {
      "fill": {
        "type": "color",
        "required": false
      },
      "border": {
        "color": {
          "type": "color",
          "required": false
        },
        "width": {
          "type": "dimension",
          "required": false
        }
      }
    }
  }
}
```

</aside>

It could then just save out that type definition into the token file it exports. Other tools could then make use of that same type definition and do useful things with tokens of that type.

### Custom configuration

Via configuration files or settings menus, tools could let users define custom behavior for types they have defined. For instance, in an export tool like Style Dictionary, users might be able to configure a custom transform or formatter for their composite types.
Then, this example...

<aside class="example" title="Custom configuration source">

```json
{
  "My token": {
    "type": "{my types.color pair}",
    "value": {
      "foreground": "#333333",
      "background": "#ffffff"
    }
  }
}
```

</aside>

...could be configured to export, for example, a mixin instead of 2 variables:

<aside class="example" title="Custom configuration Sass output">

```css
@mixin my-token {
  color: #333333;
  background-color: #ffffff;
}
```

</aside>

The downside is of course that teams need to set up and maintain these configurations themselves.

### GUIs

Since composite types are ultimately composed of the core design token types, a design tool could automatically display an appropriate UI for creating, editing, or previewing them.

For instance, the color pair example above consists of 2 colors, one with the key “foreground” and the other with the key “background”. A design tool could therefore display two color picker widgets using those keys as the respective labels.

<div class="issue" data-number="123" title="Should composites be part of the MVP specification?">

If so, which composites should be included initially?

- Would composites allow for better integration with design tools?
- How would user-defined composites be rendered within design tools?

</div>
