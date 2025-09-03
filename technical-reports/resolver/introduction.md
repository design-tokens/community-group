# Introduction

Design tokens often need to express alternate values in different [=context=]s. What defines a “context” is up to the user to determine, and is unique to their usecases. But common examples of contexts are:

- **Theming**, such as light mode, dark mode, and high contrast color modes
- **Sizing**, such as mobile (small), tablet (medium), desktop (large)
- **Accessibility mode**, such as reduced motion, colorblindness, etc.

A [=resolver=] outlines a way to generate different end values (or sometimes even different tokens) to satisfy the needs for all these contexts. The general process is:

1. Start from a base [set](#sets) of tokens
2. Apply [modifiers](#modifiers) based on which context(s) we are in
3. The end result is a complete token set with context-appropriate values.

One would simply repeat the process once per the number of end-contexts being generated.
