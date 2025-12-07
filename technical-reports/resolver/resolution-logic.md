# Resolution logic

Tools MUST handle the resolution stages in order to produce the correct output.

1. [Input validation](#input-validation): verifying the [input](#inputs) is valid for the given resolver document.
2. [Ordering](#ordering): tracing the `resolutionOrder` array to produce the final tokens structure.
3. [Aliases](#aliases): resolving token aliases in the final tokens structure.
4. [Resolution](#resolution): the final end result

## Input validation

Tools MUST require all [=inputs=] match the provided [modifier](#modifiers) contexts.

If a resolver does NOT declare any modifiers, skip this step and proceed to [ordering](#ordering).

1. For every key in the input object:
   1. Verify it corresponds with a valid modifier. If it does not, throw an error.
   1. Verify that key’s value corresponds with that modifier’s allowed values. If it does not, throw an error.
2. For every modifier in the resolver:
   1. If that resolver does NOT declare a default value, verify a key is provided in the input. If not, throw an error.

## Ordering

Tools MUST iterate over the [resolutionOrder](#resolution-order) array in order.

1. For every item in the array, determine whether it’s a [set](#sets) or [modifier](#modifiers), flattening into a single tokens structure in array order.
   1. If the item is a set, combine the `sources` in array order to produce a single tokens structure.
   1. Otherwise, if the item is a modifier, select only the `context` that matches the [input](#inputs), combining the array in order to produce a single tokens structure.
   1. In case of a conflict, take the most recent occurrence in the array.

1. Repeat until you’ve reached the end of the `resolutionOrder` array.

The final result will be a tokens structure that behaves the same as if it were one source to begin with.

<aside class="example" title="Conflict resolution">

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "foundation": {
      "sources": [
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
  },
  "resolutionOrder": [{ "$ref": "#/sets/foundation" }]
}
```

Here, two `color.text.default` tokens were encountered. Since order matters, the last declaration “wins” and the final result will be:

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

## Aliases

Aliases MUST NOT be resolved until this step.

After the [ordering](#ordering) has been flattened into a single tokens structure, the only remaining step is resolving aliases. Aliases are resolved the exact same way as outlined in the [format](../format/#aliases-references):

- Deep aliases are allowed, so long as they’re not circular
- An alias must point to the correct `$type`.

## Resolution

<aside class="example" title="Theme resolution">

We’ll start with the following file structure, followed by walking through the resolution stages step-by-step.

<table>
<thead><tr><th>Name</th><th>Contents</th></tr></thead>

<tbody><tr><th>

Resolver

</th><td>

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "foundation": {
      "sources": [{ "$ref": "foundation.json" }]
    },
    "components": {
      "sources": [{ "$ref": "components/button.json" }]
    }
  },
  "modifiers": {
    "theme": {
      "context": {
        "light": [{ "$ref": "themes/light.json" }],
        "dark": [{ "$ref": "themes/dark.json" }]
      }
    }
  },
  "resolutionOrder": [
    { "$ref": "#/sets/foundation" },
    { "$ref": "#/sets/components" },
    { "$ref": "#/modifiers/theme" }
  ]
}
```

</td></tr><tr><th>

Input

</th><td>

```json
{ "theme": "dark" }
```

</td></tr><tr><th>

foundation.json

</th><td>

- `color.brand.primary` (color)

</td></tr><tr><th>

components/button.json

</th><td>

- `button.background` (color)
- `button.padding` (dimension)

</td></tr><tr><th>

themes/light.json

</th><td>

- `theme.accent`

</td></tr><tr><th>

themes/dark.json

</th><td>

- `theme.accent` (alternate value)

</td></tr></tbody></table>

1. Input Validation
   1. Verify that `theme` is a defined modifier (it passes).
   1. Verify that `dark` is a valid value for the `theme` modifier (it passes).
1. Ordering
   1. The first item is the `foundation` set, providing `color.brand.primary`.
   2. The second item is the `components` set, providing `button.background` and `button.padding`.
   3. The third and final item is the `theme` modifier, providing `theme.accent`.
   4. Thus, the final resolution includes 4 tokens.
1. Alias
   1. If any tokens contain aliases, only at this point may they be resolved
1. Resolution
   1. The final tokens spread looks like:
      1. `color.brand.primary` (from `foundation.json`)
      2. `button.background` (from `components/button.json`)
      3. `button.padding` (from `components/button.json`)
      4. `theme.accent` (from `themes/dark.json`)

Key takeaways:

- `themes/light.json` was never used since the input was `{ "theme": "dark" }`.

</aside>
