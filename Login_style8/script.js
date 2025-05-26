const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

signUpButton.addEventListener('click', () => container.classList.add('register-mode'));
signInButton.addEventListener('click', () => container.classList.remove('register-mode'));

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (email && password) alert(`Login attempted:\nEmail: ${email}\nPassword: ${'•'.repeat(password.length)}`);
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    if (name && email && password) alert(`Registration attempted:\nName: ${name}\nEmail: ${email}\nPassword: ${'•'.repeat(password.length)}`);
});

document.querySelectorAll('.input-group input').forEach(input => {
    input.addEventListener('blur', () => {
        input.classList.toggle('has-value', input.value.trim() !== '');
    });
});