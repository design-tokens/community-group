# Token naming

## Categorization

There are 3 main categories of design tokens that we will continue to reference in this specification.

### Base

Base tokens are the lowest level tokens and typically consist of a name and [hexadecimal](https://www.w3.org/TR/css-color-4/#hex-notation) value pair.

<aside class="example">

```json
{
  "color": {
    "green": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0.67, 0.79, 0.74]
      }
    },
    "shadow": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0, 0, 0],
        "alpha": 0.53
      }
    }
  }
}
```

</aside>

### Alias

A design token’s value MAY be a _reference_ to another token. The same value MAY have multiple names or aliases.

<aside class="example">

```json
{
  "color": {
    "palette": {
      "black": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0, 0, 0]
        }
      }
    },
    "text": {
      "base": {
        "$value": "{color.palette.black}"
      }
    }
  }
}
```

</aside>

### Component

Component-specific tokens provide design decisions at the component level and improve the separation of concerns in your token architecture.

<aside class="example">

```json
{
  "color": {
    "button": {
      "primary": {
        "$value": "{color.brand.primary}"
      }
    },
    "banner": {
      "background": {
        "$value": "{color.palette.black}"
      }
    }
  }
}
```

</aside>

## Naming strategies

There are many naming options when it comes to design tokens, especially color type tokens. We’ve identified two that seem to be most commonly implemented, **descriptive and numerical**.

### Base Tokens

For **Base tokens**, here’s how they MAY be represented in each version:

#### Descriptive

Descriptive names can be more emotional and human-friendly because they often relate to tangible things that people interact with, like grass or watermelon.

| Pros                                                                                                   | Cons                                                                                                                          |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| Easier for some people to identify with, could be used to distinguish brand colors from product colors | Harder to determine the scale of colors (for example: which ones are lighter vs. darker? How well do they pair together?)     |
|                                                                                                        | Names may not be easily recognized by non-English speakers. For teams working across languages, this may not be a good choice |

<aside class="example">

```json
{
  "color": {
    "grass": {
      "$type": "color",
      "$value": {
        "colorSpace": "srgb",
        "components": [0.67, 0.79, 0.74]
      }
    },
    "brand": {
      "watermelon": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.91, 0.28, 0.42]
        }
      }
    }
  }
}
```

</aside>

#### Numerical

##### Ordered scales

Numerical tokens often follow a scale to help delineate how the colors progress. For example, when using an ordered scale, `color.blue.500` may be the base color, where the lightest color value is `color.blue.100`, and the darkest value could be `color.blue.900`, and these values are ordered in increments of 100s in between. We recommend not using sequential numbers (ex: 1, 2, 3, 4) for scalability in case future colors need to be added in between two existing colors.

<aside class="example">

```json
{
  "color": {
    "green": {
      "400": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.42, 0.73, 0.63]
        }
      },
      "500": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.15, 0.56, 0.42]
        }
      },
      "600": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.07, 0.5, 0.36]
        }
      }
    }
  }
}
```

</aside>

Numerical token names can also allow for further specificity when needed. For example, when creating neutral palette tokens (like grays), the scale may increase by increments of 25 instead of 100 at the lightest values, and then increment by 100 thereafter.

<aside class="example">

```jsonc
{
  "color": {
    "gray": {
      "25": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.93, 0.93, 0.93],
        },
      },
      "50": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.87, 0.87, 0.87],
        },
      },
      "75": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.8, 0.8, 0.8],
        },
      },
      "100": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.73, 0.73, 0.73],
        },
      },
      // etc...
    },
  },
}
```

</aside>

##### Bounded scales

Numerical tokens can also be named through **bounded scales**. These tokens utilize a distinguishing value based on the actual color used for the token, such as in HSL’s lightness value to vary shades of a tint.

<aside class="example">

```json
{
  "color": {
    "gray": {
      "22": {
        "$type": "color",
        "$value": {
          "colorSpace": "hsl",
          "components": [0, 0, 22]
        }
      },
      "49": {
        "$type": "color",
        "$value": {
          "colorSpace": "hsl",
          "components": [0, 0, 49]
        }
      },
      "73": {
        "$type": "color",
        "$value": {
          "colorSpace": "hsl",
          "components": [0, 0, 73]
        }
      },
      "99": {
        "$type": "color",
        "$value": {
          "colorSpace": "hsl",
          "components": [0, 0, 99]
        }
      }
    }
  }
}
```

</aside>

##### Computer generated scales

Token names MAY also be generated by tools, where the user specifies the base name, and the tool appends scale numbers based on changes to the underlying value.

<aside class="example">

```jsonc
// User specified name: color-green
// Tool generated names for 6 steps of opacity
{
  "color": {
    "green": {
      "10": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.13, 0.7, 0.67],
          "alpha": 0.1,
        },
      },
      "20": {
        "$type": "color",
        "$value": {
          "colorSpace": "srgb",
          "components": [0.13, 0.7, 0.67],
          "alpha": 0.2,
        },
      },
      // etc...
    },
  },
}
```

</aside>

| Pros                                                                                                                                                                 | Cons                                                      |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| Easy mapping between different tokens for color contrast. For example, all 100-400 tokens pair with 500-900 tokens in order to create accessible color combinations. | Less memorable and less obvious difference between tokens |
| If using bounded scales, the token name can help indicate something about the underlying value                                                                       |                                                           |

### Alias Tokens

For **Alias Tokens**, we recommend grouping tokens with similar intentions by prioritizing the category + property within the name. For example, all background color Alias tokens would likely start with `color.background.XXX`.

We recommend avoiding abbreviations. For example, use “background” instead of “bg”, to help with clarity.

Here’s how alias tokens MAY be represented:

<aside class="example">

```json
{
  "color": {
    "background": {
      "error": {
        "$value": "{color.red.600}"
      },
      "success": {
        "$value": "{color.green.400}"
      }
    },
    "text": {
      "base": {
        "$value": "{color.palette.black}"
      },
      "errorHover": {
        "$value": "{color.red.700}"
      }
    }
  }
}
```

</aside>

Color alias tokens could also be grouped by concept, like so:

<aside class="example">

```jsonc
// These can be used for background, border, or text colors
{
  "color": {
    "background": {
      "error": {
        "$value": "{color.red.600}",
      },
      "success": {
        "$value": "{color.green.400}",
      },
    },
  },
}
```

</aside>

### Component Tokens

Component-specific names should start with the component they support and be located close to the component code. They commonly refer to alias tokens and can be helpful when trying to use consistent styles across components while still maintaining separation of concerns.

<aside class="example">

```json
{
  "color": {
    "badge": {
      "background": {
        "error": {
          "$value": "{color.background.error}"
        },
        "success": {
          "$value": "{color.background.success}"
        }
      },
      "text": {
        "error": {
          "$value": "{color.text.error}"
        },
        "success": {
          "$value": "{color.text.success}"
        }
      }
    }
  }
}
```

</aside>
