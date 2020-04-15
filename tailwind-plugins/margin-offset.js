const _ = require('lodash');

module.exports = function () {
  return ({ theme, variants, e, addUtilities }) => {
    const generators = [
      (size, modifier) => ({
        [`.${e(`mo-${modifier}`)}`]: { margin: `${size}` }
      }),
      (size, modifier) => ({
        [`.${e(`myo-${modifier}`)}`]: {
          'margin-top': `${size}`,
          'margin-bottom': `${size}`
        },
        [`.${e(`mxo-${modifier}`)}`]: {
          'margin-left': `${size}`,
          'margin-right': `${size}`
        }
      }),
      (size, modifier) => ({
        [`.${e(`mto-${modifier}`)}`]: { 'margin-top': `${size}` },
        [`.${e(`mro-${modifier}`)}`]: { 'margin-right': `${size}` },
        [`.${e(`mbo-${modifier}`)}`]: { 'margin-bottom': `${size}` },
        [`.${e(`mlo-${modifier}`)}`]: { 'margin-left': `${size}` }
      })
    ];

    const utilities = _.flatMap(generators, (generator) => {
      return _.flatMap(theme('marginOffset'), generator);
    });

    addUtilities(utilities, variants('marginOffset'));
  };
};
