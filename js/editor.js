const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview img');

const effectsList = document.querySelector('.effects__list');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');
const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');

const EFFECTS = {
  none: {
    filter: 'none',
    unit: '',
    min: 0,
    max: 0,
    step: 0,
    start: 0
  },
  chrome: {
    filter: 'grayscale',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  sepia: {
    filter: 'sepia',
    unit: '',
    min: 0,
    max: 1,
    step: 0.1,
    start: 1
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    min: 0,
    max: 100,
    step: 1,
    start: 100
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    min: 0,
    max: 3,
    step: 0.1,
    start: 3
  },
  heat: {
    filter: 'brightness',
    unit: '',
    min: 1,
    max: 3,
    step: 0.1,
    start: 3
  }
};

let currentEffect = 'none';
let sliderInstance = null;

const DEFAULT_SCALE = 100;
const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;

const setScale = (value) => {
  scaleValueInput.value = `${value}%`;
  imagePreview.style.transform = `scale(${value / 100})`;
};

const onScaleSmallerClick = () => {
  const currentValue = parseInt(scaleValueInput.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, SCALE_MIN);
  setScale(newValue);
};

const onScaleBiggerClick = () => {
  const currentValue = parseInt(scaleValueInput.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, SCALE_MAX);
  setScale(newValue);
};

const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    imagePreview.style.filter = 'none';
    return;
  }

  const filterValue = `${effect.filter}(${value}${effect.unit})`;
  imagePreview.style.filter = filterValue;
};

const createSlider = () => {
  if (typeof noUiSlider === 'undefined') {
    return null;
  }

  if (!effectLevelSlider) {
    return null;
  }

  try {
    if (effectLevelSlider.noUiSlider) {
      effectLevelSlider.noUiSlider.destroy();
    }

    sliderInstance = noUiSlider.create(effectLevelSlider, {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
      connect: 'lower'
    });

    sliderInstance.on('update', (values) => {
      const value = values[0];
      effectLevelValue.value = value;
      applyEffect(value);
    });

    return sliderInstance;
  } catch (error) {
    return null;
  }
};

const updateSliderForEffect = (effectName) => {
  const effect = EFFECTS[effectName];

  if (effectName === 'none') {
    effectLevelContainer.classList.add('hidden');
    imagePreview.style.filter = 'none';
    effectLevelValue.value = '';

    if (sliderInstance) {
      sliderInstance.destroy();
      sliderInstance = null;
    }
    return;
  }

  effectLevelContainer.classList.remove('hidden');

  if (!sliderInstance) {
    sliderInstance = createSlider();
    if (!sliderInstance) {
      return;
    }
  }

  sliderInstance.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.start,
    step: effect.step
  });

  applyEffect(effect.start);
};

const onEffectChange = (evt) => {
  if (evt.target.type === 'radio') {
    currentEffect = evt.target.value;
    updateSliderForEffect(currentEffect);
  }
};

const resetEffects = () => {
  currentEffect = 'none';
  imagePreview.style.filter = 'none';

  const noneEffect = document.querySelector('#effect-none');
  if (noneEffect) {
    noneEffect.checked = true;
  }

  effectLevelContainer.classList.add('hidden');
  effectLevelValue.value = '';

  if (sliderInstance) {
    sliderInstance.destroy();
    sliderInstance = null;
  }
};

const onFileInputChange = () => {
  const fileInput = document.querySelector('#upload-file');
  const file = fileInput.files[0];

  if (!file) {
    return;
  }

  if (!file.type.startsWith('image/')) {
  console.error('Пожалуйста, выберите файл изображения (JPEG, PNG, GIF)');
  fileInput.value = '';
  return;
}

  const reader = new FileReader();

  reader.addEventListener('load', () => {
    imagePreview.src = reader.result;

    document.querySelectorAll('.effects__preview').forEach((preview) => {
      preview.style.backgroundImage = `url(${reader.result})`;
    });
  });

  reader.addEventListener('error', () => {
  console.error('Ошибка при загрузке файла');
  fileInput.value = '';
  });

  reader.readAsDataURL(file);
};

const initEditor = () => {
  setScale(DEFAULT_SCALE);

  scaleSmallerButton.addEventListener('click', onScaleSmallerClick);
  scaleBiggerButton.addEventListener('click', onScaleBiggerClick);

  effectsList.addEventListener('change', onEffectChange);

  effectLevelContainer.classList.add('hidden');
  resetEffects();

  const fileInput = document.querySelector('#upload-file');
  fileInput.addEventListener('change', onFileInputChange);
};

const resetEditor = () => {
  setScale(DEFAULT_SCALE);
  resetEffects();

  imagePreview.src = 'img/upload-default-image.jpg';

  document.querySelectorAll('.effects__preview').forEach((preview) => {
    preview.style.backgroundImage = '';
  });

  const fileInput = document.querySelector('#upload-file');
  fileInput.value = '';
};

export { initEditor, resetEditor };
