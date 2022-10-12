// import { parseFloatTests, regexTests } from './Tests.js'; /* tests */
// parseFloatTests(); /* tests */
// regexTests(); /* tests */

import Calculator from './Calculator.js';
import { digitKeys, operationKeys } from './Buttons.js';
import * as stringMethods from './StringMethods.js';

const digitBtns = document.querySelectorAll('.digit');
const operationBtns = document.querySelectorAll('.operation');
const leftBracketBtn = document.querySelector('.left-bracket');
const rightBracketBtn = document.querySelector('.right-bracket');
const signBtn = document.querySelector('.sign');
const dotBtn = document.querySelector('.dot');

const deleteCharBtn = document.querySelector('.delete-char');
const clearAllBtn = document.querySelector('.clear-all');
const equalsBtn = document.querySelector('.equals');

const leftBracket = leftBracketBtn.getAttribute('data-type');
const rightBracket = rightBracketBtn.getAttribute('data-type');
const dot = dotBtn.getAttribute('data-type');
const negSign = signBtn.getAttribute('data-type');

const inputDisplay = document.getElementById('input-display');
const answerDisplay = document.getElementById('answer-display');

const calculator = new Calculator(inputDisplay, answerDisplay);
const leftScrollValue = 999999999999;

digitBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendDigit(
      inputDisplay.textContent.getLastToken(),
      btn.textContent
    );

    inputDisplay.scrollLeft = leftScrollValue;
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    calculator.appendOperation(
      inputDisplay.textContent,
      inputDisplay.textContent.slice(-1),
      btn.getAttribute('data-type')
    );

    inputDisplay.scrollLeft = leftScrollValue;
  });
});

leftBracketBtn.addEventListener('click', () => {
  calculator.appendLeftBracket(
    inputDisplay.textContent,
    inputDisplay.textContent.slice(-1),
    leftBracket
  );

  inputDisplay.scrollLeft = leftScrollValue;
});

rightBracketBtn.addEventListener('click', () => {
  calculator.appendRightBracket(
    inputDisplay.textContent,
    inputDisplay.textContent.slice(-1),
    rightBracket
  );

  inputDisplay.scrollLeft = leftScrollValue;
});

signBtn.addEventListener('click', () => {
  calculator.appendSign(
    inputDisplay.textContent,
    inputDisplay.textContent.getLastToken(),
    negSign
  );

  inputDisplay.scrollLeft = leftScrollValue;
});

dotBtn.addEventListener('click', () => {
  calculator.appendDot(
    inputDisplay.textContent,
    inputDisplay.textContent.slice(-1),
    inputDisplay.textContent.getLastToken(),
    dot
  );

  inputDisplay.scrollLeft = leftScrollValue;
});

deleteCharBtn.addEventListener('click', () => {
  calculator.deleteChar(inputDisplay.textContent);

  inputDisplay.scrollLeft = leftScrollValue;
});

clearAllBtn.addEventListener('click', () => {
  calculator.clearAll();
});

equalsBtn.addEventListener('click', () => {
  calculator.evalInputExpr(inputDisplay.textContent);

  inputDisplay.scrollLeft = leftScrollValue;
});

document.addEventListener('keydown', (e) => {
  if (!isNaN(e.key)) {
    digitBtns[digitKeys[e.key]].click();
  } else if (e.key in operationKeys) {
    operationBtns[operationKeys[e.key]].click();
  } else {
    switch (e.key) {
      case '(':
      case '[':
      case '{':
        leftBracketBtn.click();
        break;

      case ')':
      case ']':
      case '}':
        rightBracketBtn.click();
        break;

      case 'n':
      case 'N':
        signBtn.click();
        break;

      case '.':
        dotBtn.click();
        break;

      case 'Backspace':
      case 'Delete':
        deleteCharBtn.click();
        break;

      case 'c':
      case 'C':
        clearAllBtn.click();
        break;

      case '=':
      case 'Enter':
        equalsBtn.click();
        break;
    }
  }
});
