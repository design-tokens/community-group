export default {
  layout: 'layouts/post.njk',
  pageTitle: 'Blog',
  permalink: (data) => `posts/${data.page.fileSlug}/index.html`,
  author: 'Anonymous',
  tags: ['post'],
};
