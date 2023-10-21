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

**Note: Delete this note and update the table of contents based on what sections you keep.**

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

- Solution URL [Go to solution](https://www.frontendmentor.io/solutions/calculator-using-eval-method-KlA2DZt4Jl)
- Live Site URL: [Go to live site](https://frontend-mentor-calculator-liard.vercel.app/)

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

I learned about regex
```js
const calculatorRgx = /^(?:[0-9./*x+\-]+|)$/; // accepts numbers and signs
const numberRgx = /^\d+$/; // Accepts only numbers
const signsRgx = /(?<=[0-9])([-+*/])(?=[0-9])/; // Accpets signs only if they are between numbers
const consecutivesSignsRgx = /[+\/x-]{2}|[.]{2}/; // Accpets consecutive signs and dots
const twoDotsRgx = /^(?=.*\..*\.).+$/ // Accpets 2 consecutive dots
```

How to use eval
```js
screen.value = eval(result); // Display result
```

And how to use setTimeout
```js
function changeBgClr(item, time) {
    item.classList.add('bg-color');
    setTimeout( () => item.classList.remove('bg-color'), time);
}
```

### Useful resources

- [devdocs](https://devdocs.io/) - This is a very good api with concepts of a lot of languages. It helped understand a lot of js concepts.
- [ChatGPT](https://chat.openai.com/) - It help me build regex and understand how to use it.


## Author

- Github - [@nicolas055](https://github.com/nicolas055)
- Frontend Mentor - [@nicolas055](https://www.frontendmentor.io/profile/nicolas055)
- Instagram - [@nicolas_leite2](https://www.instagram.com/nicolas_leite2/)

