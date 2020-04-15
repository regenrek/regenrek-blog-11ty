const _ = require('lodash');

module.exports = function () {
  return ({ theme, variants, e, addUtilities }) => {
    const generators = [
      (size, modifier) => ({
        [`.${e(`po-${modifier}`)}`]: { padding: `${size}` }
      }),
      (size, modifier) => ({
        [`.${e(`pyo-${modifier}`)}`]: {
          'padding-top': `${size}`,
          'padding-bottom': `${size}`
        },
        [`.${e(`pxo-${modifier}`)}`]: {
          'padding-left': `${size}`,
          'padding-right': `${size}`
        }
      }),
      (size, modifier) => ({
        [`.${e(`pto-${modifier}`)}`]: { 'padding-top': `${size}` },
        [`.${e(`pro-${modifier}`)}`]: { 'padding-right': `${size}` },
        [`.${e(`pbo-${modifier}`)}`]: { 'padding-bottom': `${size}` },
        [`.${e(`plo-${modifier}`)}`]: { 'padding-left': `${size}` }
      })
    ];

    const utilities = _.flatMap(generators, (generator) => {
      return _.flatMap(theme('paddingOffset'), generator);
    });

    addUtilities(utilities, variants('paddingOffset'));
  };
};
