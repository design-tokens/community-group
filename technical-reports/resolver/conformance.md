Tools implementing the Resolver Specification MUST:

- **Support the Resolution Process**: Implement the resolution logic as defined, including input validation, base set flattening, modifier application, aliasing, and conflict resolution.
- **Validate Inputs**: Ensure that provided modifier inputs match the defined modifiers and acceptable values.
- **Resolve Aliases Correctly**: Handle token references accurately, including recursive references and detection of circular dependencies.
- **Preserve Token Properties**: Maintain additional token properties (e.g., description, type) throughout the resolution process.
- **Handle Errors Gracefully**: Provide meaningful error messages for issues like invalid inputs or circular references.
