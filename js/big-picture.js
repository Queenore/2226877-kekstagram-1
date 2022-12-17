import {isEscKey} from './util.js';

const SHOWED_COMMENTS_STEP = 5;

const pictureModalElement = document.querySelector('.big-picture');
const socialCommentCountElement = document.querySelector('.social__comment-count');
const commentsLoaderElement = document.querySelector('.comments-loader');
const imageElement = document.querySelector('.big-picture__img img');
const likesCountElement = document.querySelector('.likes-count');
const descriptionElement = document.querySelector('.social__caption');
const buttonCloseElement = document.querySelector('#picture-cancel');
const commentListElement = document.querySelector('.social__comments');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let currentShowedCommentsCount = 0;
let allComments;

const showMoreComments = () => {
  const commentsCountDelta = allComments.length - currentShowedCommentsCount;
  currentShowedCommentsCount += (commentsCountDelta >= SHOWED_COMMENTS_STEP) ? SHOWED_COMMENTS_STEP : commentsCountDelta;
  socialCommentCountElement.textContent = `${currentShowedCommentsCount} из ${allComments.length} комментариев`;

  commentListElement.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < currentShowedCommentsCount; i++) {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('.social__picture').src = allComments[i].avatar;
    commentElement.querySelector('.social__picture').alt = allComments[i].name;
    commentElement.querySelector('.social__text').textContent = allComments[i].message;
    commentsFragment.appendChild(commentElement);
  }

  commentListElement.appendChild(commentsFragment);
  if (currentShowedCommentsCount === allComments.length) {
    commentsLoaderElement.classList.add('hidden');
    currentShowedCommentsCount = 0;
  }
};

const closePictureModal = () => {
  currentShowedCommentsCount = 0;
  pictureModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  socialCommentCountElement.classList.add('hidden');
  commentsLoaderElement.classList.add('hidden');
};

const onPictureModalKeydown = (evt) => {
  if (isEscKey(evt.key)) {
    closePictureModal();
    document.removeEventListener('keydown', onPictureModalKeydown);
  }
};

const onPictureModalCloseClick = () => {
  closePictureModal();
};

const openPictureModal = ({url, likes, comments, description}) => {
  document.body.classList.add('modal-open');
  pictureModalElement.classList.remove('hidden');
  socialCommentCountElement.classList.remove('hidden');
  commentsLoaderElement.classList.remove('hidden');
  allComments = comments;

  imageElement.src = url;
  likesCountElement.textContent = likes;
  descriptionElement.textContent = description;

  showMoreComments();

  document.addEventListener('keydown', onPictureModalKeydown);
  buttonCloseElement.addEventListener('click', onPictureModalCloseClick, {once: true});
  commentsLoaderElement.addEventListener('click', showMoreComments);
};

export {openPictureModal};
