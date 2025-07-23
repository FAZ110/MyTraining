// 1. get initial balance
// 2. get bet for next game
// 3. run game
// 3.1 starting state, 2 cards(revealed) for the player and 2 cards for the croupier(1 revealed and 1 unreveiled)
// 3.2 if player wants to hit, give him the card
// 3.3 ace handling, 1 or 11 value 
// 3.4 if a player stand, count his final score and start the croupier turn 
// 3.5 reveal the hidden card, and hit until min 17 points, then stop
// 3.6 determine the winner  
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

const printDeck = (deck) => {
    let output = "";
    for (const [idx, card] of Object.entries(deck)){
        if (idx == deck.length-1){
            output += card
        }else{
            output += card + ", "
        }
    
    }
    console.log(output)
}


const start = (deck) => {
    const playerCards = [];
    const croupierCards = [];
    let hiddenCard = NaN

    for (let i = 0; i < 4; i++){
        if (i % 2 == 0){
            const randomIndex = Math.floor(Math.random() * deck.length);
            playerCards.push(deck[randomIndex])
            deck.splice(randomIndex, 1)
        }else if (i == 1){
            const randomIndex = Math.floor(Math.random() * deck.length);
            croupierCards.push(deck[randomIndex])
            deck.splice(randomIndex, 1)

        }else{
            const randomIndex = Math.floor(Math.random() * deck.length);
            hiddenCard = deck[randomIndex];
            croupierCards.push("?");
            deck.splice(randomIndex, 1);
        }

    }
    return {playerCards, croupierCards, hiddenCard, deck}


}

const hit = (playerCards, deck) => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    playerCards.push(deck[randomIndex]);
    deck.splice(randomIndex, 1);
}

const sumPoints = (deckCards) => {
    let sum = 0;
    let cntAces = 0;
    const len = deckCards.length

    for (let i = 0; i < len; i++){
        if (deckCards[i] == 'A'){
            sum += 11
            cntAces += 1
        }else{
            sum += CARD_VALUES[deckCards[i]] 
        }
        
    }

    while (sum > 21 && cntAces > 0){
        sum -= 10
        cntAces -= 1
    }
    return sum

}


const croupierTurn = (deckCards, croupierCards, hiddenCard) => {
    croupierCards[1] = hiddenCard
    // console.log("The hidden card is " + hiddenCard)
    console.log("Croupier Cards: " + croupierCards)
    let croupierSum = sumPoints(croupierCards)

    while (croupierSum < 17){
        hit(croupierCards, deckCards)
        console.log("Croupier cards: ")
        printDeck(croupierCards)
        croupierSum = sumPoints(croupierCards)
    }
    console.log("Croupier final score: "+ croupierSum)

    return croupierCards

}

const determineWinner = (playerCards, croupierCards) => {
    const sumPlayer = sumPoints(playerCards)
    const sumCroupier = sumPoints(croupierCards)
    let result = NaN;

    if (sumPlayer > 21){
        result = "lost"
        console.log("You lost!")
    }else if (sumCroupier > 21){
        result = "won"
        console.log("You won!")
    }else if (sumPlayer > sumCroupier){
        result = "won"
        console.log("You won!")
    }else if (sumPlayer < sumCroupier){
        result = "lost"
        console.log("You lost!")
    }else{
        win = "draw"
        console.log("It's a draw")
    }

    return result
}





const game = () => {
    let balance = getBalance();

    while(balance > 0){
        const bet = getBet(balance);
        balance -= bet;
        const deck = getDeck();

        const started = start(deck)

        console.log("Your cards: ")
        printDeck(started.playerCards)
        console.log("Croupier cards: ")
        printDeck(started.croupierCards)



        while (true){
            console.log("Your cards: "+ started.playerCards)
            const currPoints = sumPoints(started.playerCards)
            console.log("You have "+ currPoints + " points")
            if (currPoints > 21){
                
                break
            }


            const cont = prompt("hit or stand? (h/s): ")
            if (cont == "h"){
                hit(started.playerCards, started.deck);
            }else if (cont == "s"){
                const final = currPoints
                console.log("Your final score is " + final)
                break
            }else{
                console.log("Wrong symbol, try again!")
            }
        }

        const afterCroupierTurn = croupierTurn(started.deck, started.croupierCards, started.hiddenCard)

        const result = determineWinner(started.playerCards, afterCroupierTurn)

        if (result == "won"){
            balance += 2*bet;
        }else if(result == "draw"){
            balance += bet
        }

        console.log("Your balance is " + balance)

        const decision = prompt("Do you want to keep playing? (y/n)")

        if (decision == "n"){
            break
        }
    }
    


}

game()












