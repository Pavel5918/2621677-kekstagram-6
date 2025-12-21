
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  if (!successTemplate) {
    return;
  }

  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');

  const removeEventListeners = () => {
    document.removeEventListener('keydown', handleEscKey);
    document.removeEventListener('click', handleOutsideClick);
  };

  const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeEventListeners();
      successElement.remove();
    }
  };

  const handleOutsideClick = (evt) => {
    if (!successElement.contains(evt.target)) {
      removeEventListeners();
      successElement.remove();
    }
  };

  const removeSuccessMessage = () => {
    removeEventListeners();
    successElement.remove();
  };

  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', handleEscKey);
  document.addEventListener('click', handleOutsideClick);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  if (!errorTemplate) {
    return;
  }

  const errorElement = errorTemplate.content.querySelector('.error').cloneNode(true);
  document.body.appendChild(errorElement);

  const errorButton = errorElement.querySelector('.error__button');

  const removeEventListeners = () => {
    document.removeEventListener('keydown', handleEscKey);
    document.removeEventListener('click', handleOutsideClick);
  };

  const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeEventListeners();
      errorElement.remove();
    }
  };

  const handleOutsideClick = (evt) => {
    if (!errorElement.contains(evt.target)) {
      removeEventListeners();
      errorElement.remove();
    }
  };

  const removeErrorMessage = () => {
    removeEventListeners();
    errorElement.remove();
  };

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', handleEscKey);
  document.addEventListener('click', handleOutsideClick);
};

export { showSuccessMessage, showErrorMessage };
