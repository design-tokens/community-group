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

<div class="issue" data-number="123" title="Object vs Array">

The structure in the example above is a JSON object, an **unordered** set of name/value pairs.

- Objects can't contain members with duplicate keys
- Ordering of object members may not be preserved (as per [RFC 7159](https://tools.ietf.org/html/rfc7159#section-4)), meaning token retrieval may or may not result in the same ordering as the input

Please raise concerns if these limitations create problems for implementers.

</div>

<div class="issue" data-number="456" title="Unicode range restriction">

Should the specification restrict the name property to a specific Unicode range or make certain characters invalid at the start/middle/end of a name (such as white space, line breaks…)? If so, what characters and why?

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

## Type

Declares the type of the token. [See “Types”](#types) for more information.

## Vendor

The **vendor** property is an object where tools MAY add proprietary, vendor-specific data to a design token. When doing so, each tool MUST use a vendor-specific key whose value may be any valid JSON data.

- The vendor-specific keys SHOULD be chosen such that they avoid the likelihood of a naming clash with another vendor’s data. The [reverse domain name notation](https://en.wikipedia.org/wiki/Reverse_domain_name_notation) is recommended for this purpose.
- Tools that process design token files MUST preserve any vendor data they do not themselves understand. For example, if a design token contains vendor data from tool A and the file containing that data is opened by tool B, then tool B MUST include the original tool A vendor data whenever it saves a new design token file containing that token.

<aside class="example">

```json
{
  "Button background": {
    "value": "#777777",
    "vendor": {
      "org.example.tool-a": 42,
      "org.example.tool-b": {
        "turn-up-to-11": true
      }
    }
  }
}
```

</aside>

In order to maintain interoperability between tools that support this format, tools should restrict their usage of vendor data to optional meta-data that is not crucial to understanding that token’s value.

Tool vendors are encouraged to publicly share specifications of their vendor data wherever possible. That way other tools can add support for them without needing to reverse engineer the vendor data. Popular vendor extensions may also be incorporated as standardized features in future revisions of this specification.

## More token properties TBC
