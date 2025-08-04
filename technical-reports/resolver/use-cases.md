# Use Cases

### Style Dictionary Integration

The Resolver Specification can be integrated with tools like [Style Dictionary](https://amzn.github.io/style-dictionary/) to automate the generation of platform-specific design tokens.

<aside class="example" title="Style Dictionary uses">

- Use the resolver to generate the resolved token set based on the desired modifiers.
- Feed the resolved token set into Style Dictionary.
- Configure Style Dictionary to output tokens in the desired formats (e.g., CSS variables, Sass variables).

</aside>

<aside class="example" title="Theming with multiple dimensions">

In large design systems, you might have multiple brands, each with light and dark themes, and accessibility modes (e.g., high contrast).

**Implementation:**

- Define modifiers for each dimension (e.g., "brand", "theme", "accessibility").
- Use the resolver to combine base tokens with the appropriate modifiers.
- Ensure that modifiers are orthogonal where possible to simplify the resolution logic.

</aside>
