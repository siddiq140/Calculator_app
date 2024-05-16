let display = document.getElementById("display");

function appendValue(value) {
   if (display.innerText === "0") {
      display.innerText = value;
   } else {
      display.innerText += value;
   }
}

function clearDisplay() {
   display.innerText = "0";
}

function deleteLast() {
   if (display.innerText.length === 1) {
      display.innerText = "0";
   } else {
      display.innerText = display.innerText.slice(0, -1);
   }
}

function calculateResult() {
   try {
      let expression = display.innerText;
      let tokens = getToken(expression);
      let result = evaluateTokens(tokens);
      display.innerText = result;
   } catch (e) {
      display.innerText = "Error";
   }
}

function getToken(expression) {
   let tokens = [];
   let number = "";
   for (let char of expression) {
      if (isDigit(char) || char === ".") {
         number += char;
      } else if (isOperator(char)) {
         if (number) tokens.push(parseFloat(number));
         tokens.push(char);
         number = "";
      }
   }
   if (number) tokens.push(parseFloat(number));
   return tokens;
}

function isDigit(char) {
   return /\d/.test(char);
}

function isOperator(char) {
   return ["+", "-", "*", "/"].includes(char);
}

function evaluateTokens(tokens) {
   let operators = [];
   let values = [];

   for (let token of tokens) {
      if (typeof token === "number") {
         values.push(token);
      } else if (isOperator(token)) {
         while (
            operators.length &&
            precedence(operators[operators.length - 1]) >= precedence(token)
         ) {
            let operator = operators.pop();
            let b = values.pop();
            let a = values.pop();
            values.push(applyOperator(a, b, operator));
         }
         operators.push(token);
      }
   }

   while (operators.length) {
      let operator = operators.pop();
      let b = values.pop();
      let a = values.pop();
      values.push(applyOperator(a, b, operator));
   }

   return values[0];
}

function precedence(operator) {
   switch (operator) {
      case "+":
      case "-":
         return 1;
      case "*":
      case "/":
         return 2;
      default:
         return 0;
   }
}

function applyOperator(a, b, operator) {
   switch (operator) {
      case "+":
         return a + b;
      case "-":
         return a - b;
      case "*":
         return a * b;
      case "/":
         return a / b;
   }
}