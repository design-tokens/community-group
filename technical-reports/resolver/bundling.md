# Bundling

A resolver document allows for the use of tokens to exist in multiple JSON files for organization. But for the purposes of portability, it may be advantageous to deal with only a single JSON document.

“Bundling” refers to the process by which a resolver document may be reduced down into a single file. There are multiple strategies to accomplish this, more than this document outlines. But for the purpose of illustration, this will outline 2 of the many possible approaches:

## Inlining files

Inlining involves taking all [reference objects](#reference-objects) to remote files, and replacing them with their contents. This is a simple strategy that accomplishes the end goal, but results in duplication whenever the same file is referenced multiple times. While a tool may not have any difficulty with duplicated tokens, a human reading this document may likely struggle reading the number of lines of code this would produce.

<aside class="example" title="Bundling by inlining">

Given a resolver that references 5 files:

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "foundation": {
      "sources": [
        { "$ref": "foundation/colors.json" },
        { "$ref": "foundation/size.json" },
        { "$ref": "foundation/typography.json" }
      ]
    }
  },
  "modifiers": {
    "theme": {
      "contexts": {
        "light": [
          { "$ref": "foundation/colors.json" },
          { "$ref": "theme/light.json" }
        ],
        "dark": [
          { "$ref": "foundation/colors.json" },
          { "$ref": "theme/dark.json" }
        ]
      }
    }
  },
  "resolutionOrder": [
    { "$ref": "#/sets/foundation" },
    { "$ref": "#/modifiers/theme" }
  ]
}
```

One could inline the contents, resulting in:

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "foundation": {
      "sources": [
        {
          // (contents of foundation/colors.json)
        },
        {
          // (contents of foundation/size.json)
        },
        {
          // (contents of foundation/typography.json)
        }
      ]
    }
  },
  "modifiers": {
    "theme": {
      "contexts": {
        "light": [
          {
            // (contents of foundation/colors.json)
          },
          {
            // (contents of theme/light.json)
          }
        ],
        "dark": [
          {
            // (contents of foundation/colors.json)
          },
          {
            // (contents of theme/dark.json)
          }
        ]
      }
    }
  },
  "resolutionOrder": [
    { "$ref": "#/sets/foundation" },
    { "$ref": "#/modifiers/theme" }
  ]
}
```

The contents of the files were abbreviated for readability. Their contents could be anything and aren’t relevant to the topic of bundling.

Note that `foundation/colors.json` was referenced 3 times in the document, so inlining produced 3 copies of the same contents.

</aside>

## Using $defs for files

As described in [$defs](#defs), `$defs` don’t have defined behavior in a resolver document. They may only be used if a tool decides to support this feature of JSON Schema.

This strategy involves creating a top-level `$defs` key, with each top-level key containing the contents for that file.

The only downside of using `$defs` is some tools may choose to ignore it, as it is not a minimum requirement of a resolver document.

<aside class="example" title="Bundling by using $defs">

Given the same resolver [from the inlining section](#inlining-files), we can create a new top-level `$defs` key, and adding keys and values that correspond to filenames and its contents, respectively:

```json
{
  "$schema": "https://www.designtokens.org/schemas/2025.10/resolver.json",
  "sets": {
    "foundation": {
      "sources": [
        { "$ref": "#/$defs/foundation~1colors.json" },
        { "$ref": "#/$defs/foundation~1size.json" },
        { "$ref": "#/$defs/foundation~1typography.json" }
      ]
    }
  },
  "modifiers": {
    "theme": {
      "contexts": {
        "light": [
          { "$ref": "#/$defs/foundation~1colors.json" },
          { "$ref": "#/$defs/theme~1light.json" }
        ],
        "dark": [
          { "$ref": "#/$defs/foundation~1colors.json" },
          { "$ref": "#/$defs/theme~1dark.json" }
        ]
      }
    }
  },
  "resolutionOrder": [
    { "$ref": "#/sets/foundation" },
    { "$ref": "#/modifiers/theme" }
  ],
  "$defs": {
    "foundation/colors.json": {
      // (contents of foundation/colors.json)
    },
    "foundation/size.json": {
      // (contents of foundation/size.json)
    },
    "foundation/typography.json": {
      // (contents of foundation/typography.json)
    },
    "theme/light.json": {
      // (contents of theme/light.json)
    },
    "theme/dark.json": {
      // (contents of theme/dark.json)
    }
  }
}
```

Using this method, we’ve not only reduced the deduplication, but we’ve also preserved the format and shape of the original resolver document without adding any length.

It’s worth noting that when the “`/`” character is used in a name, it must be escaped with `~1` according to [[RFC6901]] so it’s not treated as a subpath. It’s also worth noting that because the filename appears after the `#` fragment character, “`[filename].json`” is referring to a point in the same document and not an actual file (otherwise it would appear before “`#`”).

</aside>
