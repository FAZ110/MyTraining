const turnSign = document.querySelector('#turn')
const boxes = document.querySelectorAll('.box')
const score = document.querySelector('#score')

let turn = Math.floor(Math.random()*2);

if (turn === 0){
    turnSign.innerHTML = "Turn: X's turn"
}else{
    turnSign.innerHTML = "Turn: O's turn"
}

const XTab = [];
const OTab = [];

const winCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        // Columns
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        // Diagonals
        [0, 4, 8],
        [2, 4, 6]
]



boxes.forEach(box => {
    box.addEventListener('click', (event) =>{
        const currBox = event.target

        if (currBox.innerHTML === '' && turn % 2 === 0){
            currBox.innerHTML = 'X'
            console.log(currBox)
            turn++
            // let winner = checkWin(XTab)
            turnSign.innerHTML = "Turn: O's turn"
        }else if (currBox.innerHTML === ''){
            currBox.innerHTML = 'O'
            turn++
            turnSign.innerHTML = "Turn: X's turn"
            // let winner = checkWin(OTab)
        }else{
            alert('Click on an empty box!')
        }

        
        
        
    })

})

const checkWin = (tab) => {
    let win = false

    winCombinations.forEach(winningTab => {
        console.log(winningTab)
        for(let i = 0; i <= tab.length; i++){
            let matches = 0;
            for(let j = 0; i <= 2; j++){
                if (winningTab[j] === tab[i]){
                    matches++
                }
            }
            if(matches === 3){
                return true
            }
        }
    })
    return false
}
