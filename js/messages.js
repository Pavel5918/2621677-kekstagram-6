
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  if (!successTemplate) {
    return;
  }

  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!successElement.contains(evt.target)) {
      removeSuccessMessage();
    }
  };

  const removeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  successButton.addEventListener('click', removeSuccessMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error');
  if (!errorTemplate) {
    return;
  }

  const errorElement = errorTemplate.content.querySelector('.error').cloneNode(true);
  document.body.appendChild(errorElement);

  const errorButton = errorElement.querySelector('.error__button');

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeErrorMessage();
    }
  };

  const onOutsideClick = (evt) => {
    if (!errorElement.contains(evt.target)) {
      removeErrorMessage();
    }
  };

  const removeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

export { showSuccessMessage, showErrorMessage };
