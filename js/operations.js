function inverseNumber (data) {
    const charArray = [];
    let workingOn = data.value
    for( i = 0; i < workingOn.length; i++ ){
        charArray.push(workingOn[i]);
        const charIndex = allowedChars.indexOf(charArray[i]);
        const aCLength = allowedChars.length-1;
        charArray[i] = allowedChars[aCLength - charIndex];
    }
    workingOn = '';
    charArray.forEach(char => {
        workingOn += char;
    });
    data.value = workingOn;
    displayChanges ([data]);
    // saveChanges (data);
}

function increment (data) {
    let workingOn = hexToDec(data.value);
    if (data.type === "cell" && workingOn >= 65535 || data.type === "reg" && workingOn >= 255){
        showError ("Cannot increment, maximal value reached!");
        return;
    } 
    workingOn++;
    data.value = decToHex (workingOn, data.type);
    displayChanges ([data]);
    // saveChanges (data);
}

function decrement (data) {
    let workingOn = hexToDec(data.value);
    if (workingOn <= 0){
        showError ("Cannot decrement, minimal value reached!");
        return;
    } 
    workingOn--;
    data.value = decToHex (workingOn, data.type);
    displayChanges ([data]);
    // saveChanges (data);
}

function move (data) {
    const length = data[1].type === "cell" ? 4 : 2;
    data[1].value = fillEmptySpace (data[0].value, length);
    displayChanges (data);
    // saveChanges (data[1]);
}

function exchange (data) {
    const copy = [];
    data.forEach(dat => {
        copy.push(dat.value);
    });
    copy.reverse ();
    for (i = 0; i < copy.length; i++){
        data[i].value = copy[i];
    }
    displayChanges (data);
    // saveChanges (data[i]);
}

function logicalOperation (data, operation) {
    let length = 8;
    let firstNumber;
    let secondNumber;
    let finalNumber;
    for (i = 0; i < data.length; i++) {
        if (data[i].type === "cell") length = 16;
        if (i === 0) firstNumber = hexToDec(data[i].value).toString(2);
        else secondNumber = hexToDec(data[i].value).toString(2);
    }
    firstNumber = reverseString (firstNumber);
    secondNumber = reverseString (secondNumber);
    if (operation === "and") finalNumber = andOperation (firstNumber, secondNumber, length);
    if (operation === "or" || operation === "xor") finalNumber = orOperation (firstNumber, secondNumber, length, operation);
    let type = length === 16 ? "cell" : "reg";
    finalNumber = reverseString (finalNumber);
    finalNumber = parseInt (finalNumber, 2);
    finalNumber = decToHex (finalNumber, type);
    data = saveBoth (data, type, finalNumber);
    displayChanges (data);
}

function addOrSubtract (data, op) {
    let maxValue = 255;
    let firstNumber;
    let secondNumber;
    let finalNumber;
    for (i = 0; i < data.length; i++) {
        if (data[i].type === "cell") maxValue = 65535;
        if (i === 0) firstNumber = hexToDec(data[i].value);
        else secondNumber = hexToDec(data[i].value);
    }
    if (op === "add") finalNumber = firstNumber + secondNumber;
    else finalNumber = firstNumber - secondNumber;
    if (op === "add" && finalNumber > maxValue) {
        showError ("Cannot add, value is off-scale!");
        return;
    } else if (op === "sub" && finalNumber < 0) {
        showError ("Cannot subtract, value is negative!");
        return;
    }
    let type = maxValue === 255 ? "reg" : "cell";
    finalNumber = decToHex (finalNumber, type);
    data = saveBoth (data, type, finalNumber);
    displayChanges (data);
    // saveBoth (data, type, finalNumber);
}

function andOperation (firstNumber, secondNumber, length) {
    let finalNumber = "";
    for (i = 0; i < length; i++){
            if (firstNumber[i] === "1" && secondNumber[i] === "1") finalNumber += "1";
            else finalNumber += 0;
        }   
    return finalNumber;
}

function orOperation (firstNumber, secondNumber, length, op) {
    let finalNumber = "";
    firstNumber = addBinZeros (firstNumber, length);
    secondNumber = addBinZeros (secondNumber, length);
    for (i = 0; i < length; i++) {
        if (firstNumber[i] === "0" && secondNumber[i] === "0") finalNumber += "0";
        else if (op === "xor" && firstNumber[i] === "1" && secondNumber[i] === "1") finalNumber += "0";
        else finalNumber += "1";
    }
    return finalNumber;
}