const plugins = [
  require("postcss-import"),
  require("tailwindcss"),
  require("postcss-advanced-variables"),
  require("postcss-nested"),
  require("postcss-percentage"),
  require('autoprefixer')(({
    zindex: false
  }))
];

if (process.env.NODE_ENV === "production") {
  // plugins.push(
  //   require("@fullhuman/postcss-purgecss")({
  //     content: ["./**/*.njk"],
  //     defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
  //   })
  // );

  plugins.push(
    require("cssnano")
  );
}

module.exports = { plugins };
