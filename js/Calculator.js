export default class Calculator {
  constructor(inputDisplay, answerDisplay) {
    this.inputDisplay = inputDisplay;
    this.answerDisplay = answerDisplay;
  }

  appendDigit(lastToken, digit) {
    if (lastToken === '0' || lastToken === '⁻0') {
      return;
    } else {
      this.inputDisplay.textContent += digit;
    }
  }

  appendOperation(inputExpr, lastInput, operation) {
    if (
      (inputExpr === '' ||
        lastInput.isOperation() ||
        lastInput.isNegSign() ||
        lastInput.isLeftBracket()) &&
      !operation.isSqrt()
    ) {
      return;
    }

    if (lastInput.isDot()) {
      this.inputDisplay.textContent = inputExpr.slice(0, -1).concat(operation);
    } else {
      this.inputDisplay.textContent += operation;
    }
  }

  appendLeftBracket(inputExpr, lastInput, leftBracket) {
    if (lastInput.isDot()) {
      this.inputDisplay.textContent = inputExpr
        .slice(0, -1)
        .concat(leftBracket);
    } else {
      this.inputDisplay.textContent += leftBracket;
    }
  }

  appendRightBracket(inputExpr, lastInput, rightBracket) {
    if (
      lastInput.isOperation() ||
      lastInput.isNegSign() ||
      lastInput.isLeftBracket() ||
      (inputExpr.isBalanced() && !inputExpr.concat(rightBracket).isBalanced())
    ) {
      return;
    }

    if (lastInput.isDot()) {
      this.inputDisplay.textContent = inputExpr
        .slice(0, -1)
        .concat(rightBracket);
    } else {
      this.inputDisplay.textContent += rightBracket;
    }
  }

  appendSign(inputExpr, lastToken, negSign) {
    if (inputExpr === '' || lastToken.isOperator()) {
      this.inputDisplay.textContent += negSign;
    } else if (lastToken.includes(negSign)) {
      this.inputDisplay.textContent = inputExpr
        .slice(0, -lastToken.length)
        .concat(lastToken.slice(1));
    } else {
      this.inputDisplay.textContent = inputExpr
        .slice(0, -lastToken.length)
        .concat(negSign, lastToken);
    }
  }

  appendDot(inputExpr, lastInput, lastToken, dot) {
    if (inputExpr === '' || lastInput.isOperator() || lastInput.isNegSign()) {
      this.inputDisplay.textContent += `0${dot}`;
    } else if (!lastToken.includes(dot)) {
      this.inputDisplay.textContent += dot;
    }
  }

  deleteChar(inputExpr) {
    this.inputDisplay.textContent = inputExpr.slice(0, -1);
  }

  clearAll() {
    this.inputDisplay.textContent = '';
    this.answerDisplay.textContent = '';
  }

  evalInputExpr(inputExpr) {
    if (inputExpr === '') {
      return;
    } else if (!inputExpr.isComplete()) {
      this.answerDisplay.textContent = 'Incomplete';
    } else {
      const rpn = inputExpr.getPostfix();
      const values = [];

      let token;
      for (let i = 0; i < rpn.length; i++) {
        token = rpn[i];

        if (token.isOperation()) {
          values.push(this.compute(values, token));
        } else if (token.isNumber()) {
          values.push(parseFloat(token));
        }
      }

      this.updateAnswerDisplay(values.pop());
    }
  }

  compute(values, operation) {
    if (operation.isSqrt()) {
      return Math.sqrt(values.pop());
    } else {
      const a = values.pop();
      const b = values.pop();

      switch (operation) {
        case '^':
          return b ** a;

        case '÷':
          return b / a;

        case '×':
          return b * a;

        case '﹣':
          return b - a;

        case '﹢':
          return b + a;
      }
    }
  }

  updateAnswerDisplay(answer) {
    if (!isFinite(answer)) {
      this.answerDisplay.textContent = 'Undefined';
    } else if (answer % 1 === 0) {
      this.answerDisplay.textContent = answer;
    } else {
      answer = parseFloat(answer.toFixed(9));
      this.answerDisplay.textContent = answer;
    }
  }
}
