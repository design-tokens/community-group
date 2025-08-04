# Orthogonality

Modifiers are considered **orthogonal** when they can be changed independently without affecting each other's resolution logic.

<aside class="example" title="Orthogonal modifiers">

- **Theme**: "light", "dark"
- **Brand**: "brandA", "brandB"

You can mix any theme with any brand, resulting in all possible combinations.

</aside>

<aside class="example" title="Non-orthogonal modifiers">

- A "theme" modifier that includes a "dimmed" option only available in "dark" mode.

In such cases, the resolver must handle dependencies between modifiers, potentially by validating acceptable combinations or structuring modifiers to reflect the dependencies.

<aside class="issue">

This requires input from the resolver author to explicitly declare whether a modifier is purely orthogonal or not. This declaration should be upfront in the specification, otherwise lazy resolution cannot be supported without the resolver having to check the actual tokens in scope.

</aside>

</aside>
