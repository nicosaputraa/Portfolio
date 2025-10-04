// ============================
// Sticky Navbar + Back Button
// ============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  if (navbar) navbar.classList.toggle("sticky", window.scrollY > 0);

  const backBtn = document.querySelector(".back-btn");
  if (backBtn) backBtn.classList.toggle("sticky", window.scrollY > 50);
});

// ============================
// Kontrol Audio Background (tanpa autoplay)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const audioBtn = document.getElementById("audio-btn");

  // set volume
  audio.volume = 0.2;

  // ambil status mute sebelumnya
  let storedMuted = localStorage.getItem("audioMuted");
  if (storedMuted === null) storedMuted = "true"; // default: muted
  audio.muted = storedMuted === "true";
  audioBtn.textContent = audio.muted ? "🔇" : "🔊";

  // kalau sebelumnya unmute → play otomatis
  if (!audio.muted) {
    audio.play().catch(() => console.log("Autoplay diblokir, tunggu interaksi user."));
  }

  // toggle saat klik
  audioBtn.addEventListener("click", () => {
    if (audio.paused) audio.play().catch(() => {});
    audio.muted = !audio.muted;
    localStorage.setItem("audioMuted", audio.muted);
    audioBtn.textContent = audio.muted ? "🔇" : "🔊";
  });
});


// ============================
// Animasi Fade Up Universal
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-element").forEach((el) => observer.observe(el));
});

// ============================
// Animasi Stagger untuk Skill Card
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");
  const skillSection = document.querySelector(".skills-container");
  if (!skillSection) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        skillCards.forEach((card, i) => {
          setTimeout(() => card.classList.add("fade-in"), i * 150);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(skillSection);
});

// ============================
// Navbar Mobile (Hamburger + Dropdown Toggle)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".nav-links li.dropdown");
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector(".dropbtn");
    if (!link) return;
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  });
});

// ============================
// Animasi Project Card & Header
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const title = document.querySelector(".project-title");
  const subtitle = document.querySelector(".project-subtitle");

  const cardObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("show"), index * 250);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  cards.forEach((card) => {
    card.classList.add("fade-up");
    cardObserver.observe(card);
  });

  const headerObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("show"), index * 400);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  if (title) headerObserver.observe(title);
  if (subtitle) headerObserver.observe(subtitle);
});

