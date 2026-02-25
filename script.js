// ============================================
// SMOOTH SCROLL & SCROLL-REVEAL ANIMATIONS
// ============================================

/**
 * Scroll-Reveal Animation Observer
 * Triggers fade-in and slide-in animations when elements enter viewport
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // Add delay based on index for staggered effect
      const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
      entry.target.style.animationDelay = `${delay}ms`;
      entry.target.classList.add('show');
      scrollObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.addEventListener('DOMContentLoaded', () => {
  const animatedElements = document.querySelectorAll('.fade-in, .slide-in, .fade-in-hero');
  animatedElements.forEach(el => scrollObserver.observe(el));
});

// ============================================
// MOBILE HAMBURGER MENU TOGGLE
// ============================================
const menuToggle = document.getElementById('menu-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-links a');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('active');
  });
}

// Close menu when a link is clicked
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('header') && navMenu.classList.contains('active')) {
    menuToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('active');
  }
});

// Initialize theme from localStorage (light by default)
document.addEventListener('DOMContentLoaded', () => {
  const preferred = localStorage.getItem('theme') || 'light';
  if (preferred === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  else document.documentElement.removeAttribute('data-theme');

  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const isDark = preferred === 'dark';
    toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    toggle.addEventListener('click', () => {
      const currentlyDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (currentlyDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        toggle.setAttribute('aria-pressed', 'false');
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggle.setAttribute('aria-pressed', 'true');
      }
    });
  }
});

// ============================================
// SMOOTH ANCHOR SCROLL HANDLER
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#' && document.querySelector(href)) {
      e.preventDefault();
      const target = document.querySelector(href);
      const headerHeight = 70; // navbar height
      const targetPosition = target.offsetTop - headerHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ============================================
// CONTACT FORM HANDLING
// ============================================
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      return;
    }
    
    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    // Show success message
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = '✓ Message Sent!';
    submitButton.style.background = 'linear-gradient(90deg, var(--accent-2), var(--accent))';
    
    // Reset form
    setTimeout(() => {
      contactForm.reset();
      submitButton.textContent = originalText;
      submitButton.style.background = '';
    }, 2000);
  });
}

// ============================================
// BUTTON CLICK RIPPLE EFFECT
// ============================================
document.querySelectorAll('.btn').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.style.position = 'absolute';
    ripple.style.background = 'radial-gradient(circle, rgba(255,255,255,0.5), transparent)';
    ripple.style.borderRadius = '50%';
    ripple.style.pointerEvents = 'none';
    ripple.style.animation = 'ripple 0.6s ease-out';
    
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation to stylesheet dynamically
const style = document.createElement('style');
style.innerHTML = `
  @keyframes ripple {
    to {
      transform: scale(2);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 10) {
    navbar.style.boxShadow = 'var(--shadow-md)';
  } else {
    navbar.style.boxShadow = 'var(--shadow-sm)';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// PROJECT CARD INTERACTIVE EFFECTS
// ============================================
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s cubic-bezier(0.23, 1, 0.32, 1)';
  });
});

// ============================================
// SKILL TAG HOVER EFFECT
// ============================================
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.style.cursor = 'pointer';
  tag.addEventListener('mouseenter', function() {
    this.style.background = 'var(--surface)'; /* remains variable based */
  });
  tag.addEventListener('mouseleave', function() {
    this.style.background = 'var(--white)'; /* remain variable */
  });
});

// ============================================
// NAVBAR ACTIVE LINK DETECTOR
// ============================================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = 'var(--text)';
      });
      if (navLink) {
        navLink.style.color = 'var(--accent)';
      }
    }
  });
});

// ============================================
// PAGE LOAD ANIMATION
// ============================================
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
  document.body.style.animation = 'fadeIn 0.5s ease-in';
});

// ============================================
// CONTACT BUTTON EMAIL VALIDATION
// ============================================
const emailButton = document.querySelector('a[href^="mailto:"]');
if (emailButton) {
  emailButton.addEventListener('mouseenter', function() {
    this.style.textDecoration = 'none';
  });
}

// ============================================
// ENHANCED ACCESSIBILITY
// ============================================

// Ensure form labels are properly associated
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', function(e) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.setAttribute('aria-invalid', 'true');
        isValid = false;
      } else {
        input.setAttribute('aria-invalid', 'false');
      }
    });
  });
});
