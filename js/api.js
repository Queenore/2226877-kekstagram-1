import { errorPicture } from './util.js';
import {createEventListenersFilter} from './pictures.js';

const imgFilters = document.querySelector('.img-filters');

const getData = (render) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((pictures) => render(pictures))
    .catch(() => render(errorPicture))
    .then(() => {
      imgFilters.classList.remove('img-filters--inactive');
      createEventListenersFilter();
    });
};

const sendData = (onFail, onSuccess, body) => {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  ).then((response) => {
    if (!response.ok) {
      if (response.status === 400) {
        onFail('Неверный формат файла!');
      } else {
        onFail('Данные не отправлены!');
      }
    } else {
      onSuccess();
    }
  }).catch(() => {
    onFail('Данные не отправлены!');
  });
};

export { getData, sendData };
