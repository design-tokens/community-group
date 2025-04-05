# Color terminology

This section provides a high-level overview of the terminology used in the specification and how it relates to color science.

<dfn>Color space<dfn>

A color space is a specific organization of colors, which helps in the reproduction of color in both physical and digital realms. It defines a range of colors that can be represented and manipulated.

<dfn>Color model<dfn>

A color model is a mathematical representation of colors within a specific [=color space=]. It defines how colors are represented as numerical values, typically using components.

<dfn data-lt="gamut">Color gamut<dfn>

A color gamut is the complete range of colors that can be represented in a specific color space. It defines the limits of color reproduction for that space.

<dfn data-lt="components">Component<dfn>

A component is a single value that defines a part of a color in a specific color space. For example, in the RGB color space, the components are red, green, and blue.

<dfn>Hue<dfn>

Hue is the attribute of a color that allows it to be classified as red, green, blue, etc. In many color spaces, hue is represented as an angle on a color wheel. Different color spaces may position colors differently on the wheel.

<dfn>Saturation<dfn>

Saturation is the colorfulness of a color relative to its own brightness. It describes how much gray is present in a color. A fully saturated color has no gray, while a desaturated color appears more grayish. It is inherently tied to both [=chroma=] and [=lightness=], especially in models like HSL or HSV. A color can be highly saturated but still appear light or dark depending on its lightness.

<dfn>Lightness<dfn>

Lightness is the perceived brightness of a color. It describes how light or dark a color appears.

<dfn>Chroma<dfn>

Chroma refers to the colorfulness of a color relative to the brightness of a similarly illuminated white. It measures how pure or intense a color appears. In the CIE LCh° color space (Lightness, Chroma, Hue), Chroma is independent of lightness and expresses how far a color is from neutral gray along the chromatic axis.

<dfn>Alpha<dfn>

Alpha is a component that represents the transparency of a color. It defines how opaque or transparent a color is, with the minimum value (usually 0) being fully transparent and the maximum value (usually 1) being fully opaque.
