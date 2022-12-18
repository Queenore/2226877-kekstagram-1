const ESC_KEY = 'Escape';

const getRandomUniquePictures = (pictures, n) => {
  const result = new Array(n);
  let len = pictures.length;
  const taken = new Array(len);
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = pictures[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const errorPicture = Array.from({length: 25}).map(() => ({
  id: Date.now(),
  url: 'photos/error.jpg',
  description: 'Ошибка загрузки фотографии',
  likes: '0',
  comments: []
}));

const isEscKey = (keyCode) => keyCode === ESC_KEY;

export {getRandomUniquePictures, debounce, errorPicture, isEscKey};
