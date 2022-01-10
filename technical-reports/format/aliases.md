# Aliases / references

Instead of having explicit values, tokens can reference the value of another token. To put it another way, a token can be an alias for another token. This spec considers the terms "alias" and "reference" to be synonyms and uses them interchangeably.

Aliases are useful for:

- Expressing design choices
- Eliminating repetition of values in token files (DRYing up the code)

For a design token to reference another, its value SHOULD be a string containing the period-separated (.) path to the token it's referencing enclosed in curly brackets.

For example:

<aside class="example">

```json
{
  "group name": {
    "token name": {
      "value": 1234
    }
  },
  "alias name": {
    "value": "{group name.token name}"
  }
}
```

</aside>

When a tool needs the actual value of a token it MUST resolve the reference - i.e. lookup the token being referenced and fetch its value. In the above example, the "alias name" token's value would resolve to 1234 because it references the token whose path is `{group name.token name}` which has the value 1234.

Tools SHOULD preserve references and therefore only resolve them whenever the actual value needs to be retrieved. For instance, in a design tool, changes to the value of a token being referenced by aliases SHOULD be reflected wherever those aliases are being used.

Aliases MAY reference other aliases. In this case, tools SHOULD follow each reference until they find a token with an explicit value. Circular references are not allowed. If a design token file contains circular references, then the value of all tokens in that chain is unknown and an appropriate error or warning message SHOULD be displayed to the user.

<p class="ednote" title="JSON Pointer syntax">
  The format editors are currently researching JSON Pointer syntax to inform the exact syntax for aliases in tokens. <a href="https://datatracker.ietf.org/doc/html/rfc6901#section-5">https://datatracker.ietf.org/doc/html/rfc6901#section-5</a>
</p>
