if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
  document.querySelectorAll('video').forEach(v => {
    v.setAttribute('playsinline', '');
    v.setAttribute('webkit-playsinline', '');
  });
}

const navbarToggler = document.querySelector('.navbar-toggler');

const navbarLinks = [
  { href: "about.html", text: "About" },
  { href: "skills.html", text: "Skills" },
  { href: "projects.html", text: "Projects" },
  { href: "contacts.html", text: "Contacts" }
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
  const navbarCollapse = document.getElementById('navbarlinks');
  const updateToggler = (expanded) => {
    navbarToggler.textContent = expanded ? 'Menu ▲' : 'Menu ▼';
    navbarToggler.setAttribute(
      'aria-label',
      expanded ? 'Collapse navigation menu' : 'Expand navigation menu'
    );
  };

  updateToggler(navbarCollapse.classList.contains('show'));

  navbarCollapse.addEventListener('shown.bs.collapse', () => updateToggler(true));
  navbarCollapse.addEventListener('hidden.bs.collapse', () => updateToggler(false));
}


if (offcanvasMenu) {
  function handleOffcanvasVisibility() {
    const isButtonVisible = window.getComputedStyle(menuButton).display !== 'none';

    if (isButtonVisible) {
      offcanvasMenu.classList.remove("show");
      offcanvasMenu.setAttribute("aria-hidden", "true");
      menuButton.setAttribute("aria-expanded", "false");
    } else {
      offcanvasMenu.classList.add("show");
      offcanvasMenu.setAttribute("aria-hidden", "false");
      menuButton.setAttribute("aria-expanded", "true");
    }
  };

  offcanvasMenu.addEventListener('hidden.bs.offcanvas', handleOffcanvasVisibility);

  window.addEventListener("load", handleOffcanvasVisibility);
  window.addEventListener("resize", handleOffcanvasVisibility);
};

document.querySelectorAll('.social-icons a').forEach(link => {
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener nofollow external');
  });

const handleGitboxInteractions = () => {
  const gitbox = document.getElementById("gitbox");

  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const submitButton = document.getElementById("form-submit");
  const status = document.getElementById("email-status");
  const emailError = document.getElementById("email-warning");
  const messageError = document.getElementById("message-warning");

  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})*$/;
  const getEmailValue = () => emailInput?.value?.trim() || "";
  const getMessageValue = () => messageInput?.value?.trim() || "";
  const isEmailValid = () => emailPattern.test(getEmailValue());

  const areElementsReady = () => gitbox && emailInput && messageInput && submitButton && status && emailError && messageError;
  if (!areElementsReady()) return;

  let validBefore = false;

  const updateEmailFeedback = () => {
    const emailValue = getEmailValue();
    const valid = isEmailValid();

    emailInput.classList.toggle("is-valid", valid);
    emailInput.classList.toggle("is-invalid", validBefore && !valid && emailValue !== "");

    if (emailValue === "") {
      status.textContent = "";
    } else if (valid) {
      status.textContent = "✅ Valid email";
    } else if (validBefore && !valid) {
      status.textContent = "❌ Invalid email format";
    }

    validBefore = valid;
  };

  let emailTouched = false;
  let messageTouched = false;

  const isFormValid = () => {
  return isEmailValid() && getMessageValue() !== "";
  };

  const validateInputs = () => {
    submitButton.disabled = !isFormValid();

    if (emailError) {
      emailError.style.display = emailTouched && getEmailValue() === "" ? "block" : "none";
    }

    if (messageError) {
      messageError.style.display = messageTouched && getMessageValue() === "" ? "block" : "none";
    }
  };

  const handleEmailInteraction = () => {
  emailTouched = true;
  updateEmailFeedback();
  validateInputs();
  };

  const handleMessageInteraction = () => {
  messageTouched = true;
  validateInputs();
  };

  emailInput?.addEventListener("input", handleEmailInteraction);
  emailInput?.addEventListener("blur", handleEmailInteraction);
  messageInput?.addEventListener("input", handleMessageInteraction);
  messageInput?.addEventListener("blur", handleMessageInteraction);

  const resetFormFeedback = () => {
  status.textContent = "";
  emailInput.classList.remove("is-valid", "is-invalid");
  validBefore = false;
  submitButton.disabled = true;
  emailTouched = false;
  messageTouched = false;
  emailError.style.display = "none";
  messageError.style.display = "none";
  };

  gitbox.addEventListener("submit", async (submitEvent) => {
  submitEvent.preventDefault();
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";

  if (!isFormValid()) {
    submitButton.textContent = "Submit";
    submitButton.disabled = false;
    return;
  }

  const email = getEmailValue();
  const message = getMessageValue();

  try {
    const response = await fetch("https://portfolio-jasper-aviles-projects.vercel.app/api/submit", {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message })
    });

    if (!response.ok) throw new Error("Invalid response");

    const data = await response.json();

    if (data.success) {
      submitButton.textContent = "Submitted!";
      setTimeout(() => {
        submitButton.textContent = "Submit";
      }, 3000);
      alert("Thank you for your message!");
      gitbox.reset();
      resetFormFeedback();
    } 
    
    else {
      throw new Error("Unexpected response format");
    }
  } 
  
  catch (error) {
    console.error("Submission failed:", error);
    alert("Something went wrong. Please try again.");
    submitButton.textContent = "Submit";
    submitButton.disabled = false;
  }
});


  updateEmailFeedback();
  validateInputs();
};

document.addEventListener("DOMContentLoaded", async () => {
  if (typeof renderLinks === "function") renderLinks();
  if (typeof handleGitboxInteractions === "function") handleGitboxInteractions();

    document.querySelectorAll('.run-java').forEach(btn => {
      btn.addEventListener('click', () => {
        const jar = btn.dataset.jar;
        const javaWidth = btn.dataset.width;
        const javaHeight = btn.dataset.height;

        window.open(
          `java-demo.html?jar=${encodeURIComponent(jar)}&width=${javaWidth}&height=${javaHeight}`,
          "_blank", "noopener=yes"
        );
      });
    });

  if (document.body.classList.contains("java")) {
    try {
      const params = new URLSearchParams(window.location.search);
      const jar = params.get("jar");
      const width = parseInt(params.get("width"), 10);
      const height = parseInt(params.get("height"), 10);

      await cheerpjInit({ enableSwing: true });
      cheerpjCreateDisplay(width, height, document.getElementById("java-container"));
      cheerpjRunJar(jar);
    } catch (error) {
      console.error("Error initializing CheerpJ:", error);
      alert("Something went wrong.");
    }
  }
});