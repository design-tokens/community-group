---
title: FAQ
pageTitle: FAQ
layout: ../layouts/Markdown.astro
---

## Is this ready to use?

The Design Tokens Community Group (DTCG) specification is now available in its first stable version 1, aka v2025.10.

Production readiness:

- ✅ **Safe to use:** Many tools and organizations are already implementing it
- ⚠️ **Still evolving:** The spec is in active development with ongoing refinements
- 📝 **Spec status:** The DTCG spec is not on the W3C Standards Track

What does this mean for you?

- ✅ The core format is stable for production use
- ✅ Major design systems and tools are already adopting it

Start using the specification for production today, especially for new projects. And stay informed of the latest updates:

- Follow the [blog](/blog/) for official news and releases
- Stay engaged with the [community](https://github.com/design-tokens/community-group/issues) for ongoing discussions
- Build with flexibility to accommodate spec changes

## What's the license?

The Design Tokens Community Group specification's [licensing](https://github.com/design-tokens/community-group/blob/main/LICENSE.md) ensures the specification can be freely implemented by design tools, token transformation libraries, and design systems without licensing barriers.

- Contributions to Specifications are made under the [W3C Community Contributor License Agreement (CLA)](https://www.w3.org/community/about/agreements/cla/).
- Contributions to Test Suites, Website and Content, and Other Software are made under the [W3C 3-clause BSD License](https://www.w3.org/Consortium/Legal/2008/03-bsd-license.html)

## How do I give feedback?

Join the [Design Tokens Community Group GitHub issues](https://github.com/design-tokens/community-group) (recommended):

- **New issues:** Open new issues for bugs, clarifications, or feature requests
- **Pull requests:** Submit PRs for specific specification improvements or corrections (registration required as a [participant of the W3C Community Group](https://www.w3.org/community/design-tokens/))
- **Existing issues:** Contribute to ongoing discussions on open issues

When providing feedback, follow these guidelines for effective feedback:

- **Search existing issues first:** Your concern may already be documented
- **Be specific:** Reference exact specification sections, provide examples, and describe use cases
- **Include context:** Explain your implementation environment, tools, and constraints
- **Propose solutions:** When identifying problems, suggest potential resolutions

Types of feedback (all are welcome)

- **Specification clarity:** Ambiguous language, unclear requirements, or missing examples
- **Technical feasibility:** Implementation challenges, platform limitations, or tooling concerns
- **Use case coverage:** Missing token types, insufficient flexibility, or edge cases
- **Interoperability:** Cross-tool compatibility issues or transformation requirements
- **Governance:** Versioning, deprecation, or extension mechanisms

## How do I get involved?

Join the official [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/): Participate in formal specification development discussions, attend group meetings and calls, contribute to the working drafts and proposals, and influence the direction of the specification.

Learn more on how to [contribute](../contribute/).

## What tools support this?

Organizations building design tools and open-source projects are already shipping DTCG-compatible tokens. Here are some of the adopters and participants helping prove out the spec:

- [Abstract](https://abstract.com)
- [Adobe](https://adobe.com)
- [Project Wallace](https://www.github.com/projectwallace/css-design-tokens/)
- [Design Token Validator (Anima)](https://www.animaapp.github.io/design-token-validator-site/)
- [Design Tokens Language Server](https://www.github.com/bennypowers/design-tokens-language-server)
- [Figma](https://www.figma.com)
- [Framer](https://www.framer.com)
- [Knapsack](https://www.knapsack.cloud)
- [Marvel](https://www.marvelapp.com)
- [Penpot](https://www.penpot.com)
- [Pinwheel](https://bjango.com/mac/pinwheel/)
- [Sketch](https://www.sketch.com)
- [Style Dictionary](https://www.styledictionary.com)
- [Superposition](https://www.superposition.design)
- [Supernova](https://www.supernova.ion)
- [Terrazzo](https://www.terrazzo.app)
- [Toolabs](https://www.toolabs.com)
- [TokensBrücke](https://www.figma.com/community/plugin/1254538877056388290)
- [Tokens Studio](https://www.tokens.studio)
- [Universal Design Tokens](https://www.github.com/universal-design-tokens/udt)
- [Zeplin](https://www.zeplin.io)
- [zeroheight](https://www.zeroheight.com)
- [Engramma](https://engramma.dev)

## How does this relate to other token approaches?

The Design Tokens Community Group specification relates to other token approaches as a standardization layer that unifies previously fragmented, tool-specific formats. It provides:

- **Canonical syntax** replacing incompatible proprietary formats
- **Interoperability foundation** enabling cross-tool workflows
- **Validation framework** ensuring format consistency
- **Extension mechanism** preserving tool-specific capabilities

The specification **complements rather than replaces** token methodologies and architectural patterns developed by production design systems. It defines the format for token exchange while leaving organizational strategy to design system teams.

The specification is now available in its first stable version 2025.10, with growing adoption across major design tools and transformation pipelines. Teams should evaluate DTCG migration based on interoperability requirements, tooling support, and long-term maintenance considerations.

## What is the relationship between JSON Schema and DTCG?

[JSON Schema](https://json-schema.org/) is a tool for describing JSON structures.

DTCG is a specification to provide indivisible pieces of a design system such as colors, spacing, and typography scales. It is purpose-built for design token exchange. It is both a way to declare your design system token schema and a way to deliver the actual content.

Similarities:

- Both use JSON syntax (objects, strings, numbers, arrays, booleans, null)
- Both support nested hierarchical structures
- Both are human-readable and machine-parsable
- Both have a way of reusing parts of the document (both JSON Schema and DTCG support [`$ref`](https://json-schema.org/understanding-json-schema/structuring#dollarref), DTCG has an additional `{token.alias}` syntax)
- Both are useful tools for documenting and annotating a complex structure

Differences:

- DTCG serves as both a way to declare your schema _and_ exchange token data in the same file (JSON Schema is not for data exchange)
- JSON Schema is a generic tool; DTCG is tailored for design systems and design tokens
- DTCG types map to specific concepts in design tools and web and mobile app development

JSON is the syntax; DTCG is the semantics. The DTCG specification defines how to use JSON to represent design tokens in a standardized, interoperable way that tools can reliably parse, transform, and exchange across design and development workflows.

## Got more questions?

Please reach out in our various official and social channels:

- Got a question about the [DTCG Website?](https://github.com/design-tokens/community-group/issues)
- Got a question about the [DTCG Specifications?](https://github.com/design-tokens/community-group/issues)
- Reach out to the official [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- Connect with DTCG on [LinkedIn](https://www.linkedin.com/company/design-tokens-community-group), [X](https://x.com/DesignTokens), [Bluesky](https://bsky.app/profile/designtokens.org), [Open Collective](https://opencollective.com/design-tokens)
