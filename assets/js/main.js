// Gongbei Port Learning Hub - Core JavaScript
document.addEventListener('DOMContentLoaded', function() {
  
  // FAQ Accordion Functionality
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', () => {
        // Close other open items
        faqItems.forEach(otherItem => {
          if (otherItem !== item && otherItem.classList.contains('active')) {
            otherItem.classList.remove('active');
          }
        });
        // Toggle current item
        item.classList.toggle('active');
      });
    }
  });

  // Lazy Loading for Images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
          }
          img.classList.remove('lazy-load');
          observer.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
      img.classList.remove('lazy-load');
    });
  }

  // Language Switcher (Client-side demo)
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const targetLang = this.dataset.lang;
      
      // Remove active class from all buttons
      langButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      // In production, this would redirect to the actual language page
      // window.location.href = `/${targetLang}/`;
      console.log(`Switching to language: ${targetLang}`);
    });
  });

  // Smooth Scroll for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && document.querySelector(href)) {
        e.preventDefault();
        document.querySelector(href).scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Mobile Menu Toggle (if needed)
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // Dynamic Year in Footer
  const yearElement = document.querySelector('.current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Performance: Preload critical resources hint
  if ('link' in document) {
    const preloadLinks = [
      { rel: 'preload', href: '/assets/css/style.css', as: 'style' }
    ];
    
    preloadLinks.forEach(link => {
      const linkEl = document.createElement('link');
      linkEl.rel = link.rel;
      linkEl.href = link.href;
      linkEl.as = link.as;
      document.head.appendChild(linkEl);
    });
  }

  console.log('Gongbei Port Learning Hub initialized successfully');
});
