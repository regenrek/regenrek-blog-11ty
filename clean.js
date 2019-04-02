var fs = require('fs');
var rimraf = require('rimraf');

fs.unlink('src/_data/manifest.json', (err) => {});
rimraf('dist', (err) => {});
