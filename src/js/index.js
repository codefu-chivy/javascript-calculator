'use-strict'

const buttons = document.getElementById("buttons");
const output = document.getElementById("input");
const equals = document.getElementById("operate");
let stack = [];
let outputString = "";
let operator = true;

// Event Listeners
buttons.addEventListener("click", addToStack);

function addToStack(e) {
    if (e.target.nodeName === "BUTTON") {
        if (e.target.id === "operate") {
            stack.push(outputString);
            total = calculate(stack);
            console.log(total);
            return;
        }
        if (e.target.classList.contains("operator")) {
            if (!stack.length && !outputString.length || operator) {
                return;
            }
            stack.push(outputString);
            stack.push(e.target.textContent);
            outputString = "";
            operator = true;
        }
        else {
            outputString += e.target.textContent;
            operator = false;
        }
    }
}

function calculate(stack) {
    let result = 0;
    if (stack.length === 1) {
        return stack[0];
    }
    for (let i = 0; i < stack.length; i++) {
        if (!isNaN(Number(stack[i]))) {
            result += Number(stack[i]);
        } 
        else {
            switch (stack[i]) {
                case "+":
                    result += Number(stack[i + 1]);
                    break;
                case "-":
                    result -= Number(stack[i + 1]);
                    break;
                case "*":
                    result *= Number(stack[i + 1]);
                    break;
                case "/":
                    result /= Number(stack[i + 1]);
                    break;
                case "√":
                    result = Math.sqrt(result);
                    break;
                case "+-":
                    result = 0 - result;
                    break;
            }
            stack.splice(0, 3, result);
             return calculate(stack);
        }
    }
}
