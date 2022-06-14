# File format

Design token files are JSON ([https://www.json.org/](https://www.json.org/)) files that adhere to the structure described in this specification.

JSON was chosen as an interchange format on the basis of:

- Broad support in many programming languages’ standard libraries. This is expected to lower barriers to entry for developers writing software that supports design token files.
- Current popularity and widespread use. This is expected to lower the learning curve as many people will already be familiar with JSON.
- Being text-based (rather than binary) allows hand-editing design token files without needing specialized software other than a basic text editor. It also means the files are somewhat human-readable.

## Media type (MIME type)

When serving design token files via HTTP / HTTPS or in any other scenario where a media type (formerly known as MIME type) needs to be specified, the following MIME type should be used for design token files:

- `application/design-tokens+json`

However, since every design token file is a valid JSON file and it may not always be possible to configure web servers as needed, it is also acceptable to use the plain JSON media type: `application/json`. The above, more specific media type is preferred and should be used wherever possible.

Tools that can open design token files MUST support both media types.

## File extensions

When saving design token files on a local file system, it can be useful to have a distinct file extension as this makes them easier to spot in file browsers. It may also help to associate a file icon and a preferred application for opening those files. The following file extensions are recommended by this spec:

- `.tokens`
- `.tokens.json`

The former is more succinct. However, until this format is widely adopted and supported, the latter might be useful to make design token files open in users’ preferred JSON editors.

Tools that can open design token files MAY filter available files (e.g. in an open file dialog) to only show ones using those extensions. It is recommended that also provide users with a way of opening files that do not use those extensions (e.g. a “show all files” option or similar).

Tools that can save design token files SHOULD append one of the recommended file extensions to the filename when saving.

<p class="ednote" title="JSON schema">
  The group is currently exploring the addition of a JSON Schema to support the spec.
</p>

<p class="ednote" title="JSON file size limitations">
  A concern about file size limitations of JSON files was raised by one of the vendors. The working group continues to gather feedback about any limitations the JSON format imposes.
</p>
