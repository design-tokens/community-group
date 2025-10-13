# Terminology

<section class="informative">

## <dfn>Orthogonal</dfn> (orthogonality)

A trait describing two or more contexts that each operate on exclusive tokens, i.e. do not overlap. Modifiers MAY be orthogonal, but it are not required to be.

Making modifiers orthogonal as much as possible reduces cognitive load and reduces user error.

<aside class="example" title="Non-orthogonal modifiers">

Given the following modifiers:

1. A **theme** modifier has the values **light** and **dark**. Among its values, it provides a value for the `color.button` token.
2. A **brand** modifier has the values **brandA** and **brandB**. Among its values, it provides a value for the `color.button` token.

Since both modifiers provide a value for the `color.button` token, this means array order determines the final value, i.e. **non-orthogonal.**

</aside>

</section>

## <dfn>Resolution</dfn>

A resolution is a single possible permutation of a resolver document. A resolution maps 1:1 to an [input](#inputs), but the difference is the “input” refers to the [modifier](#modifiers) contexts used, whereas “resolution” refers to the final set of tokens and token values produced.
