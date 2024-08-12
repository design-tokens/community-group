# Comparison of theming approaches

This document summarises the DTCG format editors' understanding of the various theming approaches proposed by the community via GitHub issues (such as [Native modes and theming](https://github.com/...)).

For the purposes of this document, we define "theming" as:

> The ability for a design token to have different values depending on some externally provided context, such as tool configuration or user preferences

The aim of this document is to aid the editors assess the proposals and identify a preferred one to recommend for inclusion in the DTCG specification. The recommondation will be shared with the community for additional feedback and refinement.

<!-- TOC -->

- [Comparison of theming approaches](#comparison-of-theming-approaches)
    - [Design goals](#design-goals)
        - [Out of scope](#out-of-scope)
    - [[Approach name]](#approach-name)
        - [Summary](#summary)
        - [Features](#features)
        - [Impact on existing format spec](#impact-on-existing-format-spec)
        - [Notes](#notes)
        - [Further reading](#further-reading)

<!-- /TOC -->

## Design goals

In order to support the diverse theming needs of the community, the editors want to add mechanisms to the DTCG format to enable authors to:

* Define arbitrary "contexts", for which tokens may have values
* Specify alternate design token values for each context

So that all tools can:

* Resolve design tokens for a given context consistently
* Not require their own proprietary mechanisms for doign theming

### Out of scope

What the editors are _not_ attempting to specify in the format at this time are:

* Predefined contexts or semantics for contexts
  * Consequently, tools cannot infer any special meaning from the author-defined name of a context. For example, they cannot assume a context called "dark" is intended to be a dark color scheme.
* How the desired context is chosen by the user or tool
  * For the purpose of resoloving tokens we only require that the context is provided as an input to that process, alongside the DTCG file(s).
  * Depending on the tool or use-case, the context could originate from a setting ina tool's GUI, a command-line argument, a config file or an operating system setting.
* When the token values for a given context are resolved
  * This could occur at build-time, e.g. a translation tool like Style Dictionary might apply desired contexts and then output code based on that. For example to generate code for a specific brand in a multi-brand design system.
  * Alternatively, code that can resolve token values at runtime might be output, so that the final resolution can occur at runtime - for exmaple to respond to an end-user's (system) preferences
  * Finally, there could be a hybrid approach where some contexts are resolved at build-time and others are deferred to runtime.


## Proposals

### [Approach name]
<!-- Repeat the structure below for each proposal -->

* [Original proposal](https://github.com/path/to/relevant/comment)

#### Summary

One or two paragraphs briefly outlining the proposed appraoch.

#### Features
<!-- whether or not this proposal supports the following features -->

- ✅ **multi-dimensional values**
  <!-- i.e. can there be more than one parameter that determines a single token's final value. E.g. (brand-A & high-contrast & dark) vs just (dark) -->
  - Optional explanation or notes about why this feature is considered supported or not
- ❌ ...

#### Impact on existing format spec

Note any (breaking) changes and/or clarifications that would be required to the existing spec, if any, in order to support this approach.

E.g.: Resolver proposal would require format spec to explicitly allow references that cannot be resolved within a file.

#### Notes
<!-- Optional section. Include any noteworthy additional info about this proposal. For example, for the modes proposal we might use this section to mention that it aligns with Figma's variable collection mode and, via extensions, there is some support in the wild in Tokens Brucke & Cobalt -->

#### Further reading
<!-- Optional section. Include links to examples, tools, articles, etc. that demonstrate or elaborate on this approach -->

* [Relevant thing](https://link.to/the/thing): Additional notes about this thing
