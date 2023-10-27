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


// Counters
let typeCounter = 0;
let signCounter = 0;
let nCounter = 0;
let pointCounter = 0;
let checkEnter = false;
let wasSign = false;
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
function inputNumber(e) {
    
    function concatOperation(e) {
        if (signCounter < 1) {
            operation.n1 = operation.n1.concat(e.key).replace(',', '.');
        } else {
            operation.n2 = operation.n2.concat(e.key);
        }
    }

    // Accpets the key input only if the key pressed is a number 
    if (numbersRgx.test(e.key)) {
        if (checkEnter && signCounter < 1) {
            operation.n1 = '';
            screen.innerText = ''
            checkEnter = false
        }
        concatOperation(e)
        if (nCounter === -1) screen.innerText = '';
        screen.append(e.key);
        nCounter++;
        wasSign = false
    }
    if((e.key === '.' || e.key === ',') && pointCounter < 1 && !screen.innerText.includes('.')) {
        screen.append(e.key)
        pointCounter++;
        concatOperation(e)
    } 
}

// Input signs
function inputSign(e) {
    // Accpets the key input only if the key pressed is a sign and operation.n1 has a number
    if (signsRgx.test(e.key) && operation.n1 !== '') {
        if (signCounter > 0 && !wasSign) {
            screen.innerText = math.evaluate(operation.n1 + operation.sign + operation.n2);
            operation.n1 = '' + math.evaluate(operation.n1 + operation.sign + operation.n2);
        }
        operation.sign = e.key;
        operation.n2 = '';
        previousInput.innerText = (operation.n1 + ' ' + operation.sign.replace('*', 'x').replace('/', '÷'))
        nCounter = -1;
        signCounter++;
        wasSign = true;
        pointCounter = 0;
    }
    
}


function del(e) {
    if (e.key === 'Backspace') {
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
    }
}

// Empty the screen when ctrl + Backspace is pressed
function reset(e) {
    if (e.ctrlKey && e.key === 'Backspace') {
        emptyScreen()
    }
}

// Show the result on screen
function result(e) {
    if (e.key === 'Enter') {
        screen.innerText = math.evaluate(operation.n1 + operation.sign + operation.n2);
        operation.n1 = '' + math.evaluate(operation.n1 + operation.sign + operation.n2);
        signCounter = 0;
        previousInput.append(' ' + operation.n2 + ' =')
        checkEnter = true;
    }
}

document.addEventListener('keydown', (e) => {
    typeCounter += 1;
    deleteDefault0();
    inputNumber(e);
    inputSign(e)
    del(e);
    reset(e);
    result(e);
    default0();
    console.log(operation)
});