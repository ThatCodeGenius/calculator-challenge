const display = document.querySelector('input');
const allButton = document.querySelectorAll('.js-button');
const calculate = document.querySelector('.equals-key');
const reset = document.querySelector('.reset-button');
const deleteButton = document.querySelector('.delete-button');
const pageBody = document.querySelector('body');
const buttonContainer = document.querySelector('.button-container');

const redThemeButton = document.querySelector('.color-selection-red');
const yellowThemeButton = document.querySelector('.color-selection-coffee');

redThemeButton.style.backgroundColor = ' rgba(197, 61, 91, 0.65)';
yellowThemeButton.style.backgroundColor = ' rgba(129, 121, 76, 0.37)';

/* THEME SELECTION BUTTONS */
const themeSelections = document.querySelectorAll('.js-color-selection-button');
themeSelections.forEach(themeSelection => {
  themeSelection.addEventListener('click', selectTheme);
});

// Check for stored display value
const storedDisplayValue = localStorage.getItem('displayValue');
if (storedDisplayValue) {
  display.value = storedDisplayValue;
} else {
  display.value = '';
};

// Update localStorage whenever display value changes
function updateLocalStorage() {
  try {
    if (display.value !== '') {
      localStorage.setItem('displayValue', display.value);
    }
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Save theme selection to localStorage and apply it
function selectTheme(event) {
  const themeselection = event.currentTarget;
  const themeSelected = themeselection.dataset.buttonId;
  sessionStorage.setItem('themeSelected', themeSelected);

  // Apply theme styles
  if (themeSelected === 'Red') {
    document.body.style.backgroundColor = ' rgba(127, 24, 46, 0.65)';
    display.style.backgroundColor = ' rgba(236, 228, 230, 0.65)';
    buttonContainer.style.backgroundColor = ' rgba(236, 228, 230, 0.65)';
    reset.style.backgroundColor = ' rgba(127, 24, 46, 0.65)';
    deleteButton.style.backgroundColor = ' rgba(127, 24, 46, 0.65)';
    calculate.style.backgroundColor = ' rgba(19, 122, 200, 0.65)';

  } else if (themeSelected === 'Coffee') {
    document.body.style.backgroundColor = ' rgba(55, 48, 7, 0.99)';
    display.style.backgroundColor = ' rgba(129, 121, 76, 0.37)';
    buttonContainer.style.backgroundColor = ' rgba(129, 121, 76, 0.37)';
    reset.style.backgroundColor = ' rgba(129, 121, 76, 0.37)';
    deleteButton.style.backgroundColor = ' rgba(127, 24, 46, 0.65)';
    calculate.style.backgroundColor = ' rgba(19, 122, 200, 0.65)';

  } else if (themeSelected === 'Glass') {
    document.body.style.background = 'linear-gradient(to top left,#FFD700,rgba(0, 255, 229, 0.67), #B8860B)';
    display.style.backgroundColor = ' rgba(255, 255, 255, 0.25)';
    display.style.borderTop = '1px solid rgba(225, 225, 225, 0.4)';
    display.style.boxShadow = '3px 3px 3px rgba(0, 0, 0, 0.089)';
    buttonContainer.style.backgroundColor = ' rgba(255, 255, 255, 0.3)';
    reset.style.backgroundColor = ' rgb(176, 103, 103)';
    reset.style.backdropFilter = 'blur(8px)';
    deleteButton.style.backgroundColor = ' rgb(253, 122, 144)';
    calculate.style.backgroundColor = ' rgba(19, 122, 200, 0.65)';
  }
  updateLocalStorage();
};

// Retrieve stored theme on page load
const storedTheme = sessionStorage.getItem('themeSelected');
if (storedTheme) {
  themeSelections.forEach(themeSelection => {
    if (themeSelection.dataset.buttonId === storedTheme) {
      selectTheme({ currentTarget: themeSelection });
    }
  });
};

allButton.forEach(button => {
  button.addEventListener('click', handleClicked);
});

function handleClicked(event) {
  const button = event.currentTarget;
  const buttonClicked = button.dataset.buttonId;
  display.value += buttonClicked;
  updateLocalStorage();
};

calculate.addEventListener('click', () => {
  try {
    display.value = new Function('return ' + display.value)();
  } catch (error) {
    display.value = 'Error';
  }
  updateLocalStorage();
});

reset.addEventListener('click', () => {
  display.value = '';
  updateLocalStorage();
});

deleteButton.addEventListener('click', () => {
  display.value = display.value.slice(0, -1);
  updateLocalStorage();
});
