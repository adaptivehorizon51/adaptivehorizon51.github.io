/**
 * Adaptive Horizon 5.1 · Core System Script
 * Complete Multi-Language (i18n), Terminal CLI, and Hardware Simulator
 */

/* ============================================================
   1. ANIMASI MATRIX CANVAS (HEMAT DAYA & DEBOUNCED)
   ============================================================ */
const MatrixEngine = (() => {
  const canvas = document.getElementById('matrixCanvas');
  if (!canvas) return { pause: () => {}, resume: () => {} };

  const ctx = canvas.getContext('2d');
  const matrixChars = '0101AH51ESP32C++I2CWIFI<>#&*$%';
  const fontSize = 14;
  let columns = 0;
  let drops = [];
  let intervalId = null;
  let resizeTimer = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = Array.from({ length: columns }, () => Math.random() * -80);
  }

  function draw() {
    if (!ctx) return;
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    ctx.fillStyle = isLight ? 'rgba(241, 245, 249, 0.16)' : 'rgba(7, 10, 16, 0.14)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = isLight ? 'rgba(2, 132, 199, 0.45)' : '#00f0ff';
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const char = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
      ctx.fillText(char, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  function resume() {
    if (!intervalId) intervalId = setInterval(draw, 45);
  }

  function pause() {
    clearInterval(intervalId);
    intervalId = null;
  }

  resize();
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  document.addEventListener('visibilitychange', () => {
    document.hidden ? pause() : resume();
  });

  resume();
  return { pause, resume };
})();

/* ============================================================
   2. PRELOADER DENGAN FAILSAFE WATCHDOG
   ============================================================ */
(() => {
  document.body.style.overflow = 'hidden';

  const preloader = document.getElementById('preloader');
  const preBar = document.getElementById('pre-bar');
  const prePerc = document.getElementById('pre-perc');
  const preLog = document.getElementById('pre-log');

  const bootLogs = [
    "Checking ESP32 Xtensa Architecture...",
    "Mounting I2C Bus [0x26, 0x27, 0x3C]...",
    "Synchronizing NTP Network Clock...",
    "Loading Virtual Shell & CLI Kernel...",
    "System Ready: Kernel Online."
  ];

  let progress = 0;
  let logStep = 0;

  function dismissPreloader() {
    if (!preloader || preloader.style.visibility === 'hidden') return;
    preloader.style.opacity = '0';
    preloader.style.visibility = 'hidden';
    document.body.style.overflow = '';
  }

  const watchdog = setTimeout(dismissPreloader, 3200);

  const loaderInterval = setInterval(() => {
    progress += Math.floor(Math.random() * 15) + 12;
    if (progress > 100) progress = 100;

    if (preBar) preBar.style.width = `${progress}%`;
    if (prePerc) prePerc.textContent = `${progress < 10 ? '0' : ''}${progress}%`;

    const expectedLog = Math.floor((progress / 100) * (bootLogs.length - 1));
    if (expectedLog > logStep && preLog) {
      logStep = expectedLog;
      preLog.textContent = bootLogs[logStep];
    }

    if (progress >= 100) {
      clearInterval(loaderInterval);
      clearTimeout(watchdog);
      setTimeout(dismissPreloader, 280);
    }
  }, 65);
})();

/* ============================================================
   3. MULTI-LANGUAGE SYSTEM (i18n) LENGKAP & DINAMIS
   ============================================================ */
const I18nManager = (() => {
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
      upcoming_title: "Project Codename: Horizon-X (ESP32)",
      upcoming_description: "Proyek perangkat keras eksperimental bertenaga ESP32 sedang dalam tahap riset dan perakitan rahasia. Detail fitur, skema sirkuit, dan cara kerja sistem saat ini masih dirahsiakan hingga peluncuran resmi.",
      shield_title: "TOP SECRET // HARDWARE IN DEVELOPMENT",
      shield_desc: "Konfigurasi sirkuit dan firmware diamankan untuk mencegah spoiler sebelum peluncuran resmi. Tekan tombol untuk melihat sinyal telemetri atau gunakan perintah terminal.",
      decrypt_btn: "Buka Kunci Preview R&D",
      relock_btn: "Kunci Kembali (Lock)",
      shield_tag1: "ESP32 Master Core",
      shield_tag2: "Confidential R&D",
      shield_tag3: "Fase Prototipe",
      support_heading: "Dukung Terus Karya Kreatif",
      support_para: "Dukungan Anda sangat berarti untuk membiayai komponen hardware, pengembangan sistem, dan riset proyek open-source selanjutnya.",
      support_sociabuzz: "Traktir di Sociabuzz",
      support_saweria: "Dukung via Saweria",
      copyright: "© A.H 5.1 · All Rights Reserved",
      sub_credit: "Engineered with Cyber Bento UI & Matrix Kernel",
      terminal_placeholder: "Ketik perintah... (contoh: help, neofetch, i2cdetect)",
      terminal_welcome_1: "[SYSTEM] Adaptive Horizon 5.1 Hybrid Kernel v2.5.8 Dimuat.",
      terminal_welcome_2: "Ketik 'help' untuk daftar perintah, atau gunakan 'neofetch', 'i2cdetect', 'ping'.",
      toast_copied: "Tautan portofolio disalin ke clipboard!",
      toast_decrypted: "Telemetri ESP32 didekripsi!",
      toast_locked: "Sistem Horizon-X dikunci kembali."
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
      upcoming_title: "Project Codename: Horizon-X (ESP32)",
      upcoming_description: "An experimental ESP32-powered hardware project currently in confidential research and fabrication. Circuit schematics, features, and system internals remain classified until official release.",
      shield_title: "TOP SECRET // HARDWARE IN DEVELOPMENT",
      shield_desc: "Circuit schematics and firmware are secured to prevent spoilers prior to official launch. Press the button to inspect telemetry signals or use the terminal CLI.",
      decrypt_btn: "Unlock R&D Preview",
      relock_btn: "Re-lock Telemetry",
      shield_tag1: "ESP32 Master Core",
      shield_tag2: "Confidential R&D",
      shield_tag3: "Prototype Phase",
      support_heading: "Support Creative Innovations",
      support_para: "Your support fuels hardware components, embedded system development, and future open-source projects.",
      support_sociabuzz: "Treat via Sociabuzz",
      support_saweria: "Donate via Saweria",
      copyright: "© A.H 5.1 · All Rights Reserved",
      sub_credit: "Engineered with Cyber Bento UI & Matrix Kernel",
      terminal_placeholder: "Type a command... (e.g. help, neofetch, i2cdetect)",
      terminal_welcome_1: "[SYSTEM] Adaptive Horizon 5.1 Hybrid Kernel v2.5.8 Loaded.",
      terminal_welcome_2: "Type 'help' for commands, or explore 'neofetch', 'i2cdetect', 'ping'.",
      toast_copied: "Portfolio link copied to clipboard!",
      toast_decrypted: "ESP32 Horizon-X Telemetry decrypted!",
      toast_locked: "Horizon-X system re-locked (Confidential Mode)."
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
      upcoming_title: "Project Codename: Horizon-X (ESP32)",
      upcoming_description: "Projek perkakasan eksperimental berkuasa ESP32 sedang dalam fasa penyelidikan rahsia. Skema litar, ciri-ciri, dan cara kerja sistem masih dirahsiakan sehingga pelancaran rasmi.",
      shield_title: "SULIT // PERKAKASAN DALAM PEMBANGUNAN",
      shield_desc: "Konfigurasi litar dan perisian tegar dilindungi untuk mengelakkan ketirisan sebelum pelancaran rasmi. Tekan butang untuk melihat isyarat telemetri.",
      decrypt_btn: "Nyahkunci Pratonton R&D",
      relock_btn: "Kunci Semula (Lock)",
      shield_tag1: "Teras Utama ESP32",
      shield_tag2: "Penyelidikan Sulit",
      shield_tag3: "Fasa Prototaip",
      support_heading: "Sokong Terus Karya Kreatif",
      support_para: "Sokongan anda amat bermakna untuk komponen perkakasan, pembangunan sistem, dan penyelidikan projek sumber terbuka.",
      support_sociabuzz: "Belanja di Sociabuzz",
      support_saweria: "Sokong via Saweria",
      copyright: "© A.H 5.1 · Hak Cipta Terpelihara",
      sub_credit: "Direka dengan Cyber Bento UI & Matrix Kernel",
      terminal_placeholder: "Taip arahan... (contoh: help, neofetch, i2cdetect)",
      terminal_welcome_1: "[SISTEM] Adaptive Horizon 5.1 Kernel Hibrid v2.5.8 Dimuatkan.",
      terminal_welcome_2: "Taip 'help' untuk senarai arahan, atau cuba 'neofetch', 'i2cdetect', 'ping'.",
      toast_copied: "Pautan berjaya disalin ke papan keratan!",
      toast_decrypted: "Telemetri ESP32 Horizon-X dinyahkunci!",
      toast_locked: "Sistem Horizon-X dikunci semula."
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
      project_description: "Chytré karaoke zobrazovací zařízení pro LCD modul 16×2 s ovládacím Wi-Fi panelem, 20 modely synchronizace textu a 20 plynulými animacemi.",
      upcoming_kicker: "PŘIPRAVOVANÝ PROJEKT",
      upcoming_title: "Project Codename: Horizon-X (ESP32)",
      upcoming_description: "Experimentální hardwarový projekt založený na ESP32 je v současné době ve fázi utajeného výzkumu a výroby. Schémata zapojení zůstávají utajena.",
      shield_title: "PŘÍSNĚ TAJNÉ // HARDWARE VE VÝVOJI",
      shield_desc: "Schémata zapojení a firmware jsou zabezpečeny proti předčasnému odhalení. Stisknutím tlačítka zobrazíte telemetrii nebo použijte terminál.",
      decrypt_btn: "Odemknout náhled R&D",
      relock_btn: "Znovu uzamknout",
      shield_tag1: "Hlavní jádro ESP32",
      shield_tag2: "Důvěrný výzkum",
      shield_tag3: "Fáze prototypu",
      support_heading: "Podpořte kreativní vývoj",
      support_para: "Vaše podpora přímo financuje nákup hardwarových komponentů, vývoj vestavěných systémů a budoucí open-source projekty.",
      support_sociabuzz: "Podpořit přes Sociabuzz",
      support_saweria: "Podpořit přes Saweria",
      copyright: "© A.H 5.1 · Všechna práva vyhrazena",
      sub_credit: "Navrženo s Cyber Bento UI & Matrix Kernel",
      terminal_placeholder: "Zadejte příkaz... (např. help, neofetch, i2cdetect)",
      terminal_welcome_1: "[SYSTÉM] Hybridní jádro Adaptive Horizon 5.1 v2.5.8 načteno.",
      terminal_welcome_2: "Zadejte 'help' pro seznam příkazů, nebo vyzkoušejte 'neofetch', 'i2cdetect', 'ping'.",
      toast_copied: "Odkaz byl zkopírován do schránky!",
      toast_decrypted: "Telemetrie ESP32 Horizon-X dešifrována!",
      toast_locked: "Systém Horizon-X opět uzamčen."
    }
  };

  let currentLang = localStorage.getItem('ah51_lang') || 'id';

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    localStorage.setItem('ah51_lang', lang);

    // Update status aktif tombol bahasa di navbar
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // 1. Terjemahkan semua elemen berbasis teks biasa
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // 2. Terjemahkan atribut Placeholder (misal input CLI)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key]) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // 3. Sinkronkan kalimat pada Typewriter sesuai bahasa yang dipilih
    if (window.TypewriterEngine) {
      window.TypewriterEngine.updatePhrases(lang);
    }
  }

  function getText(key) {
    return translations[currentLang]?.[key] || translations['id'][key] || key;
  }

  // Jam Digital WIB
  function startClock() {
    const clockEl = document.getElementById('live-clock');
    if (!clockEl) return;
    const update = () => {
      const timeStr = new Intl.DateTimeFormat('id-ID', {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(new Date());
      clockEl.textContent = `${timeStr.replace(/\./g, ':')} WIB`;
    };
    setInterval(update, 1000);
    update();
  }

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  startClock();

  return { setLanguage, getText, getCurrentLang: () => currentLang };
})();

/* ============================================================
   4. TOAST NOTIFICATION UTILITY
   ============================================================ */
function showToast(message) {
  const toast = document.getElementById("toast-container");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2600);
}

/* ============================================================
   5. TYPEWRITER SUBTITLE EFFECT (MENDUKUNG 4 BAHASA)
   ============================================================ */
window.TypewriterEngine = (() => {
  const localizedPhrases = {
    id: [
      "IoT & Embedded Developer",
      "Kreator BetterLyrics ESP32",
      "Riset Hardware: Proyek Horizon-X",
      "Arsitektur ESP-IDF & WebSocket"
    ],
    en: [
      "IoT & Embedded Developer",
      "Creator of BetterLyrics ESP32",
      "Hardware R&D: Project Horizon-X",
      "ESP-IDF & WebSocket Architecture"
    ],
    ms: [
      "Pembangun IoT & Sistem Terbenam",
      "Pencipta BetterLyrics ESP32",
      "Penyelidikan Perkakasan: Projek Horizon-X",
      "Seni Bina ESP-IDF & WebSocket"
    ],
    cs: [
      "Vývojář IoT & vestavěných systémů",
      "Tvůrce BetterLyrics ESP32",
      "Hardwarový výzkum: Projekt Horizon-X",
      "Architektura ESP-IDF & WebSocket"
    ]
  };

  let phrases = localizedPhrases[I18nManager.getCurrentLang()] || localizedPhrases.id;
  let phraseIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let timeoutId = null;
  const typewriterEl = document.getElementById("typewriter");

  function loop() {
    if (!typewriterEl) return;
    const current = phrases[phraseIdx];
    if (!isDeleting) {
      typewriterEl.textContent = current.substring(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        isDeleting = true;
        timeoutId = setTimeout(loop, 2200);
        return;
      }
    } else {
      typewriterEl.textContent = current.substring(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        isDeleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        timeoutId = setTimeout(loop, 400);
        return;
      }
    }
    timeoutId = setTimeout(loop, isDeleting ? 40 : 80);
  }

  function updatePhrases(lang) {
    if (localizedPhrases[lang]) {
      phrases = localizedPhrases[lang];
      phraseIdx = 0;
      charIdx = 0;
      isDeleting = false;
      clearTimeout(timeoutId);
      loop();
    }
  }

  loop();
  return { updatePhrases };
})();

// Terapkan bahasa tersimpan pada pemuatan awal
document.addEventListener('DOMContentLoaded', () => {
  I18nManager.setLanguage(I18nManager.getCurrentLang());
});

/* ============================================================
   6. SIMULATOR LCD 1602 HARDWARE
   ============================================================ */
const LcdSimulator = (() => {
  const presets = [
    { row1: "A.H 5.1 Karaoke", row2: "♪ BetterLyrics ♫", mode: "SYNC MODE 01/20" },
    { row1: "[ESP32 System]", row2: "WiFi: Connected", mode: "I2C BUS 0x27" },
    { row1: "Now Playing:", row2: "Radiohead - Creep", mode: "SYNC MODE 07/20" },
    { row1: "I'm a creep...", row2: "I'm a weirdo...", mode: "SYNC MODE 07/20" },
    { row1: "What the hell am", row2: "I doing here?...", mode: "SYNC MODE 07/20" },
    { row1: "Status: 200 OK", row2: "Latency: 12ms", mode: "HARDWARE LIVE" }
  ];

  let current = 0;
  let isPlaying = true;
  let timer = null;

  const row1El = document.getElementById("lcd-row-1");
  const row2El = document.getElementById("lcd-row-2");
  const modeEl = document.getElementById("lcd-mode-badge");
  const playBtn = document.getElementById("lcd-play-btn");
  const ledEl = document.getElementById("lcd-led");

  function render() {
    if (row1El) row1El.textContent = presets[current].row1;
    if (row2El) row2El.textContent = presets[current].row2;
    if (modeEl) modeEl.textContent = presets[current].mode;
  }

  function next() {
    current = (current + 1) % presets.length;
    render();
  }

  function prev() {
    current = (current - 1 + presets.length) % presets.length;
    render();
  }

  function play() {
    if (timer) return;
    isPlaying = true;
    timer = setInterval(next, 2800);
    if (ledEl) ledEl.classList.add("active");
    if (playBtn) {
      playBtn.classList.add("active");
      playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
  }

  function pause() {
    clearInterval(timer);
    timer = null;
    isPlaying = false;
    if (ledEl) ledEl.classList.remove("active");
    if (playBtn) {
      playBtn.classList.remove("active");
      playBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
  }

  document.getElementById("lcd-next-btn")?.addEventListener("click", next);
  document.getElementById("lcd-prev-btn")?.addEventListener("click", prev);
  playBtn?.addEventListener("click", () => isPlaying ? pause() : play());

  play();
  return { next, prev, play, pause, isPlaying: () => isPlaying };
})();

/* ============================================================
   7. OLED 1.3" AUDIO SPECTRUM (OBSERVER POWER-SAVING)
   ============================================================ */
(() => {
  const canvas = document.getElementById("oledVisualizer");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const numBars = 22;
  const barWidth = 4;
  const gap = 1.4;
  let animId = null;
  let isVisible = false;

  function draw() {
    if (!isVisible || document.hidden) return;

    ctx.fillStyle = "#01080e";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < numBars; i++) {
      const height = Math.floor(Math.sin(Date.now() / 200 + i * 0.45) * 9 + Math.random() * 9 + 11);
      const x = i * (barWidth + gap) + 4;
      const y = canvas.height - height;

      ctx.fillStyle = "#00f0ff";
      ctx.fillRect(x, y, barWidth, height);

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(x, Math.max(0, y - 3), barWidth, 1.5);
    }
    animId = requestAnimationFrame(draw);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible) {
        cancelAnimationFrame(animId);
        draw();
      } else {
        cancelAnimationFrame(animId);
      }
    });
  }, { threshold: 0.1 });

  observer.observe(canvas);
})();

/* ============================================================
   8. CLASSIFIED R&D (HORIZON-X) SECURITY CONTROLLER
   ============================================================ */
const HorizonSecurity = (() => {
  const wrapper = document.getElementById('spoilerWrapper');
  const shield = document.getElementById('spoilerShield');
  const rack = document.getElementById('hardwareRack');
  const decryptBtn = document.getElementById('decryptToggleBtn');
  const relockBtn = document.getElementById('relockBtn');
  const cycleBtn = document.getElementById('rack-cycle-btn');
  const badge = document.getElementById('tri-mode-badge');

  let isUnlocked = false;
  const channels = [
    "CH-01: HIGH SPEED I2C BUS ACTIVE",
    "CH-02: UART PACKET CAPTURE (115200)",
    "CH-03: DUAL-CORE XTENSA INTERRUPTS",
    "CH-04: DMA MEMORY STREAM ONLINE"
  ];
  let channelIdx = 0;

  function unlock() {
    isUnlocked = true;
    shield?.classList.add('hidden-shield');
    rack?.classList.add('unlocked');
    wrapper?.classList.add('is-unlocked');
    showToast(I18nManager.getText('toast_decrypted'));
  }

  function lock() {
    isUnlocked = false;
    shield?.classList.remove('hidden-shield');
    rack?.classList.remove('unlocked');
    wrapper?.classList.remove('is-unlocked');
    showToast(I18nManager.getText('toast_locked'));
  }

  function cycleChannel() {
    channelIdx = (channelIdx + 1) % channels.length;
    if (badge) badge.textContent = channels[channelIdx];
  }

  decryptBtn?.addEventListener('click', unlock);
  relockBtn?.addEventListener('click', lock);
  cycleBtn?.addEventListener('click', cycleChannel);

  return { unlock, lock, cycleChannel, isUnlocked: () => isUnlocked };
})();

/* ============================================================
   9. ADVANCED LINUX / ESP32 CLI SIMULATOR
   ============================================================ */
(() => {
  const input = document.getElementById("terminal-input");
  const body = document.getElementById("terminal-body");
  const card = document.getElementById("terminal");
  const suggestBar = document.getElementById("terminal-suggest-bar");

  if (!input || !body) return;

  card?.addEventListener('click', () => {
    if (window.getSelection().toString().length === 0) input.focus();
  });

  const commandHistory = [];
  let historyIdx = -1;
  let tempInput = "";

  const virtualFS = {
    'about.txt': "Adaptive Horizon 5.1 (A.H 5.1)\nIoT, Embedded & Modern Web Architecture.\nBase in Indonesia. Est. 2020.",
    'betterlyrics.ino': "#include <Wire.h>\n#include <LiquidCrystal_I2C.h>\n// BetterLyrics v2.0 - 20 Sync Models with Wi-Fi Control\nvoid setup() { Wire.begin(21, 22); }",
    'specs.json': '{\n  "chip": "ESP32-WROOM-32D",\n  "cores": 2,\n  "frequency": "240MHz",\n  "flash": "4MB",\n  "sram": "520KB"\n}',
    'contacts.txt': "Instagram: @rfa_glng_p._a.h_5.1\nYouTube: @A.H_5.1\nGitHub: adaptivehorizon51"
  };

  const commandRegistry = {
    help: () => {
      return `[SYSTEM COMMAND DIRECTORY]
- <span class="highlight-cmd">neofetch</span>    : Spesifikasi hardware chip & ASCII art
- <span class="highlight-cmd">i2cdetect</span>   : Pindai bus I2C (0x26, 0x27, 0x3C)
- <span class="highlight-cmd">ping &lt;host&gt;</span>  : Tes latensi jaringan ICMP
- <span class="highlight-cmd">wifi</span>        : Info koneksi IP & RSSI nirkabel
- <span class="highlight-cmd">ls</span>          : Daftar file virtual filesystem
- <span class="highlight-cmd">cat &lt;file&gt;</span>  : Buka file (contoh: cat specs.json)
- <span class="highlight-cmd">theme &lt;mode&gt;</span>: Ubah tema web ('dark' | 'light')
- <span class="highlight-cmd">lang &lt;code&gt;</span> : Ubah bahasa web ('id' | 'en' | 'ms' | 'cs')
- <span class="highlight-cmd">lcd &lt;action&gt;</span>: Kontrol simulator LCD ('next' | 'prev' | 'play' | 'pause')
- <span class="highlight-cmd">decrypt</span>     : Buka preview rahasia Horizon-X
- <span class="highlight-cmd">lock</span>        : Kunci kembali preview Horizon-X
- <span class="highlight-cmd">history</span>     : Tampilkan riwayat perintah
- <span class="highlight-cmd">clear</span>       : Bersihkan layar terminal (Ctrl+L)
- <span class="highlight-cmd">whoami</span>      : Tampilkan info pengguna`;
    },

    neofetch: () => {
      const theme = document.documentElement.getAttribute('data-theme') || 'dark';
      return `<div class="terminal-ascii">
   _____ _____ _____ ___ ___ 
  |   __|   __|  _  |_  |_  |  ah51@xtensa-esp32
  |   __|__   |   __|  _|  _|  -------------------
  |_____|_____|__|  |___|___|  OS: FreeRTOS Kernel v10.4.3
                               Host: ESP32-D0WDQ6 (Xtensa LX6)
                               Cores: 2 Cores @ 240 MHz
                               Memory: 520 KB SRAM / 4 MB Flash
                               Firmware: BetterLyrics ESP32 v2.0
                               Language: ${I18nManager.getCurrentLang().toUpperCase()}
                               Theme: ${theme.toUpperCase()}
</div>`;
    },

    i2cdetect: () => {
      return `Pemeriksaan bus I2C pada SDA=21, SCL=22:
     0  1  2  3  4  5  6  7  8  9  a  b  c  d  e  f
00:          -- -- -- -- -- -- -- -- -- -- -- -- -- 
10: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
20: -- -- -- -- -- -- <span style="color:#00ff88;font-weight:bold">26</span> <span style="color:#00ff88;font-weight:bold">27</span> -- -- -- -- -- -- -- -- 
30: -- -- -- -- -- -- -- -- -- -- -- -- <span style="color:#00f0ff;font-weight:bold">3C</span> -- -- -- 
40: -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- 
Perangkat terdeteksi:
 [0x26]: Module Auxiliary LCD
 [0x27]: Module Primary LCD (BetterLyrics)
 [0x3C]: SSD1306 OLED Telemetry Display`;
    },

    ping: (args) => {
      const host = args[0] || 'adaptivehorizon51.github.io';
      return `PING ${escapeHtml(host)}: 56 data bytes
64 bytes from ${escapeHtml(host)}: icmp_seq=0 ttl=58 time=${(Math.random() * 8 + 11).toFixed(2)} ms
64 bytes from ${escapeHtml(host)}: icmp_seq=1 ttl=58 time=${(Math.random() * 8 + 10).toFixed(2)} ms
64 bytes from ${escapeHtml(host)}: icmp_seq=2 ttl=58 time=${(Math.random() * 8 + 12).toFixed(2)} ms
--- ${escapeHtml(host)} ping statistics: 0.0% packet loss ---`;
    },

    wifi: () => {
      return `ESP32 Wi-Fi Station Status:
- SSID    : AdaptiveHorizon-AP
- IP Addr : 192.168.1.151
- Gateway : 192.168.1.1
- RSSI    : -52 dBm (Excellent Link)`;
    },

    ls: () => {
      return `total 4\n${Object.keys(virtualFS).map(f => `<span style="color:#38bdf8">${f}</span>`).join('   ')}`;
    },

    cat: (args) => {
      if (!args[0]) return `cat: Sertakan nama file. Contoh: <span class="highlight-cmd">cat specs.json</span>`;
      const fileName = args[0].toLowerCase();
      if (virtualFS[fileName]) return escapeHtml(virtualFS[fileName]);
      return `cat: ${escapeHtml(args[0])}: File tidak ditemukan.`;
    },

    theme: (args) => {
      const target = args[0] ? args[0].toLowerCase() : null;
      const current = document.documentElement.getAttribute('data-theme');
      const next = target === 'dark' || target === 'light' ? target : (current === 'light' ? 'dark' : 'light');
      setTheme(next);
      return `Tema antarmuka diubah ke: <span class="highlight-cmd">${next.toUpperCase()}</span>`;
    },

    lang: (args) => {
      const valid = ['id', 'en', 'ms', 'cs'];
      if (!args[0] || !valid.includes(args[0].toLowerCase())) {
        return `Pilihan bahasa valid: ${valid.map(v => `<span class="highlight-cmd">${v}</span>`).join(', ')}`;
      }
      I18nManager.setLanguage(args[0].toLowerCase());
      return `Bahasa sistem berhasil diubah ke: <span class="highlight-cmd">${args[0].toUpperCase()}</span>`;
    },

    lcd: (args) => {
      const action = args[0] ? args[0].toLowerCase() : '';
      if (action === 'next') { LcdSimulator.next(); return `LCD: Baris lirik berikutnya.`; }
      if (action === 'prev') { LcdSimulator.prev(); return `LCD: Baris lirik sebelumnya.`; }
      if (action === 'play') { LcdSimulator.play(); return `LCD: Sinkronisasi aktif.`; }
      if (action === 'pause') { LcdSimulator.pause(); return `LCD: Sinkronisasi dijeda.`; }
      return `Gunakan: <span class="highlight-cmd">lcd next | prev | play | pause</span>`;
    },

    decrypt: () => {
      HorizonSecurity.unlock();
      return `Horizon-X didekripsi: Telemetri hardware aktif di halaman web.`;
    },

    lock: () => {
      HorizonSecurity.lock();
      return `Horizon-X dikunci kembali (Confidential Mode).`;
    },

    whoami: () => `guest@adaptivehorizon-system [Auth: Level-1 Observer]`,

    history: () => {
      if (commandHistory.length === 0) return `Riwayat perintah kosong.`;
      return commandHistory.map((cmd, i) => `${(i + 1).toString().padStart(3, ' ')}  ${escapeHtml(cmd)}`).join('\n');
    },

    clear: () => {
      body.innerHTML = '';
      return null;
    }
  };

  const commandList = Object.keys(commandRegistry);

  function printLine(htmlContent, isError = false) {
    const line = document.createElement("div");
    line.className = "terminal-line";
    if (isError) line.style.color = "#ff5f56";
    line.innerHTML = htmlContent;
    body.appendChild(line);
    body.scrollTop = body.scrollHeight;
  }

  function handleAutocomplete() {
    const current = input.value.trim().toLowerCase();
    if (!current) return;

    const matches = commandList.filter(cmd => cmd.startsWith(current));
    if (matches.length === 1) {
      input.value = matches[0] + " ";
      if (suggestBar) suggestBar.classList.remove('show');
    } else if (matches.length > 1) {
      if (suggestBar) {
        suggestBar.textContent = `Pilihan Perintah: ${matches.join('   ')}`;
        suggestBar.classList.add('show');
      }
    }
  }

  input.addEventListener("keydown", (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      handleAutocomplete();
      return;
    }

    if (suggestBar && e.key !== "Tab") {
      suggestBar.classList.remove('show');
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      body.innerHTML = '';
      return;
    }

    if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      printLine(`<span class="terminal-prompt">ah51@system:~$</span> <span>${escapeHtml(input.value)}^C</span>`);
      input.value = "";
      historyIdx = -1;
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      if (historyIdx === -1) tempInput = input.value;
      if (historyIdx < commandHistory.length - 1) {
        historyIdx++;
        input.value = commandHistory[commandHistory.length - 1 - historyIdx];
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIdx > 0) {
        historyIdx--;
        input.value = commandHistory[commandHistory.length - 1 - historyIdx];
      } else if (historyIdx === 0) {
        historyIdx = -1;
        input.value = tempInput;
      }
      return;
    }

    if (e.key === "Enter") {
      const raw = input.value.trim();
      if (!raw) return;

      commandHistory.push(raw);
      historyIdx = -1;
      tempInput = "";

      printLine(`<span class="terminal-prompt">ah51@system:~$</span> <span>${escapeHtml(raw)}</span>`);

      const parts = raw.split(/\s+/);
      const command = parts[0].toLowerCase();
      const args = parts.slice(1);

      if (commandRegistry[command]) {
        try {
          const result = commandRegistry[command](args);
          if (result !== null) {
            printLine(result.replace(/\n/g, "<br>"));
          }
        } catch (err) {
          printLine(`Execution Error: ${err.message}`, true);
        }
      } else {
        printLine(`bash: ${escapeHtml(command)}: command not found. Tekan 'Tab' atau ketik 'help'.`, true);
      }

      input.value = "";
    }
  });
})();

/* ============================================================
   10. MANAJEMEN TEMA & TOMBOL BAGIKAN
   ============================================================ */
function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("ah51_theme", theme);

  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const icon = themeToggle.querySelector("i");
    if (icon) {
      icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }
  }

  const c = document.getElementById('matrixCanvas');
  if (c) {
    const cx = c.getContext('2d');
    cx?.clearRect(0, 0, c.width, c.height);
  }
}

(() => {
  const saved = localStorage.getItem("ah51_theme") || "dark";
  setTheme(saved);

  document.getElementById("theme-toggle")?.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    setTheme(current === "light" ? "dark" : "light");
  });

  document.getElementById("share-btn")?.addEventListener("click", async () => {
    const shareData = {
      title: "Adaptive Horizon 5.1",
      text: "Official Portfolio of Adaptive Horizon 5.1 - IoT & Embedded Developer",
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast(I18nManager.getText('toast_copied'));
    }
  });
})();

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}