import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import markdownItClass from '@toycode/markdown-it-class';
import htmlmin from 'html-minifier';
import { DateTime } from 'luxon';
import markdownIt from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import UglifyJS from 'uglify-es';

export default function (eleventyConfig) {
  eleventyConfig.addShortcode(
    'currentYear',
    () => `${new Date().getFullYear()}`,
  );

  eleventyConfig.setUseGitIgnore(false);

  // Eleventy Navigation https://www.11ty.dev/docs/plugins/navigation/
  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  // Configuration API: use eleventyConfig.addLayoutAlias(from, to) to add
  // layout aliases! Say you have a bunch of existing content using
  // layout: post. If you don’t want to rewrite all of those values, just map
  // post to a new file like this:
  // eleventyConfig.addLayoutAlias("post", "layouts/my_new_post_layout.njk");

  // Merge data instead of overriding
  // https://www.11ty.dev/docs/data-deep-merge/
  eleventyConfig.setDataDeepMerge(true);

  // Add support for maintenance-free post authors
  // Adds an authors collection using the author key in our post frontmatter
  // Thanks to @pdehaan: https://github.com/pdehaan
  eleventyConfig.addCollection('authors', (collection) => {
    const blogs = collection.getFilteredByGlob('posts/*.md');
    return blogs.reduce((coll, post) => {
      const author = post.data.author;
      if (!author) {
        return coll;
      }
      if (!coll.hasOwnProperty(author)) {
        coll[author] = [];
      }
      coll[author].push(post.data);
      return coll;
    }, {});
  });

  // Date formatting (human readable)
  eleventyConfig.addFilter('readableDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('dd LLL yyyy');
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter('machineDate', (dateObj) => {
    return DateTime.fromJSDate(dateObj).toFormat('yyyy-MM-dd');
  });

  // Minify JS
  eleventyConfig.addFilter('jsmin', function (code) {
    let minified = UglifyJS.minify(code);
    if (minified.error) {
      console.log('UglifyJS error: ', minified.error);
      return code;
    }
    return minified.code;
  });

  // Minify HTML output
  eleventyConfig.addTransform('htmlmin', function (content, outputPath) {
    if (outputPath.indexOf('.html') > -1) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });

  // Assets
  eleventyConfig.addPassthroughCopy({
    admin: 'admin',
    public: '/',
  });
  eleventyConfig.setServerPassthroughCopyBehavior('passthrough');

  /* Markdown Plugins */
  const mdit = markdownIt({
    html: true,
    breaks: true,
    linkify: true,
  });
  mdit.use(markdownItAnchor, {
    permalink: false,
  });
  mdit.use(markdownItClass, {
    h1: ['heading2'],
    h2: ['heading3'],
    h3: ['heading4'],
    h4: ['heading5'],
  });
  eleventyConfig.setLibrary('md', mdit);

  return {
    templateFormats: ['md', 'njk', 'html'],

    // If your site lives in a different subdirectory, change this.
    // Leading or trailing slashes are all normalized away, so don’t worry about it.
    // If you don’t have a subdirectory, use "" or "/" (they do the same thing)
    // This is only used for URLs (it does not affect your file structure)
    pathPrefix: '/',
    htmlTemplateEngine: false,
    dataTemplateEngine: 'njk',
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '_site',
    },
  };
}
