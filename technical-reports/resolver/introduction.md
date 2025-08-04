# Introduction

Design tokens are key-value pairs that represent design decisions, allowing for consistent use across different platforms and tools. In complex design systems, there is a need to manage multiple dimensions such as themes, modes (e.g., light and dark), brands, and variants. This introduces challenges in organizing tokens, resolving references, and applying overrides.

The Resolver Specification addresses these challenges by introducing a structured mechanism to:

- Organize tokens into **sets** and **modifiers**.
- Define how tokens are **resolved** when multiple sets and modifiers are involved.
- Support **scalability** by handling arbitrary dimensions without complicating the core token definitions.
- Maintain **modularity** and **reusability** by allowing tokens to be combined and overridden in a controlled manner.
