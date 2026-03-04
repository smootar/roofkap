/**
 * RoofKAP Main JavaScript
 */

(function() {
  'use strict';

  // Smooth scrolling for anchor links
  function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
      link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        // Skip empty hash links
        if (href === '#' || href === '#!') {
          return;
        }

        const target = document.querySelector(href);

        if (target) {
          e.preventDefault();

          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });

          // Update URL without triggering scroll
          history.pushState(null, null, href);
        }
      });
    });
  }

  // Track phone number clicks (for analytics)
  function initPhoneTracking() {
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');

    phoneLinks.forEach(link => {
      link.addEventListener('click', function() {
        const phoneNumber = this.getAttribute('href').replace('tel:', '');
        console.log('Phone number clicked:', phoneNumber);

        // TODO: Add Google Analytics event tracking here
        // Example: gtag('event', 'phone_click', { phone_number: phoneNumber });
      });
    });
  }

  // Form validation
  function initFormValidation() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
      form.addEventListener('submit', function(e) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');

        requiredFields.forEach(field => {
          if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');

            // Remove error class on input
            field.addEventListener('input', function() {
              this.classList.remove('error');
            }, { once: true });
          }
        });

        // Validate email format
        const emailFields = form.querySelectorAll('input[type="email"]');
        emailFields.forEach(field => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (field.value && !emailRegex.test(field.value)) {
            isValid = false;
            field.classList.add('error');
          }
        });

        // Validate phone format (basic)
        const phoneFields = form.querySelectorAll('input[type="tel"]');
        phoneFields.forEach(field => {
          const phoneRegex = /^[\d\s\-\(\)]+$/;
          if (field.value && !phoneRegex.test(field.value)) {
            isValid = false;
            field.classList.add('error');
          }
        });

        if (!isValid) {
          e.preventDefault();
          alert('Please fill out all required fields correctly.');
        }
      });
    });
  }

  // Highlight active navigation link
  function initActiveNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
      const linkPage = link.getAttribute('href');

      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html') ||
          (currentPage === '/' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }

  // Add error styling to CSS dynamically
  function addErrorStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2) !important;
      }
    `;
    document.head.appendChild(style);
  }

  // Initialize all functions when DOM is ready
  function init() {
    initSmoothScroll();
    initPhoneTracking();
    initFormValidation();
    initActiveNavigation();
    addErrorStyles();
  }

  // Run initialization
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
