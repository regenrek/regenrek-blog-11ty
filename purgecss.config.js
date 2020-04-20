module.exports = {
    content: ["./dist/**/*.html"],
    css: ["./dist/assets/*.css"],
    whitelistPatterns: [/^cc-/, /cookieconsent/],
    whitelistPatternsChildren: [/^cc-/, /cookieconsent/],
    extractors: [
      {
        extractor: content => {
          return content.match(/[A-Za-z0-9-_:\/]+/g) || [];
        },
        extensions: ["html"]
      }
    ]
  };