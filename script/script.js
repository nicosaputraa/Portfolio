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

  // Volume awal
  audio.volume = 0.2;

  // Ambil status mute dari localStorage
  let storedMuted = localStorage.getItem("audioMuted");
  if (storedMuted === null) storedMuted = "true"; // default pertama: MUTE

  audio.muted = storedMuted === "true";
  audioBtn.textContent = audio.muted ? "🔇" : "🔊";

  // Fungsi untuk update tombol dan simpan status
  function updateStatus() {
    audioBtn.textContent = audio.muted ? "🔇" : "🔊";
    localStorage.setItem("audioMuted", audio.muted);
  }

  // Fungsi aman untuk mencoba play audio
  function tryPlay() {
    if (!audio.muted && audio.paused) {
      audio.play().catch((err) => {
        console.warn("Autoplay diblokir browser:", err);
      });
    }
  }

  // Klik tombol untuk toggle mute/unmute
  audioBtn.addEventListener("click", () => {
    if (audio.muted) {
      audio.muted = false;
      tryPlay();
    } else {
      audio.muted = true;
      audio.pause();
    }
    updateStatus();
  });

  // 🔥 Jalankan audio setelah interaksi user pertama (klik/scroll)
  const enablePlayOnInteraction = () => {
    if (!audio.muted) {
      tryPlay();
    }
    document.removeEventListener("click", enablePlayOnInteraction);
    document.removeEventListener("scroll", enablePlayOnInteraction);
  };

  document.addEventListener("click", enablePlayOnInteraction);
  document.addEventListener("scroll", enablePlayOnInteraction);

  // Jika sebelumnya UNMUTE, coba mainkan begitu halaman dimuat
  window.addEventListener("load", () => {
    if (!audio.muted) {
      tryPlay();
    }
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



