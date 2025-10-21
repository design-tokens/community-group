---
title: FAQ
pageTitle: FAQ
layout: ../layouts/Markdown.astro
---

## Is this ready to use?

The Design Tokens Community Group (DTCG) specification is still in draft status as of October 2025, but it's closer than ever to reaching v1.0.

Production readiness:

- ✅ **Safe to use:** Many organizations are already implementing it
- ⚠️ **Still evolving:** The spec is in active development with ongoing refinements
- 📝 **Draft status:** Not yet a W3C Recommendation or final standard

What does this mean for you?

- ✅ The core format is stable enough for production use
- ✅ Major design systems and tools are already adopting it
- ⚠️ Expect potential changes before v1.0 finalization
- ⚠️ Some advanced features are still being refined
- 📋 Plan for possible migration adjustments when v1.0 releases

You can start using the specification for production in most cases, especially for new projects. However, make sure to stay informed of the latest updates:

- Follow the [latest draft](https://www.designtokens.org/tr/drafts/) closely
- Stay engaged with the [community](https://github.com/design-tokens/designtokens.org/issues) for updates
- Build with flexibility to accommodate spec changes
- Focus on the stable core features (basic token types, structure)

## What's the license?

The Design Tokens Community Group specification's [licensing](https://github.com/design-tokens/community-group/blob/content-faq/LICENSE.md) ensures the specification can be freely implemented by design tools, token transformation libraries, and design systems without licensing barriers.

- All Reports in this Repository are licensed by Contributors under the [W3C Software and Document License](https://www.w3.org/Consortium/Legal/2015/copyright-software-and-document).
- Contributions to Specifications are made under the [W3C Community Contributor License Agreement (CLA)](https://www.w3.org/community/about/agreements/cla/).
- Contributions to Test Suites, Website and Content, and Other Software are made under the [W3C 3-clause BSD License](https://www.w3.org/Consortium/Legal/2008/03-bsd-license.html)

## How do I give feedback?

Join the [Design Tokens Community Group Github issues](https://github.com/design-tokens/community-group) (recommended):

- **New issues:** Open new issues for bugs, clarifications, or feature requests
- **Pull requests:** Submit PRs for specific specification improvements or corrections
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

## How does this relate to other token approaches?

The Design Tokens Community Group specification relates to other token approaches as a standardization layer that unifies previously fragmented, tool-specific formats. It provides:

- **Canonical syntax** replacing incompatible proprietary formats
- **Interoperability foundation** enabling cross-tool workflows
- **Validation framework** ensuring format consistency
- **Extension mechanism** preserving tool-specific capabilities

The specification **complements rather than replaces** token methodologies and architectural patterns developed by production design systems. It defines the format for token exchange while leaving organizational strategy to design system teams.

As of 2025, the specification approaches v1.0.0 release with growing adoption across major design tools and transformation pipelines. Teams should evaluate DTCG migration based on interoperability requirements, tooling support, and long-term maintenance considerations.

## What is the relationship between JSON Schema and DTCG?

JSON Schema is a declarative specification, a passive validator, and documentation format. It can be used to enforce documents to adhere to a strict format. It is a general purpose data interchange format.

DTCG is a specification to provide indivisible pieces of a design system such as colors, spacing, typography scale. It is purpose-built for design token exchange. It is both a way to declare your design system token schema and a way to deliver the actual content.

Similarities:

- Both use JSON syntax (objects, strings, numbers, arrays, booleans, null)
- Both support nested hierarchical structures
- Both are human-readable and machine-parseable
- Both use key-value pairs for data organization
- Both can be validated against schemas

While they may have some similarities, they have different purposes and features. DTCG has required properties, reserved keywords, type system and validation, standardized alias and reference system, type inheritance through groups, composite token structures, tooling and transformation expectations.

JSON is the syntax; DTCG is the semantics. The DTCG specification defines how to use JSON to represent design tokens in a standardized, interoperable way that tools can reliably parse, transform, and exchange across design and development workflows.

## Got more questions?

Please reach out in our various official and social channels:

- Got a question about the [DTCG Website?](https://github.com/design-tokens/community-group/issues)
- Got a question about the [DTCG Specifications?](https://github.com/design-tokens/community-group/issues)
- Reach out to the official [W3C Design Tokens Community Group](https://www.w3.org/community/design-tokens/)
- Connect with DTCG on [Linkedin](https://www.linkedin.com/company/design-tokens-community-group), [X](https://x.com/DesignTokens), [Bluesky](https://bsky.app/profile/designtokens.org), [Open Collective](https://opencollective.com/design-tokens)
