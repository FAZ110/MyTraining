// const { createElement } = require("react")

const inputTemp = document.querySelector('#temp-input')
const fromUnit = document.querySelector('#units-from')
const toUnit = document.querySelector('#units-to')
const button = document.querySelector('#submit-button')
const container = document.querySelector('.main-container')
const resultHtml = document.querySelector('#result') 

button.addEventListener('click', () => {
    const temp = parseFloat(inputTemp.value);
    const unit1 = fromUnit.value;
    const unit2 = toUnit.value;


    if (temp === '' || unit1 === 'From unit' || unit2 === 'To unit'){
        alert('all boxes must be filled!')
    }


    else if (unit1 === 'Celsius' && unit2 === 'Fahrenheit'){
        let result = 1.8 * temp + 32;
        const roundedResult = result.toFixed(1)

        
        resultHtml.innerText = `${temp} ${unit1} is ${roundedResult} in ${unit2}`
    }

    else if (unit1 === 'Fahrenheit' && unit2 === 'Celsius'){
        let result = (temp - 32) / 1.8;
        const roundedResult = result.toFixed(1)

        
        resultHtml.innerText = `${temp} ${unit1} is ${roundedResult} in ${unit2}`
    }

    else if (unit1 === 'Kelvin' && unit2 === 'Celsius'){
        let result = temp - 273.15;
        const roundedResult = result.toFixed(1)

        
        resultHtml.innerText = `${temp} ${unit1} is ${roundedResult} in ${unit2}`
    }

    else if (unit1 === 'Celsius' && unit2 === 'Kelvin'){
        let result = temp + 273.15;
        const roundedResult = result.toFixed(1)

        
        resultHtml.innerText = `${temp} ${unit1} is ${roundedResult} in ${unit2}`
    }

    else if (unit1 === 'Kelvin' && unit2 === 'Fahrenheit'){
        let result = (temp - 273.15) * 1.8 + 32;
        const roundedResult = result.toFixed(1)

        
        resultHtml.innerText = `${temp} ${unit1} is ${roundedResult} in ${unit2}`
    }

    else if (unit1 === 'Fahrenheit' && unit2 === 'Kelvin'){
        let result = (temp - 32) / 1.8 + 273.15;
        const roundedResult = result.toFixed(1)

        
        resultHtml.innerText = `${temp} ${unit1} is ${roundedResult} in ${unit2}`
    }

    else{
        resultHtml.innerText = `${temp} ${unit1} is ${temp} in ${unit2}`
    }
})

