// import Calculator from './Calculator.js'; /* tests */
// import * as stringMethods from './StringMethods.js'; /* tests */

//! parseFloat tests
export function parseFloatTests() {
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

//! regex tests
export function regexTests() {
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

  const inputDisplay = document.getElementById('input-display');
  const answerDisplay = document.getElementById('answer-display');
  new Calculator(inputDisplay, answerDisplay).evalInputExpr(mathExpr);
  inputDisplay.textContent = mathExpr;

  //https://www.desmos.com/calculator/kra8qa6meq
}
