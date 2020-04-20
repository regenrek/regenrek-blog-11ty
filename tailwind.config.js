module.exports = {
    prefix: '',
    important: false,
    separator: ':',
    theme: {
      fontFamily: {
        text: ['FoundryGridnik-Medium'],
        heading: ['FoundrySans-Demi']
      },
      aspectRatio: {
        // defaults to {}
        square: [1, 1],
        '16/9': [16, 9],
        '9/16': [9, 16],
        '4/3': [4, 3],
        '3/4': [3, 4],
        '21/9': [21, 9],
        '2/3': [2, 3],
        '3/2': [3, 2],
        '800/981': [800, 981],
        '427/264': [427, 264]
      },
      marginOffset: {
        '0': '0',
        '05': '4.1666665%',
        '1': '8.333333%',
        '2': '16.666667%',
        '3': '25%',
        '4': '33.333333%',
        '5': '41.666667%',
        '6': '50%',
        '7': '58.333333%',
        '8': '66.666667%',
        '9': '75%',
        '10': '83.333333%',
        '11': '91.666667%',
        wrapper: '15%',
  
        '1vw': '8.333333vw',
        '2vw': '16.666667vw',
        '3vw': '25vw',
        '4vw': '33.333333vw',
        '5vw': '41.666667vw',
        '6vw': '50vw',
        '7vw': '58.333333vw',
        '8vw': '66.666667vw',
        '9vw': '75vw',
        '10vw': '83.333333vw',
        '11vw': '91.666667vw',
        '12vw': '100vw'
      },
      paddingOffset: {
        '0': '0',
        '05': '4.1666665%',
        '1': '8.333333%',
        '2': '16.666667%',
        '3': '25%',
        '4': '33.333333%',
        '5': '41.666667%',
        '6': '50%',
        '7': '58.333333%',
        '8': '66.666667%',
        '9': '75%',
        '10': '83.333333%',
        '11': '91.666667%',
  
        '1vw': '8.333333vw',
        '2vw': '16.666667vw',
        '3vw': '25vw',
        '4vw': '33.333333vw',
        '5vw': '41.666667vw',
        '6vw': '50vw',
        '7vw': '58.333333vw',
        '8vw': '66.666667vw',
        '9vw': '75vw',
        '10vw': '83.333333vw',
        '11vw': '91.666667vw',
        '12vw': '100vw'
      },
      transitionDelay: {
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '5500': '550ms',
        '600': '600ms',
        '650': '650ms',
        '700': '700ms',
        '750': '750ms',
        '800': '800ms',
        '850': '850ms',
        '900': '900ms',
        '1000': '1000ms',
        '1200': '1200ms',
        '1400': '1400ms',
        '1600': '1600ms',
        '1800': '1800ms',
        '2000': '2000ms'
      },
      extend: {
        maxWidth: {
          'measure-title': '10em',
          'measure-wide': '34em',
          measure: '30em',
          'measure-narrow': '20em',
          'measure-middle': '25em',
          'measure-hero-title': '15em',
          'measure-hero-title-mobile': '13em',
          'measure-extra-wide': '40em',
          'measure-xxl': '50em'
        },
        height: {
          '40%': '40%',
          '60%': '60%',
          '80%': '80%'
        },
        zIndex: {
          '-1': '-1'
        },
        inset: {
          '1/2': '50%',
          '1/5': '20%',
          '7/12': '58.333333%'
        },
        screens: {
          sm: '480px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          xxl: '1600px'
        }
      }
    },
    variants: {
      aspectRatio: ['responsive'],
      marginOffset: ['responsive'],
      paddingOffset: ['responsive']
    },
    plugins: [
      require('./tailwind-plugins/aspect-ratio.js')(),
      require('./tailwind-plugins/margin-offset.js')(),
      require('./tailwind-plugins/padding-offset.js')()
    ]
  };
  