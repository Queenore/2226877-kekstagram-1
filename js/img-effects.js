import {DEFAULT_OPTIONS, EFFECT_OPTIONS} from './data.js';

const DEFAULT_EFFECT = 'none';

const imagePreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level__slider');
const effectItems = document.querySelectorAll('.effects__radio');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

let effect = DEFAULT_EFFECT;

const updateEffect = (evt) => {
  const currentEffect = evt.target.value;
  imagePreview.classList.value = 'img-upload__preview';
  imagePreview.classList.remove(`effects__preview--${effect}`);
  if (evt.target.value !== DEFAULT_EFFECT) {
    sliderElement.noUiSlider.updateOptions(EFFECT_OPTIONS[currentEffect].noui);
    imagePreview.classList.add(`effects__preview--${currentEffect}`);
    imagePreview.style.filter = EFFECT_OPTIONS[currentEffect]['filter'](sliderElement.noUiSlider.get());
    effectLevel.classList.remove('hidden');
  } else {
    imagePreview.style.filter = DEFAULT_EFFECT;
    effectLevel.classList.add('hidden');
  }
  effect = currentEffect;
};

const resetEffect = () => {
  imagePreview.classList.remove(`effects__preview--${effect}`);
  imagePreview.style.filter = DEFAULT_EFFECT;
  effect = DEFAULT_EFFECT;
  effectLevel.classList.add('hidden');
};

export const enableImgEffects = () => {
  resetEffect();
  if (!sliderElement.classList.contains('noUi-target')) {
    noUiSlider.create(sliderElement, DEFAULT_OPTIONS);
  }
  effectItems.forEach((item) => {
    item.addEventListener('change', updateEffect);
  });
  sliderElement.noUiSlider.on('update', () => {
    effectLevelValue.value = parseFloat(sliderElement.noUiSlider.get()).toFixed(1);
    if (effect !== DEFAULT_EFFECT) {
      imagePreview.style.filter = EFFECT_OPTIONS[effect]['filter'](sliderElement.noUiSlider.get());
    }
  });
};
