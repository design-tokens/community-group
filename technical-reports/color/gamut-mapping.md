# Gamut mapping

Gamut mapping is the process of converting colors from one [=color space=] to another.

Gamut mapping is necessary when the source color space has a larger gamut than the target color space. This can happen when converting colors from a wide-gamut color space (like Display-P3) to a smaller gamut color space (like sRGB). Gamut mapping ensures that the colors are represented accurately in the target color space, even if some colors cannot be represented exactly.

When transforming colors, translation tools MAY use the gamut mapping algorithm that best fits the use case. For example, if the goal is to preserve the appearance of colors, a perceptual gamut mapping algorithm may be used. If the goal is to preserve the exact color values, a saturation or relative colorimetric gamut mapping algorithm may be used.

Token authors should be aware that the choice of gamut mapping algorithm can significantly affect the appearance of colors in the target color space. If colors need to be transformed between color spaces, it's important to validate the output of the translation tool to ensure that the colors are represented accurately and consistently.
