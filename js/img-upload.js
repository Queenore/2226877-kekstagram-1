import {isEscKey} from './util.js';
import {changeImgScale} from './img-scale.js';
import {enableImgEffects} from './img-effects.js';
import {pristine} from './pristine-validator.js';
import {sendData} from './api.js';
import {onImgInputChange} from './picture-input.js';

const fileUploadButton = document.querySelector('#upload-file');
const overlay = document.querySelector('.img-upload__overlay');
const imageUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imageUploadForm.querySelector('.text__hashtags');
const textDescription = imageUploadForm.querySelector('.text__description');
const buttonCancelElement = imageUploadForm.querySelector('.img-upload__cancel');

const form = document.querySelector('#upload-select-image');
const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');
const submitFormElement = form.querySelector('.img-upload__submit');

let isErrorMsgActive = false;
let errorElement;

const closeOverlay = () => {
  pristine.reset();
  imageUploadForm.reset();
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const showOverlay = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const hideOverlay = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydown = (evt) => {
  if (isEscKey(evt.key) && evt.target !== textHashtags && evt.target !== textDescription && !isErrorMsgActive) {
    evt.preventDefault();
    closeOverlay();
  }
};

const createSuccessBlock = () => {
  closeOverlay();
  submitFormElement.disabled = false;
  const successElement = successTemplate.cloneNode(true).content.querySelector('.success');
  document.addEventListener('keydown', (evt) => {
    if (isEscKey(evt.key) && document.body.contains(successElement)) {
      document.body.removeChild(successElement);
    }
  });
  successElement.addEventListener(
    'click',
    (evt) => {
      if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
        document.body.removeChild(successElement);
      }
    });
  document.body.appendChild(successElement);
};


const removeErrorElement = () => {
  if (document.body.contains(errorElement)) {
    document.body.removeChild(errorElement);
    isErrorMsgActive = false;
    showOverlay();
  }
};

const escListener = (evt) => {
  if (isEscKey(evt.key)) {
    removeErrorElement(errorElement);
    document.body.removeEventListener('keydown', escListener);
  }
};

const errorElementListener = (evt) => {
  if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
    removeErrorElement(errorElement);
    document.body.removeEventListener('click', errorElementListener);
  }
};

const createErrorBlock = (text) => {
  hideOverlay();
  isErrorMsgActive = true;
  submitFormElement.disabled = false;
  errorElement = errorTemplate.cloneNode(true).content.querySelector('.error');
  errorElement.querySelector('.error__title').textContent = text;
  document.addEventListener('keydown', escListener);
  errorElement.addEventListener('click', errorElementListener);
  document.body.appendChild(errorElement);
};

export const renderFileUpload = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      submitFormElement.disabled = true;
      sendData(createErrorBlock, createSuccessBlock, new FormData(form));
    }
  });

  fileUploadButton.addEventListener('change', (evt) => {
    changeImgScale();
    enableImgEffects();
    onImgInputChange(evt);
    document.addEventListener('keydown', onEscKeydown);
    buttonCancelElement.addEventListener('click', closeOverlay, {once: true});
    showOverlay();
  });
};
