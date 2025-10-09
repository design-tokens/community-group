# Design Tokens Community Group

This repository (or “repo”) is used for work in the [Design Tokens Community Group](https://www.w3.org/community/design-tokens/), governed by the [W3C Community License Agreement (CLA)](https://www.w3.org/community/about/agreements/cla/). To make substantive contributions, you must join [the Community Group](https://www.w3.org/community/design-tokens/).

For more details, read the [Contribution Mechanics section](https://github.com/design-tokens/community-group/blob/main/CHARTER.md#contrib) of the community group's charter.

---

If you are not the sole contributor to a contribution (pull request), please identify all
contributors in the pull request comment.

To add a contributor (other than yourself, that's automatic), mark them one per line as follows:

```diff
+ @github_username
```

If you added a contributor by mistake, you can remove them in a comment with:

```diff
- @github_username
```

If you are making a pull request on behalf of someone else but you had no part in designing the
feature, you can remove yourself with the above syntax.

## Local development

The following section is for previewing designtokens.org and the technical reports on your local machine.

### Setup

This repo requires [Node.js](https://nodejs.org/en) (if you need to manage multiple versions of Node.js, [fnm](https://github.com/Schniz/fnm) is highly-recommended) and [pnpm](https://pnpm.io/) installed. With both installed, [clone this repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) locally, and in a terminal run in the project root:

```sh
pnpm i
pnpm run install-browsers
pnpm run build
```

### Commands

The following commands can be run from the **project root**:

| Command          | Description                                       |
| :--------------- | :------------------------------------------------ |
| `pnpm run dev`   | Run designtokens.org locally in development mode. |
| `pnpm run lint`  | Lint the project.                                 |
| `pnpm run build` | Make a static build of the website.               |

> [!NOTE]
> You’ll also find `pnpm run dev` commands both in `www` and `technical-reports` folders. Those should only be used for debugging purposes, as they only run part of the workflow.

### Project structure

This repo contains the following sub-directories that house different projects:

| Directory            | Description                      |
| :------------------- | :------------------------------- |
| `meeting-notes/`     | Notes from past meetings.        |
| `technical-reports/` | The design tokens specification. |
| `www/`               | The designtokens.org code.       |
