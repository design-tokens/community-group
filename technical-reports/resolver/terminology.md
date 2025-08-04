# Terminology

## <dfn>Resolver</dfn>

The mechanism by which multiple possible values of design tokens are reduced to a single value, i.e. this module.

## <dfn>Set</dfn>

Alternate design token values that are defined in [&lt;token-defs&gt;](#token-defs), intended to be merged in a specific order.

## <dfn>Modifier</dfn>

Alternate design token value accessed with an [=input=], that takes priority over a [=set=]. Modifiers MAY be [=orthogonal=].

## <dfn>Input</dfn>

Parameters provided to the [=resolver=] to specify which [=modifier=]s to apply during the [resolution](#resolution) process.

## <dfn>Resolution</dfn>

The process of combining token sets and applying modifiers based on the specified inputs to produce the final set of tokens.

<aside class="issue">

The specification should address different real-world resolution use cases and their performance implications: **full upfront resolution** (resolving all possible combinations ahead of time), **lazy resolution** (resolving on-demand), and **partial resolution** for complex components. Without being upfront about token combinations and scopes, systems face combinatorial explosion problems that make resolution inefficient. There may be significant performance aspects to consider, especially for JIT (Just-In-Time) resolution scenarios. Input from tool makers like Figma and other design platforms would be valuable to understand real-world performance requirements and constraints.

</aside>

<aside class="issue">

Would the term “Resolution” ever be confused with [Display resolution](https://en.wikipedia.org/wiki/Display_resolution)? Would another term like “Output” work better?

</aside>

## <dfn>Orthogonal</dfn> (Orthogonality)

The property of [=modifier=]s being independent of each other, allowing them to be combined freely without affecting each other's [=resolution=] logic.
