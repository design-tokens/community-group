# Resolution Logic

Tools MUST handle the resolution stages in this order to produce the correct output.

1. [Input validation](#input-validation)
2. [Sets flattening](#sets-flattening)
3. [Modifier application](#modifier-application)
4. [Namespacing](#namespacing-0)
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

## Sets flattening

Tools MUST iterate over the resolver’s [sets syntax](#sets) in order.

1. Starting with the first set:
   1. Load the first item in the `values` array to form the **basis** for all tokens.
   2. Load the next item in the `values` array, merging the objects together.
   3. Resolve conflicts according to [conflict resolution](#conflict-resolution).
   4. [Aliases](../format/#alias) MUST NOT be resolved yet. That must happen at the end. Aliases MAY refer to values that will be supplied in upcoming steps.
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

- For each modifier:

  - Apply any aliasing or namespacing specified in meta.
  - Load the token sets associated with the selected modifier value.
  - Merge these tokens with the base tokens, applying overrides as necessary.

<aside class="issue">

The specification should clarify the resolution order when multiple modifiers are applied simultaneously. For instance, if both "theme" and "brand" modifiers are used and both attempt to override the same token, which modifier should take precedence? Clear precedence rules are needed to ensure consistent and predictable resolution behavior across implementations.

</aside>

## Namespacing

Apply [namespacing](#namespacing) specified in modifiers’ to namespace or rename tokens.

## Alias resolution

Alias resolution is performed on the fully merged set of tokens, after all base sets and modifiers have been applied. This allows for aliases to reference tokens from any loaded file.

## Resolution
