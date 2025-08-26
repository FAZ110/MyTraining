const greenBtn = document.getElementById('green-btn')
const blueBtn = document.getElementById('blue-btn')
const redBtn = document.getElementById('red-btn')
const randomBtn = document.getElementById('random-btn')
const body = document.querySelector('body')

function getRandomHexColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}


greenBtn.addEventListener('click', () =>{
    body.style.backgroundColor = 'green'

})

blueBtn.addEventListener('click', () =>{
    body.style.backgroundColor = 'blue'

})

redBtn.addEventListener('click', () =>{
    body.style.backgroundColor = 'red'

})


randomBtn.addEventListener('click', () =>{
    const colorPicked = getRandomHexColor();
    body.style.backgroundColor = colorPicked;

})