let currentInput = ''; // 当前输入的数字
let previousInput = ''; // 上一个输入的数字
let operator = ''; // 当前操作符
let isError = false;  // 错误标志

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    isError = false;
    document.getElementById('display').textContent = '0';
    document.getElementById('error').textContent = '';
}

function toggleSign() {
    if (currentInput === '') {
        return;
    }
    if (currentInput.startsWith('-')) {
        currentInput = currentInput.substring(1);
    } else {
        currentInput = '-' + currentInput;
    }
    document.getElementById('display').textContent = currentInput;
}

function appendToDisplay(value) {
    if (isError) return; // 如果是错误状态，不能继续输入

    if (currentInput === '0' && value !== '.') {
        currentInput = value;
    } else {
        currentInput += value;
    }

    // 防止输入多个小数点
    if (currentInput.includes('.') && value === '.') {
        return;
    }

    document.getElementById('display').textContent = currentInput;
    document.getElementById('error').textContent = '';
}

function handleOperator(newOperator) {
    if (operator !== '' && currentInput !== '') {
        calculateResult(); // 如果已有运算符和输入，先计算
    }
    operator = newOperator;
    previousInput = currentInput; // 保存当前输入作为上一个操作数
    currentInput = ''; // 清空当前输入，等待下一个数字输入
}

function calculateResult() {
    if (isError) return; // 如果是错误状态，不能继续计算

    try {
        if (previousInput === '' || currentInput === '' || operator === '') {
            throw new Error('无效输入');
        }

        // 防止除以零错误
        if (operator === '/' && currentInput === '0') {
            throw new Error('不能除以零');
        }

        const expression = previousInput + operator + currentInput;
        const result = eval(expression); // 计算结果
        document.getElementById('display').textContent = result;

        // 更新状态，允许用户继续计算，避免连续使用计算结果
        previousInput = result.toString(); // 保存计算结果作为新的操作数
        //currentInput = ''; // 清空当前输入，等待下一个操作
        operator = ''; // 清空操作符，等待下一个运算符
    } catch (e) {
        isError = true;
        document.getElementById('display').textContent = '错误';
        document.getElementById('error').textContent = e.message;
        currentInput = '';
        operator = '';
        previousInput = '';
    }
}

// 计算平方
function square() {
    if (currentInput === '') return;
    const result = Math.pow(parseFloat(currentInput), 2);
    currentInput = result.toString();
    document.getElementById('display').textContent = currentInput;
}

// 计算平方根
function squareRoot() {
    if (currentInput === '') return;
    const result = Math.sqrt(parseFloat(currentInput));
    currentInput = result.toString();
    document.getElementById('display').textContent = currentInput;
}
