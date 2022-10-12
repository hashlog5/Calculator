import { Calculator } from './Calculator.js';
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

/*
//* parseFloat tests //
function parseFloatTests() {
	const numberStr = ['0.0', '0.', '.0', '-.0', '⁻.0', '5.8', '-5.8', '⁻5.8'];

	const strVal = numberStr[7];
	const parsedVal = parseFloat(strVal.replaceNegSign());
	console.log(`----------------`);
	console.log(`'${strVal}' isNumber: ${strVal.isNumber()}\n`);
	console.log(`parseFloat('${strVal}'): ${parsedVal}\n`);
	console.log(`parsedValue type: ${typeof parsedVal}\n`);
	console.log(`parsedValue = 0: ${strVal.isZero()}`);
	console.log(`----------------`);
}
// parseFloatTests();

//* regex tests //
function regexTests() {
	const expressions = [
		'⁻16^2',
		'(⁻16)^2',
		'2^2^3',
		'2^3^2',
		'√√16',
		'√√16^3^2',
		'√√80.5﹣2.4×7÷3﹢9÷2.4×6﹣5.3√√16^3^2',
		'⁻√9.4﹣⁻(3﹣⁻0.5)(2.7﹢⁻8.2)√4﹣2(⁻3)5.2√9﹣⁻5.4^2﹣(⁻5.4)^2',
		'((7﹣9.4)^2√√(⁻3.02﹢82.5÷⁻14.39)^2^3﹣7√3(5﹣9(6﹣7))^2÷64)',
	];
	// const mathExpr = expressions[6];

	const mathExpr = expressions[6].concat(
		'﹣',
		expressions[7],
		'﹢',
		expressions[8]
	);

	console.log(`--------------`);
	console.log(`balanced expr:  ${mathExpr.isBalanced()}\n\n`);
	console.log(`original expr:  ${mathExpr}\n\n`);
	console.log(`implicit mult:  ${mathExpr.getInfix().join('')}\n\n`);
	console.log(`converted rpn:  ${mathExpr.getPostfix()}\n\n`);

	console.log('Last Token:', mathExpr.getLastToken(), '\n\n');
	console.log('All Tokens:', mathExpr.getTokens(), '\n\n');
	console.log('Operator Tokens:', mathExpr.getOperatorTokens(), '\n\n');
	console.log('Number Tokens:', mathExpr.getNumberTokens());
	console.log(`--------------`);

	new Calculator(inputDisplay, answerDisplay).evalInputExpr(mathExpr);
	inputDisplay.textContent = mathExpr;
	//https://www.desmos.com/calculator/kra8qa6meq
}
regexTests();
*/
