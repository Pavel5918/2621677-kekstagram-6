
const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success');
  if (!successTemplate) {
    return;
  }

  const successElement = successTemplate.content.querySelector('.success').cloneNode(true);
  document.body.appendChild(successElement);

  const successButton = successElement.querySelector('.success__button');

  let onEscKeyDown;
  let onOutsideClick;
  let removeSuccessMessage;

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeSuccessMessage();
    }
  };

  onOutsideClick = (evt) => {
    if (!successElement.contains(evt.target)) {
      removeSuccessMessage();
    }
  };

  removeSuccessMessage = () => {
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

  let onEscKeyDown;
  let onOutsideClick;
  let removeErrorMessage;

  onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      removeErrorMessage();
    }
  };

  onOutsideClick = (evt) => {
    if (!errorElement.contains(evt.target)) {
      removeErrorMessage();
    }
  };

  removeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onEscKeyDown);
    document.removeEventListener('click', onOutsideClick);
  };

  errorButton.addEventListener('click', removeErrorMessage);
  document.addEventListener('keydown', onEscKeyDown);
  document.addEventListener('click', onOutsideClick);
};

export { showSuccessMessage, showErrorMessage };
