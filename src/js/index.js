'use-strict'

import {calculate, specOpCalculate} from "./calculate";

const buttons = document.getElementById("buttons");
const output = document.getElementById("operations");
const equals = document.getElementById("operate");
const clearCurrent = document.getElementById("cc");
const clearAll = document.getElementById("ca");
const back = document.getElementById("del");
const op = document.getElementById("op");
let stack, outputString, operator, specOp, calcValue;
initialize();

// Event Listeners
buttons.addEventListener("click", addToStack);
clearCurrent.addEventListener("click", () => {
    outputString = "";
    output.textContent = "0";
});
clearAll.addEventListener("click", () => {
    initialize();
    output.textContent = "0";
    op.textContent = "";
});
back.addEventListener("click", () => {
    if (calcValue) {
        return;
    }
    if (outputString.length > 1) {
        outputString = outputString.slice(0, outputString.length - 1);
        output.textContent = outputString;
    }
    else {
        outputString = "";
        output.textContent = "0";
    }
})

function addToStack(e) {
    if (e.target.nodeName === "BUTTON" && !e.target.classList.contains("function")) {
        let list = e.target.classList;
        let total;
        let text = e.target.textContent;
        // If equals button pressed, push string into stack, and calculate
        if (e.target.id === "operate") {
            stack.push(outputString);
            op.textContent = stack.join(" ");
            total = calculate(stack);
            output.textContent = total;
            outputString = total.toString();
            calcValue = true;
            stack = [];
            operator = false;
            return;
        }
        if (list.contains("operator")) {
            // Prevent operators from being pushed into stack first
            if ((!stack.length && !outputString.length) || operator) {
                return;
            }
            // Keep track of special operators like '+-', or sqrt
            if (list.contains("spec-op")) {
                specOp = true;
                outputString = specOpCalculate(Number(outputString), text);
                output.textContent = outputString;
            }
            else {
                specOp = false;
                operator = true;
                stack.push(outputString);
                stack.push(text);
            }
            op.textContent = stack.join(" ");
        }
        else {
            if (operator || calcValue || specOp) {
                outputString = "";
                calcValue = false;
            }
            if ((text === "." && outputString.indexOf(text) !== -1) && !calcValue) {
                return;
            }
            outputString += text;
            output.textContent = outputString;
            operator = false;
        }
    }
}

function initialize() {
    stack = [];
    outputString = "";
    operator = true;
    specOp = false;
    calcValue = false;
}


