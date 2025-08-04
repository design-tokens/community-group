# Additional Context and Information

## Resolution Aliasing

Aliasing allows for dynamic namespacing or renaming of token paths during resolution. This is particularly useful when integrating external token sets or avoiding naming conflicts.

</p>

<aside class="example">

Given a token set size.json:

```json
{
  "sm": {
    "value": "1px",
    "type": "dimension"
  },
  "lg": {
    "value": "10px",
    "type": "dimension"
  }
}
```

By applying an alias in the modifier's meta.alias, we can namespace these tokens:

```json
{
  "modifiers": [
    {
      "name": "size",
      "type": "include",
      "values": [
        {
          "name": "default",
          "values": ["size.json"]
        }
      ],
      "meta": {
        "alias": "spacing"
      }
    }
  ]
}
```

Resulting in tokens accessible via spacing.sm and spacing.lg.

</aside>

<aside class="example">

### Real-World Use Case: GitHub Primer

The GitHub Primer design system uses multiple dimensions, including themes and visual modes (e.g., colorblind modes). The Resolver Specification can represent these dimensions as modifiers, allowing for efficient resolution and management of tokens.

<aside class="ednote">

Question: Would it be worth to highlight some public design systems and how they would use the resolver spec for more relatable use cases?

</aside>

</aside>

<aside class="issue">

While public design system examples could be valuable, generic use cases showing common dimensional patterns might be more important as foundational examples: single dimension (1 brand), two dimensions (1 brand + 2 themes), three dimensions (2 brands + 2 themes each), etc. These generic patterns would be the "meat and potatoes" compared to specific design system examples being the "cherry on the cake."

</aside>

## Orthogonality Considerations

In scenarios where modifiers are not orthogonal, the resolver may need to enforce acceptable combinations and handle dependencies between modifiers. This can be achieved by:

- Defining valid combinations explicitly.
- Using nested modifiers or modifier groups.
- Providing validation logic to prevent invalid input combinations.
