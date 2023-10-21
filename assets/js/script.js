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
const screen = document.querySelector('.screen');
const keypad = document.querySelector('.keypad');
const errorMsg = document.querySelector('#error');

// Regex
const calculatorRgx = /^(?:[0-9./*x+\-]+|)$/; // accepts numbers and signs
const numberRgx = /^\d+$/; // Accepts only numbers
const signsRgx = /(?<=[0-9])([-+*/])(?=[0-9])/; // Accpets signs only if they are between numbers
const consecutivesSignsRgx = /[+\/x-]{2}|[.]{2}/; // Accpets consecutive signs and dots
const twoDotsRgx = /^(?=.*\..*\.).+$/ // Accpets 2 consecutive dots

// Functions
// Change a element bg color for a determined amount of time
function changeBgClr(item, time) {
    item.classList.add('bg-color');
    setTimeout( () => item.classList.remove('bg-color'), time);
}

let check = 0; // variable that checks whether the result or enter button was pressed
function input(e) {
    screen.focus()
    // Hide errorMsg
    errorMsg.style.display = 'none';
    // Empty the screen if a number is typed after the last result
    if(check === 1 && (numberRgx.test(e.key) || numberRgx.test(e.target.innerText))) {
        screen.value = ''
    }
    // Change the key bg color when it's typed
    for (let i = 0; i < keypad.children.length; i++) {
        if(keypad.children[i].innerText === e.key) {
            changeBgClr(keypad.children[i], 100)
        }
    }
    // Mouse input number
    if (calculatorRgx.test(e.target.innerText) || e.target.innerText === 'x') {
        screen.value = screen.value.concat(e.target.innerText);
        // Change the key bg color when it's clicked
        if(e.target.getAttribute('class').includes('key ')) {
            changeBgClr(e.target, 100)
        }
    }
    // Delete
    if (e.target.innerText.toLowerCase() === 'del') {
        screen.value = screen.value.slice(0, -1);
    }
    // Reset
    if ((e.ctrlKey && e.key === 'Backspace') || e.target.innerText.toLowerCase() === 'reset') {
        screen.value = ''
    }
    // Result
    check = 0 // Reset the check variable
    if (e.key === 'Enter' || e.target.innerText.toLowerCase() === '=') {
        let result = screen.value.replace('x', '*'); // Replace the x with a * to make evail work fine
        console.log(result)
        if ((signsRgx.test(result)) && (!consecutivesSignsRgx.test(result)) && (!twoDotsRgx.test(result))) {
            screen.value = eval(result); // Display result
        } else {
            errorMsg.style.display = 'block'; // Display error message
        }
        check = 1
    }
    // Replace the * with a x on the screen
    setTimeout(() => screen.value =  screen.value.replace('*', 'x'), 1)
}


// Event Listeners
document.addEventListener("keydown", input) // Performs the input function when typing something on the screen
keypad.addEventListener("click", input) // Performs the input function when clicking an item on the keypad

// Change the key background on mousepress
keypad.addEventListener("mousedown", (e) => {
    if (e.target.getAttribute('class').includes('key ')) {
        e.target.classList.add('bg-color');
    }
})
keypad.addEventListener("mouseup", (e) => {
    if(e.target.getAttribute('class').includes('key ')) {
        e.target.classList.remove('bg-color');
    }
})