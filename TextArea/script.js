const cnt = document.getElementById('word-counter');
const txtArea = document.getElementById('txt-area');
const maxChar = 250;

const countWords = (text) =>{
    if (text.trim() === '') return 0;

    return text.trim().length;
}

const updateCnt = () =>{
    const charCnt = countWords(txtArea.value);
    cnt.textContent = `${charCnt}/${maxChar}`

    if (charCnt >= maxChar){
        console.log('reached')
        txtArea.value = txtArea.value.slice(0, maxChar-1);
        txtArea.style.border = '2px solid red'
        txtArea.style.color = 'red'
        cnt.style.color = 'red'
        return

    }else{
        txtArea.style.border = '2px solid black'
        txtArea.style.color = 'black'
        cnt.style.color = 'black'

    }
}

txtArea.addEventListener('input', updateCnt);

updateCnt();
