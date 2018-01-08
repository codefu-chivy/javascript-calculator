function calculate(stack) {
    let result = 0;
    let amount = 3;
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
                    amount = 2;
                    break;
                case "1/x":
                    result = (1 / result);
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

export {calculate};