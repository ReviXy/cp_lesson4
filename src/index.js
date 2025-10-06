import {MiniMaple} from "./miniMaple.js";
// import {Term} from "miniMaple.js";

const miniMaple = new MiniMaple();

const button = document.getElementById("calc-derivative");
button.onclick = calculateDerivative;

function calculateDerivative() {
    const polynomialInput = document.getElementById('polynomial');
    const variableInput = document.getElementById('variable');
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');

    const polynomial = polynomialInput.value.trim();
    const variable = variableInput.value.trim();

    if (!polynomial || !variable) {
        showError('Пожалуйста, заполните оба поля');
        return;
    }

    try {
        const derivative = miniMaple.differentiate(polynomial, variable);
        showResult(polynomial, variable, derivative);
        
    } catch (error) {
        showError('Ошибка: ' + error.message);
    }
}

function showResult(polynomial, variable, derivative) {
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    
    resultContent.innerHTML = `
        <p><strong>Исходный многочлен:</strong> ${polynomial}</p>
        <p><strong>Переменная:</strong> ${variable}</p>
        <p><strong>Производная:</strong> <code>${derivative}</code></p>
    `;
    
    resultDiv.style.display = 'block';
}

function showError(message) {
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    
    resultContent.innerHTML = `<p class="error">${message}</p>`;
    resultDiv.style.display = 'block';
}
