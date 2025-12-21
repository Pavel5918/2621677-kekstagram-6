
import { renderThumbnails, clearThumbnails } from './thumbnails.js';

const FilterType = {
  DEFAULT: 'default',
  RANDOM: 'random',
  DISCUSSED: 'discussed'
};

const RANDOM_PHOTOS_COUNT = 10;
let photos = [];

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const getDefaultPhotos = () => photos.slice();

const getRandomPhotos = () => {
  const shuffled = photos.slice().sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PHOTOS_COUNT);
};

const getDiscussedPhotos = () => {
  return photos.slice().sort((a, b) => b.comments.length - a.comments.length);
};

const applyFilter = (filterType) => {
  let filteredPhotos;

  switch (filterType) {
    case FilterType.RANDOM:
      filteredPhotos = getRandomPhotos();
      break;
    case FilterType.DISCUSSED:
      filteredPhotos = getDiscussedPhotos();
      break;
    default:
      filteredPhotos = getDefaultPhotos();
  }

  clearThumbnails();

  renderThumbnails(filteredPhotos);
};

const debouncedApplyFilter = debounce(applyFilter);

const onFilterChange = (evt) => {
  if (!evt.target.matches('.img-filters__button')) {
    return;
  }

  const filterButton = evt.target;
  const filterType = filterButton.id.replace('filter-', '');

  document.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  filterButton.classList.add('img-filters__button--active');

  debouncedApplyFilter(filterType);
};

const initFilters = (loadedPhotos) => {
  photos = loadedPhotos;

  const filtersContainer = document.querySelector('.img-filters');
  filtersContainer.classList.remove('img-filters--inactive');

  const filtersForm = document.querySelector('.img-filters__form');
  filtersForm.addEventListener('click', onFilterChange);

  const defaultFilter = document.querySelector('#filter-default');
  defaultFilter.classList.add('img-filters__button--active');
};

export { initFilters };
