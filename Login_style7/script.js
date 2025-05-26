function validateLoginForm() {
    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value.trim();
    let isValid = true;
    
    if (email === '') {
        showError('login-email', 'Email cannot be empty');
        isValid = false;
    } else {
        clearError('login-email');
    }
    
    if (password === '') {
        showError('login-password', 'Password cannot be empty');
        isValid = false;
    } else {
        clearError('login-password');
    }
    
    return isValid;
}
  
function validateRegisterForm() {
    const name = document.getElementById('register-name').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const confirmPassword = document.getElementById('register-confirm-password').value.trim();
    let isValid = true;
    
    if (name === '') {
        showError('register-name', 'Name cannot be empty');
        isValid = false;
    } else {
        clearError('register-name');
    }
    
    if (email === '') {
        showError('register-email', 'Email cannot be empty');
        isValid = false;
    } else {
        clearError('register-email');
    }
    
    if (password === '') {
        showError('register-password', 'Password cannot be empty');
        isValid = false;
    } else {
        clearError('register-password');
    }
    
    if (confirmPassword === '') {
        showError('register-confirm-password', 'Please confirm your password');
        isValid = false;
    } else if (password !== confirmPassword) {
        showError('register-confirm-password', "The password and confirm password don't match.\nTry again.");
      isValid = false;
    } else {
        clearError('register-confirm-password');
    }
    
    return isValid;
}
  
function showError(inputId, message) {
    const inputField = document.getElementById(inputId);
    const errorId = inputId + '-error';
    let errorElement = document.getElementById(errorId);
    
    inputField.style.borderColor = '#ff5252';
    
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.id = errorId;
        errorElement.style.color = '#ff5252';
        errorElement.style.fontSize = '12px';
        errorElement.style.marginTop = '5px';
        errorElement.style.transition = 'all 0.3s ease';
        inputField.parentElement.insertAdjacentElement('afterend', errorElement);
    }
    
    errorElement.textContent = message;
    
    inputField.style.animation = 'shake 0.5s';
    setTimeout(() => {
      inputField.style.animation = '';
    }, 500);
}
  
function clearError(inputId) {
    const inputField = document.getElementById(inputId);
    const errorId = inputId + '-error';
    const errorElement = document.getElementById(errorId);
    
    inputField.style.borderColor = '#eaeaea';
    
    if (errorElement) {
        errorElement.textContent = '';
    }
}
  
function simulateLogin() {
    if (!validateLoginForm()) {
        return;
    }
    const button = document.querySelector('.form.login .btn');
    const loader = button.querySelector('.loader');
    const text = button.querySelector('span');
    
    loader.style.display = 'block';
    text.textContent = 'Logging in...';
    button.disabled = true;
    
    setTimeout(() => {
        loader.style.display = 'none';
        text.textContent = 'Success!';
        button.style.background = 'linear-gradient(to right, #4caf50, #8bc34a)';
        
        const toast = document.querySelector('.toast');
        toast.classList.add('show');
        
        setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            button.style.background = 'linear-gradient(to right, #7f7fd5, #86a8e7)';
            text.textContent = 'Login';
            button.disabled = false;
        }, 500);
        }, 3000);
    }, 1500);
}
  
function validatePasswordMatch() {
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const confirmPasswordField = document.getElementById('register-confirm-password');
    const errorMessage = document.getElementById('password-match-error');
    
    if (!errorMessage) {
        const newErrorMessage = document.createElement('div');
        newErrorMessage.id = 'password-match-error';
        newErrorMessage.style.color = '#ff5252';
        newErrorMessage.style.fontSize = '12px';
        newErrorMessage.style.marginTop = '5px';
        newErrorMessage.style.transition = 'all 0.3s ease';
        confirmPasswordField.parentElement.insertAdjacentElement('afterend', newErrorMessage);
    }
    
    const errorElement = document.getElementById('password-match-error');
    if (password !== confirmPassword) {
        errorElement.textContent = "The password and confirm password don't match.\nTry again.";
        confirmPasswordField.style.borderColor = '#ff5252';
        return false;
    } else {
        errorElement.textContent = '';
        confirmPasswordField.style.borderColor = '#66bb6a';
        return true;
    }
}
  
function simulateRegister() {
    if (!validateRegisterForm() || !validatePasswordMatch()) {
      const confirmPasswordField = document.getElementById('register-confirm-password');
      confirmPasswordField.style.animation = 'shake 0.5s';
      setTimeout(() => {
        confirmPasswordField.style.animation = '';
      }, 500);
      return;
    }
    
    const button = document.querySelector('.form.register .btn');
    const loader = button.querySelector('.loader');
    const text = button.querySelector('span');
    
    loader.style.display = 'block';
    text.textContent = 'Creating account...';
    button.disabled = true;
    
    setTimeout(() => {
        loader.style.display = 'none';
        text.textContent = 'Account created!';
        button.style.background = 'linear-gradient(to right, #4caf50, #8bc34a)';
        
        setTimeout(() => {
        switchTab('login');
        button.style.background = 'linear-gradient(to right, #7f7fd5, #86a8e7)';
        text.textContent = 'Create Account';
        button.disabled = false;
        
        const toast = document.querySelector('.toast');
        toast.querySelector('.toast-message').textContent = 'Account created successfully!';
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
        }, 1000);
    }, 1500);
}
  
const textContent = {
    login: {
      title: "Welcome Back!",
      text: "Sign in to access your account and continue your journey with us."
    },
    register: {
      title: "Create Account",
      text: "Join our community and discover all our amazing features!"
    }
};
  
const tabWidth = document.querySelector('.tab').offsetWidth;
document.querySelector('.tab-slider').style.width = tabWidth + 'px';
  
function switchTab(tab) {
    document.querySelectorAll('.typing-title').forEach(el => el.textContent = '');
    document.querySelectorAll('.typing-text').forEach(el => el.textContent = '');
  
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    const activeTabIndex = tab === 'login' ? 0 : 1;
    document.querySelectorAll('.tab')[activeTabIndex].classList.add('active');
  
    document.querySelector('.tab-slider').style.transform = `translateX(${activeTabIndex * tabWidth}px)`;
  
    document.querySelectorAll('.form').forEach(el => {
        el.style.animation = 'none';
        el.offsetHeight;
        el.style.animation = null;
        el.classList.remove('active');
    });
    document.querySelector(`.form.${tab}`).classList.add('active');
    const activeTitle = document.querySelector(`.form.${tab} .typing-title`);
    const activeText = document.querySelector(`.form.${tab} .typing-text`);

    activeTitle.classList.add('typing-animation');
    typeWriter(activeTitle, textContent[tab].title, 0, 80);

    setTimeout(() => {
        activeText.classList.add('typing-animation');
        typeWriter(activeText, textContent[tab].text, 0, 40);
    }, textContent[tab].title.length * 80 + 300);
  }
  
function typeWriter(element, text, index, speed) {
    if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(() => typeWriter(element, text, index, speed), speed);
    } else {
        element.classList.remove('typing-animation');
    }
}
  
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.parentElement.querySelector('.password-toggle i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}
  
function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.password-strength');
    const strengthText = document.querySelector('.password-strength-text');
    strengthBar.className = 'password-strength';
    strengthText.className = 'password-strength-text';
    
    if (password.length === 0) {
        strengthBar.style.display = 'none';
        strengthText.style.display = 'none';
        return;
    }
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) strength += 1;
    if (password.match(/([a-zA-Z])/) && password.match(/([0-9])/)) strength += 1;
    if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) strength += 1;
    if (strength < 2) {
        strengthBar.classList.add('weak');
        strengthText.classList.add('weak');
        strengthText.textContent = 'Weak';
    } else if (strength === 2) {
        strengthBar.classList.add('medium');
        strengthText.classList.add('medium');
        strengthText.textContent = 'Medium';
    } else {
        strengthBar.classList.add('strong');
        strengthText.classList.add('strong');
        strengthText.textContent = 'Strong';
    }
}
  
document.querySelectorAll('.input-field').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.parentElement.classList.add('focused');
    });
    input.addEventListener('blur', () => {
      if (input.value === '') {
        input.parentElement.parentElement.classList.remove('focused');
      }
    });
});
  
window.onload = function() {
    document.getElementById('login-email').addEventListener('input', () => clearError('login-email'));
    document.getElementById('login-password').addEventListener('input', () => clearError('login-password'));
    document.getElementById('register-name').addEventListener('input', () => clearError('register-name'));
    document.getElementById('register-email').addEventListener('input', () => clearError('register-email'));
    document.getElementById('register-password').addEventListener('input', () => clearError('register-password'));
    document.getElementById('register-confirm-password').addEventListener('input', validatePasswordMatch);
    const loginTitle = document.querySelector('.form.login .typing-title');
    const loginText = document.querySelector('.form.login .typing-text');
    loginTitle.classList.add('typing-animation');
    typeWriter(loginTitle, textContent.login.title, 0, 80);
    setTimeout(() => {
        loginText.classList.add('typing-animation');
        typeWriter(loginText, textContent.login.text, 0, 40);
    }, textContent.login.title.length * 80 + 300);
};