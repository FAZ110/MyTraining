// const { createElement } = require("react")

const inputTemp = document.querySelector('#temp-input');
const fromUnit = document.querySelector('#units-from');
const toUnit = document.querySelector('#units-to');
const button = document.querySelector('#submit-button');
const resultHtml = document.querySelector('#result');

function convertTemperature(value, from, to) {
    if (from === to) return value;

    // Convert input to Celsius first
    let celsius;
    switch (from) {
        case 'Celsius':
            celsius = value;
            break;
        case 'Fahrenheit':
            celsius = (value - 32) / 1.8;
            break;
        case 'Kelvin':
            celsius = value - 273.15;
            break;
        default:
            return null;
    }

    // Convert from Celsius to target unit
    switch (to) {
        case 'Celsius':
            return celsius;
        case 'Fahrenheit':
            return celsius * 1.8 + 32;
        case 'Kelvin':
            return celsius + 273.15;
        default:
            return null;
    }
}

button.addEventListener('click', () => {
    const temp = parseFloat(inputTemp.value);
    const unit1 = fromUnit.value;
    const unit2 = toUnit.value;

    if (isNaN(temp) || unit1 === 'From unit' || unit2 === 'To unit') {
        resultHtml.innerText = '';
        alert('All boxes must be filled with valid values!');
        return;
    }

    const result = convertTemperature(temp, unit1, unit2);
    if (result === null) {
        resultHtml.innerText = 'Invalid unit selection.';
    } else {
        resultHtml.innerText = `${temp} ${unit1} is ${result.toFixed(1)} in ${unit2}`;
    }
});

