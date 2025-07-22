const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    A: 3,
    B: 5,
    C: 7,
    D: 9
}

const SYMBOL_MULTIPLIERS = {
    A: 6,
    B: 4,
    C: 3,
    D: 2
}

const deposit = () => {
    while (true){
        const depositAmount = prompt("Enter a deposit amount: ")
        const numberDeposit = parseFloat(depositAmount)
        if (!isNaN(numberDeposit) && numberDeposit > 0){
            return numberDeposit
        }
        console.log("Invalid deposit, try again!")
    }
}



const numberOfLines = () => {
    while (true){
        const lines = prompt("Enter a number of lines, you want to bet on (1-3): ")
        const numberLines = parseFloat(lines)

        if (!isNaN(numberLines) && numberLines > 0 && numberLines <= ROWS){
            return numberLines
        }
        console.log("Invalid number of lines, try again!")
    }
}

const getBet = (lines, deposit) => {
    while (true){
        const bet = prompt("Enter a bet for each row: ")
        const numberBet = parseFloat(bet)

        if (!isNaN(numberBet) && numberBet > 0 && numberBet * lines <= deposit){
            return numberBet
        }
        console.log("Invalid bet, try again!")
    }
}


const spin = () => {
    const symbols = [];

    for (const [symbol, freq] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < freq; i++){
            symbols.push(symbol)
        }
    }

    const roll = [];
    for (let i = 0; i < COLS; i++){
        roll.push([])
        const reelSymbols = [...symbols]
        for (let j = 0; j < ROWS; j++){
            const randomIndex = Math.floor(Math.random() * reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            roll[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1)

        }
    }
    return roll
}

const transpose = (reels) => {
    const rows = [];

    for (let i = 0; i < ROWS; i++) {
        rows.push([])
        for (let j = 0; j < COLS; j++){
            rows[i].push(reels[j][i])
        }
    }
    return rows

}

const printRows = (transposed) => {
    for (const row of transposed){
        let rowString = "";
        for (const [i, symbol] of row.entries()){
            rowString += symbol;
            if (i != row.length - 1){
                rowString += " | "
            }
        }
        console.log(rowString)
    }
}

const checkWin = (transposed, bet, lines) => {
    let winnings = 0

    for (let i = 0; i < lines; i++){
        let flag = true;
        for (let j = 1; j < transposed[i].length; j++){
            if (transposed[i][j] != transposed[i][j-1]){
                flag = false;
                break;
            }

        }
    if (flag){
        winnings += bet * SYMBOL_MULTIPLIERS[transposed[i][0]];
    }
    }
    return winnings
}



const game = () =>{
    let balance = deposit();

    while (true){
        console.log("You have a balance of $" + balance )
        const lines = numberOfLines();
        const bet = getBet(lines, balance);
        balance -= bet * lines
        const reels = spin();
        const transposed = transpose(reels);
        printRows(transposed);
        const win = checkWin(transposed, bet, lines);
        console.log("You won, $" + win.toString());
        balance += win;

        if (balance == 0){
            console.log("You ran out of money!")
            break
        }

        const again = prompt("Do you want to play again? (y/n)")

        if (again == "n"){
            break
        }
    }
    

}

game()
