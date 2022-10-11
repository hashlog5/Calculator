String.prototype.getLastToken = function () {
  return this.getTokens()?.slice(-1)[0];
};

String.prototype.getTokens = function () {
  const inputExprRegex =
    /(\﹢|﹣|\×|\÷|\^|√|\(|\)|\⁻(?![\d\.]+))|([\d\.]+|\⁻(?=[\d\.]+)[\d.]+)/g;

  return this.match(inputExprRegex);
};

String.prototype.getOperatorTokens = function () {
  const operatorRegex = /\﹢|﹣|\×|\÷|\^|√|\(|\)|\⁻(?![\d\.]+)/g;

  return this.match(operatorRegex);
};

String.prototype.getNumberTokens = function () {
  const numberRegex = /[\d\.]+|\⁻(?=[\d\.]+)[\d.]+/g;

  return this.match(numberRegex);
};

String.prototype.isBalanced = function () {
  const leftBracket = { '(': ')' };
  const rightBracket = { ')': true };

  const brackets = [];
  let char;

  for (let i = 0; i < this.length; i++) {
    char = this[i];

    if (leftBracket[char]) {
      brackets.push(char);
    } else if (rightBracket[char] && leftBracket[brackets.pop()] !== char) {
      return false;
    }
  }

  return brackets.length === 0;
};

String.prototype.isComplete = function () {
  const lastInput = this.slice(-1);

  if (
    lastInput.isOperation() ||
    lastInput.isNegSign() ||
    lastInput.isLeftBracket()
  ) {
    return false;
  } else {
    return true;
  }
};

String.prototype.isNumber = function () {
  return (
    !isNaN(parseFloat(this.replaceNegSign())) && isFinite(this.replaceNegSign())
  );
};

String.prototype.isNegNumber = function () {
  return this.isNumber() && parseFloat(this.replaceNegSign()) < 0;
};

String.prototype.isZero = function () {
  return parseFloat(this.replaceNegSign()) === 0;
};

String.prototype.isOperator = function () {
  const operators = '()^√÷×﹣﹢';
  return this.length === 1 && operators.includes(this);
};

String.prototype.isOperation = function () {
  const operations = '^√÷×﹣﹢';
  return this.length === 1 && operations.includes(this);
};

String.prototype.isPower = function () {
  return this === '^';
};

String.prototype.isSqrt = function () {
  return this === '√';
};

String.prototype.isLeftBracket = function () {
  return this === '(';
};

String.prototype.isRightBracket = function () {
  return this === ')';
};

String.prototype.isDot = function () {
  return this === '.';
};

String.prototype.isNegSign = function () {
  return this === '⁻';
};

String.prototype.replaceNegSign = function () {
  const minusSign = '-';

  if (this.charAt(0).isNegSign()) {
    return minusSign.concat(this.slice(1));
  } else {
    return this;
  }
};

String.prototype.precedence = function () {
  switch (this) {
    case '^':
    case '√':
      return 5;

    case '÷':
    case '×':
      return 3;

    case '﹣':
    case '﹢':
      return 1;
  }
};

String.prototype.associativity = function () {
  switch (this) {
    case '^':
    case '√':
      return 'right';

    case '÷':
    case '×':
    case '﹣':
    case '﹢':
      return 'left';
  }
};

String.prototype.getInfix = function () {
  if (this.length === 0) return [];

  const infix = this.getTokens();
  const negativeOne = '⁻1';
  const implicitMult = '×';
  let token;
  let nextToken;

  //* Append Implicit Multiplication //
  for (let i = 0; i < infix.length - 1; i++) {
    token = infix[i];
    nextToken = infix[i + 1];

    if (
      token.isNegSign() &&
      (nextToken.isLeftBracket() || nextToken.isSqrt())
    ) {
      infix[i] = negativeOne;
      infix.splice(i + 1, 0, implicitMult);
      i++;
    } else if (
      token.isRightBracket() &&
      (nextToken.isLeftBracket() || nextToken.isSqrt() || nextToken.isNumber())
    ) {
      infix.splice(i + 1, 0, implicitMult);
      i++;
    } else if (
      token.isNumber() &&
      (nextToken.isLeftBracket() || nextToken.isSqrt())
    ) {
      infix.splice(i + 1, 0, implicitMult);
      i++;
    } else if (token.isNegNumber() && nextToken.isPower()) {
      infix[i] = token.slice(1);
      infix.splice(i, 0, negativeOne, implicitMult);
      i += 2;
    }
  }

  return infix;
};

String.prototype.getPostfix = function () {
  const infix = this.getInfix();
  const operators = [];
  const postfix = [];

  let token;
  let lastOperator;

  for (let i = 0; i < infix.length; i++) {
    token = infix[i].replaceNegSign();
    lastOperator = operators[operators.length - 1];

    if (token.isNumber()) {
      postfix.push(token);
    } else if (token.isOperation()) {
      while (
        operators.length > 0 &&
        lastOperator.isOperation() &&
        ((token.associativity() === 'left' &&
          token.precedence() <= lastOperator.precedence()) ||
          (token.associativity() === 'right' &&
            token.precedence() < lastOperator.precedence()))
      ) {
        postfix.push(operators.pop());
        lastOperator = operators[operators.length - 1];
      }
      operators.push(token);
    } else if (token.isLeftBracket()) {
      operators.push(token);
    } else if (token.isRightBracket()) {
      while (operators.length > 0 && !lastOperator.isLeftBracket()) {
        postfix.push(operators.pop());
        lastOperator = operators[operators.length - 1];
      }
      operators.pop();
    }
  }

  while (operators.length > 0) {
    postfix.push(operators.pop());
  }

  return postfix;
};
