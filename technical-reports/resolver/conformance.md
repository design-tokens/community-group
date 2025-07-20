# Conformance

Tools implementing the Resolver Specification MUST:

- **Support the resolution process:** Implement the resolution logic as defined, including input validation, base set flattening, modifier application, aliasing, and conflict resolution.
- **Validate inputs:** Ensure that provided modifier inputs match the defined modifiers and acceptable values.
- **Resolve aliases correctly:** Handle token references accurately, including recursive references and detection of circular dependencies.
- **Preserve token properties:** Maintain additional token properties (e.g. `$description`, `$type`) throughout the resolution process.
- **Handle errors gracefully:** Provide meaningful error messages for issues like invalid inputs or circular references.
