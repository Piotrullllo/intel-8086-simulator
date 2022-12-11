function toggleRegSelectors (value) {
    if (singleRegs.includes(value))generateRegSelectors('single');
    else generateRegSelectors('double');
}

function reloadDom () {
    const divs = document.querySelectorAll('.data-input');
    divs.forEach(div => { switchModes (div, 'register') });
    refreshRegs ();
    disableCell ();
}

function filterKeys (e) {
    const key = e.key.toUpperCase();
    if (!allowedChars.includes(key)) e.preventDefault();
}

inputs.forEach(input => input.addEventListener('keypress', filterKeys));
operationMenu.addEventListener('change',e => {
    toggleRegSelectors (e.target.value);
    reloadDom ()
});
confirmOperation.addEventListener('click', loadRegs);
window.addEventListener('load',() =>  {
    operationMenu.value = 'mov';
    toggleRegSelectors ();
    reloadDom ()
});

errorButton.addEventListener ('click', closeDownError);
errorWrapper.addEventListener ('click', closeDownError);
cancelButton.addEventListener ('click', closeDownConfirmBox);
confirmWrapper.addEventListener ('click', closeDownConfirmBoxW);