# Resolution Logic

The resolution process involves the following steps:

1. **Input Validation**: Ensure the provided inputs match the expected modifiers and their acceptable values.

   <aside class="issue">

   The term "inputs" is used throughout the specification but never formally defined. Inputs appear to represent the permutation or combination of modifiers being selected for resolution - essentially the question "What would my output look like given some combination of modifiers being enabled or chosen?" This fundamental concept should be clearly defined, potentially as "data" or with a more specific term that clarifies its role in the resolution process.

   </aside>

2. **Base Set Flattening**: Load and merge the token sets specified in the **sets** array. Later sets override earlier ones if there are naming conflicts.

   <aside class="issue">

   The merging process needs detailed specification to handle DTCG token data correctly. Simply performing a deep merge on raw JSON could yield different results than fully interpreting the DTCG data first and then merging. This is particularly important for inheritable format properties like `$type`. For example, when loading two JSON files with a top-level "color" key where one has `$type: "color"` and another has `$type: "gradient"`, these represent incompatible schemas that cannot be merged. The specification must outline what constitutes "mergeable" vs "unmergeable" token sets and provide clear rules for handling such conflicts.

   </aside>

   <aside class="issue">

   The specification needs clear step-by-step instructions for how deep merging should occur, including detailed guidance on handling edge cases or when to error appropriately. This should include specific algorithms and decision trees for implementers to follow consistently.

   </aside>

3. **Modifier Application**: Apply the selected modifiers based on the inputs. Modifiers can override tokens from the base sets or introduce new tokens.

   <aside class="issue">

   The specification should clarify the resolution order when multiple modifiers are applied simultaneously. For instance, if both "theme" and "brand" modifiers are used and both attempt to override the same token, which modifier should take precedence? Clear precedence rules are needed to ensure consistent and predictable resolution behavior across implementations.

   </aside>

4. **Aliasing and Namespacing**: Apply any aliasing specified in the modifiers to namespace or rename tokens.

   <aside class="issue">

   The specification needs to clarify the different types of "aliasing" and their behavior during resolution. There are two distinct concepts being referred to as "aliasing": (1) **Namespacing aliasing** - where tokens are renamed/namespaced (e.g., "red.500" becomes "colors.red.500"), and (2) **Token reference aliasing** - where one token's value references another token's value. The specification should clearly distinguish between these concepts and address how namespacing aliases behave when tokens are overridden by later sets - specifically, if an alias points to a token that gets overridden, does the alias resolve to the new/overridden value?

   </aside>

5. **Alias Resolution**: Resolve any token references (aliases) using the combined tokens from the base sets and modifiers.

6. **Conflict Resolution**: In case of conflicting tokens (same name and path), later modifiers or sets override earlier ones.

7. **Circular Reference Detection**: Detect and handle circular references as errors.

8. **Final Output**: Produce a flat, resolved set of tokens ready for consumption.

### Detailed Steps

#### Input Validation

- Verify that all provided modifier inputs correspond to defined
  modifiers.
- Check that the input values are among the acceptable options
  defined in the modifiers.

#### Base Set Flattening

- Load each token set in the order specified.
- Merge the tokens, with later sets overriding earlier ones on name conflicts.

#### Modifier Application

- For each modifier:
  - Apply any aliasing or namespacing specified in meta.
  - Load the token sets associated with the selected modifier value.
  - Merge these tokens with the base tokens, applying overrides as necessary.

#### Alias Resolution

<aside class="note">

Alias resolution is performed on the fully merged set of tokens, after all base sets and modifiers have been applied. This allows for aliases to reference tokens from any loaded file.

</aside>

- Iterate over all tokens to find references (e.g., {theme.accent}).
- Resolve references first within the same token set.
- If not found, resolve references from the modifiers, following the order of precedence.
- Handle nested references recursively.

#### Conflict Resolution

- In case of conflicting tokens:
  - Tokens from modifiers override tokens from base sets.
  - If multiple modifiers define the same token, the last applied modifier takes precedence.

#### Circular Reference Detection

- Detect any circular references during alias resolution.
- If a circular reference is found, throw an error and halt the resolution process.
