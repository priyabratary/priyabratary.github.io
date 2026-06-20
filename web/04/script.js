const header = document.querySelector('.site-header');
const heroVisual = document.querySelector('#heroVisual');
const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

document.querySelector('#year').textContent = new Date().getFullYear();

const setHeaderState = () => header.classList.toggle('scrolled', window.scrollY > 20);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

const revealElements = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -30px' });

  revealElements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => element.classList.add('visible'));
}

if (heroVisual && !reducedMotion.matches && window.matchMedia('(pointer: fine)').matches) {
  const visualArea = heroVisual.closest('.hero') || heroVisual.parentElement;
  visualArea.addEventListener('pointermove', (event) => {
    const bounds = visualArea.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    visualArea.style.setProperty('--pointer-x', `${50 + x * 22}%`);
    visualArea.style.setProperty('--pointer-y', `${50 + y * 16}%`);
    heroVisual.style.transform = `translateX(-50%) rotateX(${y * -3}deg) rotateY(${x * 4}deg) translate3d(${x * 10}px, ${y * 6}px, 0)`;
  });
  visualArea.addEventListener('pointerleave', () => {
    visualArea.style.setProperty('--pointer-x', '50%');
    visualArea.style.setProperty('--pointer-y', '50%');
    heroVisual.style.transform = 'translateX(-50%) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)';
  });
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const fields = [...form.querySelectorAll('input, textarea')];
  let firstInvalid = null;

  fields.forEach((field) => {
    const valid = field.checkValidity();
    field.classList.toggle('invalid', !valid);
    if (!valid && !firstInvalid) firstInvalid = field;
  });

  if (firstInvalid) {
    formStatus.textContent = 'Please complete all fields with valid information.';
    formStatus.className = 'form-status error';
    firstInvalid.focus();
    return;
  }

  // Replace this success handler when connecting a real form backend later.
  formStatus.textContent = 'Thank you! Your message has been received.';
  formStatus.className = 'form-status success';
  form.reset();
  fields.forEach((field) => field.classList.remove('invalid'));
});

form.addEventListener('input', (event) => {
  if (event.target.matches('input, textarea')) {
    event.target.classList.remove('invalid');
    if (formStatus.classList.contains('error')) {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }
  }
});
