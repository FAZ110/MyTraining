// const email_input = document.getElementById('email_input');
// const password_input = document.getElementById('password_input');
// const submit_btn = document.getElementById('submit_btn');


// submit_btn.addEventListener('click', () => {

// })



function validateEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password){
    const passwordRegex = /^[a-zA-Z0-9._%$+-]$/;
    const hasUpperCase = /[A-Z]/.test(password);

    return passwordRegex.test(password) && hasUpperCase
}
