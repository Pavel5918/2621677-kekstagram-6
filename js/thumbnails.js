
import { openFullscreen } from './fullscreen.js';

const pictureTemplate = document.querySelector('#picture');
const picturesContainer = document.querySelector('.pictures');

const createThumbnail = (pictureData) => {
  const thumbnail = pictureTemplate.content.querySelector('.picture').cloneNode(true);

  const image = thumbnail.querySelector('.picture__img');
  const commentsElement = thumbnail.querySelector('.picture__comments');
  const likesElement = thumbnail.querySelector('.picture__likes');

  image.src = pictureData.url;
  image.alt = pictureData.description;
  likesElement.textContent = pictureData.likes;
  commentsElement.textContent = pictureData.comments.length;

  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullscreen(pictureData);
  });

  return thumbnail;
};

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

const clearThumbnails = () => {
  const currentPictures = picturesContainer.querySelectorAll('.picture');
  currentPictures.forEach((picture) => picture.remove());
};

export { renderThumbnails, clearThumbnails };
