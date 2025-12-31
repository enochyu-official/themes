function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById('theme-icon');
  
  body.classList.toggle('dark-mode');
  
  if (body.classList.contains('dark-mode')) {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
    localStorage.setItem('theme', 'dark');
  } else {
      icon.classList.remove('fa-sun');
      icon.classList.add('fa-moon');
      localStorage.setItem('theme', 'light');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  const icon = document.getElementById('theme-icon');
  
  if (savedTheme === 'dark') {
  document.body.classList.add('dark-mode');

    if (icon) {
      icon.classList.remove('fa-moon');
      icon.classList.add('fa-sun');
    }
  }

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

  const observer = new IntersectionObserver((entries) => {
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
    observer.observe(heading);
  });
});


