const ESC_KEY = 'Escape';

const errorPicture = Array.from({length:25}).map(() => ({
  id: Date.now(),
  url: 'photos/error.jpg',
  description: 'Ошибка загрузки фотографии',
  likes: '-',
  comments: []
}));

const isEscKey = (keyCode) => keyCode === ESC_KEY;

export {isEscKey, errorPicture};
