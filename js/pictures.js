import {openPictureModal} from './big-picture.js';
import {debounce, getRandomUniquePictures} from './util.js';

const TIMEOUT_DELAY = 500;

const picturesListElement = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filterButtons = document.querySelectorAll('.img-filters__button');
const picturesFragment = document.createDocumentFragment();

let loadedPictures;

const appendPicture = (picture) => {
  const {id, url, likes, comments} = picture;

  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.dataset.id = id;

  picturesFragment.appendChild(pictureElement);
};

const openPictureModalListener = (evt) => {
  const pictureElement = evt.target.closest('.picture');
  if (pictureElement) {
    const clickedPicture = loadedPictures.find(({id}) => Number(pictureElement.dataset.id) === id);
    openPictureModal(clickedPicture);
  }
};

const renderPictures = (pictures, option) => {
  document.querySelectorAll('.picture').forEach((picture) => {
    picture.removeEventListener('click', openPictureModalListener);
    picture.remove();
  });
  if (option === 'filter-default') {
    pictures.forEach(appendPicture);
  } else if (option === 'filter-random') {
    getRandomUniquePictures(pictures, 10).forEach(appendPicture);
  } else {
    Array.from(pictures).sort((a, b) =>
      b.comments.length - a.comments.length
    ).forEach(appendPicture);
  }
  loadedPictures = pictures;
  picturesListElement.appendChild(picturesFragment);
  picturesListElement.addEventListener('click', openPictureModalListener);
};

const debounceRenderedPhotos = debounce(renderPictures, TIMEOUT_DELAY);

const createEventListenersFilter = () => {
  filterButtons.forEach((filterButton) => {
    filterButton.addEventListener('click', () => {
      filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
      filterButton.classList.add('img-filters__button--active');
      debounceRenderedPhotos(loadedPictures, filterButton.id);
    });
  });
};

export {renderPictures, createEventListenersFilter};
