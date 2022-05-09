// DARKMODE
const darkEl = document.querySelector('body');
const buttonEl = document.querySelector('button.switch');
const trashImg = document.querySelector('img');


function darkMode() {
    if (buttonEl.innerHTML == 'Make lightmode') {
        buttonEl.innerHTML = 'Make darkmode';
        trashImg.src = "img/trash.png";
    } else {
        buttonEl.innerHTML = 'Make lightmode';
        trashImg.src = "img/trash-light.png";
    }

    darkEl.classList.toggle('darkmode')


}


buttonEl.addEventListener('click', darkMode)

// DRAG AND DROP TRASH HEHE
const draggables = document.querySelectorAll('.draggable');
const dropZone = document.querySelector('.drop-zone');
let draggableItem;

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        draggableItem = document.querySelector('.dragging');
    })
    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')

    })
})

if (dropZone) {
    dropZone.addEventListener('dragover', e => {
        e.preventDefault();
        draggableItem.remove();

    })

}