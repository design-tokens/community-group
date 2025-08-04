## Rationale

### Context and Problem Statement

In design systems, especially those at scale, managing multiple themes, modes, brands, and other modifiers can become complex. Designers and developers often struggle with:

- **Naming Conflicts**: Using complex naming conventions to differentiate tokens across different themes or modes, leading to brittle and hard-to-maintain token names.
- **Scalability Issues**: Difficulty in scaling token management when new dimensions are added, such as additional themes or brands.
- **Tooling Limitations**: Existing tools may not support multi-dimensional token resolution, forcing teams to create workarounds that complicate their workflows.
- **Separation of Concerns**: Embedding resolution logic within token files mixes data with behavior, violating separation of
  concerns.

### Parameters

- **Simplicity**: The solution should keep token files simple and editable by hand, without requiring complex tooling.
- **Scalability**: It should support arbitrary dimensions (e.g., themes, modes, brands) without significant overhead.
- **Modularity**: Tokens should be organized in a way that allows for modularity and reusability.
- **Separation of Concerns**: Resolution logic should be externalized from token definitions.

### Background

Existing approaches, such as embedding modifiers directly into token names or using global theme files, have limitations. They often lead to:

- **Global Namespace Pollution**: All tokens exist in a single global namespace, increasing the likelihood of naming conflicts.
- **High Cognitive Load**: Designers and developers must remember complex naming conventions and how different tokens relate across dimensions.
- **Performance Issues**: Resolving tokens in systems with many dimensions can be slow due to the combinatorial explosion of permutations.

### Motivation

The Resolver Specification aims to:

- **Simplify Token Management**: By externalizing resolution logic, token files remain simple and focused on defining values.
- **Enhance Modularity**: Tokens can be organized into sets and modifiers, allowing teams to work on isolated components or themes without affecting others.
- **Improve Performance**: By reducing the scope of tokens in resolution, the process becomes faster and more efficient.

  <aside class="issue">

  The term "process" needs clarification - what specific process is being referred to? Is this the "resolution process of the resolver"? More explanation is needed to understand exactly what becomes faster and more efficient when token scope is reduced during resolution.

  </aside>

- **Facilitate Tool Integration**: Providing a standard way to define resolution logic makes it easier for tools to integrate and automate token management.

  <aside class="issue">

  A side effect of using a resolver should be the ability to have a clear dependency graph of how a resolution request would occur purely based on the inputs. This would enable better understanding of modifier interactions and support more efficient resolution strategies.

  </aside>
