const navbarToggler = document.querySelector('.navbar-toggler');

const navbarLinks = [
  { href: "about.html", text: "About" },
  { href: "skills.html", text: "Skills" },
  { href: "#projects", text: "Projects" },
  { href: "contact.html", text: "Contact" }
];

const createNavLink = ({ href, text }) => {
  const navList = document.createElement('li');
  navList.classList.add('nav-item');

  const navLink = document.createElement('a');
  navLink.classList.add('nav-link');
  navLink.href = href;
  navLink.textContent = text;

  navList.appendChild(navLink);
  return navList;
};

const renderLinks = () => {
  const navElements = document.querySelectorAll('.nav-links');

  navElements.forEach(navElement => {
    const fragment = document.createDocumentFragment();
    navbarLinks.forEach(link => fragment.appendChild(createNavLink(link)));
    navElement.appendChild(fragment);
  });
};

const offcanvasMenu = document.getElementById('offcanvaslinks');
const menuButton = document.querySelector('.menu-button');

if (navbarToggler) {
  navbarToggler.addEventListener('click', () => {
  const isCollapsed = navbarToggler.classList.contains('collapsed');
  navbarToggler.classList.toggle('collapsed');

  navbarToggler.textContent = isCollapsed ? 'Menu ▼' : 'Menu ▲';
  navbarToggler.setAttribute("aria-label", isCollapsed ? "Expand navigation menu" : "Collapse navigation menu");
  });
};

if (renderLinks) {
  document.addEventListener("DOMContentLoaded", renderLinks);
};

if (offcanvasMenu) {
  function handleOffcanvasVisibility() {
    const isButtonVisible = window.getComputedStyle(menuButton).display !== 'none';

    isButtonVisible ? offcanvasMenu.classList.remove("show") : offcanvasMenu.classList.add("show");
  };

  offcanvasMenu.addEventListener('hidden.bs.offcanvas', handleOffcanvasVisibility);

  window.addEventListener("load", handleOffcanvasVisibility);
  window.addEventListener("resize", handleOffcanvasVisibility);
};

const handleGitboxInteractions = () => {
  const gitbox = document.getElementById('gitbox');

  if (gitbox) {
    const emailInput = document.getElementById('email');
    if (emailInput) {
      emailInput.addEventListener('input', validateEmail);
    }

    function validateEmail(e) {
      const input = e.target;
      const feedback = document.getElementById('emailStatus');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;

      if (input.value === '') {
        feedback.textContent = '';
        input.classList.remove('is-valid', 'is-invalid');
      } else if (emailPattern.test(input.value)) {
        feedback.textContent = '✅ Valid email';
        input.classList.add('is-valid');
        input.classList.remove('is-invalid');
      } else {
        feedback.textContent = '❌ Invalid email format';
        input.classList.add('is-invalid');
        input.classList.remove('is-valid');
      }
    }

    const messageBox = document.getElementById('message');
    if (messageBox) {
      messageBox.addEventListener('input', autoResize);
    }

    function autoResize(e) {
      const textarea = e.target;
      textarea.style.height = 'auto';
      textarea.style.height = '${textarea.scrollHeight}px';
    }

    gitbox.addEventListener('submit', function (event) {
      event.preventDefault();
      alert('Thank you for your message!');
    });
  }
};

if (handleGitboxInteractions) {
  document.addEventListener('DOMContentLoaded', handleGitboxInteractions);
}