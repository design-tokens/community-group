# Groups

A file may contain many tokens and they may be nested arbitrarily in groups like so:

<aside class="example">

```json
{
  "token uno": {
    "value": "token value 1"
  },
  "token group": {
    "token dos": {
      "value": "token value 2"
    },
    "nested token group": {
      "token tres": {
        "value": "token value 3"
      },
      "Token cuatro": {
        "value": "token value 4"
      }
    }
  }
}
```

</aside>

The names of the groups leading to a given token (including that token’s name) are that token’s _path_, which is a computed property. **It is not specified in the file**, but parsers that conform to this spec must be able to expose the path of a token. The above example, therefore, defines 4 design tokens with the following properties:

- Token #1
  - Name: “token uno”
  - Path: “token uno”
  - Value: “token value 1”
- Token #2
  - Name: “token dos”
  - Path: “token group” / “token dos”
  - Value: “token value 2”
- Token #3
  - Name: “token tres”
  - Path: “token group” / “nested token group” / “token tres”
  - Value: “token value 3”
- Token #4
  - Name: “token cuatro”
  - Path: “token group” / “nested token group” / “token cuatro”
  - Value: “token value 4”

Because groupings are arbitrary, tools MUST NOT use them to infer the type or purpose of design tokens.

<p class="ednote" title="Naming practices">
  The format editors acknowledge existing best-practices for token naming, but place no direct constraints on naming via the specification.
</p>

## Additional group properties

### Description

Groups may include an optional description property. For example:

<aside class="example">

```json
{
  "brand": {
    "description": "Design tokens from our brand guidelines",
    "color": {
      "description": "Our brand's primary color palette",
      "acid green": {
        "value": "#00ff66"
      },
      "hot pink": {
        "value": "#dd22cc"
      }
    }
  }
}
```

</aside>

Suggested ways tools may use this property are:

- A style guide generator could render a section for each group and use the description as an introductory paragraph
- A GUI tool that lets users browse or select tokens could display this info alongside the corresponding group or as a tooltip
- Export tools could output this as a source code comment

<div class="issue" data-number="72">

Groups may support additional properties like type and description. Should other properties be supported at the group level?

</div>

## Use-cases

### File authoring & organization

Groups let token file authors better organize their token files. Related tokens can be nested into groups to align with the team’s naming conventions and/or mental model. When manually authoring files, using groups is also less verbose than a flat list of tokens with repeating prefixes.

For example:

<aside class="example">

```json
{
  "brand": {
    "color": {
      "acid green": {
        "value": "#00ff66"
      },
      "hot pink": {
        "value": "#dd22cc"
      }
    },
    "typeface": {
      "primary": {
        "value": "Comic Sans MS"
      },
      "secondary": {
        "value": "Times New Roman"
      }
    }
  }
}
```

</aside>

...is likely to be more convenient to type and, arguably, easier to read, than:

<aside class="example">

```json
{
  "brand-color-acid-green": {
    "value": "#00ff66"
  },
  "brand-color-hot-pink": {
    "value": "#dd22cc"
  },
  "brand-typeface-primary": {
    "value": "Comic Sans MS"
  },
  "brand-typeface-secondary": {
    "value": "Times New Roman"
  }
}
```

</aside>

### GUI tools

Tools that let users pick or edit tokens via a GUI may use the grouping structure to display a suitable form of progressive disclosure, such as a collapsible tree view.

![Progressive disclosure groups](./group-progressive-disclosure.png)

### Export tools

Token names are not guaranteed to be unique within the same file. The same name can be used in different groups. Also, export tools may need to export design tokens in a uniquely identifiable way, such as variables in code. Export tools should therefore use design tokens' paths as these _are_ unique within a file.

For example, a [translation tool](#translation-tool) like [Style Dictionary](https://amzn.github.io/style-dictionary/) might use the following design token file:

<aside class="example">

```json
{
  "brand": {
    "color": {
      "acid green": {
        "value": "#00ff66"
      },
      "hot pink": {
        "value": "#dd22cc"
      }
    },
    "typeface": {
      "primary": {
        "value": "Comic Sans MS"
      },
      "secondary": {
        "value": "Times New Roman"
      }
    }
  }
}
```

</aside>

...and output it as Sass variables like so by concatenating the path to create variable names:

<aside class="example">

```scss
$brand-color-acid-green: #00ff66;
$brand-color-hot-pink: #dd22cc;
$brand-typeface-primary: 'Comic Sans MS';
$brand-typeface-secondary: 'Times New Roman';
```

</aside>
