# Inputs

A resolver document only describes how conditional token values MAY be produced. But the conditions must still be provided somewhere. The term “input” refers to any selection of context values passed to the tool.

Tools MUST accept inputs as a JSON-serializable object, such as an [object in JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object) or a [dictionary in Python](https://docs.python.org/3/tutorial/datastructures.html#dictionaries).

Tools that load a resolver that declares modifiers SHOULD throw an error if an accompanying input is not provided.

<aside class="example" title="Inputs">

Given the following modifiers:

```json
{
  "resolutionOrder": [
    {
      "type": "modifier",
      "name": "theme",
      "contexts": {
        "light": [{ "$ref": "light.json" }],
        "dark": [{ "$ref": "dark.json" }]
      }
    },
    {
      "type": "modifier",
      "name": "size",
      "context": {
        "default": [{ "$ref": "size/default.json" }],
        "large": [{ "$ref": "size/large.json" }]
      }
    },
    {
      "type": "modifier",
      "name": "beta",
      "context": {
        "false": [],
        "true": [{ "$ref": "beta.json" }]
      },
      "default": "false"
    }
  ]
}
```

A **valid** input would follow the schema: all keys correspond to the `name` of each modifier. The values are valid options as designated by the modifier.

```json
{
  "theme": "light",
  "size": "large",
  "beta": "true"
}
```

However, an **invalid** input would add unknown keys, invalid contexts, and/or missing required modifiers:

```json
{
  "theme": "blue",
  "foo": "bar"
}
```

In this scenario, tools SHOULD throw multiple errors along the lines of:

1. `Error: invalid context "blue" for modifier "theme".`
1. `Error: missing modifier "size".`
1. `Error: unknown modifier "foo".`
1. (no error needed for modifier `beta`, as it provided a `default`)

</aside>

<aside class="example" title="Tool consuming input">

Using an imaginary tool written in JavaScript, we could potentially consume [the previous example](#example-inputs) like so:

```js
import tokenTool from './token-tool.js';

tokenTool.loadResolver(
  /* Path to resolver */
  './resolver.json',

  /* Input */
  {
    theme: 'dark',
    size: 'default',
  },
);
```

This imaginary tool has a `loadResolver()` method that takes as its parameters:

1. A filepath to the resolver in the first position, and
2. The input object in its 2nd position.

The tool then combines the resolver + inputs to produce its final [=resolution=].

</aside>

## Case sensitivity

Inputs SHOULD be case-insensitive. For example, `{ "theme": "dark" }`, `{ "Theme": "Dark" }`, and `{ "THEME": "DARK" }` SHOULD be equivalent. However, tools MAY make individual decisions on case sensitivity.

## Enforcing strings

Inputs MUST have strings as their values. Tools MUST throw an error if an input contains a non-string value, such as `{ "beta": true }` or `{ "size": 100 }`.
