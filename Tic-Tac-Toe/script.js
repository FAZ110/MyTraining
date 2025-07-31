const turnSign = document.querySelector('#turn')
const boxes = document.querySelectorAll('.box')
const score = document.querySelector('#score')

const againBox = document.querySelector('.playAgain')
const btn = document.querySelector('#again')


let turn = Math.floor(Math.random()*2);

if (turn === 0){
    turnSign.innerHTML = "Turn: X's turn"
}else{
    turnSign.innerHTML = "Turn: O's turn"
}

let XTab = [];
let OTab = [];
let gameState = 'active'

let Xwins = 0
let Owins = 0
let moves = 0

const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
]



    boxes.forEach(box => {
        box.addEventListener('click', (event) =>{
            const currBox = event.target

            if (currBox.innerHTML === '' && turn % 2 === 0 && gameState === 'active'){
                currBox.innerHTML = 'X'
                XTab.push(parseInt(currBox.id))

                if (XTab.length >= 3 && checkWin(XTab)){
                    Xwins++
                    score.innerHTML = Xwins + ':' + Owins 
                    showEnding()

                }
                moves++
                turn++
                turnSign.innerHTML = "Turn: O's turn"

            }else if (currBox.innerHTML === '' && gameState === 'active'){
                currBox.innerHTML = 'O'
                OTab.push(parseInt(currBox.id))
                if (OTab.length >= 3 && checkWin(OTab)){
                    Owins++
                    score.innerHTML = Xwins + ':' + Owins 
                    showEnding()

                }
                moves++
                turn++
                turnSign.innerHTML = "Turn: X's turn"
            }else{
                alert('Click on an empty box!')
            }

            if (moves === 9){
                showEnding()
            }
        
        })

    })



const checkWin = (tab) => {
    let win = false

    winCombinations.forEach(winningTab => {
        let matches = 0;
        for(let i = 0; i <= tab.length-1; i++){
            
            for(let j = 0; j <= 2; j++){
                
                if (winningTab[j] === tab[i]){
                    matches++
                }
            }
            if(matches === 3){
                win = true
            }
        }
    })
    return win
}

const gameRestart = () => {
    boxes.forEach(box =>{
        box.innerHTML = ''
    })
    XTab = []
    OTab = []
    moves = 0
    gameState = 'active'
    againBox.style.display = 'none';
}

const showEnding = () => {
    againBox.style.display = 'block';
    gameState = 'inactive'

}

btn.addEventListener('click', gameRestart)
