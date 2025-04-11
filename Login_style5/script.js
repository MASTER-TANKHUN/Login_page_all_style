document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const loginContainer = document.querySelector('.login-container');
    const registerContainer = document.querySelector('.register-container');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const successMessage = document.getElementById('success-message');
    const passwordInput = document.getElementById('register-password');
    const passwordStrengthBar = document.getElementById('password-strength-bar');
    const passwordStrengthText = document.getElementById('password-strength-text');
    
    createParticles();

    switchToRegister.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.add('active');
    });
    
    switchToLogin.addEventListener('click', (e) => {
      e.preventDefault();
      container.classList.remove('active');
    });

    const inputs = document.querySelectorAll('.input-group input');
    
    inputs.forEach(input => {
      if (input.value !== '') {
        input.nextElementSibling.classList.add('active');
      }      
      input.addEventListener('focus', () => {
        input.parentElement.classList.add('focus');
      });
      input.addEventListener('blur', () => {
        if (input.value === '') {
          input.parentElement.classList.remove('focus');
        }
      });
      input.addEventListener('input', () => {
        const errorElement = input.parentElement.querySelector('.error-message');
        if (errorElement) {
          errorElement.style.opacity = '0';
        }
        if (input.id === 'register-password') {
          updatePasswordStrength(input.value);
        }
        if (input.id === 'register-confirm-password' || input.id === 'register-password') {
          const password = document.getElementById('register-password').value;
          const confirmPassword = document.getElementById('register-confirm-password').value;
          
          if (confirmPassword !== '' && password !== confirmPassword) {
            document.getElementById('register-confirm-password-error').style.opacity = '1';
          } else {
            document.getElementById('register-confirm-password-error').style.opacity = '0';
          }
        }
      });
    });

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const email = document.getElementById('login-email');
      const password = document.getElementById('login-password');

      if (!isValidEmail(email.value)) {
        document.getElementById('login-email-error').style.opacity = '1';
        email.parentElement.classList.add('shake');
        setTimeout(() => {
          email.parentElement.classList.remove('shake');
        }, 500);
        isValid = false;
      }
      if (password.value.trim() === '') {
        document.getElementById('login-password-error').style.opacity = '1';
        password.parentElement.classList.add('shake');
        setTimeout(() => {
          password.parentElement.classList.remove('shake');
        }, 500);
        isValid = false;
      }
      
      if (isValid) {
        showSuccessMessage('Login successful!');
        loginForm.reset();
      }
    });
    
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      let isValid = true;
      
      const name = document.getElementById('register-name');
      const email = document.getElementById('register-email');
      const password = document.getElementById('register-password');
      const confirmPassword = document.getElementById('register-confirm-password');

      if (name.value.trim() === '') {
        document.getElementById('register-name-error').style.opacity = '1';
        name.parentElement.classList.add('shake');
        setTimeout(() => {
          name.parentElement.classList.remove('shake');
        }, 500);
        isValid = false;
      }
      if (!isValidEmail(email.value)) {
        document.getElementById('register-email-error').style.opacity = '1';
        email.parentElement.classList.add('shake');
        setTimeout(() => {
          email.parentElement.classList.remove('shake');
        }, 500);
        isValid = false;
      }
      if (password.value.length < 6) {
        document.getElementById('register-password-error').style.opacity = '1';
        password.parentElement.classList.add('shake');
        setTimeout(() => {
          password.parentElement.classList.remove('shake');
        }, 500);
        isValid = false;
      }
      if (password.value !== confirmPassword.value) {
        document.getElementById('register-confirm-password-error').style.opacity = '1';
        confirmPassword.parentElement.classList.add('shake');
        setTimeout(() => {
          confirmPassword.parentElement.classList.remove('shake');
        }, 500);
        isValid = false;
      }
      
      if (isValid) {
        showSuccessMessage('Registration successful!');
        registerForm.reset();
        setTimeout(() => {
          container.classList.remove('active');
        }, 1500);
      }
    });

    function updatePasswordStrength(password) {
      let strength = 0;
      
      if (password.length >= 6) {
        strength += 25;
      }
      
      if (password.match(/[A-Z]/)) {
        strength += 25;
      }
      
      if (password.match(/[0-9]/)) {
        strength += 25;
      }
      
      if (password.match(/[^A-Za-z0-9]/)) {
        strength += 25;
      }
      
      passwordStrengthBar.style.width = strength + '%';
      
      if (strength <= 25) {
        passwordStrengthBar.style.backgroundColor = '#ff5252';
        passwordStrengthText.textContent = 'Weak';
        passwordStrengthText.style.color = '#ff5252';
      } else if (strength <= 50) {
        passwordStrengthBar.style.backgroundColor = '#ffab40';
        passwordStrengthText.textContent = 'Fair';
        passwordStrengthText.style.color = '#ffab40';
      } else if (strength <= 75) {
        passwordStrengthBar.style.backgroundColor = '#ffd740';
        passwordStrengthText.textContent = 'Good';
        passwordStrengthText.style.color = '#ffd740';
      } else {
        passwordStrengthBar.style.backgroundColor = '#4caf50';
        passwordStrengthText.textContent = 'Strong';
        passwordStrengthText.style.color = '#4caf50';
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    }

    function showSuccessMessage(message) {
      successMessage.textContent = message;
      successMessage.classList.add('show');
      
      setTimeout(() => {
        successMessage.classList.remove('show');
      }, 3000);
    }

    function createParticles() {
      const particlesContainer = document.querySelector('.background-particles');
      const particleCount = 20;
      
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        const size = Math.random() * 15 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;

particle.style.opacity = Math.random() * 0.8 + 0.2;

const duration = Math.random() * 15 + 15;
particle.style.animation = `float ${duration}s ease-in-out infinite`;

const delay = Math.random() * 10;
particle.style.animationDelay = `${delay}s`;

particlesContainer.appendChild(particle);

const style = document.createElement('style');
style.textContent = `
@keyframes float {
  0%, 100% {
    transform: translate(0, 0) rotate(0);
  }
  25% {
    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 20}deg);
  }
  50% {
    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 40}deg);
  }
  75% {
    transform: translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) rotate(${Math.random() * 20}deg);
  }
}
`;
document.head.appendChild(style);
}
}

const buttons = document.querySelectorAll('button');
buttons.forEach(button => {
button.addEventListener('click', function(e) {
  const x = e.clientX - e.target.getBoundingClientRect().left;
  const y = e.clientY - e.target.getBoundingClientRect().top;
  
  const ripple = document.createElement('span');
  ripple.style.left = `${x}px`;
  ripple.style.top = `${y}px`;
  ripple.classList.add('ripple');
  
  this.appendChild(ripple);
  
  setTimeout(() => {
    ripple.remove();
  }, 600);
});
});

const autoFillListener = () => {
const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  if (input.value !== '') {
    const label = input.parentElement.querySelector('label');
    if (label) {
      label.classList.add('active');
    }
  }
});
};

setInterval(autoFillListener, 1000);

function animateBackgroundShapes() {
const loginShape = document.querySelector('.login-shape');
const registerShape = document.querySelector('.register-shape');

setInterval(() => {
  if (!container.classList.contains('active')) {
    loginShape.style.transform = `scale(3) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
  } else {
    registerShape.style.transform = `scale(3) translate(${Math.random() * 10 - 5}px, ${Math.random() * 10 - 5}px)`;
  }
}, 3000);
}

animateBackgroundShapes();

const checkboxes = document.querySelectorAll('.checkbox-container input[type="checkbox"]');
checkboxes.forEach(checkbox => {
checkbox.addEventListener('change', function() {
  const checkmark = this.nextElementSibling;
  if (this.checked) {
    checkmark.classList.add('checked');
  } else {
    checkmark.classList.remove('checked');
  }
});
});

switchToRegister.addEventListener('click', (e) => {
e.preventDefault();

const errorMessages = document.querySelectorAll('.error-message');
errorMessages.forEach(error => {
  error.style.opacity = '0';
});

loginForm.reset();
registerForm.reset();

passwordStrengthBar.style.width = '0%';
passwordStrengthText.textContent = '';
});

switchToLogin.addEventListener('click', (e) => {
e.preventDefault();

const errorMessages = document.querySelectorAll('.error-message');
errorMessages.forEach(error => {
  error.style.opacity = '0';
});

loginForm.reset();
registerForm.reset();
});

document.addEventListener('DOMContentLoaded', () => {
setTimeout(() => {
  document.body.classList.add('loaded');
}, 100);
});
});