const email_input = document.getElementById('email_input');
const password_input = document.getElementById('password_input');
const submit_btn = document.getElementById('submit_btn');


submit_btn.addEventListener('click', () => {
    const email = email_input.value;
    const password = password_input.value;

    if(validateEmail(email) && validatePassword(password)){
        alert('Login successful');
    }else if (!validateEmail(email) && !validatePassword(password)){
        alert('Wrong email and password!!')
    }else if (!validatePassword(password)){
        alert('Wrong password!')
    }else{
        alert('Wrong email!')
    }
})



function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password){
    const passwordRegex = /^[a-zA-Z0-9._%$+-]{8,}$/;
    const hasUpperCase = /[A-Z]/.test(password);

    return passwordRegex.test(password) && hasUpperCase
}
