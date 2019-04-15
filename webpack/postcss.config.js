var tailwindcss = require('tailwindcss');

module.exports = ({ file, options, env }) => ({
    plugins: [
        require("postcss-import"),

        require('tailwindcss')('./tailwind.config.js'),

        require('postcss-preset-env')({
            autoprefixer: {
                flexbox: 'no-2009'
            },
            stage: 3
        }),
        require('cssnano')()

//        {'cssnano':    env === 'production' ? {} : false}
    ],
})
