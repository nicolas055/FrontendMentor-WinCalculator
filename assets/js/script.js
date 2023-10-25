
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

// Regex
const numbersAndSignsRgx = /[1234567890/*\-+.]/; // Only accepts numbers and signs
const signsRgx = /[/*\-+]/; // accpets only signs

// Counters
let typeCounter = 0;

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

// Input numbers and signs
function input(e) {
    // Accpets the key input only if the key pressed is numbers or signs
    if (numbersAndSignsRgx.test(e.key)) {
        screen.append(e.key);
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
        screen.innerText = math.evaluate(screen.innerText);
    }
}

document.addEventListener('keydown', (e) => {
    typeCounter += 1;
    deleteDefault0();
    input(e);
    del(e);
    reset(e);
    result(e);
    default0();
});