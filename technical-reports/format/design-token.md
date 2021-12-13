# Design token

## Name and value

<aside class="example" title="Minimal file with single design token">

```json
{
  "token name": {
    "value": "token value"
  }
}
```

</aside>

An object with a “**value**” property is a token. Thus, “value” is a reserved word in our spec, meaning you can’t have a token whose name is “value”. The parent object’s key is the token name.

The example above therefore defines 1 design token with the following properties:

- Name: “token name”
- Value: “token value”

Name and value are both **required**.

Token names are case-sensitive, so the following example with 2 tokens in the same group whose names only differ in case is valid:

<aside class="example">

```json
{
  "font-size": { "value": "3rem" },
  "FONT-SIZE": { "value": "16px" }
}
```

</aside>

However, some tools may need to transform names when exporting to other languages or displaying names to the user, so having token names that differ only in case is likely to cause identical and undesirable duplicates in the output. For example, an export tool that converts these tokens to Sass code may generate problematic output like this:

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

Due to the syntax used for [token aliases](#aliases-references) the following characters cannot be used in a token's **name** property or in a [token group](#groups-0) name:

- `{` (left curly bracket)
- `}` (right curly bracket)
- `.` (period)

### Token value type

Token values may be any valid JSON type:

- `string`
- `number`
- `array`
- `object`
- `boolean`
- `null`

Additionally, tokens may be defined with a more specific [Token Type](#types)

<div class="issue" data-number="55" title="Object vs Array">

The structure in the example above is a JSON object, an **unordered** set of name/value pairs.

- Objects can't contain members with duplicate keys
- Ordering of object members may not be preserved (as per [RFC 7159](https://tools.ietf.org/html/rfc7159#section-4)), meaning token retrieval may or may not result in the same ordering as the input

Please raise concerns if these limitations create problems for implementers.

</div>

<div class="issue" data-number="61" title="Reserved words">
  Are there any reserved words that should not be allowed in token names?
</div>

## Additional properties

While “value” is the only required property for a token, a number of additional properties may be added:

## Description

A plain text description explaining the token’s purpose. Tools MAY use the description in various ways. For example:

- Style guide generators could display the description text alongside a visual preview of the token
- IDEs might display the description as a tooltip for auto-completion (similar to how API docs are displayed)
- Design tools might display the description as a tooltip or alongside tokens wherever they can be selected
- Export tools might render the description to a source code comment alongside the variable or constant they export.

The **description** property must be a plain JSON string, for example:

<aside class="example">

```json
{
  "Button background": {
    "value": "#777777",
    "description": "The background color for buttons in their normal state."
  }
}
```

</aside>

<div class="issue" data-number="62" title="Token descriptions optional or required">
  Are token descriptions optional or required?
</div>

## Type

Declares the type of the token. [See “Types”](#types) for more information.

<div class="issue" data-number="63" title="Token types optional or required">
  Are token types optional or required?
</div>

## Extensions

The **extensions** property is an object where tools MAY add proprietary, user-, team- or vendor-specific data to a design token. When doing so, each tool MUST use a vendor-specific key whose value may be any valid JSON data.

- The keys SHOULD be chosen such that they avoid the likelihood of a naming clash with another vendor’s data. The [reverse domain name notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation) is recommended for this purpose.
- Tools that process design token files MUST preserve any extension data they do not themselves understand. For example, if a design token contains extension data from tool A and the file containing that data is opened by tool B, then tool B MUST include the original tool A extension data whenever it saves a new design token file containing that token.

<aside class="example">

```json
{
  "Button background": {
    "value": "#777777",
    "extensions": {
      "org.example.tool-a": 42,
      "org.example.tool-b": {
        "turn-up-to-11": true
      }
    }
  }
}
```

</aside>

In order to maintain interoperability between tools that support this format, teams and tools should restrict their usage of extension data to optional meta-data that is not crucial to understanding that token’s value.

Tool vendors are encouraged to publicly share specifications of their extension data wherever possible. That way other tools can add support for them without needing to reverse engineer the extension data. Popular extensions may also be incorporated as standardized features in future revisions of this specification.

<p class="ednote" title="Extensions section">
  The extensions section is not limited to vendors. All token users can add additional data in this section for their own purposes.
</p>

## More token properties TBC
