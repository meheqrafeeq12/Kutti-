let display = document.getElementById('display');
let calculator = document.getElementById('calculator');
let darkMode = false;
let currentExpression = '';

function appendToDisplay(value) {
    if (isOperator(value)) {
        currentExpression += value; // Build the expression for calculation
        display.value = ''; // Clear display for the next operand
    } else {
        display.value += value;
        currentExpression += value;
    }
}

function calculateResult() {
    try {
        let result = evaluateExpression(currentExpression);
        display.value = result;
        currentExpression = result.toString();
    } catch (error) {
        display.value = 'Error';
    }
}

function clearDisplay() {
    display.value = '';
    currentExpression = '';
}

function backspace() {
    display.value = display.value.slice(0, -1);
    currentExpression = currentExpression.slice(0, -1);
}

function toggleDarkMode() {
    darkMode = !darkMode;
    calculator.classList.toggle('dark-mode', darkMode);
    document.body.classList.toggle('dark-mode', darkMode);
}

function isOperator(value) {
    return ['+', '-', '*', '/'].includes(value);
}

function evaluateExpression(expression) {
    // Use regular expression to split expression into operands and operators
    let tokens = expression.match(/\d+|\+|\-|\*|\//g);

    if (!tokens) {
        throw new Error('Invalid expression');
    }

    // Initialize with the first operand
    let result = parseFloat(tokens[0]);

    for (let i = 1; i < tokens.length; i += 2) {
        let operator = tokens[i];
        let operand = parseFloat(tokens[i + 1]);

        switch (operator) {
            case '+':
                result += operand;
                break;
            case '-':
                result -= operand;
                break;
            case '*':
                result *= operand;
                break;
            case '/':
                if (operand !== 0) {
                    result /= operand;
                } else {
                    throw new Error('Cannot divide by zero');
                }
                break;
            default:
                throw new Error('Invalid operator');
        }
    }

    return result;
}