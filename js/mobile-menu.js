/**
 * Mobile Menu Functionality
 */

(function() {
  'use strict';

  function initMobileMenu() {
    // Create mobile menu elements
    const header = document.querySelector('.header');
    const navMenu = document.querySelector('.nav-menu');

    if (!header || !navMenu) {
      console.warn('Header or nav menu not found');
      return;
    }

    // Create menu toggle button if it doesn't exist
    let menuToggle = document.querySelector('.mobile-menu-toggle');
    if (!menuToggle) {
      menuToggle = document.createElement('button');
      menuToggle.className = 'mobile-menu-toggle';
      menuToggle.setAttribute('aria-label', 'Toggle menu');
      menuToggle.innerHTML = '&#9776;'; // Hamburger icon

      const navBar = document.querySelector('.nav-bar .container');
      if (navBar) {
        navBar.appendChild(menuToggle);
      }
    }

    // Create overlay if it doesn't exist
    let overlay = document.querySelector('.mobile-menu-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.className = 'mobile-menu-overlay';
      document.body.appendChild(overlay);
    }

    // Create close button for mobile menu
    let closeButton = navMenu.querySelector('.menu-close');
    if (!closeButton) {
      closeButton = document.createElement('button');
      closeButton.className = 'menu-close';
      closeButton.setAttribute('aria-label', 'Close menu');
      closeButton.innerHTML = '&times;';
      closeButton.style.cssText = `
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        padding: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      navMenu.insertBefore(closeButton, navMenu.firstChild);
    }

    // Toggle menu function
    function toggleMenu() {
      const isActive = navMenu.classList.contains('active');

      if (isActive) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    // Open menu
    function openMenu() {
      navMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Close menu
    function closeMenu() {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners
    menuToggle.addEventListener('click', toggleMenu);
    closeButton.addEventListener('click', closeMenu);
    overlay.addEventListener('click', closeMenu);

    // Close menu when a nav link is clicked
    const navLinks = navMenu.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        // Small delay to allow navigation to start
        setTimeout(closeMenu, 100);
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });

    // Close menu on window resize to desktop size
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (window.innerWidth > 768 && navMenu.classList.contains('active')) {
          closeMenu();
        }
      }, 250);
    });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMobileMenu);
  } else {
    initMobileMenu();
  }

})();
