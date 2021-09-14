# DTCG Technical Reports

This directory contains the source code for the [Design Token Community Group's (DTCG) technical reports](https://design-tokens.github.io/community-group/).

<!-- TOC depthfrom:2 -->

- [Pre-requisites](#pre-requisites)
- [Initial setup](#initial-setup)
- [Local previews](#local-previews)
- [Editing](#editing)
- [Deployments](#deployments)

<!-- /TOC -->

## Pre-requisites

In order to preview edits locally, you will need the following installed on your machine:

- [Node.js](https://nodejs.org/en/) >= 16.8
  - If you use [`nvm`](https://github.com/nvm-sh/nvm), you can run `nvm install` to install and use the recommended version of Node.

## Initial setup

After cloning this repo, you need to install the dependencies:

```
npm install
```

This step does not need to be repeated unless the dependencies are changed.

## Local previews

To see live previews of local edits to the technical reports run:

```
npm run dev
```

## Editing

We use the [W3C's ReSpec tool](https://respec.org/docs/) to generate our technical reports. Although knowledge of HTML and Markdown is sufficient for simple edits, we recommend that authors familiarise themselves with ReSpec's features.

To making editing our format specification more convenient and to reduce the likelihood of merge conflicts, we have split out the main chapters into separate Markdown files. The `format/index.html` then includes them all using [ReSpec's `data-include` feature](https://respec.org/docs/#data-include). For example:

```html
<section
  data-include="./file-format.md"
  data-include-format="markdown"
></section>
```

## Deployments

Any changes to the source files in this directory that get merged into `main` are automatically deployed to [`https://design-tokens.github.io/community-group/`](https://design-tokens.github.io/community-group/) via the [`technical-reports` GitHub Action](../.github/workflows/technical-reports.yml). They are hosted using GitHub Pages and the build output can be found in the [`gh-pages` branch](https://github.com/design-tokens/community-group/tree/gh-pages).

Additionally, we use Netlify to generate preview deploys for PRs. Netlify will post a comment to the PR with the URL of the preview once it is ready.
