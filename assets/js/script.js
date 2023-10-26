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
    // Accpets the key input only if the key pressed is a number 
    if (numbersRgx.test(e.key) && signCounter < 1) {
        operation.n1 = operation.n1.concat(e.key);
        screen.append(e.key);
    }
    if (numbersRgx.test(e.key) && signCounter >= 1) {
        operation.n2 = operation.n2.concat(e.key);
    }
}

// Input signs
function inputSign(e) {
    // Accpets the key input only if the key pressed is a sign
    if (signsRgx.test(e.key)) {
        operation.sign = e.key;
        signCounter += 1;
        operation.n2 = '';
    }
}

// Delete 1 character
function del(e) {
    if (e.key === 'Backspace') {
        screen.innerText = screen.innerText.slice(0, screen.innerText.length - 1)
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