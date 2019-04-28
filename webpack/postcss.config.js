module.exports = ({ file, options, env }) => ({
    plugins: {
        'postcss-import': {},
        'postcss-advanced-variables': {},
        'postcss-nested': {},
        'postcss-percentage': {},
        'postcss-preset-env': {
            browsers: 'last 2 versions',
            stage: '0' // importat for @custom-media (default === 2)
        },
        'cssnano': env === 'production' ? {} : false,
    },
})
