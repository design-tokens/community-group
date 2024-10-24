# Design token

## Name and value

<aside class="example" title="Minimal file with single design token">

```json
{
  "token name": {
    "$value": "#fff000",
    "$type": "color"
  }
}
```

Note: The `$type` property has been added to ensure this example is valid. Please refer to the [design token type chapter](#type-0) for more details.

</aside>

An object with a **`$value`** property is a token. Thus, `$value` is a reserved word in our spec, meaning you can't have a token whose name is "$value". The parent object's key is the token name.

The example above therefore defines 1 design token with the following properties:

- Name: "token name"
- Value: "#fff000"
- Type: "color"

Name and value are both **required**.

Token names are case-sensitive, so the following example with 2 tokens in the same group whose names only differ in case is valid:

<aside class="example">

```json
{
  "font-size": {
    "$value": { "value": 3, "unit": "rem" },
    "$type": "dimension"
  },

  "FONT-SIZE": {
    "$value": {
      "value": 16,
      "unit": "px"
    },
    "$type": "dimension"
  }
}
```

</aside>

However, some tools MAY need to transform names when exporting to other languages or displaying names to the user, so having token names that differ only in case is likely to cause identical and undesirable duplicates in the output. For example, a translation tool that converts these tokens to Sass code would generate problematic output like this:

<aside class="example">

```scss
$font-size: 3rem;
$font-size: 16px;

// The 2nd $font-size overrides the 1st one, so the 1st token
// has essentially been lost.
```

</aside>

Tools MAY display a warning when token names differ only by case.

### Character restrictions

All properties defined by this format are prefixed with the dollar sign (`$`). This convention will also be used for any new properties introduced by future versions of this spec. Therefore, token and [group](#groups) names MUST NOT begin with the `$` character.

Furthermore, due to the syntax used for [token aliases](#aliases-references) the following characters MUST NOT be used anywhere in a token or group name:

- `{` (left curly bracket)
- `}` (right curly bracket)
- `.` (period)

<p class="ednote" title="'$' Prefix Rationale">
  Because of the <a href="#additional-group-properties">decision to prefix group properties with a dollar sign</a> (`$`), token properties will also use a dollar sign prefix. This provides a consistent syntax across the spec.
</p>

## Additional properties

While `$value` is the only required property for a token, a number of additional properties MAY be added:

### Description

A plain text description explaining the token's purpose can be provided via the optional `$description` property. Tools MAY use the description in various ways.

For example:

- Style guide generators MAY display the description text alongside a visual preview of the token
- IDEs MAY display the description as a tooltip for auto-completion (similar to how API docs are displayed)
- [=Design tools=] MAY display the description as a tooltip or alongside tokens wherever they can be selected
- Translation tools MAY render the description to a source code comment alongside the variable or constant they export.

The value of the `$description` property MUST be a plain JSON string, for example:

<aside class="example">

```json
{
  "Button background": {
    "$value": "#777777",
    "$type": "color",
    "$description": "The background color for buttons in their normal state."
  }
}
```

</aside>

### Type

Design tokens always have an unambiguous type, so that tools can reliably interpret their value.

A token's type can be specified by the optional `$type` property. If the `$type` property is not set on a token, then the token's type MUST be determined as follows:

- If the token's value is a reference, then its type is the resolved type of the token being referenced.
- Otherwise, if any of the token's parent groups have a `$type` property, then the token's type is inherited from the closest parent group with a `$type` property.
- Otherwise, if none of the parent groups have a `$type` property, the token's type cannot be determined and the token MUST be considered invalid.

Tools MUST NOT attempt to guess the type of a token by inspecting the contents of its value.

The `$type` property can be set on different levels:

- at the group level
- at the token level

The `$type` property MUST be a plain JSON string, whose value is one of the values specified in this specification's respective type definitions. The value of `$type` is case-sensitive.

For example:

<aside class="example">

```json
{
  "Button background": {
    "$value": "#777777",
    "$type": "color"
  }
}
```

</aside>

### Extensions

The optional **`$extensions`** property is an object where tools MAY add proprietary, user-, team- or vendor-specific data to a design token. When doing so, each tool MUST use a vendor-specific key whose value MAY be any valid JSON data.

- The keys SHOULD be chosen such that they avoid the likelihood of a naming clash with another vendor's data. The [reverse domain name notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation) is recommended for this purpose.
- Tools that process design token files MUST preserve any extension data they do not themselves understand. For example, if a design token contains extension data from tool A and the file containing that data is opened by tool B, then tool B MUST include the original tool A extension data whenever it saves a new design token file containing that token.

<aside class="example">

```json
{
  "Button background": {
    "$value": "#777777",
    "$type": "color",
    "$extensions": {
      "org.example.tool-a": 42,
      "org.example.tool-b": {
        "turn-up-to-11": true
      }
    }
  }
}
```

</aside>

In order to maintain interoperability between tools that support this format, teams and tools SHOULD restrict their usage of extension data to optional meta-data that is not crucial to understanding that token's value.

Tool vendors are encouraged to publicly share specifications of their extension data wherever possible. That way other tools can add support for them without needing to reverse engineer the extension data. Popular extensions could also be incorporated as standardized features in future revisions of this specification.

<p class="ednote" title="Extensions section">
  The extensions section is not limited to vendors. All token users can add additional data in this section for their own purposes.
</p>

### Deprecated

The optional **`$deprecated`** property is a boolean or string where tools MAY specify deprecated tokens. A token MAY be marked deprecated in any of the following scenarios:

- A future update to the design system will remove this token
- Removing the token now may break existing support
- This token is discouraged from future use

<aside class="example">

```json
{
  "Button background": {
    "$value": "#777777",
    "$type": "color",
    "$deprecated": true
  },
  "Button focus": {
    "$value": "#70c0ff",
    "$type": "color",
    "$deprecated": "Please use {button.activeBorder} instead."
  }
}
```

</aside>

| Value    | Explanation                                                 |
| :------- | :---------------------------------------------------------- |
| `true`   | This token is deprecated (no explanation provided).         |
| `String` | This token is deprecated AND this is an explanation.        |
| `false`  | This token is NOT deprecated (may override group defaults). |
