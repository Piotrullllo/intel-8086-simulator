const inputs = document.querySelectorAll('.registers input');
const confirmOperation = document.querySelector('.submit-container>.confirm');
const operationMenu = document.querySelector('#operations');
const selectedRegs = [];

function toggleCell (name) {
    const cells = document.querySelectorAll('.cell');
    const regs = document.querySelectorAll('.register');
    const divs = document.querySelectorAll('.data-input');
    if(name === 'reg-opt1' && cells[1].checked) {
        regs[1].checked = true;
        switchModes (divs[1], 'register');
    } 
    else if (name === 'reg-opt2' && cells[0].checked) {
        regs[0].checked = true;
        switchModes (divs[0], 'register');
    }
}

function toggleRegOpt (e) {
    const target = e.target;
    if(target.name === 'reg-opt1' || target.name === 'reg-opt2' && target.value === 'cell') toggleCell (e.target.name);
    switchModes (target.parentNode.parentNode.parentNode.querySelector('.data-input'), target.value);
    refreshRegs (); 
}

function switchModes (selector, value) {
    const input = selector;
    input.innerHTML = '';
    if (value === 'register') {
        const selectList = document.createElement('select');
        selectList.classList.add('selectList');
        input.appendChild(selectList);
        selectList.addEventListener('change', preventDoubledRegs)
    } else if (value === 'cell') {
        const cell = document.createElement('input');
        cell.maxLength = 4;
        cell.size = 4;
        cell.id = 'cell';
        cell.addEventListener('keypress', filterKeys);
        input.appendChild(cell);
    }
    addOrderClasses ();
}

function addOrderClasses () {
    const divs = document.querySelectorAll('.data-input');
    const className = "input-order-";
    for ( i=0; i < divs.length; i++ ){
        const currentInput = divs[i].firstChild;
        if(currentInput && !currentInput.classList.contains(`${className}${i}`)) currentInput.classList.add(`${className}${i}`)
    }
}

function preventDoubledRegs (e) {
    const regSelectors = [... document.querySelectorAll('.selectList')];
    if (regSelectors.length == 2) {
        const indexOfReg = regSelectors.indexOf(e.target);
        selectedRegs[indexOfReg] = e.target.value;
        let secondReg;
        if (indexOfReg === 0) secondReg = 1;
        else secondReg = 0;
        const secondValue = regSelectors[secondReg].value;
        loadRegList (regSelectors[secondReg], e.target.value);
        regSelectors[secondReg].value = secondValue;
    }
}

function loadRegList (regSelector, omittedValue) {
    regSelector.innerHTML = '';
    regs.forEach(reg => {
        if (reg.name === omittedValue) return;
        const option = document.createElement('option');
        option.innerHTML = reg.name.toUpperCase();
        option.value = reg.name;
        regSelector.appendChild(option);
    });
}

function disableCell () {
    const cellActivators = document.querySelectorAll('.cell');
    if ( operationMenu.value === 'mov') cellActivators[0].disabled = true;
    else if (operationMenu.value === 'exh') cellActivators.forEach( activator => activator.disabled = true );
    else if (operationMenu.value === 'sub') cellActivators[1].disabled = true;
    else cellActivators.forEach(activator => activator.disabled = false )
}

function refreshRegs () {
    const regSelectors = [... document.querySelectorAll('.selectList')];
    regSelectors.reverse();
    if (regSelectors.length === 2){
        for( i = 0; i < regSelectors.length; i++ ) {
            loadRegList(regSelectors[i], regs[i].name);
        }
    } else regSelectors.forEach(select => loadRegList (select));
}

function generateRegSelectors (mode) {
    let x;
    regSelectContainer.innerHTML = '';
    mode === 'single' ? x = 1 : x = 2;
    for ( i=0; i<x; i++ ) {
        const wrapper = document.createElement ('div');
        wrapper.classList.add ('reg');
        const input = document.createElement ('div');
        const optWrapper = document.createElement ('div');
        regOptions.forEach (name => {
            const label = document.createElement ('label');
            const option = document.createElement ('input');
            option.type = 'radio';
            mode === 'single' ? option.name = 'reg-opt' : option.name = `reg-opt${i+1}`
            if (name.toLowerCase() === 'register') option.checked = true;
            option.classList.add (`${name.toLowerCase()}`);
            option.value = name.toLowerCase ();
            label.textContent = name;
            label.appendChild (option);
            input.classList.add ('data-input');
            optWrapper.appendChild (label);
            option.addEventListener ('change', toggleRegOpt);
        });
        wrapper.appendChild (optWrapper);
        wrapper.appendChild (input);
        regSelectContainer.appendChild (wrapper);
    }
}