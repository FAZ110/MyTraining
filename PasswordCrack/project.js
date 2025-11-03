const prompt = require("prompt-sync")();

const chars = [];
for (var i=32; i<127; i++)
  chars.push(String.fromCharCode(i));

console.log(chars)


const getPassword = () => {

    const password = prompt('Enter your password: ')
    return password
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




const numberToGuess = (number, len) => {
    let result = '';
    for (let i = 0; i < len; i++) {
        result = String.fromCharCode((number % 95) + 32) + result;
        number = Math.floor(number / 95);
    }
    return result;
}


const linearPasswordExt = (password) => {
    const len = password.length;
    let attempts = 0;
    let number = 0; 
    
    console.log(`Cracking password: "${password}" (length ${len})`);
    console.log(`Search space: ${Math.pow(95, len).toLocaleString()} possibilities`);
    const startTime = Date.now();
    
    while (true) {
        attempts++;
        let guess = numberToGuess(number, len);
        
        if (guess === password) {
            const endTime = Date.now();
            console.log(`🎉 Password cracked: "${password}"`);
            console.log(`Attempts: ${attempts.toLocaleString()}`);
            console.log(`Number was: ${number}`);
            console.log(`Time: ${endTime - startTime}ms`);
            return;
        }
        
        // Show progress for longer searches
        if (attempts % 10000 === 0) {
            console.log(`Attempt ${attempts.toLocaleString()}: "${guess}" (number: ${number})`);
        }
        
        number++; // ✅ Increment number for next guess
        
        // Safety check to prevent infinite loop
        if (number >= Math.pow(95, len)) {
            console.log(`Password "${password}" not found in search space!`);
            return;
        }
    }
}

// const password = getPassword();


// const data = guessPasswordWithSet(password)
// // const data1 = linearPasswordGuess(password)


// console.log("---------SUMMARY----------")
// console.log("Random with set method:")
// console.log(`Attempts: ${data.attempts}`)
// console.log(`Time needed: ${data.endTime - data.startTime}ms`)
// console.log('--------------------------')
// console.log("Linear method:")
// console.log(`Attempts: ${data1.attempts}`)
// console.log(`Time needed: ${data1.endTime - data1.startTime}ms`)

console.log(linearPasswordExt('dsf'))


