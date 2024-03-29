const { DateTime } = require("luxon");
const markdownItAttrs = require('markdown-it-attrs');
const markdownItFootnote = require('markdown-it-footnote');
const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const installPrismLanguages = require('./prism-languages.js');
const pluginRss = require("@11ty/eleventy-plugin-rss");
const fs = require("fs");
const path = require("path");
const pluginTOC = require('eleventy-plugin-nesting-toc');
const pluginNavigation = require("@11ty/eleventy-navigation");
const codepenNjk = require('./codepen')
const metagen = require('eleventy-plugin-metagen');
const Path = require('path')

const manifestPath = path.resolve(__dirname, "dist", "assets", "manifest.json");
const manifest = JSON.parse(
  fs.readFileSync(manifestPath, { encoding: "utf8" })
);

const getSimilarCategories = function(categoriesA, categoriesB) {
  return categoriesA.filter(Set.prototype.has, new Set(categoriesB)).length;
}

module.exports = function(eleventyConfig) {
  eleventyConfig.addPlugin(pluginSyntaxHighlight, {
      init: function({ Prism }) {
          installPrismLanguages(Prism)
      },
  });

  eleventyConfig.addPlugin(metagen);
  eleventyConfig.addPlugin(pluginNavigation);
  eleventyConfig.addPlugin(pluginTOC, {
    tags: ['h2', 'h3']
  });

  eleventyConfig.addShortcode("myCustomImage", function (url, alt) {
    return `<div class="cimage fw pt-8 pb-8"><img class="shadow" src="${eleventyConfig.getFilter("url")(url)}" alt="${alt}"></div>`;
  });

  eleventyConfig.addNunjucksShortcode("codepen", codepenNjk);

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");
  eleventyConfig.addLayoutAlias("default", "layouts/default.njk");

  eleventyConfig.setDataDeepMerge(true);

  // Adds a universal shortcode to return the URL to a webpack asset. In Nunjack templates:
  // {% webpackAsset 'main.js' %} or {% webpackAsset 'main.css' %}
  eleventyConfig.addShortcode("webpackAsset", function(name) {
    if (!manifest[name]) {
      throw new Error(`The asset ${name} does not exist in ${manifestPath}`);
    }
    return manifest[name];
  });

  eleventyConfig.addFilter("titlef", url => {
    return url !== '/' ? ' | Kevin Regenrek' : ''
  });

  eleventyConfig.addFilter("absolute", image => {
    if (!image) {
      return false
    }

    const prefixedUrl = 'https://regenrek.com/assets/images/'+ image

    return prefixedUrl + '.png';
  })

  // Date formatting (human readable)
  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("dd LLL yyyy");
  });

  // Date formatting (machine readable)
  eleventyConfig.addFilter("machineDate", dateObj => {
    return DateTime.fromJSDate(dateObj).toFormat("yyyy-MM-dd");
  });

  // only content in the `posts/` directory
  eleventyConfig.addCollection("posts", function(collection) {
    return collection.getAllSorted().filter(function(item) {
      return item.inputPath.match(/^\.\/posts\//) !== null;
    });
  });

  eleventyConfig.addPlugin(pluginRss);

  /* Markdown Plugins */
  let markdownIt = require("markdown-it");

  // add anchor links to heading elements like <h1>,<h2>, ...
  let markdownItAnchor = require("markdown-it-anchor");
  let options = {
    html: true,
    breaks: true,
    linkify: true // apply auto links
  };
  let opts = {
    permalink: false
  };

  eleventyConfig.setLibrary("md", markdownIt(options)
    .use(markdownItFootnote)
    .use(markdownItAttrs)
    .use(markdownItAnchor, opts)
  );

  // Copy all images directly to dist.
  eleventyConfig.addPassthroughCopy({ "assets/images": "assets/images" });

  // Copy external dependencies to dist.
  eleventyConfig.addPassthroughCopy({ "assets/vendor": "assets/vendor" });

  // Reload the page every time the JS/CSS are changed.
  eleventyConfig.setBrowserSyncConfig({ files: [manifestPath] });

  // A debug utility.
  eleventyConfig.addFilter("log", obj => {
    console.log(obj)
  });

  eleventyConfig.addFilter("similarPosts", function(collection, path, tags){
    return collection.filter((post) => {
      console.log("TAGS", post.data.tags)
        return getSimilarCategories(post.data.tags, tags) >= 1 && post.data.page.inputPath !== path;
    })
    // .sort((a,b) => {
    //     return getSimilarCategories(b.data.categories, categories) - getSimilarCategories(a.data.categories, categories);
    // });
  });

  eleventyConfig.addFilter('limit', function(arr, limit) {
    return arr.slice(0, limit);
  });

  return {
    dir: {
      input: ".",
      includes: "_includes", // relative to dir.input
      data: "_data",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
    passthroughFileCopy: true,
  };
};
