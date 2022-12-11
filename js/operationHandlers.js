function loadRegs () {
    const data = [];
    for (i = 0; i < inputs.length; i++) {
        if (inputs[i].value.length !== 2){ 
            showError ('Please fill up all registers!')
            return;
        }
        inputs[i].value = inputs[i].value.toUpperCase();
        const index = regs.findIndex(el => el.name === inputs[i].name);
        regs[index].value = inputs[i].value;
    }
    const selectors = [document.querySelector('.input-order-0'), document.querySelector('.input-order-1')];
    const cell = document.querySelector("#cell");
    if (cell && cell.value.length !== 4) {
        showError ('Please fill up the cell!');
        return;
    } else if (cell) cell.value = cell.value.toUpperCase ();
    selectors.forEach( selector => {
        if (!selector) return;
        const obj = {}
        obj.html = selector;
        if (selector.id === "cell") {
            obj.type = "cell";
            obj.value = selector.value
        } else {
            obj.type = "reg";
            obj.selection = selector.value;
            obj.value = findRegValue (selector.value);
        }
        obj.oldValue = obj.value;
        data.push(obj);
    });
    if (operationMenu.value === 'not') inverseNumber (data[0]);
    else if (operationMenu.value === 'inc') increment (data[0]);
    else if (operationMenu.value === 'dec') decrement (data[0]);
    else if (operationMenu.value === 'mov') move (data);
    else if (operationMenu.value === 'exh') exchange (data);
    else if (operationMenu.value === 'and' || operationMenu.value === "or" || operationMenu.value === "xor") logicalOperation (data, operationMenu.value);
    else if (operationMenu.value === 'add' || operationMenu.value === "sub") addOrSubtract (data, operationMenu.value);
}

function findRegValue (selection) {
    const index = regs.findIndex(el => el.name === selection);
    return regs[index].value;
}

function hexToDec (number) {
    return parseInt(number, 16);
}

function decToHex (number, type) {
    const length = type === "cell" ? 4 : 2;
    let convertedNumber = number.toString(16).toUpperCase ();
    return fillEmptySpace (convertedNumber, length);
}

function fillEmptySpace (number, length) {
    while(number.length < length){
        number = `0${number}`;
    }
    return number;
}

function reverseString (string) {
    let newString = "";
    for (i = string.length-1; i >= 0; i--) {
        newString += string[i];
    }
    return (newString);
}

function addBinZeros (string, length) {
    while (string.length < length) {
        string += "0";
    };
    return string;
}

function saveBoth (data, type, finalNumber) {
    data.forEach(dat => {
        if (type === "cell" && dat.type === "cell") {
            dat.value = finalNumber;
        } else if (type === "reg") {
            dat.value = finalNumber;
        }
    });
    return data;
}

function saveChanges (data) {
    data.forEach(dat => {
        if (dat.type === "cell") dat.html.value = dat.value;
    else document.querySelector(`input[name=${dat.selection}]`).value = dat.value;
    })
}