# DTCG Technical Reports

This directory contains the source code for the [Design Token Community Group's (DTCG) technical reports](https://www.designtokens.org/TR/drafts/).

<!-- TOC depthfrom:2 -->

- [Local previews](#local-previews)
- [Editing](#editing)
- [Deployments](#deployments)

<!-- /TOC -->

## Local previews

To see live previews of local edits to the technical reports run (at the root of the repository):

```
pnpm run dev
```

Open <http://localhost:8080/TR/drafts/>.

## Editing

We use the [W3C's ReSpec tool](https://respec.org/docs/) to generate our technical reports. Although knowledge of HTML and Markdown is sufficient for simple edits, we recommend that authors familiarize themselves with ReSpec's features.

To making editing our format specification more convenient and to reduce the likelihood of merge conflicts, we have split out the main chapters into separate Markdown files. The `format/index.html` then includes them all using [ReSpec's `data-include` feature](https://respec.org/docs/#data-include).

For example:

```html
<section
  data-include="./file-format.md"
  data-include-format="markdown"
></section>
```

## Deployments

Any changes to the source files in this directory that get merged into `main` are automatically deployed to [`https://www.designtokens.org/TR/drafts/`](https://www.designtokens.org/TR/drafts/) via the [`technical-reports` GitHub Action](../.github/workflows/technical-reports.yml). They are hosted using GitHub Pages and the build output can be found in the [`gh-pages` branch](https://github.com/design-tokens/community-group/tree/gh-pages).

Additionally, we use Netlify to generate preview deploys for PRs. Netlify will post a comment to the PR with the URL of the preview once it is ready.
