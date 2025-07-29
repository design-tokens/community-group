# Changelog

All notable changes to this project will be documented in this file.

## [2.1.0] - 2025-07-23

This release incorporates editorial improvements and community feedback summarized from the [Design Tokens Resolvers Specification Working Copy](https://docs.google.com/document/d/1LOtdiS8R903R7RwDd22JiDxljh51l7Xfy9M1D-p-9mU/edit?tab=t.0#heading=h.svkctwfaregs), identifying key areas for future specification development.

### Added

-   **Resolution Aliasing Section:** Added a complete new section explaining aliasing/namespacing concepts with detailed examples and JSON Schema definition (from Working Copy)
-   **Community Feedback Integration:** Incorporated editorial comments and issues from the working copy document throughout the specification, highlighting ambiguities, inconsistencies, and areas needing clarification.

### Issues Identified (from Working Copy)

-   **Terminology Clarifications:** Highlighted need for better definitions of "process", "inputs", "dimensions" vs "contexts", and disambiguation between different types of aliasing.
-   **File Extension Recommendations:** Suggested using `.tokens.json` extension to align with Design Tokens Format Specification conventions.
-   **Schema Structure Improvements:** Identified need to move functional properties out of generic `meta` property into formal schema definitions.
-   **Modifier Structure Concerns:** Raised questions about using arrays vs objects for modifiers to ensure uniqueness and prevent conflicts.
-   **Merging Logic Specification:** Highlighted need for detailed DTCG-compliant merging algorithms and conflict resolution rules.
-   **Precedence and Order:** Identified need for explicit precedence rules when multiple modifiers affect the same tokens.
-   **Orthogonality Declaration:** Suggested need for explicit orthogonality declarations to support lazy resolution.

### Notes

-   This version focuses on integrating community feedback and issue identification from the working copy rather than normative specification changes.
-   Issues summarized from the working copy will inform future specification development and clarifications.

## [2.0.0] - 2023-10-27

This is the first major revision of the specification based on a detailed technical review. The goal of this release is to add clarity, address ambiguities, and provide a more robust foundation for implementers.

### Added

-   **"Include" Modifier Type:** Added a new `include` type for modifiers, which is used to conditionally include a set of tokens. An example has been added to the "Modifiers" section.
-   **Order of Precedence:** A new subsection, "Order of Precedence," has been added to the "Resolution Logic" section to explicitly define the merge order for base sets and modifiers.
-   **Error Handling Guidance:** A new informative section, "Error Handling," has been added to recommend specific error types for common failure scenarios (e.g., `FileNotFoundError`, `CircularReferenceError`).

### Changed

-   **Modifier Type:** The `type` property on modifiers now defaults to `"enumerated"`.
-   **Inline Token Definitions:** Clarified that an "inline token definition" must be a complete JSON object representing a valid token structure. An example has been added to the "Token Sets" section.
-   **Final Output Format:** The specification now explicitly states that the final resolved output should be a nested JSON object that mirrors the token paths, as shown in the examples.
-   **Path Resolution:** It is now explicitly stated that file paths in a resolver file must be resolved relative to the location of the resolver file itself.
-   **Alias Resolution Scope:** The spec now clarifies that alias resolution is performed on the fully merged set of tokens, allowing aliases to reference tokens across any loaded file.
-   **`meta.alias` Behavior:** The behavior of `meta.alias` is now more clearly defined, explaining that it namespaces the tokens from the modifier's files and that external references must use this namespace.

### Fixed

-   **Inconsistent `\$value` Key:** Corrected all instances of an inconsistent `value` key in JSON examples to use `\$value`, aligning with the Design Tokens Format Specification.