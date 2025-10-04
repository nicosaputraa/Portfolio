// ============================
// Sticky 
// ============================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector("nav");
  navbar.classList.toggle("sticky", window.scrollY > 0);
});

window.addEventListener("scroll", () => {
  const backBtn = document.querySelector(".back-btn");
  if (!backBtn) return;

  // Saat scroll > 50px, tambahkan class sticky
  if (window.scrollY > 50) {
    backBtn.classList.add("sticky");
  } else {
    backBtn.classList.remove("sticky");
  }
});

// ============================
// Kontrol Audio Background
// ============================
<script>
document.addEventListener("DOMContentLoaded", () => {
  const audio = document.getElementById("bg-audio");
  const audioBtn = document.getElementById("audio-btn");

  // Volume awal
  audio.volume = 0.2;

  // Ambil status mute dari localStorage
  let storedMuted = localStorage.getItem("audioMuted");
  if (storedMuted === null) storedMuted = "true"; // default: MUTE

  audio.muted = storedMuted === "true";
  audioBtn.textContent = audio.muted ? "🔇" : "🔊";

  // Update tombol & simpan status ke localStorage
  function updateStatus() {
    audioBtn.textContent = audio.muted ? "🔇" : "🔊";
    localStorage.setItem("audioMuted", audio.muted);
  }

  // Coba play audio dengan aman
  function tryPlay() {
    if (!audio.muted && audio.paused) {
      audio.play().catch((err) => {
        console.warn("Autoplay diblokir browser:", err);
      });
    }
  }

  // Klik tombol mute/unmute
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

  // 🔥 Play otomatis setelah user interaksi (klik/scroll)
  const enablePlayOnInteraction = () => {
    if (!audio.muted) {
      tryPlay();
    }
    document.removeEventListener("click", enablePlayOnInteraction);
    document.removeEventListener("scroll", enablePlayOnInteraction);
  };

  document.addEventListener("click", enablePlayOnInteraction);
  document.addEventListener("scroll", enablePlayOnInteraction);

  // Jika sebelumnya UNMUTE, coba play saat halaman dimuat
  window.addEventListener("load", () => {
    if (!audio.muted) {
      tryPlay();
    }
  });
});
</script>


// ============================
// Animasi Fade Up Universal
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
          obs.unobserve(entry.target); // animasi sekali saja
        }
      });
    },
    { threshold: 0.2 }
  );

  document
    .querySelectorAll(".fade-element")
    .forEach((el) => observer.observe(el));
});

// ============================
// Animasi Stagger untuk Skill Card
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const skillCards = document.querySelectorAll(".skill-card");

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          skillCards.forEach((card, i) => {
            setTimeout(() => {
              card.classList.add("fade-in");
            }, i * 150);
          });
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  const skillSection = document.querySelector(".skills-container");
  if (skillSection) observer.observe(skillSection);
});

// ============================
// Navbar Mobile (Hamburger + Dropdown Toggle)
// ============================
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navLinks = document.querySelector(".nav-links");
  const dropdowns = document.querySelectorAll(".nav-links li.dropdown");

  // Toggle menu saat hamburger diklik
  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Untuk mobile: dropdown toggle dengan klik
  dropdowns.forEach(dropdown => {
    const link = dropdown.querySelector(".dropbtn");

    link.addEventListener("click", (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault(); // cegah link langsung jalan
        dropdown.classList.toggle("open");
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".project-card");
  const title = document.querySelector(".project-title");
  const subtitle = document.querySelector(".project-subtitle");

  // Observer untuk cards (fade-up)
  const cardObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 250);
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

  // Observer untuk title & subtitle (fade-down)
  const headerObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("show");
          }, index * 400); // delay lebih lama untuk efek dramatis
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  if (title) headerObserver.observe(title);
  if (subtitle) headerObserver.observe(subtitle);
});
