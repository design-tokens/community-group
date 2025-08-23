# Resolution Logic

Tools MUST handle the resolution stages in this order to produce the correct output.

1. [Input validation](#input-validation)
2. [Set flattening](#set-flattening)
3. [Modifier application](#modifier-application)
4. [Namespacing](#namespacing)
5. [Alias resolution](#alias-resolution):
6. [Resolution](#resolution-0)

## Input validation

Tools MUST require all [=inputs=] meet the schema described in that resolver’s [modifiers syntax](#modifiers).

If a resolver does NOT declare any modifiers, skip this step and proceed to [Sets flattening](#sets-flattening)

1. For every key in the input object:
   1. Verify it corresponds with a valid modifier. If it does not, throw an error.
   1. Verify that key’s value corresponds with that modifier’s allowed values. If it does not, throw an error.
2. For every modifier in the resolver:
   1. If that resolver does NOT declare a default value, verify a key is provided in the input. If not, throw an error.

## Set flattening

Tools MUST iterate over the resolver’s [sets syntax](#sets) in order.

1. Starting with the first set:
   1. Load the first item in the `values` array to form the **basis** for all tokens.
   2. Load the next item in the `values` array, merging the objects together.
   3. Resolve conflicts according to [conflict resolution](#conflict-resolution).
   4. [Aliases](../format/#aliases-references) MUST NOT be resolved yet. That must happen at the end. Aliases MAY refer to values that will be supplied in upcoming steps.
   5. Continue loading the next item in the `values` array, repeating steps 2–3.
   6. After all `values` have been merged into the **basis** object, keep that in memory and continue onto the next set.
2. Continue onto the set, loading tokens in the same way as before.
   1. Repeating the steps previously, you’ll also end up with a **basis** for this set—a single object containing all tokens referenced in the set.
3. Continue one-by-one through the remaining sets, until you have a collection of one **basis** object per set.
4. Return back to the first set, first basis, then merge the second set, second basis, and so on, until you reach the final set.
   1. [Resolve conflicts](#conflict-resolution) as every additional set is merged.
5. After all sets have been merged, there will be one single tokens object containing all tokens referenced.

### Conflict resolution

Conflict resolution occurs when flattening [=sets=] or applying [=modifiers=], and a token name is occupied by tokens of different values, from different sources. In many cases, this is intentional, but not always.

When 2 tokens try and occupy the same space, tools MUST resolve the conflict in the following manner:

1. If the token types are **identical**, overwrite the latter value with the former.
1. If the token types are **incompatible**, the tool MUST throw an error.
1. If one namespace is a token, and the other is a group, the tool MUST throw an error.
1. If one value is an alias (i.e. the `$type` is unknown), overwrite the value.

<aside class="example" title="Conflict resolution">

```json
{
  "sets": [
    {
      "name": "foundation",
      "values": [
        {
          "color": {
            "text": {
              "default": {
                "$value": { "colorSpace": "srgb", "components": [0, 0, 0] },
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

Here, 2 `color.text.default` tokens were supplied, one after the other. Since the order matters, the last declaration “wins” and the final result will be:

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
  "sets": [
    {
      "name": "foundation",
      "values": [
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

These sets can not be merged, since `text.error` is a color token in the first item, and is a group in the second item. An error will be thrown.

</aside>

## Modifier application

Apply the selected [=modifiers=] based on the [=inputs=]. Modifiers can override tokens from the base sets or introduce new tokens.

1. For every modifier in the `modifiers` array, iterate in declaration order.
   1. For that modifier, load the corresponding [=input=] value.
      1. If there is not an input value, load `meta.default`.
      1. If there is no default value, throw an error and stop resolution.
   1. Load the [&lt;token-defs&gt;](#token-defs) array that corresponds to the input value, or default value.
   1. Apply namespacing if `meta.namespace` is declared.
   1. In array order, flatten each token using the same steps as [set flattening](#set-flattening).
   1. At the end of the array, merge into the basis object created in the previous [set flattening](#set-flattening) step.
1. Continue through all modifiers repeating the same process, merging into the basis each time.

<aside class="example" class="Modifier application">

Given the [=input=]:

```json
{ "theme": "dark" }
```

Then that would load only the tokens specified in the `theme` modifier, under the `dark` name value.

```json
{
  "modifiers": [
    {
      "name": "theme",
      "values": [
        { "name": "light", "values": ["colors/light.json"] },
        { "name": "dark", "values": ["colors/dark.json"] }
      ]
    }
  ]
}
```

</aside>

<aside class="issue">

The specification should clarify the resolution order when multiple modifiers are applied simultaneously. For instance, if both "theme" and "brand" modifiers are used and both attempt to override the same token, which modifier should take precedence? Clear precedence rules are needed to ensure consistent and predictable resolution behavior across implementations.

</aside>

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
  "sets": [
    { "name": "foundation", "values": ["foundation.json"] },
    { "values": ["components/button.json"] }
  ],
  "modifiers": [
    {
      "name": "theme",
      "type": "enumerated",
      "values": [
        { "name": "light", "values": ["themes/light.json"] },
        { "name": "dark", "values": ["themes/dark.json"] }
      ],
      "meta": {
        "default": "light",
        "namespace": "theme"
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
  "accent": {
    "$value": {
      "colorSpace": "srgb",
      "components": [0, 1, 0],
      "hex": "#00ff00"
    },
    "$type": "color"
  }
}
```

</td></tr></tbody></table>

1. Input Validation
   1. Verify that `theme` is a defined modifier (it passes).
   2. Verify that `dark` is a valid value for the `theme` modifier (it passes).
2. Set flattening

   1. Load `foundation.json` and `components/button.json`. File paths MUST be resolved relative to the location of the resolver file.
   2. Flattening all sets resuls in:
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

3. Modifier application

   1. Apply the `theme` modifier with value `dark`.
   2. Load `themes/dark.json`
   3. Apply namespacing as per `meta.namespace` ("theme"), resulting in:

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

4. Alias resolution

   1. Resolve `{theme.accent}` in `button.background`.

5. Resolution. The final tokens will take the shape of:

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

Key highlights:

- The `accent` token was renamed to `theme.accent` because of the `meta.namespace` value.
- Without a resolver, `button.background` would have an invalid alias since `theme.accent` is not in the same file.

</aside>
