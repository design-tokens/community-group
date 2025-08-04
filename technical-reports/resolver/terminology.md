# Resolver Terminology

<dl>
<dt>Resolver</dt>
<dd>

A mechanism that combines token sets and applies modifiers to produce a final, resolved set of design tokens.

</dd>
<dt>Token Set</dt>
<dd>

A collection of design tokens grouped together, often representing foundational tokens, component-specific tokens, or theme-specific tokens.

</dd>
<dt>Dimension</dt>
<dd>

Dimensions are categories used to organize your design tokens. See them as contexts in which token values might change:

- Brands
- Surface
- Language direction
- Themes
- Platform
- Screen size
- Density
- Component
- State
- Variant
- Contrast

<aside class="issue">

The term "Dimension" is potentially confusing since "Dimension" is also a type of token and a general concept. Consider using "Context" instead, which aligns with the existing definition as "contexts in which token values might change." Additionally, explicit mention of color schemes may be problematic - developers often distinguish between "themes" and "color modes" (like Windows High Contrast mode for accessibility), and it's unclear whether everyone would understand themes to encompass dark/light/high-contrast modes.

</aside>

</dd>

<dt>Modifier</dt>

<dd>

An entity that modifies or overrides tokens in the base sets. Modifiers can represent dimensions like themes, modes, brands, or any other contextual variations.

<dl>

<dt>Enumerated Modifier</dt>
<dd>

A modifier with predefined, named values (e.g., "light", "dark" for a theme modifier).

</dd>
<dt>Include Modifier</dt>
<dd>

A modifier that replaces or includes entire token sets during resolution.

</dd>
<dt>Alias</dt>
<dd>

An optional property that allows for namespacing or renaming token paths during resolution.

<aside class="issue">

The modifier types and their behaviors aren't clear from these definitions alone. Real-world examples showing how Enumerated Modifiers, Include Modifiers, and Alias properties work in practice would help clarify their purpose and usage.

</aside>

</dd>

</dl>

</dd>

<dt>Input</dt>
<dd>

Parameters provided to the resolver to specify which modifiers to apply during the resolution process.

</dd>
<dt>Resolution</dt>
<dd>

The process of combining token sets and applying modifiers based on the specified inputs to produce the final set of tokens.

<aside class="issue">

The specification should address different real-world resolution use cases and their performance implications: **full upfront resolution** (resolving all possible combinations ahead of time), **lazy resolution** (resolving on-demand), and **partial resolution** for complex components. Without being upfront about token combinations and scopes, systems face combinatorial explosion problems that make resolution inefficient. There may be significant performance aspects to consider, especially for JIT (Just-In-Time) resolution scenarios. Input from tool makers like Figma and other design platforms would be valuable to understand real-world performance requirements and constraints.

</aside>

</dd>

<dt>Orthogonality</dt>
<dd>

The property of modifiers being independent of each other, allowing them to be combined freely without affecting each other's resolution logic.

</dd>
</dl>
