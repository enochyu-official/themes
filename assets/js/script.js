function applyTheme(theme) {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  const navbar = document.getElementById('mainNavbar');

  const isDark = theme === 'dark';
  body.classList.toggle('dark-mode', isDark);

  if (navbar) navbar.setAttribute('data-bs-theme', isDark ? 'dark' : 'light');

  if (icon) {
    icon.classList.toggle('fa-sun', isDark);
    icon.classList.toggle('fa-moon', !isDark);
  }

  localStorage.setItem('theme', theme);
  syncGiscusTheme();
}

function initializeTheme() {
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  setTimeout(syncGiscusTheme, 100);
}

function toggleTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  applyTheme(isDark ? 'light' : 'dark');
}

const GISCUS_ORIGIN = 'https://giscus.app';

function syncGiscusTheme() {
  const isDark = document.body.classList.contains('dark-mode');
  const theme = isDark ? 'dark' : 'light';
  const iframe = document.querySelector('iframe.giscus-frame');
  
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage(
      { giscus: { setConfig: { theme } } },
      GISCUS_ORIGIN
    );
  }
}

window.addEventListener('message', (event) => {
  if (event.origin === GISCUS_ORIGIN && event.data.giscus?.discussion) {
    syncGiscusTheme();
  }
});

const themeObserver = new MutationObserver(() => {
  syncGiscusTheme();
});

document.addEventListener('DOMContentLoaded', () => {
  initializeTheme();
  
  themeObserver.observe(document.body, {
    attributes: true,
    attributeFilter: ['class']
  });
  
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

  window.addEventListener('load', () => {
    setTimeout(syncGiscusTheme, 500);
  });
});

