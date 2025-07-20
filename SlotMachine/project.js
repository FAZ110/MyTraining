const prompt = require("prompt-sync")();

const ROWS = 3;
const COL = 3;

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
    const output = [];

    for (const [symbol, freq] of Object.entries(SYMBOLS_COUNT)){
        for (let i = 0; i < freq; i++){
            output.push(symbol)
        }
    }
    // console.log(output)
}

spin()
// let balance = deposit();
// const lines = numberOfLines();
// const bet = getBet(lines, balance);