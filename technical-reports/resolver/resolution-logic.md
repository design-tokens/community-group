# Resolution Logic

Tools MUST handle the resolution stages in this order to produce the correct output.

1. [Input validation](#input-validation)
2. [Token flattening](#token-flattening)
3. [Resolution](#resolution-0)

## Input validation

Tools MUST require all [=inputs=] meet the schema described in that resolver’s [modifiers syntax](#modifiers).

If a resolver does NOT declare any modifiers, skip this step and proceed to [Sets flattening](#sets-flattening)

1. For every key in the input object:
   1. Verify it corresponds with a valid modifier. If it does not, throw an error.
   1. Verify that key’s value corresponds with that modifier’s allowed values. If it does not, throw an error.
2. For every modifier in the resolver:
   1. If that resolver does NOT declare a default value, verify a key is provided in the input. If not, throw an error.

## Token flattening

Tools MUST iterate over the [tokens](#tokens) array in order.

### Sets

1. Sets are loaded in the [tokens](#tokens) array order.
1. If this uses [simple syntax](#simple-syntax) (string), treat it as if it is a set with no `name`, with a single item in the `sources` array.
1. Every token reference in `sources` MUST be resolved in array order.
1. For every token reference, merge with the previous set.
1. [Aliases](../format/#aliases-references) MUST NOT be resolved yet. That must happen at the end. Aliases MAY refer to values that will be supplied in upcoming steps.

<aside class="example" title="Conflict resolution">

```json
{
  "tokens": [
    {
      "type": "set",
      "name": "foundation",
      "sources": [
        {
          "color": {
            "text": {
              "default": {
                "$value": {
                  "colorSpace": "srgb",
                  "components": [0, 0, 0]
                },
                "$type": "color"
              }
            }
          }
        },
        {
          "color": {
            "text": {
              "default": {
                "$value": {
                  "colorSpace": "srgb",
                  "components": [0.1, 0.1, 0.1]
                },
                "$type": "color"
              }
            }
          }
        }
      ]
    }
  ]
}
```

Here, two `color.text.default` tokens were supplied, one after the other. Since the order matters, the last declaration “wins” and the final result will be:

```json
{
  "color": {
    "text": {
      "default": {
        "$value": { "colorSpace": "srgb", "components": [0.1, 0.1, 0.1] },
        "$type": "color"
      }
    }
  }
}
```

</aside>

<aside class="example" title="Invalid conflict">

```json
{
  "tokens": [
    {
      "type": "set",
      "name": "foundation",
      "sources": [
        {
          "text": {
            "error": {
              "$value": { "colorSpace": "srgb", "components": [0.8, 0.1, 0] },
              "$type": "color"
            }
          }
        },
        {
          "text": {
            "error": {
              "font": { "$value": ["Consolas"], "$type": "fontFamily" },
              "color": {
                "$value": { "colorSpace": "srgb", "components": [0.8, 0.1, 0] },
                "$type": "color"
              }
            }
          }
        }
      ]
    }
  ]
}
```

These tokens can not be merged, since `text.error` is a color token in the first item, and is a group in the second item. An error will be thrown.

</aside>

<aside class="example" title="Simple syntax comparison">

All of the following MUST be flattened in the same order, and are equivalent to one another:

```json
{
  "tokens": ["base/foundation.json", "base/colors.json"]
}
```

```json
{
  "tokens": [
    { "type": "set", "sources": ["base/foundation.json", "base/colors.json"] }
  ]
}
```

```json
{
  "tokens": [
    { "type": "set", "sources": ["base/foundation.json"] },
    { "type": "set", "sources": ["base/colors.json"] }
  ]
}
```

</aside>

### Modifiers

Every modifier is applied in order, taking in the external input [=inputs=].

1.  For that modifier, load the corresponding [=input=] value.
    1. If there is not an input value, load the `default` context.
    1. If there is neither an input value nor `default` context, throw an error and stop resolution.
1.  Load the context’s appropriate [&lt;token-defs&gt;](#token-defs) array that corresponds to the input value.
1.  Flatten the [&lt;token-defs&gt;](#token-defs) array into the existing basis, in array order.

<aside class="example" class="Modifier application">

Given the [=input=]:

```json
{ "theme": "dark" }
```

Then that would load only the tokens specified in the `theme` modifier, under the `dark` name value.

```json
{
  "tokens": [
    {
      "type": "modifier",
      "name": "theme",
      "context": {
        "light": ["colors/light.json"],
        "dark": ["colors/dark.json"]
      }
    }
  ]
}
```

</aside>

<aside class="issue">

The specification should clarify the resolution order when multiple modifiers are applied simultaneously. For instance, if both "theme" and "brand" modifiers are used and both attempt to override the same token, which modifier should take precedence? Clear precedence rules are needed to ensure consistent and predictable resolution behavior across implementations.

</aside>

### Conflict resolution (flattening)

Conflict resolution occurs when flattening [=sets=] or applying [=modifiers=], and a token name appears by tokens of different values, from different sources. In many cases, this is intentional, but not always.

When 2 tokens try and occupy the same space, tools MUST resolve the conflict in the following manner:

1. If the token types are **identical**, overwrite the latter value with the former.
1. If the token types are **incompatible**, the tool MUST throw an error.
1. If one name is a token, and the other is a group, the tool MUST throw an error.
1. If one value is an alias (i.e. the `$type` is unknown), overwrite the value.

## Alias resolution

Alias resolution may only done after all [sets](#set-flattening) and [modifiers](#modifier-application) are handled, and there are no other tokens to merge in. Resolve aliases the same way as outlined in the [format](../format/#aliases-references), allowing deep aliases but erring and stopping resolution on circular aliases and/or aliases that point to unresolvable types (such as aliasing a [dimension token](#dimension) inside a [gradient token](#gradient), which is invalid).

## Resolution

After all aliases resolve correctly in the final set, the end result is one tokens object, that behaves as if it was a single JSON file to begin with.

<aside class="example" title="Theme resolution">

We’ll start with the following file structure, followed by walking through the resolution stages step-by-step.

<table>
<thead><tr><th>Name</th><th>Code</th></tr></thead>

<tbody><tr><th>

Resolver

</th><td>

```json
{
  "tokens": [
    {
      "type": "set",
      "sources": ["foundation.json"]
    },
    "components/button.json",
    {
      "type": "modifier",
      "name": "theme",
      "context": {
        "light": ["themes/light.json"],
        "dark": ["themes/dark.json"]
      }
    }
  ]
}
```

</td></tr><tr><th>

Input

</th><td>

```json
{
  "theme": "dark"
}
```

</td></tr><tr><th>

foundation.json

</th><td>

```json
{
  "color": {
    "brand": {
      "primary": {
        "$value": {
          "colorSpace": "srgb",
          "components": [1, 0, 0],
          "hex": "#ff0000"
        },
        "$type": "color"
      }
    }
  }
}
```

</td></tr><tr><th>

components/button.json

</th><td>

```json
{
  "button": {
    "background": {
      "$value": "{theme.accent}"
    },
    "padding": {
      "$value": { "value": 8, "unit": "px" },
      "$type": "dimension"
    }
  }
}
```

</td></tr><tr><th>

themes/dark.json

</th><td>

```json
{
  "theme": {
    "accent": {
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 1, 0],
        "hex": "#00ff00"
      },
      "$type": "color"
    }
  }
}
```

</td></tr></tbody></table>

1. Input Validation
   1. Verify that `theme` is a defined modifier (it passes).
   2. Verify that `dark` is a valid value for the `theme` modifier (it passes).
2. Tokens flattening

   1. The first item is a set containing `["foundation.json"]` in `sources`. Load these in array order..
   2. The second item is a set containing `"components/button.json"`. Load that, and merge with the previous result, resulting in:

      ```json
      {
        "color": {
          "brand": {
            "primary": {
              "$value": {
                "colorSpace": "srgb",
                "components": [1, 0, 0],
                "hex": "#ff0000"
              },
              "$type": "color"
            }
          }
        },
        "button": {
          "background": {
            "$value": "{theme.accent}"
          },
          "padding": {
            "$value": { "value": 8, "unit": "px" },
            "$type": "dimension"
          }
        }
      }
      ```

   3. The third item is a modifier with the name `theme`.

      1. Taking the `{ "theme": "dark" }` input results in `["themes/dark.json"]`.
      1. Load that, and flatten with the previous result, resulting in:

   ```json
   {
     "color": {
       "brand": {
         "primary": {
           "$value": {
             "colorSpace": "srgb",
             "components": [1, 0, 0],
             "hex": "#ff0000"
           },
           "$type": "color"
         }
       }
     },
     "theme": {
       "accent": {
         "$value": {
           "colorSpace": "srgb",
           "components": [0, 1, 0],
           "hex": "#00ff00"
         },
         "$type": "color"
       }
     },
     "button": {
       "background": {
         "$value": "{theme.accent}"
       },
       "padding": {
         "$value": { "value": 8, "unit": "px" },
         "$type": "dimension"
       }
     }
   }
   ```

3. Alias resolution

   1. After all tokens have been loaded, `{theme.accent}` may now be resolved.

4. Resolution

   1. The final result, with the aliases applied, results in:

   ```json
   {
     "color": {
       "brand": {
         "primary": {
           "$value": {
             "colorSpace": "srgb",
             "components": [1, 0, 0],
             "hex": "#ff0000"
           },
           "$type": "color"
         }
       }
     },
     "theme": {
       "accent": {
         "$value": {
           "colorSpace": "srgb",
           "components": [0, 1, 0],
           "hex": "#00ff00"
         },
         "$type": "color"
       }
     },
     "button": {
       "background": {
         "$value": {
           "colorSpace": "srgb",
           "components": [0, 1, 0],
           "hex": "#00ff00"
         },
         "$type": "color"
       },
       "padding": {
         "$value": { "value": 8, "unit": "px" },
         "$type": "dimension"
       }
     }
   }
   ```

Key takeaways:

- Without the resolver, `{theme.accent}` is an invalid alias since it exited in a remote file.
- Sets and modifiers are applied in declaration order.
- The `theme` modifier did not have a `default` value. Therefore an error would have been thrown without an input.

</aside>
