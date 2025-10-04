// script.js (full, tanpa <script> tags)
// Semua inisialisasi dijalankan setelah DOM siap
document.addEventListener("DOMContentLoaded", () => {
  // ---------- global elements ----------
  const navbar = document.querySelector("nav");
  const backBtn = document.querySelector(".back-btn");
  const navLinksEl = document.getElementById("navLinks") || document.querySelector(".nav-links");

  // expose fungsi show/hide (jika HTML memanggilnya)
  window.showMenu = function () {
    if (!navLinksEl) return;
    navLinksEl.style.right = "0";
  };
  window.hideMenu = function () {
    if (!navLinksEl) return;
    navLinksEl.style.right = "-200px";
  };

  // ---------- Sticky navbar & back button ----------
  window.addEventListener("scroll", () => {
    if (navbar) navbar.classList.toggle("sticky", window.scrollY > 0);
    if (backBtn) backBtn.classList.toggle("sticky", window.scrollY > 50);
  });

  // ---------- Audio control (no autoplay, remembers state) ----------
  const audio = document.getElementById("bg-audio");
  const audioBtn = document.getElementById("audio-btn");

  if (audio && audioBtn) {
    audio.volume = 0.2;

    // baca preferensi
    let storedMuted = localStorage.getItem("audioMuted");
    if (storedMuted === null) storedMuted = "true"; // default mute

    audio.muted = storedMuted === "true";
    audioBtn.textContent = audio.muted ? "🔇" : "🔊";

    function updateStatus() {
      audioBtn.textContent = audio.muted ? "🔇" : "🔊";
      localStorage.setItem("audioMuted", audio.muted);
    }

    function tryPlay() {
      if (!audio.muted && audio.paused) {
        audio.play().catch((err) => {
          console.warn("Autoplay diblokir browser:", err);
        });
      }
    }

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

    const enablePlayOnInteraction = () => {
      if (!audio.muted) tryPlay();
      document.removeEventListener("click", enablePlayOnInteraction);
      document.removeEventListener("scroll", enablePlayOnInteraction);
    };
    document.addEventListener("click", enablePlayOnInteraction);
    document.addEventListener("scroll", enablePlayOnInteraction);

    window.addEventListener("load", () => {
      if (!audio.muted) tryPlay();
    });
  } else {
    // jika halaman lain tidak punya audio -> jangan crash
    if (!audio) console.debug("Audio element (#bg-audio) tidak ditemukan di halaman ini.");
    if (!audioBtn) console.debug("Audio button (#audio-btn) tidak ditemukan di halaman ini.");
  }

  // ---------- Fade-in universal ----------
  const fadeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );
  document.querySelectorAll(".fade-element").forEach((el) => fadeObserver.observe(el));

  // ---------- Skill card stagger ----------
  const skillSection = document.querySelector(".skills-container");
  if (skillSection) {
    const skillCards = skillSection.querySelectorAll(".skill-card");
    const skillObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            skillCards.forEach((card, i) => {
              setTimeout(() => card.classList.add("fade-in"), i * 150);
            });
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    skillObserver.observe(skillSection);
  }

  // ---------- Navbar mobile (hamburger + dropdown) ----------
  const hamburger = document.getElementById("hamburger");
  if (hamburger && navLinksEl) {
    hamburger.addEventListener("click", () => navLinksEl.classList.toggle("active"));
  }

  const dropdowns = navLinksEl ? navLinksEl.querySelectorAll("li.dropdown") : [];
  dropdowns.forEach((dropdown) => {
  const link = dropdown.querySelector(".dropbtn") || dropdown.querySelector("a");
  if (!link) return;

  link.addEventListener("click", (e) => {
    if (window.innerWidth <= 768) {
      if (navLinksEl.classList.contains("active")) {
        navLinksEl.classList.remove("active");
      }
      return; 
    }

    // 💻 Di desktop: toggle dropdown (tanpa pindah halaman)
    e.preventDefault();
    dropdown.classList.toggle("open");
  });
});


  // ---------- Project cards & header observer ----------
  const cards = document.querySelectorAll(".project-card");
  if (cards.length) {
    const cardObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("show"), index * 250);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    cards.forEach((card) => {
      card.classList.add("fade-up");
      cardObserver.observe(card);
    });
  }

  const title = document.querySelector(".project-title");
  const subtitle = document.querySelector(".project-subtitle");
  if (title || subtitle) {
    const headerObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("show"), index * 400);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );
    if (title) headerObserver.observe(title);
    if (subtitle) headerObserver.observe(subtitle);
  }
}); // end DOMContentLoaded

