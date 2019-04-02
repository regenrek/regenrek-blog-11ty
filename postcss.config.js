const cssnext = require('postcss-cssnext');

module.exports = {
    plugins: [
        require('postcss-import'),
        require('postcss-nested'),
        require('postcss-each'),
        cssnext({
            features: {
                customProperties: {
                    preserve: true
                }
            }
        }),
        require('cssnano')
    ]
};
