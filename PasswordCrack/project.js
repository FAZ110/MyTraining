const prompt = require("prompt-sync")();

const chars = ['0','1','2','3','4','5','6','7','8','9']


const getPassword = () => {

    while(true){
        const password = prompt('Enter your password (available characters: [0-9]): ')

        if (!isNaN(password)){
            return password
        }
    }
}

const generatePassword = (len) => {
    let password = ''

    while (password.length < len){
        const index = Math.floor(Math.random() * chars.length)
        password += chars[index]
    }
    return password
}

const guessPasswordWithSet = (password) => {
    const len = password.length
    const attempted = new Set()
    let attempts = 0;

    console.log(`Cracking password of lenght ${len}`)
    const startTime = Date.now()

    while (true){
        let guess

        do{
            guess = generatePassword(len)

        }while (attempted.has(guess))

        attempted.add(guess)
        attempts++
        

        if (guess === password){
            const endTime = Date.now()
            // console.log('You guessed!!')
            // console.log(`Attempts: ${attempts}`)
            // console.log(`Time needed: ${endTime - startTime}ms`)
            return {attempts, endTime, startTime}

        }

        
    }
}


const getNext = (str, len) => {
    let num = parseInt(str);
    num += 1
    return num.toString().padStart(len, '0')
}


const linearPasswordGuess = (password) => {
    const len = password.length
    let attempts = 1;
    let guess = ''

    for (let i = 0; i < len; i++){
        guess += '0'
    }
    
    console.log(`Cracking password of length ${len}`)
    const startTime = Date.now()
    

    while (true){
        if (guess === password){
            const endTime = Date.now()
            // console.log('You guessed!!')
            // console.log(`Attempts: ${attempts}`)
            // console.log(`Time needed: ${endTime - startTime}ms`)
            return {attempts, endTime, startTime}
        }else{
            guess = getNext(guess, len)
            attempts ++
        }


    }
    

}

const password = getPassword();



// console.log(generatedPassword)
const data = guessPasswordWithSet(password)
const data1 = linearPasswordGuess(password)


console.log("---------SUMMARY----------")
console.log("Random with set method:")
console.log(`Attempts: ${data.attempts}`)
console.log(`Time needed: ${data.endTime - data.startTime}ms`)
console.log('--------------------------')
console.log("Linear method:")
console.log(`Attempts: ${data1.attempts}`)
console.log(`Time needed: ${data1.endTime - data1.startTime}ms`)




