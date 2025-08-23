# Terminology

## <dfn>Resolver</dfn>

The mechanism by which multiple possible values of design tokens are reduced to a single value, i.e. this module.

## <dfn>Context</dfn>

Context is up to the end user to define, but is “any condition that requires a different value for a design token.” There are no official contexts in this specification.

## <dfn>Set</dfn>

Subsets of tokens that collectively form the default base set. Users SHOULD ensure the sum total of sets contain mutually exclusive tokens, i.e. they don’t overwrite one another and may be combined in any order to produce the same result.

## <dfn>Modifier</dfn>

Mapping of contexts to token impacts. Modifiers MAY accept an [=input=] that determine the final token values after the resolver has run.

## <dfn>Input</dfn>

The user’s selection for the [=modifier=]s, expressed as a key–value map. [See example](#modifiers).

## <dfn>Resolution</dfn>

The process of combining token sets and applying modifiers based on the specified inputs to produce the final set of tokens.

<aside class="issue">

The specification should address different real-world resolution use cases and their performance implications: **full upfront resolution** (resolving all possible combinations ahead of time), **lazy resolution** (resolving on-demand), and **partial resolution** for complex components. Without being upfront about token combinations and scopes, systems face combinatorial explosion problems that make resolution inefficient. There may be significant performance aspects to consider, especially for JIT (Just-In-Time) resolution scenarios. Input from tool makers like Figma and other design platforms would be valuable to understand real-world performance requirements and constraints.

</aside>

<aside class="issue">

Would the term “Resolution” ever be confused with [Display resolution](https://en.wikipedia.org/wiki/Display_resolution)? Would another term like “Output” work better?

</aside>

## <dfn>Orthogonal</dfn> (orthogonality)

The characteristic of [=modifiers=] that do not overlap with one another, i.e. operate on different tokens. Modifiers MAY be orthogonal, but it are not required to be.
