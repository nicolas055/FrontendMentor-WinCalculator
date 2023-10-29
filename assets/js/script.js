/* Change Theme */
// Getting elements from html
const body = document.querySelector('body');
const toggle = document.querySelector('.toggle-switch');

// Checks if localStorage has a value, if so, replaces the body class with its value
if(localStorage.getItem('theme') !== null) body.classList.replace('theme1',  localStorage.getItem('theme'));

// Functions
function changeTheme() {
    switch (true) {
        case body.classList.contains('theme1'):
            body.classList.replace('theme1', 'theme2');
            localStorage.setItem('theme', 'theme2');
            break;
        case body.classList.contains('theme2'):
            body.classList.replace('theme2', 'theme3');
            localStorage.setItem('theme', 'theme3');
            break;
        case body.classList.contains('theme3'):
            body.classList.replace('theme3', 'theme1');
            localStorage.setItem('theme', 'theme1');
            break;
    }
}

// Performs the changeTheme function when clicking toggle switch
toggle.addEventListener("click", changeTheme);


/* Caculator Functionality */
// Getting elements from html
const screen = document.getElementById('screen');
const keypad = document.getElementById('keypad');
const previousInput = document.getElementById('previous-input');

// Regex
const numbersAndSignsRgx = /[1234567890/*\-+.]/; // Only accepts numbers and signs
const signsRgx = /[/*\-+]/; // accpets only signs
const numbersRgx = /^[0-9]+$/ // accpets only numbers


// Counters and checkers
let typeCounter = 0;
let signCounter = 0;
let nCounter = 0;
let pointCounter = 0;
let checkEnter = false;
let wasSign = false;

// Object that will contain the numbers and signs of the operation
let operation = {
    n1: '',
    sign: '',
    n2: ''
}

// Functions
// Give an empty value to screen
function default0() {
    if (screen.innerText.length === 0) {
        screen.innerText = '0';
        typeCounter = 0;
    }
}

// Empty the screen
function emptyScreen() {
    screen.innerText = ''
}

// delete the default 0 on the screen
function deleteDefault0() {
    if (typeCounter <= 1) emptyScreen();
}

// Input numbers
function inputNumber(input) {
    
    function concatOperation(input) {
        if (signCounter < 1) {
            operation.n1 = operation.n1.concat(input).replace(',', '.');
        } else {
            operation.n2 = operation.n2.concat(input);
        }
    }

    // Accpets the key input only if the key pressed is a number 
    if (numbersRgx.test(input) && screen.innerText.length < 20) {
        if (pointCounter === 1) {
            screen.append('.');
            concatOperation('.');
            pointCounter = 2;
        }
        if (checkEnter && signCounter < 1) {
            operation.n1 = '';
            previousInput.innerText = ''
            screen.innerText = ''
            checkEnter = false;
        }
        concatOperation(input)
        if (nCounter === -1) screen.innerText = '';
        screen.append(input);
        nCounter++;
        wasSign = false
    }
    if(input === '.' && pointCounter === 0 && !screen.innerText.includes('.') && screen.innerText !== '' && !wasSign) {
        pointCounter++;
    } 
}

// Input signs
function inputSign(input) {
    // Accpets the key input only if the key pressed is a sign and operation.n1 has a number
    if (signsRgx.test(input) && operation.n1 !== '') {
        if (signCounter > 0 && !wasSign) {
            screen.innerText = math.evaluate(operation.n1 + operation.sign + operation.n2);
            operation.n1 = '' + math.evaluate(operation.n1 + operation.sign + operation.n2);
        }
        operation.sign = input;
        operation.n2 = '';
        previousInput.innerText = (operation.n1 + ' ' + operation.sign.replace('*', 'x').replace('/', '÷'))
        nCounter = -1;
        signCounter++;
        wasSign = true;
        pointCounter = 0;
    }
    
}

function del(input) {
    if (input === 'Backspace' || input === 'del'.toUpperCase()) {
        // Delete 1 character
        screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1);
        if (signCounter < 1) {
            operation.n1 = operation.n1.slice(0, operation.n1.length - 1);
        } else {
            operation.n2 = operation.n2.slice(0, operation.n2.length - 1);
        }

        // Make sure the input will accept another point after deleting one
        if (!screen.innerText.includes('.')) {
            pointCounter = 0;
        }
        // Empty the previous input if the last typed key was enter
        if(checkEnter) {
            previousInput.innerText = ''
        }
    }
}

// Reset the calculator
function reset(event, input) {
    if (event.ctrlKey && input === 'Backspace' || input === 'reset'.toUpperCase()) {
        emptyScreen()
        previousInput.innerText = '';
        changeBgColor(keypad.querySelector('.keyReset'));
        typeCounter = 0;
        signCounter = 0;
        nCounter = 0;
        pointCounter = 0;
        checkEnter = false;
        wasSign = false;
        operation = {
            n1: '',
            sign: '',
            n2: ''
        }
    }
}

// Show the result on screen
function result(input) {
    if ((input === 'Enter' || input === '=') && operation.sign !== '' && operation.n1 !== '') {
        if (operation.n2 === '') operation.n2 = screen.innerText;
        previousInput.innerText = (operation.n1 + ' ' + operation.sign.replace('*', 'x').replace('/', '÷') + ' ' + operation.n2 + ' =');
        screen.innerText = math.evaluate(operation.n1 + operation.sign + operation.n2);
        operation.n1 = '' + math.evaluate(operation.n1 + operation.sign + operation.n2);
        signCounter = 0;
        checkEnter = true;
    }
}

// Change key bg color
function changeBgColor(element) {
    element.classList.add('bg-color');
    setTimeout(() => element.classList.remove('bg-color'), 100)
}

// Change key bg color when it's typed
function changeBgColorKeyboard(e) {
    for(let i = 0; i < keypad.children.length; i++) {
        if(keypad.children[i].classList.contains('key'+e.key) && !e.ctrlKey) {
            changeBgColor(keypad.children[i]);
            break;
        }
    }
}

function listener(input) {
    typeCounter += 1;
    deleteDefault0();
    inputNumber(input);
    inputSign(input.replace('x', '*'))
    del(input);
    result(input);
    default0();
    console.log(operation);
}

// Event Listeners
document.addEventListener('keydown', (e) => {
    reset(e, e.key);
    listener(e.key);
    changeBgColorKeyboard(e);
});

for(let i = 0; i < keypad.children.length; i++) {
    keypad.children[i].addEventListener('mousedown', (e) => {
        reset('', e.target.innerText);
        listener(e.target.innerText);
        changeBgColor(keypad.children[i]);
    })
}






