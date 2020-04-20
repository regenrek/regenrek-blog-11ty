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

// plugins.push(
//   require("postcss-preset-env")({
//     browsers: 'last 2 versions',
//     stage: '0' // importat for @custom-media (default === 2)
//   })
// )

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
