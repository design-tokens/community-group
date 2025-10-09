# Filetype

## Format

A resolver document MUST use standard JSON syntax ([[RFC8259]]).

Tools MAY support extensions such as [JSONC](https://jsonc.org/) or [JSON5](https://json5.org/) so long as the document may be converted to normal JSON without affecting token values.

## File extension

Users SHOULD use the `.resolver.json` file extension to name resolver documents.

## MIME type

When transmitting a resolver document over HTTP, users SHOULD use the expected `application/json` MIME type ([[RFC6838]]) in the `Content-Type` header ([[RFC1341]]). Users SHOULD NOT use a custom or unexpected MIME type.
