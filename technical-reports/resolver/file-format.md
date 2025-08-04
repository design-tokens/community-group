# File Format

A resolver is defined as a JSON object with the following properties:

- **name** (optional): A human-readable name for the resolver.
- **description** (optional): A description of the resolver's purpose.
- **sets** (required): An array of token sets to be used as the base for resolution.
- **modifiers** (optional): An array of modifiers that can alter or override tokens from the base sets.

### Token Sets

Each token set in the **sets** array is an object with the following properties:

- **name** (optional): An identifier for the set.
- **values** (required): An array of references to token files or inline token definitions. A reference MUST be a string containing a path to a token file. An inline token definition MUST be a JSON object containing a valid design token structure.
- **meta** (optional): Additional metadata, such as proprietary extensions.

<aside class="example" title="Token Set">

```json
{
  "sets": [
    {
      "name": "foundation",
      "values": ["foundation.json"]
    },
    {
      "values": [
        "components/button.json",
        {
          "inline-token": { "$value": "some-value" }
        }
      ]
    }
  ]
}
```

</aside>

<aside class="issue">

It is recommended to use `.tokens.json` as the file extension for token files to align with the Design Tokens Format Specification naming conventions. This helps reinforce that these files should contain valid DTCG token structures rather than arbitrary JSON data.

</aside>

### Modifiers

Modifiers are defined in the **modifiers** array and can have different types, affecting how they influence the resolution
process.

Each modifier is an object with the following properties:

- **name** (required): The name of the modifier.
- **type** (optional, default: "enumerated"): The type of modifier. This can be "enumerated" or "include".
- **values** (required): An array of possible values for the modifier.
- **meta** (optional): Additional metadata, such as default values or aliases.

<aside class="issue">

Default values and aliasing should be moved out of the generic `meta` property into specific typed properties. The `meta` property should be reserved for implementation-specific extensions rather than functionality that directly contributes to resolution behavior.

</aside>

<aside class="example" title="Enumerated modifier">

```json
{
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

</aside>

<aside class="issue">

There are structural problems with using arrays for modifiers and their values. Since `name` is required and must be unique for proper resolution, arrays allow for multiple conflicting values which should be impossible. For example, if a user passes `{ theme: "dark" }` and there are 2 modifiers named "theme" and 2 modifier values named "dark", this creates ambiguity that should be an error rather than defaulting to "take the first one." While arrays make sense for defining order of application, if we want key-value mapping for applying modifiers, flat objects should be required to ensure unique IDs by design.

</aside>

<aside class="issue">

The specification needs to clarify what constitutes valid values in the `values` array for modifiers. Key questions include: Are only relative pathnames allowed? Can referenced files have sets/modifiers of their own (enabling resolver chaining)? Should there be support for referencing sets by name (e.g., "foundation") rather than repeating file paths? The concept of chaining resolvers could use different type values to identify other resolvers. Additionally, values could support local references starting with "#" or string references to set names, making it easier to reference entire sets without listing all token file paths.

</aside>

<aside class="example" title="Include modifier">

This type of modifier is used to conditionally include a set of tokens. The `values` array for an include modifier contains objects with a `name` and a corresponding list of `values` (file paths or inline tokens) that will be included if that name is present in the input.

```json
{
  "modifiers": [
    {
      "name": "features",
      "type": "include",
      "values": [
        {
          "name": "experimental-feature-x",
          "values": ["features/feature-x.json"]
        }
      ]
    }
  ]
}
```

</aside>
