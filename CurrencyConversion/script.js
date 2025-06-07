let exchangeRates = null;


async function loadCurrencies(){
    try{
        const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
        const data = await response.json();


        exchangeRates = data.rates;

        const toSelect = document.getElementById('to');
        const fromSelect = document.getElementById('from');
        const currencies = Object.keys(data.rates);

        currencies.forEach(currency => {
            const toOption = document.createElement('option');
            toOption.value = currency;
            toOption.textContent = currency;
            toSelect.appendChild(toOption);
            const fromOption = document.createElement('option');
            fromOption.value = currency;
            fromOption.textContent = currency;
            fromSelect.appendChild(fromOption);
    });
    
    }catch(error){
        console.error('Error loading currencies:', error);
    }
}


document.addEventListener('DOMContentLoaded', loadCurrencies);


const convertButton = document.getElementById('convert');
convertButton.addEventListener('click', convert);

async function convert(){
    try{
        const userAmount = document.getElementById('amount').value;
        const userOldCurrency = document.getElementById('from').value;
        const userNewCurrency = document.getElementById('to').value;
        let output = document.getElementById('result');

        
        const rateOld = exchangeRates[userOldCurrency];
        const rateNew = exchangeRates[userNewCurrency];
        const result = (userAmount * rateNew) / rateOld;

        output.textContent = result.toFixed(2)+" "+userNewCurrency;

    }catch(error){
        console.error('Error converting currencies:', error);
    }
}

convertButton.addEventListener('click', async()=>{
    await convert();
});


