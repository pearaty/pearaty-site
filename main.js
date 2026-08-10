// ==========================================
// 1. STATE & DATA
// ==========================================
const tabSlides = {
  feature: [
    "img/feature-impl.jpg",
    "img/feature-impl-2.jpg",
    "img/feature-impl-3.jpg",
    "img/feature-impl-4.jpg",
  ],
  incident: [
    "img/incident-fix.jpg",
    "img/incident-2.jpg",
    "img/incident-3.jpg",
    "img/incident-4.jpg",
  ],
  security: ["img/security-detection.jpg"],
};

let activeTab = "feature";
let currentSlideIndex = 0;
let dropdownOpen = false;
let isModalOpen = false;
let isCarouselModal = false;

// ==========================================
// 2. CAROUSEL & TAB LOGIC
// ==========================================
function renderCarousel() {
  const img = document.getElementById("tab-image");
  const dotsContainer = document.getElementById("carousel-dots");
  const prevBtn = document.getElementById("carousel-prev");
  const nextBtn = document.getElementById("carousel-next");

  const modalControls = document.getElementById("modal-carousel-controls");
  const modalDotsContainer = document.getElementById("modal-carousel-dots");

  const slides = tabSlides[activeTab] || [];

  if (!slides.length) return;

  if (currentSlideIndex >= slides.length) {
    currentSlideIndex = 0;
  }

  if (img) {
    img.src = slides[currentSlideIndex];
  }

  if (isModalOpen && isCarouselModal) {
    const modalImg = document.getElementById("modal-target-img");
    if (modalImg) modalImg.src = slides[currentSlideIndex];
  }

  let activeColorClass = "bg-indigo-400";
  if (activeTab === "incident") activeColorClass = "bg-amber-400";
  if (activeTab === "security") activeColorClass = "bg-rose-400";

  let dotsHTML = "";
  slides.forEach((_, idx) => {
    const isActive = idx === currentSlideIndex;
    dotsHTML += `<button 
      onclick="goToSlide(${idx}, event)" 
      aria-label="Go to slide ${idx + 1}"
      class="h-2 rounded-full transition-all duration-300 ${
        isActive
          ? `w-6 ${activeColorClass}`
          : "w-2 bg-slate-600 hover:bg-slate-400"
      }"></button>`;
  });

  if (slides.length <= 1) {
    if (dotsContainer) dotsContainer.classList.add("hidden");
    if (prevBtn) prevBtn.classList.add("hidden");
    if (nextBtn) nextBtn.classList.add("hidden");
  } else {
    if (dotsContainer) {
      dotsContainer.classList.remove("hidden");
      dotsContainer.innerHTML = dotsHTML;
    }
    if (prevBtn) prevBtn.classList.remove("hidden");
    if (nextBtn) nextBtn.classList.remove("hidden");
  }

  if (modalControls && modalDotsContainer) {
    if (!isCarouselModal || slides.length <= 1) {
      modalControls.classList.add("hidden");
    } else {
      modalControls.classList.remove("hidden");
      modalDotsContainer.innerHTML = dotsHTML;
    }
  }
}

function goToSlide(index, e) {
  if (e) e.stopPropagation();
  currentSlideIndex = index;
  renderCarousel();
}

function nextSlide(e) {
  if (e) e.stopPropagation();
  const slides = tabSlides[activeTab] || [];
  if (slides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex + 1) % slides.length;
  renderCarousel();
}

function prevSlide(e) {
  if (e) e.stopPropagation();
  const slides = tabSlides[activeTab] || [];
  if (slides.length <= 1) return;
  currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  renderCarousel();
}

function toggleDropdown() {
  const menu = document.getElementById("mobile-tab-menu");
  const chevron = document.getElementById("dropdown-chevron");
  if (!menu || !chevron) return;

  dropdownOpen = !dropdownOpen;

  if (dropdownOpen) {
    menu.classList.remove("opacity-0", "invisible", "translate-y-[-10px]");
    menu.classList.add("opacity-100", "visible", "translate-y-0");
    chevron.style.transform = "rotate(180deg)";
  } else {
    menu.classList.add("opacity-0", "invisible", "translate-y-[-10px]");
    menu.classList.remove("opacity-100", "visible", "translate-y-0");
    chevron.style.transform = "rotate(0deg)";
  }
}

function selectMobileTab(tabId) {
  switchTab(tabId);
  toggleDropdown();
}

function switchTab(tab) {
  activeTab = tab;
  currentSlideIndex = 0;

  document
    .querySelectorAll(".tab-content")
    .forEach((el) => el.classList.add("hidden"));

  document.querySelectorAll(".desktop-tab-btn").forEach((btn) => {
    btn.className =
      "desktop-tab-btn w-auto justify-center px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center gap-2 bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200";
  });

  const mobileActiveContent = document.getElementById(
    "mobile-tab-active-content",
  );

  if (tab === "feature") {
    const featEl = document.getElementById("content-feature");
    const tabFeat = document.getElementById("tab-feature");
    if (featEl) featEl.classList.remove("hidden");
    if (tabFeat) {
      tabFeat.className =
        "desktop-tab-btn active w-auto justify-center px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center gap-2 bg-indigo-500/10 border-indigo-500/40 text-indigo-300";
    }
    if (mobileActiveContent) {
      mobileActiveContent.innerHTML = `<i data-lucide="git-branch" class="w-5 h-5 text-indigo-400"></i><span class="text-base text-white">Feature Implementation</span>`;
    }
  } else if (tab === "incident") {
    const incEl = document.getElementById("content-incident");
    const tabInc = document.getElementById("tab-incident");
    if (incEl) incEl.classList.remove("hidden");
    if (tabInc) {
      tabInc.className =
        "desktop-tab-btn active w-auto justify-center px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center gap-2 bg-amber-500/10 border-amber-500/40 text-amber-300";
    }
    if (mobileActiveContent) {
      mobileActiveContent.innerHTML = `<i data-lucide="alert-triangle" class="w-5 h-5 text-amber-400"></i><span class="text-base text-white">Incident Triage</span>`;
    }
  } else if (tab === "security") {
    const secEl = document.getElementById("content-security");
    const tabSec = document.getElementById("tab-security");
    if (secEl) secEl.classList.remove("hidden");
    if (tabSec) {
      tabSec.className =
        "desktop-tab-btn active w-auto justify-center px-5 py-3 rounded-xl border font-semibold text-sm transition-all duration-300 flex items-center gap-2 bg-rose-500/10 border-rose-500/40 text-rose-300";
    }
    if (mobileActiveContent) {
      mobileActiveContent.innerHTML = `<i data-lucide="shield-alert" class="w-5 h-5 text-rose-400"></i><span class="text-base text-white">Shadow Asset Detection</span>`;
    }
  }

  if (window.lucide) {
    lucide.createIcons();
  }

  renderCarousel();
}

// ==========================================
// 3. MODAL HANDLERS
// ==========================================
function openModal(element) {
  const modal = document.getElementById("screenshot-modal");
  const modalImg = document.getElementById("modal-target-img");
  const modalControls = document.getElementById("modal-carousel-controls");

  if (modal && modalImg) {
    modalImg.src = element.src;
    modalImg.alt = element.alt;
    modal.classList.remove("hidden");
    document.body.classList.add("overflow-hidden");
    isModalOpen = true;

    if (element.id === "tab-image") {
      isCarouselModal = true;
      renderCarousel();
    } else {
      isCarouselModal = false;
      if (modalControls) {
        modalControls.classList.add("hidden");
      }
    }
  }
}

function closeModal() {
  const modal = document.getElementById("screenshot-modal");
  if (modal) {
    modal.classList.add("hidden");
    document.body.classList.remove("overflow-hidden");
    isModalOpen = false;
    isCarouselModal = false;
  }
}

// Expose functions globally for inline HTML event attributes
window.toggleDropdown = toggleDropdown;
window.selectMobileTab = selectMobileTab;
window.switchTab = switchTab;
window.openModal = openModal;
window.closeModal = closeModal;
window.prevSlide = prevSlide;
window.nextSlide = nextSlide;
window.goToSlide = goToSlide;

// ==========================================
// 4. TOUCH & KEYBOARD EVENTS
// ==========================================
function setupSwipeHandlers(element) {
  if (!element) return;
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;

  element.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      touchStartY = e.changedTouches[0].screenY;
    },
    { passive: true },
  );

  element.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    },
    { passive: true },
  );

  function handleSwipe() {
    const swipeThreshold = 40;
    const deltaX = touchEndX - touchStartX;
    const deltaY = touchEndY - touchStartY;

    if (
      Math.abs(deltaX) > Math.abs(deltaY) &&
      Math.abs(deltaX) > swipeThreshold
    ) {
      if (deltaX < 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }
}

window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeModal();
  } else if (isModalOpen && isCarouselModal) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      nextSlide();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevSlide();
    }
  }
});

// ==========================================
// 5. MAILING LIST FORM LOGIC
// ==========================================
function initMailingList() {
  const mailingListForm = document.getElementById("mailing-list-form");
  const formMessage = document.getElementById("form-message");

  if (!mailingListForm) return;

  mailingListForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailInput = document.getElementById("email-input");
    const submitButton = mailingListForm.querySelector('button[type="submit"]');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

    if (!emailInput || !emailRegex.test(emailInput.value)) {
      if (formMessage) {
        formMessage.textContent = "Please enter a valid email address.";
        formMessage.className =
          "text-red-400 mt-6 relative z-10 font-medium block";
      }
      return;
    }

    const originalButtonText = submitButton ? submitButton.textContent : "";
    if (submitButton) {
      submitButton.textContent = "Subscribing...";
      submitButton.disabled = true;
    }

    try {
      const response = await fetch("https://formspree.io/f/xzdwrvgy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: emailInput.value,
        }),
      });

      if (response.ok) {
        mailingListForm.classList.add("hidden");
        if (formMessage) {
          formMessage.textContent =
            "Thanks for subscribing! We'll keep you updated.";
          formMessage.className =
            "text-emerald-400 mt-6 relative z-10 font-medium block";
        }
      } else {
        const data = await response.json();
        if (formMessage) {
          if (Object.hasOwn(data, "errors")) {
            formMessage.textContent = data.errors
              .map((error) => error.message)
              .join(", ");
          } else {
            formMessage.textContent = "Oops! There was a problem subscribing.";
          }
          formMessage.className =
            "text-red-400 mt-6 relative z-10 font-medium block";
        }

        if (submitButton) {
          submitButton.textContent = originalButtonText;
          submitButton.disabled = false;
        }
      }
    } catch (error) {
      if (formMessage) {
        formMessage.textContent =
          "Oops! A network error occurred. Please try again.";
        formMessage.className =
          "text-red-400 mt-6 relative z-10 font-medium block";
      }

      if (submitButton) {
        submitButton.textContent = originalButtonText;
        submitButton.disabled = false;
      }
    }
  });
}

// ==========================================
// 6. UTILITY / AUXILIARY HANDLERS
// ==========================================
function initMobileMenu() {
  const menuToggle = document.getElementById("menu-toggle");
  const closeMenu = document.getElementById("close-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  const openMenu = () => {
    if (mobileMenu) mobileMenu.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const hideMenu = () => {
    if (mobileMenu) mobileMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  };

  if (menuToggle) menuToggle.addEventListener("click", openMenu);
  if (closeMenu) {
    closeMenu.addEventListener("click", (e) => {
      e.stopPropagation();
      hideMenu();
    });
  }
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) hideMenu();
    });
  }
  mobileLinks.forEach((link) => link.addEventListener("click", hideMenu));
}

function initTooltipsAndCalculators() {
  const tooltipTrigger = document.getElementById("tax-tooltip");

  if (tooltipTrigger) {
    tooltipTrigger.addEventListener("click", (e) => {
      e.stopPropagation();
      tooltipTrigger.classList.toggle("is-active");
    });
  }

  document.addEventListener("click", () => {
    if (tooltipTrigger) {
      tooltipTrigger.classList.remove("is-active");
    }
  });

  const engInput = document.getElementById("eng-count");
  const engInputMobile = document.getElementById("eng-count-mobile");
  const hourOutput = document.getElementById("lost-hours");
  const hourOutputMobile = document.getElementById("lost-hours-mobile");

  if (engInput || engInputMobile) {
    const updateCalculations = (val) => {
      const count = parseInt(val) || 0;
      const totalLost = (count * 12).toLocaleString();

      if (hourOutput) hourOutput.innerText = totalLost;
      if (hourOutputMobile) hourOutputMobile.innerText = totalLost;

      if (engInput) engInput.value = count;
      if (engInputMobile) engInputMobile.value = count;
    };

    if (engInput) {
      engInput.addEventListener("input", (e) =>
        updateCalculations(e.target.value),
      );
    }
    if (engInputMobile) {
      engInputMobile.addEventListener("input", (e) =>
        updateCalculations(e.target.value),
      );
    }

    updateCalculations(engInput ? engInput.value : 10);
  }
}

// ==========================================
// 7. INITIALIZATION
// ==========================================
window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    lucide.createIcons();
  }

  const carouselContainer = document.getElementById("carousel-container");
  const modalElement = document.getElementById("screenshot-modal");

  if (carouselContainer) setupSwipeHandlers(carouselContainer);
  if (modalElement) setupSwipeHandlers(modalElement);

  initMailingList();
  initMobileMenu();
  initTooltipsAndCalculators();

  renderCarousel();
});
