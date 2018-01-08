/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use-strict';

var _calculate = __webpack_require__(1);

var buttons = document.getElementById("buttons");
var output = document.getElementById("operations");
var equals = document.getElementById("operate");
var stack = [];
var outputString = "";
var operator = true;
var specOp = false;

// Event Listeners
buttons.addEventListener("click", addToStack);

function addToStack(e) {
    if (e.target.nodeName === "BUTTON") {
        var list = e.target.classList;
        var total = void 0;
        var text = e.target.textContent;
        // If equals button pressed, push string into stack, and calculate
        if (e.target.id === "operate") {
            stack.push(outputString);
            total = (0, _calculate.calculate)(stack);
            stack = [];
            outputString = total.toString();
            output.textContent = total;
            operator = false;
            console.log(total, outputString);
            return;
        }
        // Prevent operators from being pushed into stack first
        if (list.contains("operator")) {
            if (!stack.length && !outputString.length || operator) {
                return;
            }
            // Keep track of special operators like '+-', or sqrt
            list.contains("spec-op") ? specOp = true : specOp = false;
            if (list.contains("spec-op")) {
                specOp = true;
            } else {
                specOp = false;
                operator = true;
            }
            stack.push(outputString);
            stack.push(text);
            outputString = "";
        } else {
            // Prevent numbers from being added after special operators
            if (specOp) {
                return;
            }
            if (text === "." && outputString.indexOf(text) !== -1) {
                return;
            }
            outputString += text;
            operator = false;
        }
    }
}

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
function calculate(stack) {
    var result = 0;
    var amount = 3;
    if (stack.length === 1) {
        return stack[0];
    }
    for (var i = 0; i < stack.length; i++) {
        if (!isNaN(Number(stack[i]))) {
            result += Number(stack[i]);
        } else {
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
                    amount = 2;
                    break;
                case "1/x":
                    result = 1 / result;
                    amount = 2;
                    break;
                case "+-":
                    result = 0 - result;
                    amount = 2;
                    break;
                case "^":
                    result = Math.pow(result, stack[i + 1]);
            }
            stack.splice(0, 3, result);
            return calculate(stack);
        }
    }
}

exports.calculate = calculate;

/***/ })
/******/ ]);