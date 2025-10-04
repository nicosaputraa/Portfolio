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

  // Volume awal (nggak terlalu keras)
  audio.volume = 0.2;

  // Ambil status mute dari localStorage
  let storedMuted = localStorage.getItem("audioMuted");
  if (storedMuted === null) storedMuted = "true"; // default: mute pertama kali

  audio.muted = storedMuted === "true";
  audioBtn.textContent = audio.muted ? "🔇" : "🔊";

  // Fungsi untuk update tampilan & simpan status
  function updateStatus() {
    localStorage.setItem("audioMuted", audio.muted);
    audioBtn.textContent = audio.muted ? "🔇" : "🔊";
  }

  // Fungsi aman untuk play (supaya nggak error di browser)
  function safePlay() {
    if (audio.muted) return;
    audio.play().catch((err) => {
      console.warn("Autoplay diblokir oleh browser:", err);
    });
  }

  // Kalau sebelumnya unmute → mainkan musik setelah interaksi pertama
  if (!audio.muted) {
    const enableOnInteraction = () => {
      safePlay();
      document.removeEventListener("click", enableOnInteraction);
      document.removeEventListener("scroll", enableOnInteraction);
    };
    document.addEventListener("click", enableOnInteraction);
    document.addEventListener("scroll", enableOnInteraction);
  }

  // Tombol toggle mute/unmute
  audioBtn.addEventListener("click", () => {
    if (audio.muted) {
      audio.muted = false;
      safePlay();
    } else {
      audio.muted = true;
      audio.pause();
    }
    updateStatus();
  });
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


