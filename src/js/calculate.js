function calculate(stack) {
    let result = 0;
    if (stack.length === 1) {
        return trim(stack[0]);
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
                case "^":
                    result = Math.pow(result, stack[i + 1]);
            }
            stack.splice(0, 3, result);
            return calculate(stack);
        }
    }
}

function specOpCalculate(num, op) {
    let val;
    switch (op) {
        case "√":
            val =  Math.sqrt(num);
            break;
        case "1/x":
            val = 1 / num;
            break;
        case "+-":
            val = 0 - num;
            break;
    }
    return val.toString();
}

function trim(num) {
    let numStr = num.toString();
    if (numStr.indexOf("e") !== -1) {
        let e = numStr.indexOf("e");
        return Number(`${numStr.slice(0, 7)}${numStr.slice(e)}`);
    }
    return num;
}


export {calculate, specOpCalculate};