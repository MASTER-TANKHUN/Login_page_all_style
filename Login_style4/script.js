document.addEventListener('DOMContentLoaded', function() {
  const pageContainer = document.getElementById('pageContainer');
  const signUpButton = document.getElementById('signUp');
  const signInButton = document.getElementById('signIn');
  const loginForm = document.getElementById('loginForm');
  const registerForm = document.getElementById('registerForm');
  const progressBar = document.getElementById('progressBar');
  const bgElements = document.querySelectorAll('.bg-element');
  const lightEffect = document.getElementById('lightEffect');
  const signinButton = document.getElementById('signinButton');
  const signupButton = document.getElementById('signupButton');
  const signinFormElement = document.getElementById('signinFormElement');
  const signupFormElement = document.getElementById('signupFormElement');
  const signinBtnContainer = document.getElementById('signinBtnContainer');
  const signupBtnContainer = document.getElementById('signupBtnContainer');
  
  loginForm.classList.add('slide-up');
  let signinButtonClicked = false;
  let signupButtonClicked = false;
  document.addEventListener('mousemove', (e) => {
    lightEffect.style.left = `${e.clientX}px`;
    lightEffect.style.top = `${e.clientY}px`;
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;        
    bgElements.forEach((element, index) => {
      const moveFactorX = (index % 2 ? 1 : -1) * 20;
      const moveFactorY = (index % 2 ? -1 : 1) * 20;
      
      element.style.transform = `translate(${(mouseX - 0.5) * moveFactorX}px, ${(mouseY - 0.5) * moveFactorY}px)`;
    });
  });
  
  function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('.input-group[data-required="true"] input');
    
    inputs.forEach(input => {
      const inputGroup = input.parentElement;
      input.classList.remove('invalid');
      inputGroup.classList.remove('error');
      
      if (!input.value.trim()) {
        input.classList.add('invalid');
        inputGroup.classList.add('error');
        isValid = false;
      }
      if (input.type === 'email' && input.value.trim()) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(input.value)) {
          input.classList.add('invalid');
          inputGroup.classList.add('error');
          isValid = false;
        }
      }
      if (input.id === 'signupPassword' && input.value.trim()) {
        if (input.value.length < 6) {
          input.classList.add('invalid');
          inputGroup.classList.add('error');
          isValid = false;
        }
      }
      if (input.id === 'signupConfirmPassword' && input.value.trim()) {
        const password = document.getElementById('signupPassword').value;
        if (input.value !== password) {
          input.classList.add('invalid');
          inputGroup.classList.add('error');
          isValid = false;
        }
      }
    });
    
    return isValid;
  }
  function setupRunAwayButton(button, btnContainer, formElement, buttonClickedFlag) {
    let lastMouseX = 0;
    let lastMouseY = 0;
    let isMouseOver = false;
    let activeEscape = false;
    let escapeTimeout;
    button.style.position = 'absolute';
    button.style.top = '0';
    button.style.left = '0';
    document.addEventListener('mousemove', (e) => {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      const btnRect = button.getBoundingClientRect();
      isMouseOver = (
        e.clientX >= btnRect.left && 
        e.clientX <= btnRect.right && 
        e.clientY >= btnRect.top && 
        e.clientY <= btnRect.bottom
      );
      if (window[buttonClickedFlag] && isMouseOver && !validateForm(formElement) && !activeEscape) {
        triggerButtonEscape(e);
      }
    });
    function triggerButtonEscape(e) {
      if (activeEscape) return;
      activeEscape = true;
      const containerRect = btnContainer.getBoundingClientRect();
      const btnRect = button.getBoundingClientRect();
      const btnWidth = btnRect.width;
      const btnHeight = btnRect.height;
      const maxX = containerRect.width - btnWidth;
      const maxY = containerRect.height - btnHeight;
      const mouseRelX = e.clientX - containerRect.left;
      const mouseRelY = e.clientY - containerRect.top;
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      let dirX = centerX - mouseRelX;
      let dirY = centerY - mouseRelY;
      const length = Math.sqrt(dirX * dirX + dirY * dirY);
      if (length > 0) {
        dirX /= length;
        dirY /= length;
      }
      const angleDeviation = (Math.random() - 0.5) * Math.PI;
      const newDirX = dirX * Math.cos(angleDeviation) - dirY * Math.sin(angleDeviation);
      const newDirY = dirX * Math.sin(angleDeviation) + dirY * Math.cos(angleDeviation);
      const escapeDistance = 80 + Math.random() * 100;
      let newX = mouseRelX + newDirX * escapeDistance;
      let newY = mouseRelY + newDirY * escapeDistance;
      newX = Math.max(0, Math.min(maxX, newX));
      newY = Math.max(0, Math.min(maxY, newY));
      button.classList.add('run-away');
      button.style.transform = `translate(${newX}px, ${newY}px)`;
      const rotationAngle = Math.atan2(newDirY, newDirX) * (180 / Math.PI);
      button.style.transform += ` rotate(${rotationAngle}deg)`;
      clearTimeout(escapeTimeout);
      escapeTimeout = setTimeout(() => {
        activeEscape = false;
        const updatedBtnRect = button.getBoundingClientRect();
        if (
          window[buttonClickedFlag] && 
          lastMouseX >= updatedBtnRect.left && 
          lastMouseX <= updatedBtnRect.right && 
          lastMouseY >= updatedBtnRect.top && 
          lastMouseY <= updatedBtnRect.bottom
        ) {
          triggerButtonEscape({clientX: lastMouseX, clientY: lastMouseY});
        }
      }, 100);
    }
    button.addEventListener('click', (e) => {
      window[buttonClickedFlag] = true;
      if (!validateForm(formElement)) {
        e.preventDefault();
        formElement.animate([
          { transform: 'translateX(-5px)' },
          { transform: 'translateX(5px)' },
          { transform: 'translateX(-3px)' },
          { transform: 'translateX(3px)' },
          { transform: 'translateX(0)' }
        ], {
          duration: 500,
          easing: 'cubic-bezier(0.36, 0.07, 0.19, 0.97)'
        });
      }
    });
    formElement.querySelectorAll('input').forEach(input => {
      input.addEventListener('input', () => {
        if (validateForm(formElement)) {
          button.style.transform = 'translate(0, 0)';
          activeEscape = false;
        }
      });
    });
  }
  setupRunAwayButton(signinButton, signinBtnContainer, signinFormElement, 'signinButtonClicked');
  setupRunAwayButton(signupButton, signupBtnContainer, signupFormElement, 'signupButtonClicked');
  
  signUpButton.addEventListener('click', () => {
    pageContainer.classList.add('to-signup');
    bgElements.forEach(element => {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    progressBar.style.transform = 'translateX(100%)';
    registerForm.classList.remove('slide-up');
    void registerForm.offsetWidth;
    registerForm.classList.add('slide-up');
    signupButton.style.transform = 'translate(0, 0)';
    const formElements = registerForm.querySelectorAll('form > *');
    formElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'all 0.5s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300);
    });
  });
  
  signInButton.addEventListener('click', () => {
    pageContainer.classList.remove('to-signup');
    bgElements.forEach(element => {
      const randomX = (Math.random() - 0.5) * 200;
      const randomY = (Math.random() - 0.5) * 200;
      element.style.transform = `translate(${randomX}px, ${randomY}px)`;
    });
    progressBar.style.transform = 'translateX(0)';
    loginForm.classList.remove('slide-up');
    void loginForm.offsetWidth;
    loginForm.classList.add('slide-up');
    signinButton.style.transform = 'translate(0, 0)';
    const formElements = loginForm.querySelectorAll('form > *');
    formElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      setTimeout(() => {
        el.style.transition = 'all 0.5s ease';
        el.style.transitionDelay = `${index * 0.1}s`;
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 300);
    });
  });
  signinFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    signinButtonClicked = true;
    if (validateForm(signinFormElement)) {
      alert('Sign in successful!');
    }
  });
  
  signupFormElement.addEventListener('submit', function(e) {
    e.preventDefault();
    signupButtonClicked = true;
    if (validateForm(signupFormElement)) {
      alert('Account created successfully!');
    }
  });
});