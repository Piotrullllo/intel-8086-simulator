const singleRegs = ['not', 'inc', 'dec'];
const regSelectContainer = document.querySelector('.select-regs');
const allowedChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const regOptions = ['Register', 'Cell'];
const regs = [
    {
        name: 'al',
        value: ''
    },
    {
        name: 'ah',
        value: ''
    },
    {
        name: 'bl',
        value: ''
    },
    {
        name: 'bh',
        value: ''
    },
    {
        name: 'cl',
        value: ''
    },
    {
        name: 'ch',
        value: ''
    },
    {
        name: 'dl',
        value: ''
    },
    {
        name: 'dh',
        value: ''
    }
];