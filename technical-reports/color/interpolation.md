# Interpolation

In many cases, colors may be _interpolated_, or blended, to create new colors. For example, when creating a gradient, colors are often interpolated between two or more key colors.

Interpolation can be done in different [=color spaces=], and the choice of color space can affect the appearance of the resulting colors. Translation tools MAY use different interpolation methods depending on the color space and the desired effect. Authors should be aware of the implications of interpolation in different color spaces and validate interpolated colors to ensure they meet design requirements.
