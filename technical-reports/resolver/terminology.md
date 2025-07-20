# Terminology

## <dfn>Resolver</dfn>

The JSON structure that combines Tokens JSON files into a final [=resolution=], i.e. this specification.

## <dfn>Set</dfn>

Ordered list of [&lt;token-defs&gt;](#token-defs) that are merged in array order. In case of Token conflicts, the last token in the array “wins.”

## <dfn>Modifier</dfn>

Function that acts on [=set=]s. Modifiers take an [=input=] which together produce the final [=resolution=]. Modifiers MAY be [=orthogonal=]. There are different types of modifiers as outlined in [Syntax](#syntax).

## <dfn>Input</dfn>

The parameter of a [=modifier=] function. An input MUST be a string that the modifier has outlined.

## <dfn>Resolution</dfn>

<aside class="ednote" title="Term">Would the term “Resolution” ever be confused with <a href="https://en.wikipedia.org/wiki/Display_resolution">Display resolution</a>? Would another term like “Output” work better?</aside>

The final, flattened Tokens JSON after the Resolver has run. This includes all [=set=]s and [=modifier=]s applied.

## <dfn>Orthogonal</dfn> (Orthogonality)

The property of [=modifier=]s producing the same [=resolution=] regardless of the order in which they are applied.
