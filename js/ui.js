const errorWindow = document.querySelector('.error');
const errorWrapper = document.querySelector('.error-wrapper');
const errorButton = document.querySelector('.error button');
const errorParagraph = document.querySelector('.error p');

const confirmWindow = document.querySelector('.confirm-box');
const confirmWrapper = document.querySelector('.confirm-wrapper');
const confirmParagraph = document.querySelector('.confirm p');
const acceptButton = document.querySelector('.accept');
const cancelButton = document.querySelector('.cancel');
const changeBox = document.querySelector('.changes');

let focusedEl;

function showError (string) {
    focusedEl = document.activeElement;
    errorParagraph.textContent = string;
    errorWrapper.style.display = "block";
    errorButton.focus();
}

function closeDownError (e) {
    if (e.target !== this) return;
    errorWrapper.style.display = "none";
    focusedEl.focus();
}

function closeDownConfirmBox () {
    confirmWrapper.style.display = "none";
    focusedEl.focus();
}

function closeDownConfirmBoxW (e) {
    if (e.target !== this) return;
    closeDownConfirmBox();
}

function displayChanges (data) {
    changeBox.innerHTML = "";
    let row = document.createElement('div');
    row.className = 'row';
    let p1 = document.createElement('p');
    let p2 = document.createElement('p');
    p1.textContent = 'Before:';
    p2.textContent = 'After:';
    row.appendChild(p1);
    row.appendChild(p2);
    changeBox.appendChild(row);
    data.forEach(dat => {
        let row = document.createElement('div');
        row.className = "row";
        let oldCell = document.createElement('div');
        let newCell = document.createElement('div');
        oldCell.className = newCell.className = "cell-box";
        for (i = 0; i < 4; i++) {
            let text = document.createElement('p');
            if ( i == 0 || i == 2) text.textContent = `${dat.selection ? dat.selection : "Cell"}:`;
            else if (i == 1) text.textContent = dat.oldValue;
            else text.textContent = dat.value;
            if ( i < 2) oldCell.appendChild(text);
            else newCell.appendChild(text);
        }
        row.appendChild(oldCell);
        row.appendChild(newCell);
        changeBox.appendChild(row);
    });
    focusedEl = document.activeElement;
    acceptButton.focus ();
    confirmWrapper.style.display = "block";
    acceptButton.addEventListener ('click', function confirmSaving (e) {
        saveChanges (data);
        acceptButton.removeEventListener ('click', confirmSaving);
        closeDownConfirmBox (e);
    })
}