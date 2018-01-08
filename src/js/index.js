'use-strict'

import {calculate, specOpCalculate} from "./calculate";

const buttons = document.getElementById("buttons");
const output = document.getElementById("operations");
const equals = document.getElementById("operate");
let stack = [];
let outputString = "";
let operator = true;
let specOp = false;
let calcValue = false;

// Event Listeners
buttons.addEventListener("click", addToStack);

function addToStack(e) {
    if (e.target.nodeName === "BUTTON") {
        let list = e.target.classList;
        let total;
        let text = e.target.textContent;
        // If equals button pressed, push string into stack, and calculate
        if (e.target.id === "operate") {
            stack.push(outputString);
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
        }
        else {
            if (specOp || (text === "." && outputString.indexOf(text) !== -1) && !calcValue) {
                return;
            }
            if (operator || calcValue) {
                outputString = "";
                calcValue = false;
            }
            outputString += text;
            output.textContent = outputString;
            operator = false;
        }
    }
}


