
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  if (!successTemplate) {
    return;
  }

  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');

  const removeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', handleEscKey);
    document.removeEventListener('click', handleOutsideClick);
  };

  const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };

  const handleOutsideClick = (evt) => {
    if (!successElement.contains(evt.target)) {
      removeSuccessMessage();
    }
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

  const removeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', handleEscKey);
    document.removeEventListener('click', handleOutsideClick);
  };

  const handleEscKey = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeErrorMessage();
    }
  };

  const handleOutsideClick = (evt) => {
    if (!errorElement.contains(evt.target)) {
      removeErrorMessage();
    }
  };

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', handleEscKey);
  document.addEventListener('click', handleOutsideClick);
};

export { showSuccessMessage, showErrorMessage };
