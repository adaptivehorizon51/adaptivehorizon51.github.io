/* ============================================================
   1. ANIMASI CANVAS MATRIX RAIN (HEMAT DAYA / VISIBILITY SENSITIVE)
   ============================================================ */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas ? canvas.getContext('2d') : null;

function resizeCanvas() {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const matrixChars = '0101AH51ESP32C++I2CWIFI<>#&*$%';
const fontSize = 14;
let columns = canvas ? Math.floor(canvas.width / fontSize) : 0;
let drops = [];

function initDrops() {
  if (!canvas) return;
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }
}
initDrops();
window.addEventListener('resize', initDrops);

let matrixInterval = null;

function drawMatrix() {
  if (!ctx || !canvas) return;
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';

  ctx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.16)' : 'rgba(7, 10, 16, 0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.4)' : '#00f0ff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}

function startMatrix() {
  if (!matrixInterval) matrixInterval = setInterval(drawMatrix, 45);
}

function stopMatrix() {
  clearInterval(matrixInterval);
  matrixInterval = null;
}
startMatrix();

// Pause Matrix jika tab browser tidak aktif untuk menghemat daya
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    stopMatrix();
  } else {
    startMatrix();
  }
});

/* ============================================================
   2. PRELOADER ANIMATION DENGAN SCROLL-LOCK
   ============================================================ */
window.addEventListener('DOMContentLoaded', () => {
  document.body.style.overflow = 'hidden'; // Kunci scroll saat loading

  const preloader = document.getElementById('preloader');
  const preBar = document.getElementById('pre-bar');
  const prePerc = document.getElementById('pre-perc');
  const preLog = document.getElementById('pre-log');

  const logs = [
    "Checking ESP32 Dual-Core Xtensa...",
    "Mounting I2C Bus at 0x3C, 0x27 & 0x26...",
    "Synchronizing FreeRTOS Tasks...",
    "System Ready: Kernel Online."
  ];

  let progress = 0;
  let logIdx = 0;

  const interval = setInterval(() => {
    progress += Math.floor(Math.random() * 12) + 8;
    if (progress > 100) progress = 100;

    if (preBar) preBar.style.width = progress + '%';
    if (prePerc) prePerc.textContent = (progress < 10 ? '0' : '') + progress + '%';

    if (progress > logIdx * 25 && logIdx < logs.length && preLog) {
      preLog.textContent = logs[logIdx];
      logIdx++;
    }

    if (progress >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) {
          preloader.style.opacity = '0';
          preloader.style.visibility = 'hidden';
          document.body.style.overflow = 'auto'; // Kembalikan scroll
        }
      }, 350);
    }
  }, 80);
});

/* ============================================================
   3. JAM REAL-TIME WIB (INDONESIA)
   ============================================================ */
function updateLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  const now = new Date();
  const options = {
    timeZone: 'Asia/Jakarta',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  const timeString = new Intl.DateTimeFormat('id-ID', options).format(now);
  clockEl.textContent = `${timeString.replace(/\./g, ':')} WIB`;
}
setInterval(updateLiveClock, 1000);
updateLiveClock();

/* ============================================================
   4. MULTI-LANGUAGE TRANSLATION (ID, EN, MS, & CS - CEKO)
   ============================================================ */
const translations = {
  id: {
    status_active: "Aktif Berkreasi",
    brand_core: "BRAND CORE",
    local_time: "WAKTU LOKAL (INDONESIA)",
    base_on: "BASE ON",
    established: "ESTABLISHED",
    social_title: "Hubungkan & Ikuti",
    social_badge: "Official Links",
    whatsapp_channel: "Saluran WhatsApp",
    project_kicker: "PROJECT UNGGULAN",
    project_link: "Lihat Repository",
    project_description: "Perangkat lirik karaoke pintar untuk modul LCD 16×2 dengan dashboard kontrol Wi-Fi, 20 model sinkronisasi lirik, dan 20 preset animasi transisi mulus.",
    upcoming_kicker: "PROYEK MENDATANG",
    upcoming_title: "Tri-Screen ESP32 Workstation: Dual LCD 16×2 + OLED 1.3″ I2C",
    upcoming_description: "Arsitektur multi-display bertenaga ESP32 Dual-Core (FreeRTOS): Core 0 mengelola konektivitas Wi-Fi & data pipeline, sementara Core 1 merender visualizer audio spektrum 60 FPS pada OLED 1.3″ serta sinkronisasi lirik ganda pada dua modul LCD 16×2 secara real-time.",
    support_heading: "Dukung Terus Karya Kreatif",
    support_para: "Dukungan Anda sangat berarti untuk membiayai komponen hardware, pengembangan sistem, dan riset proyek open-source selanjutnya.",
    copyright: "© A.H 5.1 · All Rights Reserved",
    decrypt_btn: "Buka Kunci Preview R&D"
  },
  en: {
    status_active: "Actively Creating",
    brand_core: "BRAND CORE",
    local_time: "LOCAL TIME (INDONESIA)",
    base_on: "BASE ON",
    established: "ESTABLISHED",
    social_title: "Connect & Follow",
    social_badge: "Official Links",
    whatsapp_channel: "WhatsApp Channel",
    project_kicker: "FEATURED PROJECT",
    project_link: "View Repository",
    project_description: "Smart karaoke lyric display for LCD 16×2 with Wi-Fi dashboard, 20 sync models, and 20 smooth transition presets.",
    upcoming_kicker: "UPCOMING PROJECT",
    upcoming_title: "Tri-Screen ESP32 Workstation: Dual LCD 16×2 + OLED 1.3″ I2C",
    upcoming_description: "Multi-display architecture powered by ESP32 Dual-Core (FreeRTOS): Core 0 manages Wi-Fi telemetry & data pipelines, while Core 1 renders 60 FPS audio visualizer spectrum on 1.3″ OLED and dual-line real-time lyrics across two 16×2 LCDs.",
    support_heading: "Support Creative Innovations",
    support_para: "Your support fuels hardware components, embedded system development, and future open-source projects.",
    copyright: "© A.H 5.1 · All Rights Reserved",
    decrypt_btn: "Unlock R&D Preview"
  },
  ms: {
    status_active: "Aktif Berkarya",
    brand_core: "TERAS JENAMA",
    local_time: "WAKTU TEMPATAN (INDONESIA)",
    base_on: "PANGKALAN",
    established: "DITUBUHKAN",
    social_title: "Sambung & Ikuti",
    social_badge: "Pautan Rasmi",
    whatsapp_channel: "Saluran WhatsApp",
    project_kicker: "PROJEK UTAMA",
    project_link: "Lihat Repositori",
    project_description: "Peranti lirik karaoke pintar untuk modul LCD 16×2 dengan papan pemuka Wi-Fi, 20 model penyelarasan lirik, dan 20 animasi lancar.",
    upcoming_kicker: "PROJEK AKAN DATANG",
    upcoming_title: "Tri-Screen ESP32 Workstation: Dual LCD 16×2 + OLED 1.3″ I2C",
    upcoming_description: "Seni bina pelbagai paparan dikuasakan ESP32 Dual-Core (FreeRTOS): Core 0 mengendalikan telemetri Wi-Fi & saluran data, manakala Core 1 memproses visualizer spektrum audio 60 FPS pada OLED 1.3″ serta penyelarasan lirik pada dua LCD 16×2 secara masa nyata.",
    support_heading: "Sokong Terus Karya Kreatif",
    support_para: "Sokongan anda amat bermakna untuk komponen perkakasan, pembangunan sistem, dan penyelidikan projek sumber terbuka.",
    copyright: "© A.H 5.1 · Hak Cipta Terpelihara",
    decrypt_btn: "Nyahkunci Pratonton R&D"
  },
  cs: {
    status_active: "Aktivně tvořím",
    brand_core: "JÁDRO ZNAČKY",
    local_time: "MÍSTNÍ ČAS (INDONÉSIE)",
    base_on: "ZÁKLADNA",
    established: "ZALOŽENO",
    social_title: "Připojte se & Sledujte",
    social_badge: "Oficiální odkazy",
    whatsapp_channel: "Kanál WhatsApp",
    project_kicker: "HLAVNÍ PROJEKT",
    project_link: "Zobrazit repozitář",
    project_description: "Chytré karaoke zobrazovací zařízení pro LCD modul 16×2 s ovládacím Wi-Fi panelem, 20 modely synchronizace textu a 20 plynulými přechodovými animacemi.",
    upcoming_kicker: "PŘIPRAVOVANÝ PROJEKT",
    upcoming_title: "Tri-Screen ESP32 Pracovní stanice: Dual LCD 16×2 + OLED 1.3″ I2C",
    upcoming_description: "Víceobrazovková architektura poháněná dvoujádrovým procesorem ESP32 (FreeRTOS): Jádro 0 spravuje Wi-Fi telemetrii a datové toky, zatímco Jádro 1 vykresluje 60 FPS audio spektrum na OLED 1.3″ a synchronizuje texty písní v reálném čase na dvou LCD 16×2.",
    support_heading: "Podpořte kreativní vývoj",
    support_para: "Vaše podpora přímo financuje nákup hardwarových komponentů, vývoj vestavěných systémů a budoucí open-source projekty.",
    copyright: "© A.H 5.1 · Všechna práva vyhrazena",
    decrypt_btn: "Odemknout náhled R&D"
  }
};

function applyLanguage(lang) {
  const langButtons = document.querySelectorAll('.lang-btn');
  langButtons.forEach(b => {
    b.classList.toggle('active', b.dataset.lang === lang);
  });

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  localStorage.setItem('ah51_lang', lang);
}

// Inisialisasi bahasa dari penyimpanan lokal
const savedLang = localStorage.getItem('ah51_lang') || 'id';
applyLanguage(savedLang);

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

/* ============================================================
   5. TYPEWRITER SUBTITLE EFFECT
   ============================================================ */
const phrases = [
  "IoT & Embedded Developer",
  "Creator of BetterLyrics ESP32",
  "Tri-Screen ESP32 Workstation in Dev",
  "Adaptive Horizon 5.1 Core System"
];

let phraseIdx = 0;
let charIdx = 0;
let isDeleting = false;
const typewriterEl = document.getElementById("typewriter");

function typeLoop() {
  if (!typewriterEl) return;
  const current = phrases[phraseIdx];
  if (!isDeleting) {
    typewriterEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
    if (charIdx === current.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typewriterEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
    if (charIdx === 0) {
      isDeleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeLoop, 400);
      return;
    }
  }
  setTimeout(typeLoop, isDeleting ? 40 : 80);
}
typeLoop();

/* ============================================================
   6. INTERACTIVE MINI LCD 16x2 SIMULATOR
   ============================================================ */
const lyricPresets = [
  { row1: "A.H 5.1 Karaoke", row2: "♪ BetterLyrics ♫", mode: "SYNC MODE 01/20" },
  { row1: "[ESP32 System]", row2: "WiFi: Connected", mode: "I2C BUS 0x27" },
  { row1: "Now Playing:", row2: "Radiohead - Creep", mode: "SYNC MODE 07/20" },
  { row1: "I'm a creep...", row2: "I'm a weirdo...", mode: "SYNC MODE 07/20" },
  { row1: "What the hell am", row2: "I doing here?...", mode: "SYNC MODE 07/20" },
  { row1: "Status: OK", row2: "Latency: 12ms", mode: "HARDWARE LIVE" }
];

let currentPreset = 0;
let isPlaying = true;
let playInterval = null;

const row1El = document.getElementById("lcd-row-1");
const row2El = document.getElementById("lcd-row-2");
const modeEl = document.getElementById("lcd-mode-badge");
const playBtn = document.getElementById("lcd-play-btn");
const ledEl = document.getElementById("lcd-led");

function renderLcd() {
  if (row1El) row1El.textContent = lyricPresets[currentPreset].row1;
  if (row2El) row2El.textContent = lyricPresets[currentPreset].row2;
  if (modeEl) modeEl.textContent = lyricPresets[currentPreset].mode;
}

function nextLcd() {
  currentPreset = (currentPreset + 1) % lyricPresets.length;
  renderLcd();
}

function prevLcd() {
  currentPreset = (currentPreset - 1 + lyricPresets.length) % lyricPresets.length;
  renderLcd();
}

function startAutoPlay() {
  if (!playInterval) {
    playInterval = setInterval(nextLcd, 2800);
    if (ledEl) ledEl.classList.add("active");
  }
}

function stopAutoPlay() {
  clearInterval(playInterval);
  playInterval = null;
  if (ledEl) ledEl.classList.remove("active");
}

const nextBtn = document.getElementById("lcd-next-btn");
const prevBtn = document.getElementById("lcd-prev-btn");

if (nextBtn) nextBtn.addEventListener("click", nextLcd);
if (prevBtn) prevBtn.addEventListener("click", prevLcd);

if (playBtn) {
  playBtn.addEventListener("click", () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
      playBtn.classList.add("active");
      startAutoPlay();
    } else {
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
      playBtn.classList.remove("active");
      stopAutoPlay();
    }
  });
}
startAutoPlay();

/* ============================================================
   7. OLED 1.3" AUDIO SPECTRUM VISUALIZER
   ============================================================ */
const oledCanvas = document.getElementById("oledVisualizer");
if (oledCanvas) {
  const oledCtx = oledCanvas.getContext("2d");
  const numBars = 22;
  const barWidth = 4;
  const gap = 1.4;

  function drawOledVisualizer() {
    if (document.hidden) {
      requestAnimationFrame(drawOledVisualizer);
      return;
    }
    oledCtx.fillStyle = "#01080e";
    oledCtx.fillRect(0, 0, oledCanvas.width, oledCanvas.height);

    for (let i = 0; i < numBars; i++) {
      const height = Math.floor(Math.sin(Date.now() / 220 + i * 0.45) * 10 + Math.random() * 10 + 10);
      const x = i * (barWidth + gap) + 4;
      const y = oledCanvas.height - height;

      oledCtx.fillStyle = "#00f0ff";
      oledCtx.fillRect(x, y, barWidth, height);

      oledCtx.fillStyle = "#ffffff";
      oledCtx.fillRect(x, Math.max(0, y - 3), barWidth, 1.5);
    }
    requestAnimationFrame(drawOledVisualizer);
  }
  drawOledVisualizer();
}

/* ============================================================
   8. LINUX CLI DENGAN COMMAND HISTORY (PANAH UP / DOWN)
   ============================================================ */
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");
const terminalCard = document.getElementById("terminal");

// Fokus ke input saat area terminal diklik di mana saja
if (terminalCard && terminalInput) {
  terminalCard.addEventListener('click', () => terminalInput.focus());
}

const commandHistory = [];
let historyIndex = -1;

const cliCommands = {
  help: () => `Perintah Tersedia:
- <span class="highlight-cmd">about</span>    : Profil Adaptive Horizon 5.1
- <span class="highlight-cmd">esp32</span>    : Info proyek BetterLyrics ESP32
- <span class="highlight-cmd">upcoming</span> : Bocoran status proyek Tri-Screen ESP32
- <span class="highlight-cmd">skills</span>   : Tech stack hardware & software
- <span class="highlight-cmd">socials</span>  : Daftar tautan medsos resmi
- <span class="highlight-cmd">donate</span>   : Tautan donasi (Sociabuzz & Saweria)
- <span class="highlight-cmd">time</span>     : Menampilkan waktu WIB server
- <span class="highlight-cmd">whoami</span>   : Menampilkan identitas pengguna
- <span class="highlight-cmd">clear</span>    : Bersihkan layar terminal`,

  about: () => `Adaptive Horizon 5.1 (A.H 5.1):
Pengembang IoT & Embedded System berbasis ESP32, C/C++, dan sistem otomatisasi web. Berbasis di Indonesia sejak 2020.`,

  esp32: () => `BetterLyrics ESP32:
Perangkat lirik karaoke pintar modul LCD 16x2 dengan dashboard kontrol Wi-Fi dan 20 mode transisi lirik.
Repo: https://github.com/adaptivehorizon51/A.H51-esp32`,

  upcoming: () => `[ESP32 MULTI-DISPLAY WORKSTATION]
- Controller: ESP32 Xtensa Dual-Core 240MHz (FreeRTOS)
- 1x OLED 1.3" I2C (0x3C) : Spektrum audio FFT visualizer
- 2x LCD 16x2 I2C (0x27 & 0x26): Dual line live lyrics & queue
- Status: Active Prototype R&D. Gunakan tombol decrypt pada web untuk melihat telemetri.`,

  skills: () => `Hardware: ESP32 Dual-Core, FreeRTOS, I2C Bus, LCD 1602, OLED 1.3", Sensor Array
Software: C/C++, ESP-IDF, Arduino, JavaScript, Python, Git CLI, HTML5/CSS3`,

  socials: () => `Instagram: @rfa_glng_p._a.h_5.1
YouTube  : @A.H_5.1
TikTok   : @intel_uhd_graphics
Twitter  : @absurd_humor_51
WhatsApp : Saluran Adaptive Horizon 5.1`,

  donate: () => `Dukung karya hardware A.H 5.1:
- Sociabuzz: https://sociabuzz.com/ah51
- Saweria  : https://saweria.co/Absurdhumor51`,

  time: () => new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' }) + " WIB",
  whoami: () => `guest@adaptivehorizon-system [Auth: Level 1 Read-Only]`,

  clear: () => {
    terminalBody.innerHTML = '';
    return null;
  }
};

if (terminalInput && terminalBody) {
  terminalInput.addEventListener("keydown", function (e) {
    // Navigasi History Panah Atas
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0 && historyIndex < commandHistory.length - 1) {
        historyIndex++;
        this.value = commandHistory[commandHistory.length - 1 - historyIndex];
      }
      return;
    }

    // Navigasi History Panah Bawah
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        this.value = commandHistory[commandHistory.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        this.value = "";
      }
      return;
    }

    if (e.key === "Enter") {
      const raw = this.value.trim();
      const cmd = raw.toLowerCase();

      if (raw !== "") {
        commandHistory.push(raw);
        historyIndex = -1;

        const inputLine = document.createElement("div");
        inputLine.className = "terminal-line";
        inputLine.innerHTML = `<span class="terminal-prompt">ah51@system:~$</span> <span>${escapeHtml(raw)}</span>`;
        terminalBody.appendChild(inputLine);

        if (cliCommands[cmd]) {
          const res = cliCommands[cmd]();
          if (res !== null) {
            const out = document.createElement("div");
            out.className = "terminal-line";
            out.style.color = "#cbd5e1";
            out.innerHTML = res.replace(/\n/g, "<br>");
            terminalBody.appendChild(out);
          }
        } else {
          const err = document.createElement("div");
          err.className = "terminal-line";
          err.style.color = "#ff5f56";
          err.textContent = `bash: ${raw}: command not found. Ketik 'help' untuk panduan.`;
          terminalBody.appendChild(err);
        }

        this.value = "";
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    }
  });
}

function escapeHtml(text) {
  const d = document.createElement("div");
  d.textContent = text;
  return d.innerHTML;
}

/* ============================================================
   9. INTERACTIVE DECRYPT SPOILER TOGGLE
   ============================================================ */
const decryptToggleBtn = document.getElementById('decryptToggleBtn');
const spoilerShield = document.getElementById('spoilerShield');
const hardwareRack = document.getElementById('hardwareRack');

if (decryptToggleBtn && spoilerShield && hardwareRack) {
  decryptToggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    spoilerShield.classList.add('hidden-shield');
    hardwareRack.classList.add('unlocked');
    showToast("Sistem didekripsi: Telemetri ESP32 & Preview I2C Aktif!");
  });
}

/* ============================================================
   10. SHARE BUTTON & TOAST NOTIFICATION
   ============================================================ */
const shareBtn = document.getElementById("share-btn");
const toast = document.getElementById("toast-container");

function showToast(msg) {
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

if (shareBtn) {
  shareBtn.addEventListener("click", async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Adaptive Horizon 5.1",
          url: window.location.href
        });
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast("Tautan berhasil disalin ke clipboard!");
    }
  });
}

/* ============================================================
   11. THEME TOGGLE (DENGAN LOCALSTORAGE)
   ============================================================ */
const themeToggle = document.getElementById("theme-toggle");

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ah51_theme", theme);

  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
  }
  if (ctx && canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Muat tema yang tersimpan sebelumnya
const savedTheme = localStorage.getItem("ah51_theme") || "dark";
setTheme(savedTheme);

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "light" ? "dark" : "light";
    setTheme(next);
  });
}
