// 1. get initial balance
// 2. get bet for next game
// 3. run game
// 4. determine the winner
// 5. adjust the balance 

const prompt = require("prompt-sync")();

const CARDS = {
    A: 4,
    K: 4,
    Q: 4,
    J: 4,
    10: 4,
    9: 4,
    8: 4,
    7: 4,
    6: 4,
    5: 4,
    4: 4,
    3: 4,
    2: 4
}

const CARD_VALUES = {
    A: (1,11),
    K: 10,
    Q: 10,
    J: 10,
    10: 10,
    9: 9,
    8: 8,
    7: 7,
    6: 6,
    5: 5,
    4: 4,
    3: 3,
    2: 2
    
}

const getBalance = () => {

    while (true){
        const balance = prompt("Enter your initial balance: ");
        const numberBalance = parseFloat(balance); 
        
        if (!isNaN(numberBalance) && numberBalance > 0){
            return numberBalance
        }
        console.log("Invalid balance, try again")
    }
}

const getBet = (balance) => {

    while (true){
        const bet = prompt("Enter your bet for the next game: ");
        const betNumber = parseFloat(bet);

        if (!isNaN(betNumber) && (betNumber >= 0) && (betNumber <= balance)){
            return betNumber
        }
        console.log("Enter a valid bet")
    }
    

}

const getDeck = () => {
    const deck = [];
    for (const [card, num] of Object.entries(CARDS)){
        for (let i = 0; i < num; i++){
            deck.push(card)
        }

    }
    return deck
}







const balance = getBalance();
const bet = getBet(balance);
const deck = getDeck();
console.log(deck);

