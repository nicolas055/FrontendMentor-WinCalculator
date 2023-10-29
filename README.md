# Frontend Mentor - Calculator app solution

This is a solution to the [Calculator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/calculator-app-9lteq5N29). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- See the size of the elements adjust based on their device's screen size
- Perform mathmatical operations like addition, subtraction, multiplication, and division
- Adjust the color theme based on their preference
- **Bonus**: Have their initial theme preference checked using `prefers-color-scheme` and have any additional changes saved in the browser

### Screenshot

![Screenshot](/screenshot/screenshot.png)

### Links

- Solution URL [Go to solution](https://www.frontendmentor.io/solutions/calculator-using-mathjs-library-5pedWKoNIc)
- Live Site URL: [Go to live site](https://frontend-mentor-win-calculator.vercel.app/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- CSS variables
- Basic JS
- JS method eval

### What I learned

I learned a couple of things in js...

I learned about regex:
```js
const numbersAndSignsRgx = /[1234567890/*\-+.]/; // Only accepts numbers and signs
const signsRgx = /[/*\-+]/; // accpets only signs
const numbersRgx = /^[0-9]+$/ // accpets only numbers
```

How to use localStorage:
```js
if(localStorage.getItem('theme') !== null) body.classList.replace('theme1',  localStorage.getItem('theme'));

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
```

how to use setTimeout:
```js
function changeBgClr(item, time) {
    item.classList.add('bg-color');
    setTimeout( () => item.classList.remove('bg-color'), time);
}
```

how to use windows.matchMedia and prefers-color-scheme:
```js
else if(window.matchMedia("(prefers-color-scheme: dark)")) body.classList.replace('theme1', 'theme3');
```

### Useful resources

- [devdocs](https://devdocs.io/) - This is a very good api with concepts of a lot of languages. It helped understand a lot of js concepts.
- [ChatGPT](https://chat.openai.com/) - It help me build regex and understand how to use it.


## Author

- Github - [@nicolas055](https://github.com/nicolas055)
- Frontend Mentor - [@nicolas055](https://www.frontendmentor.io/profile/nicolas055)
- Instagram - [@nicolas_leite2](https://www.instagram.com/nicolas_leite2/)

