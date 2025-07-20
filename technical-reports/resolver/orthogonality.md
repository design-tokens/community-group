# Orthogonality

_This section is non-normative._

Modifiers are considered _orthogonal_ to one another when they can be applied independently without affecting each other’s resolution logic.

Orthogonality only applies to the relationship between modifiers. Modifiers are expected to override the values from sets. The relationship between modifiers and sets is unrelated to orthogonality.

<aside class="example" title="Orthogonal Modifiers">

Given the following modifiers:

- A `color` modifier that only references [color tokens](../format/#color)
- A `size` modifier that only references [dimension tokens](../format/#dimension)

Assuming no name conflicts, applying either modifier in either order will produce the same Resolution. This is because with exclusive names and exclusive token types, no conflict resolution is necessary.

</aside>

<aside class="example" title="Non-orthogonal Modifiers">

Given the following modifiers:

- A `theme` modifier that loads either “light mode” or “dark mode” [color tokens](../format/#color)
- A `high-contrast` modifier that loads either “standard” or “high contrast” [color tokens](../format/#color)

There’s a certainty of conflict here, since both modifiers are trying to act on color tokens. Depending on the order in which they apply, the final Resolution will be different.

</aside>

Orthogonality across modifiers is RECOMMENDED. Otherwise conflict resolution may be unclear and/or unpredictable.
