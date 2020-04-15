const plugins = [
    require("tailwindcss"),
    require("autoprefixer"),
    require("postcss-import"),
    require("postcss-advanced-variables"),
    require("postcss-nested"),
    require("postcss-percentage")
  ];
  
  plugins.push(
    require("postcss-preset-env")({
      browsers: 'last 2 versions',
      stage: '0' // importat for @custom-media (default === 2)
    })
  )
  
  if (process.env.NODE_ENV === "production") {
    plugins.push(
      require("@fullhuman/postcss-purgecss")({
        content: ["./src/site/**/*.njk"],
        defaultExtractor: content => content.match(/[\w-/.:]+(?<!:)/g) || [],
      })
    );
  
    plugins.push(require("cssnano"));
  }
  
  module.exports = { plugins };
  