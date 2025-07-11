/**
 * Modern.js - Additional JavaScript functionality for the modern CV site
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modern features
  initRevealAnimations();
  initBackToTopButton();
  initPrintOptimization();
  initLazyLoading();
  initAccessibility();
});

/**
 * Reveal animations when scrolling
 */
function initRevealAnimations() {
  // Function to check if an element is in viewport
  function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
      rect.bottom >= 0
    );
  }
  
  // Function to handle scroll events
  function handleScroll() {
    const elements = document.querySelectorAll('.reveal');
    elements.forEach(el => {
      if (isElementInViewport(el)) {
        el.classList.add('active');
      }
    });
  }
  
  // Add event listener
  window.addEventListener('scroll', handleScroll);
  
  // Trigger once on page load
  setTimeout(handleScroll, 300);
}

/**
 * Back to top button functionality
 */
function initBackToTopButton() {
  const backToTopBtn = document.getElementById('back-to-top');
  
  if (!backToTopBtn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  
  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Dark mode functionality removed
 */

/**
 * High contrast functionality removed
 */

/**
 * Print optimization
 */
function initPrintOptimization() {
  // Add print-specific styles dynamically
  window.addEventListener('beforeprint', () => {
    // Hide elements not needed for printing
    const elementsToHide = [
      '.back-to-top',
      '.language-toggle',
      '.visitor-counter',
      '.skip-to-content'
    ];
    
    elementsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.dataset.originalDisplay = el.style.display;
        el.style.display = 'none';
      });
    });
    
    // Expand all collapsed sections for printing
    const collapsedElements = document.querySelectorAll('.collapse');
    collapsedElements.forEach(el => {
      el.classList.add('show');
    });
  });
  
  // Restore original display after printing
  window.addEventListener('afterprint', () => {
    const elementsToRestore = document.querySelectorAll('[data-original-display]');
    elementsToRestore.forEach(el => {
      el.style.display = el.dataset.originalDisplay;
      delete el.dataset.originalDisplay;
    });
    
    // Restore collapsed state
    const collapsedElements = document.querySelectorAll('.collapse.show');
    collapsedElements.forEach(el => {
      if (!el.dataset.wasShown) {
        el.classList.remove('show');
      }
    });
    
    // Dark mode restoration code removed
  });
}

/**
 * Lazy loading for images
 */
function initLazyLoading() {
  // Check if browser supports Intersection Observer
  if ('IntersectionObserver' in window) {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
}

/**
 * Additional accessibility enhancements
 */
function initAccessibility() {
  // Handle keyboard navigation
  document.addEventListener('keydown', (e) => {
    // Skip to main content when Tab is pressed
    if (e.key === 'Tab' && !e.shiftKey && !e.altKey && !e.ctrlKey) {
      const skipLink = document.querySelector('.skip-to-content');
      if (skipLink && document.activeElement === document.body) {
        e.preventDefault();
        skipLink.focus();
      }
    }
    
    // Pressing 'Escape' closes any open UI components
    if (e.key === 'Escape') {
      const backToTopBtn = document.getElementById('back-to-top');
      if (backToTopBtn && backToTopBtn.classList.contains('show')) {
        backToTopBtn.classList.remove('show');
      }
    }
  });
  
  // Ensure proper focus states for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])');
  interactiveElements.forEach(el => {
    if (!el.hasAttribute('tabindex')) {
      el.setAttribute('tabindex', '0');
    }
  });
  
  // Add appropriate ARIA roles to elements
  document.querySelectorAll('.timeline').forEach(el => {
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'list');
    }
  });
  
  document.querySelectorAll('.timeline-entry').forEach(el => {
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'listitem');
    }
  });
  
  document.querySelectorAll('.skills-cloud').forEach(el => {
    if (!el.hasAttribute('role')) {
      el.setAttribute('role', 'group');
      el.setAttribute('aria-label', 'Skills');
    }
  });
  
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (prefersReducedMotion.matches) {
    document.documentElement.classList.add('reduced-motion');
  }
}
