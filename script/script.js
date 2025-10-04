// script.js (versi perbaikan)
// Semua inisialisasi dijalankan setelah DOM ready
document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // Sticky navbar + back button
  // ----------------------------
  const navbar = document.querySelector("nav");
  const backBtn = document.querySelector(".back-btn");

  const onScroll = () => {
    if (navbar) navbar.classList.toggle("sticky", window.scrollY > 0);
    if (backBtn) backBtn.classList.toggle("sticky", window.scrollY > 50);
  };
  window.addEventListener("scroll", onScroll);

  // ============================
// Kontrol Audio Background (Fix default mute)
// ============================

// Ambil elemen audio dan tombol
const audio = document.getElementById("bg-audio");
const audioBtn = document.getElementById("audio-btn");

// Pastikan tombol ada di halaman
if (audio && audioBtn) {
  // Default: audio mute saat pertama kali load
  let storedMuted = localStorage.getItem("audioMuted");
  if (storedMuted === null) storedMuted = "true"; // default mute
  audio.muted = storedMuted === "true";

  // Set tampilan awal tombol
  audioBtn.textContent = audio.muted ? "🔇" : "🔊";

  // Set volume dan coba autoplay
  audio.volume = 0.2;

  // Browser sering blokir autoplay, jadi tetap panggil play() tapi mute
  window.addEventListener("load", () => {
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Audio berhasil diputar (meskipun mute)
          audio.muted = storedMuted === "true";
        })
        .catch(() => {
          console.log("Autoplay diblokir, tunggu interaksi user.");
        });
    }
  });

  // Klik tombol = toggle mute
  audioBtn.addEventListener("click", () => {
    audio.muted = !audio.muted;
    localStorage.setItem("audioMuted", audio.muted);
    audioBtn.textContent = audio.muted ? "🔇" : "🔊";

    if (!audio.paused && audio.muted) {
      // Kalau dimute saat main, tetap biarkan play berjalan (tanpa suara)
      return;
    }

    if (audio.paused) {
      audio.play().catch(() => {
        console.log("Audio masih diblokir, klik lagi.");
      });
    }
  });
}


  // ----------------------------
  // Universal fade-in
  // ----------------------------
  const fadeObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("fade-in");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".fade-element").forEach((el) => fadeObserver.observe(el));

  // ----------------------------
  // Skill card stagger
  // ----------------------------
  const skillSection = document.querySelector(".skills-container");
  if (skillSection) {
    const skillCards = document.querySelectorAll(".skill-card");
    const skillObserver = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillCards.forEach((card, i) => {
            setTimeout(() => card.classList.add("fade-in"), i * 150);
          });
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    skillObserver.observe(skillSection);
  }

  // ----------------------------
  // Navbar mobile (hamburger + dropdown)
  // ----------------------------
  const hamburger = document.getElementById("hamburger");
  // gunakan id dulu kalau ada, fallback ke class
  const navLinks = document.getElementById("navLinks") || document.querySelector(".nav-links");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
  }

  // dropdown: cari anchor (fallback ke 'a' bila .dropbtn tidak ada)
  const dropdowns = navLinks ? navLinks.querySelectorAll("li.dropdown") : [];
  dropdowns.forEach((dropdown) => {
    const link = dropdown.querySelector(".dropbtn") || dropdown.querySelector("a");
    if (!link) return; // jaga-jaga
    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  });

  // ----------------------------
  // Project cards & header observer
  // ----------------------------
  const cards = document.querySelectorAll(".project-card");
  if (cards.length) {
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
  }

  const title = document.querySelector(".project-title");
  const subtitle = document.querySelector(".project-subtitle");
  if (title || subtitle) {
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
  }
});

