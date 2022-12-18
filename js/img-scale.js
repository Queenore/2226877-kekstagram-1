const imageUploadForm = document.querySelector('.img-upload__form');
const scaleControlSmaller = imageUploadForm.querySelector('.scale__control--smaller');
const scaleControlBigger = imageUploadForm.querySelector('.scale__control--bigger');
const scaleControlValue = imageUploadForm.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview');

const changeSmallerBiggerScale = (SmallerUpperFlag) => { // false -> smaller, true -> bigger
  let currentScaleValue = Number(scaleControlValue.value.split('%')[0]);
  if (currentScaleValue > 25 && !SmallerUpperFlag || currentScaleValue < 100 && SmallerUpperFlag) {
    currentScaleValue += (SmallerUpperFlag) ? 25 : -25;
    scaleControlValue.value = `${currentScaleValue}%`;
    imgUploadPreview.style.transform = `scale(${currentScaleValue / 100})`;
  }
};

const changeScaleSmaller = () => {
  changeSmallerBiggerScale(false);
};

const changeScaleBigger = () => {
  changeSmallerBiggerScale(true);
};

const changeImgScale = () => {
  scaleControlValue.value = '100%';
  imgUploadPreview.style.transform = 'scale(1)';
  scaleControlSmaller.addEventListener('click', changeScaleSmaller);
  scaleControlBigger.addEventListener('click', changeScaleBigger);
};

export {changeImgScale};
