# Introduction

Consumers of design tokens often need to express alternate values that apply in different contexts. Such examples include, but are not limited to:

- **Theming**, such as light mode, dark mode, and high contrast color modes
- **Sizing**, such as mobile (small), tablet (medium), desktop (large)
- **Accessibility mode**, such as reduced motion, colorblindness, etc.

However, these alternate contexts are susceptible to [combinatorial explosion](https://en.wikipedia.org/wiki/Combinatorial_explosion), making storage and management unwieldy.

This format describes a mechanism for deduplicating all repeat values of tokens across all contexts as well as enumerating all permutations of contexts.
