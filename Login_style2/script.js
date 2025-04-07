const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const formSlider = document.getElementById('formSlider');

loginBtn.addEventListener('click', () => {
    formSlider.style.transform = 'translateX(0%)';
    loginBtn.classList.add('active');
    registerBtn.classList.remove('active');
});

registerBtn.addEventListener('click', () => {
    formSlider.style.transform = 'translateX(-50%)';
    registerBtn.classList.add('active');
    loginBtn.classList.remove('active');
});

const toggleButtons = document.querySelectorAll('.toggle-btns button');
toggleButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    button.style.setProperty('--x', `${x}px`);
    button.style.setProperty('--y', `${y}px`);
    });

    button.addEventListener('mouseleave', () => {
    button.style.setProperty('--x', '50%');
    button.style.setProperty('--y', '50%');
    });
});

const particlesContainer = document.querySelector('.particles');
function createParticle() {
    const particle = document.createElement('span');
    const size = Math.random() * 8 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${Math.random() * 10 + 5}s`;
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particlesContainer.appendChild(particle);
    
    setTimeout(() => particle.remove(), 15000);
}

setInterval(createParticle, 200);