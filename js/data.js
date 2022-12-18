const DEFAULT_OPTIONS = {
  range: {
    min: 0,
    max: 100
  },
  start: 100,
  step: 1,
  connect: 'lower',
};

const EFFECT_OPTIONS = {
  'sepia': {
    'noui': {
      range: {
        'min':0,
        'max':1,
      },
      step:0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start:1
    },
    filter: (value) => `sepia(${value})`
  },

  'chrome': {
    'noui': {
      range: {
        'min':0,
        'max':1,
      },
      step:0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start:1
    },
    filter: (value) => `grayscale(${value})`
  },

  'marvin': {
    'noui': {
      range: {
        'min':0,
        'max':100,
      },
      step:1,
      format: {
        from: (value) => parseInt(value,10),
        to: (value) => `${value}%`,
      },
      start:100
    },
    filter: (value) => `invert(${value})`
  },

  'phobos': {
    'noui': {
      range: {
        'min':0,
        'max':3,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => `${parseFloat(value).toFixed(1)}px`,
      },
      start: 3
    },
    filter: (value) => `blur(${value})`
  },
  'heat': {
    'noui': {
      range: {
        'min':1,
        'max':3,
      },
      step: 0.1,
      format: {
        from: (value) => parseFloat(value).toFixed(1),
        to: (value) => value,
      },
      start:3
    },
    filter: (value) => `brightness(${value})`
  },
};

export {DEFAULT_OPTIONS, EFFECT_OPTIONS};
