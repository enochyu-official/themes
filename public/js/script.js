document.querySelectorAll('.toc a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

const headingObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.getAttribute('id');
    const tocLink = document.querySelector(`.toc a[href="#${id}"]`);
    
    if (entry.isIntersecting) {
      document.querySelectorAll('.toc a').forEach(link => {
        link.style.opacity = '0.7';
        link.style.fontWeight = 'normal';
      });
      if (tocLink) {
        tocLink.style.opacity = '1';
        tocLink.style.fontWeight = 'bold';
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.post-body h2, .post-body h3').forEach((heading) => {
  headingObserver.observe(heading);
});

const currentPath = window.location.pathname;
const links = document.querySelectorAll('.nav-link');
links.forEach(link => {
  if (link.getAttribute('href') === currentPath) {
    link.classList.add('active');
  }
});


// Burger
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
  
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });
  
  document.addEventListener('click', (e) => {
    if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}


// MathJax
MathJax = {
  options: {
    menuOptions: {
      settings: {
        enrich: false,
        collapsible: false,
        speech: false,
        braille: false,
        assistiveMml: false,
      }
    }
  },
  tex: {
    inlineMath: [['$', '$']],
    displayMath: [['\[', '\]'], ['$$', '$$']]
  },
  svg: { fontCache: 'global' }
};

