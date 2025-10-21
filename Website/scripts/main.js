document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('primary-nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      // toggle attribute for CSS
      if (expanded) {
        nav.setAttribute('aria-hidden', 'true');
      } else {
        nav.setAttribute('aria-hidden', 'false');
      }
    });
  }

  // Smooth scrolling for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Close mobile nav when a link is clicked
        if (navToggle && nav) {
          navToggle.setAttribute('aria-expanded', 'false');
          nav.setAttribute('aria-hidden', 'true');
        }
      }
    });
  });

  // Inject current year in footer
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Contact form validation with minimal UX (no network call)
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      status.textContent = '';
      const formData = new FormData(form);
      const name = formData.get('name')?.toString().trim();
      const email = formData.get('email')?.toString().trim();
      const message = formData.get('message')?.toString().trim();

      // basic validation
      if (!name || !email || !message) {
        status.textContent = 'Please complete all required fields.';
        status.style.color = 'tomato';
        return;
      }
      // simple email check
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        status.textContent = 'Please enter a valid email address.';
        status.style.color = 'tomato';
        return;
      }

      // pretend to send
      status.style.color = '';
      status.textContent = 'Sending...';
      setTimeout(() => {
        status.style.color = 'lightgreen';
        status.textContent = 'Thanks — your message was received (demo only).';
        form.reset();
      }, 800);
    });
  }
});