import {isEscKey} from './util.js';
import {changeImgScale} from './img-scale.js';
import {enableImgEffects} from './img-effects.js';
import {pristine} from './pristine-validator.js';

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const buttonCancelElement = imageUploadForm.querySelector('.img-upload__cancel');

const closeOverlay = () => {
  imageUploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscKey(evt.key) && evt.target !== textHashtags && evt.target !== textDescription) {
    evt.preventDefault();
    closeOverlay();
  }
};

export const renderFileUpload = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });

  fileUploadButton.addEventListener('change', () => {
    changeImgScale();
    enableImgEffects();
    document.addEventListener('keydown', onEscKeydown);
    buttonCancelElement.addEventListener('click', closeOverlay, {once: true});
    document.body.classList.remove('modal-open');
    overlay.classList.remove('hidden');
  });
};
