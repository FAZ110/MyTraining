const button = document.querySelector('button');
const clicks = document.querySelector('#clicks');

let count = 0;

button.addEventListener('click', () =>{
    count++;
    clicks.textContent = count;
});


const input = document.querySelector('#input')
const output = document.querySelector('#output')
const button_txt = document.querySelector('#button_txt')

let message = ''

button_txt.addEventListener('click', () => {
    // message = input.value
    output.textContent = input.value
})



const input_value = document.querySelector('#input_val')
const button_calc = document.querySelector('#button_calc')
const output_val = document.querySelector('#value')

let number1 = null
let number2 = null
let cnt = 0

button_calc.addEventListener('click', () =>{
    if (cnt == 0){
        number1 = parseInt(input_value.value)

        if (isNaN(number1)){
            output_val.textContent = 'Please enter a valid number'
            return 
        }
        output_val.textContent = `Pierwsza liczba to ${number1}, wpisz drugą`
        input_value.value = ''
        cnt++
        input_value.focus()
        
    }
    else if (cnt == 1){
        number2 = parseInt(input_value.value)

        if (isNaN(number2)){
            output_val.textContent = 'Please enter a valid number'
            return 
        }
        cnt++

        output_val.textContent = number1 + number2
    }

})



// const question = document.querySelector('.question')
const answer11 = document.querySelector('#answer11')
const answer12 = document.querySelector('#answer12')
const answer13 = document.querySelector('#answer13')
const answer21 = document.querySelector('#answer21')
const answer22 = document.querySelector('#answer22')
const answer23 = document.querySelector('#answer23')
const button_send = document.querySelector('#send_button')
const score_out = document.querySelector('#Score')


let score = 0

button_send.addEventListener('click', () => {
    if (answer12.checked){
        score++
    }

    if (answer21.checked){
        score++
    }

    score_out.textContent = score
})


