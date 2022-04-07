const darkEl = document.querySelector('body');
const buttonEl = document.querySelector('button.switch');

function darkMode() {
    darkEl.classList.toggle('darkmode')
}

buttonEl.addEventListener('click', darkMode)