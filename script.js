'use strict';

/**
 * Adaptive Horizon 5.1 | Lightweight High-Performance Script
 * Optimized to run at 0-1% GPU/CPU idle
 */

const App = (() => {

    const STATE = {
        lang: localStorage.getItem('ah_lang') || 'id',
        theme: localStorage.getItem('ah_theme') || 'dark',
        lcdPlaying: true,
        lcdIndex: 0,
        isTabActive: true
    };

    const TRANSLATIONS = {
        id: {
            pre_sub: "Memuat Sistem...",
            status_active: "Aktif Berkreasi",
            greeting_morning: "Selamat Pagi!",
            greeting_noon: "Selamat Siang!",
            greeting_afternoon: "Selamat Sore.",
            greeting_night: "Selamat Malam!",
            brand_core: "BRAND CORE",
            local_time: "WAKTU LOKAL (INDONESIA)",
            base_on: "BASE ON",
            established: "ESTABLISHED",
            social_title: "Hubungkan & Ikuti",
            social_badge: "Tautan Resmi",
            whatsapp_channel: "Saluran WhatsApp",
            project_kicker: "PROJECT UNGGULAN",
            project_description: "Perangkat lirik karaoke pintar untuk modul LCD 16×2 dengan dashboard kontrol Wi-Fi, 20 model sinkronisasi lirik, dan 20 preset animasi transisi mulus.",
            project_link: "Lihat Repository",
            support_heading: "Dukung Terus Karya Kreatif",
            support_para: "Dukungan Anda sangat berarti untuk membiayai komponen hardware, pengembangan sistem, dan riset proyek open-source selanjutnya.",
            copyright: "© A.H 5.1 · Hak Cipta Dilindungi",
            toast_shared: "Tautan portofolio berhasil disalin!",
            roles: [
                "Tech Enthusiast",
                "IoT & Embedded Developer",
                "ESP32 & Arduino Creator",
                "Creative Hardware Maker",
                "Open Source Contributor"
            ]
        },
        en: {
            pre_sub: "Initializing System...",
            status_active: "Active Creator",
            greeting_morning: "Good Morning!",
            greeting_noon: "Good Afternoon!",
            greeting_afternoon: "Good Afternoon!",
            greeting_night: "Good Evening!",
            brand_core: "BRAND CORE",
            local_time: "LOCAL TIME (INDONESIA)",
            base_on: "BASE ON",
            established: "ESTABLISHED",
            social_title: "Connect & Follow",
            social_badge: "Official Links",
            whatsapp_channel: "WhatsApp Channel",
            project_kicker: "FEATURED PROJECT",
            project_description: "Smart karaoke lyric device for 16×2 LCD modules with a Wi-Fi control dashboard, 20 lyric-sync modes, and 20 smooth transition animation presets.",
            project_link: "View Repository",
            support_heading: "Support Creative Works",
            support_para: "Your support keeps hardware prototypes, firmware development, and open-source tech research moving forward.",
            copyright: "© A.H 5.1 · All Rights Reserved",
            toast_shared: "Portfolio link copied to clipboard!",
            roles: [
                "Tech Enthusiast",
                "IoT & Embedded Developer",
                "ESP32 & Arduino Creator",
                "Creative Hardware Maker",
                "Open Source Contributor"
            ]
        },
        ms: {
            pre_sub: "Memuatkan Sistem...",
            status_active: "Aktif Berkarya",
            greeting_morning: "Selamat Pagi!",
            greeting_noon: "Selamat Tengahari!",
            greeting_afternoon: "Selamat Petang!",
            greeting_night: "Selamat Malam!",
            brand_core: "BRAND CORE",
            local_time: "WAKTU TEMPATAN (INDONESIA)",
            base_on: "BASE ON",
            established: "ESTABLISHED",
            social_title: "Hubungi & Ikuti",
            social_badge: "Pautan Rasmi",
            whatsapp_channel: "Saluran WhatsApp",
            project_kicker: "PROJEK PILIHAN",
            project_description: "Peranti lirik karaoke pintar untuk modul LCD 16×2 dengan papan pemuka kawalan Wi-Fi, 20 model sinkronisasi lirik, dan 20 pratetap animasi peralihan lancar.",
            project_link: "Lihat Repositori",
            support_heading: "Sokong Karya Kreatif",
            support_para: "Sokongan anda amat bermakna bagi membiayai komponen perkakasan, perisian tegar, dan penyelidikan projek sumber terbuka seterusnya.",
            copyright: "© A.H 5.1 · Hak Cipta Terpelihara",
            toast_shared: "Pautan portfolio berjaya disalin!",
            roles: [
                "Peminat Teknologi",
                "Pembangun IoT & Terbenam",
                "Pencipta ESP32 & Arduino",
                "Pembuat Perkakasan Kreatif",
                "Penyumbang Sumber Terbuka"
            ]
        }
    };

    const LCD_TRACKS = [
        { title: "DJ BLYATMAN - KAMAZ", lyric: "High track speed, vodka no limit" },
        { title: "OneRepublic - Counting", lyric: "♪ No more counting dollars, we'll be counting stars ♪" },
        { title: "Queen - Bohemian", lyric: "Mama, just killed a man, put a gun against his head" },
        { title: "Coldplay - Viva", lyric: "I used to rule the world, seas would rise when I gave the word" },
        { title: "BetterLyrics ESP32", lyric: "★ Real-time Sync Active · 20 Modes ★" }
    ];

    const DOM = {
        html: document.documentElement,
        preloader: document.getElementById('preloader'),
        preLog: document.getElementById('pre-log'),
        greeting: document.getElementById('greeting-text'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.querySelector('#theme-toggle i'),
        langBtns: document.querySelectorAll('.lang-btn'),
        shareBtn: document.getElementById('share-btn'),
        typewriter: document.getElementById('typewriter'),
        liveClock: document.getElementById('live-clock'),
        translatables: document.querySelectorAll('[data-i18n]'),
        cards: document.querySelectorAll('.bento-card'),
        toastContainer: document.getElementById('toast-container'),
        lcdRow1: document.getElementById('lcd-row-1'),
        lcdRow2: document.getElementById('lcd-row-2'),
        lcdPlayBtn: document.getElementById('lcd-play-btn'),
        lcdPrevBtn: document.getElementById('lcd-prev-btn'),
        lcdNextBtn: document.getElementById('lcd-next-btn'),
        lcdModeBadge: document.getElementById('lcd-mode-badge')
    };

    // --- Fast Lightweight Preloader ---
    const Loader = {
        init() {
            const percentEl = document.querySelector('.pre-percentage');
            const progressBar = document.querySelector('.pre-progress-bar');
            let count = 0;

            const timer = setInterval(() => {
                count += 5;
                if (count > 100) count = 100;
                if (percentEl) percentEl.textContent = count + "%";
                if (progressBar) progressBar.style.width = count + "%";

                if (count >= 100) {
                    clearInterval(timer);
                    if (DOM.preloader) {
                        DOM.preloader.classList.add('preloader-hidden');
                        setTimeout(() => DOM.preloader.remove(), 500);
                    }
                }
            }, 18);
        }
    };

    // --- Optimized Typewriter Engine ---
    const Typewriter = {
        roles: [],
        roleIndex: 0,
        charIndex: 0,
        isDeleting: false,
        timer: null,

        init() {
            this.updateRoles();
            this.tick();
        },

        updateRoles() {
            const t = TRANSLATIONS[STATE.lang];
            this.roles = (t && t.roles) ? t.roles : ["Tech Enthusiast", "IoT & Embedded Developer"];
        },

        tick() {
            if (!STATE.isTabActive || !DOM.typewriter) {
                this.timer = setTimeout(() => this.tick(), 500);
                return;
            }

            const currentRole = this.roles[this.roleIndex % this.roles.length];

            if (this.isDeleting) {
                this.charIndex--;
                DOM.typewriter.textContent = currentRole.substring(0, this.charIndex);
            } else {
                this.charIndex++;
                DOM.typewriter.textContent = currentRole.substring(0, this.charIndex);
            }

            let speed = this.isDeleting ? 35 : 70;

            if (!this.isDeleting && this.charIndex === currentRole.length) {
                speed = 2000;
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.roleIndex++;
                speed = 300;
            }

            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.tick(), speed);
        }
    };

    // --- Lightweight Spotlight (Only when hovering, 0% CPU/GPU idle) ---
    const Spotlight = {
        init() {
            if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on mobile

            DOM.cards.forEach(card => {
                let rafId = null;

                card.addEventListener('pointermove', (e) => {
                    if (rafId) return;
                    rafId = requestAnimationFrame(() => {
                        const rect = card.getBoundingClientRect();
                        card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                        card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                        rafId = null;
                    });
                }, { passive: true });
            });
        }
    };

    // --- Real-time Indonesia Time (WIB) Clock ---
    const LiveClock = {
        timer: null,
        init() {
            this.update();
            this.timer = setInterval(() => {
                if (STATE.isTabActive) this.update();
            }, 1000);
        },
        update() {
            if (!DOM.liveClock) return;
            const now = new Date();
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const wib = new Date(utc + (3600000 * 7));

            const h = String(wib.getHours()).padStart(2, '0');
            const m = String(wib.getMinutes()).padStart(2, '0');
            const s = String(wib.getSeconds()).padStart(2, '0');
            DOM.liveClock.textContent = `${h}:${m}:${s} WIB`;
        }
    };

    // --- Mini ESP32 BetterLyrics LCD Simulator ---
    const LCDSimulator = {
        timer: null,
        charOffset: 0,

        init() {
            this.renderTrack();
            this.startMarquee();
            this.bindEvents();
        },

        renderTrack() {
            const track = LCD_TRACKS[STATE.lcdIndex % LCD_TRACKS.length];
            if (DOM.lcdRow1) DOM.lcdRow1.textContent = track.title;
            if (DOM.lcdRow2) DOM.lcdRow2.textContent = track.lyric;
            if (DOM.lcdModeBadge) {
                const modeNum = ((STATE.lcdIndex * 4 + 7) % 20) + 1;
                DOM.lcdModeBadge.textContent = `SYNC MODE ${String(modeNum).padStart(2, '0')}/20`;
            }
        },

        startMarquee() {
            clearInterval(this.timer);
            if (!STATE.lcdPlaying) return;

            this.timer = setInterval(() => {
                if (!STATE.isTabActive) return;
                const track = LCD_TRACKS[STATE.lcdIndex % LCD_TRACKS.length];
                const fullText = track.lyric + "       ";
                this.charOffset = (this.charOffset + 1) % fullText.length;
                const display = (fullText + fullText).substring(this.charOffset, this.charOffset + 16);
                if (DOM.lcdRow2) DOM.lcdRow2.textContent = display;
            }, 350);
        },

        bindEvents() {
            if (DOM.lcdPlayBtn) {
                DOM.lcdPlayBtn.addEventListener('click', () => {
                    STATE.lcdPlaying = !STATE.lcdPlaying;
                    DOM.lcdPlayBtn.classList.toggle('active', STATE.lcdPlaying);
                    const icon = DOM.lcdPlayBtn.querySelector('i');
                    if (icon) icon.className = STATE.lcdPlaying ? 'fas fa-pause' : 'fas fa-play';
                    if (STATE.lcdPlaying) this.startMarquee();
                    else clearInterval(this.timer);
                });
            }

            if (DOM.lcdNextBtn) {
                DOM.lcdNextBtn.addEventListener('click', () => {
                    STATE.lcdIndex = (STATE.lcdIndex + 1) % LCD_TRACKS.length;
                    this.charOffset = 0;
                    this.renderTrack();
                    if (STATE.lcdPlaying) this.startMarquee();
                });
            }

            if (DOM.lcdPrevBtn) {
                DOM.lcdPrevBtn.addEventListener('click', () => {
                    STATE.lcdIndex = (STATE.lcdIndex - 1 + LCD_TRACKS.length) % LCD_TRACKS.length;
                    this.charOffset = 0;
                    this.renderTrack();
                    if (STATE.lcdPlaying) this.startMarquee();
                });
            }
        }
    };

    // --- Dynamic Greeting System ---
    const getGreeting = (lang) => {
        const now = new Date();
        const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
        const wibHours = new Date(utc + (3600000 * 7)).getHours();
        const t = TRANSLATIONS[lang];

        if (wibHours >= 4 && wibHours < 11) return t.greeting_morning;
        if (wibHours >= 11 && wibHours < 15) return t.greeting_noon;
        if (wibHours >= 15 && wibHours < 19) return t.greeting_afternoon;
        return t.greeting_night;
    };

    // --- Language Controller ---
    const Content = {
        init() {
            this.apply(STATE.lang);
            DOM.langBtns.forEach(btn => {
                btn.addEventListener('click', () => this.apply(btn.dataset.lang));
            });
        },
        apply(lang) {
            if (!TRANSLATIONS[lang]) return;
            STATE.lang = lang;
            localStorage.setItem('ah_lang', lang);
            DOM.html.setAttribute('lang', lang);

            DOM.langBtns.forEach(btn =>
                btn.classList.toggle('active', btn.dataset.lang === lang)
            );

            const data = TRANSLATIONS[lang];

            DOM.translatables.forEach(el => {
                const key = el.dataset.i18n;
                if (!data[key]) return;
                el.textContent = key === 'copyright'
                    ? data[key].replace('{year}', new Date().getFullYear())
                    : data[key];
            });

            if (DOM.greeting) DOM.greeting.textContent = getGreeting(lang);
            Typewriter.updateRoles();
        }
    };

    // --- Theme Controller ---
    const Theme = {
        init() {
            this.apply(STATE.theme);
            if (DOM.themeToggle) {
                DOM.themeToggle.addEventListener('click', () => {
                    this.apply(STATE.theme === 'dark' ? 'light' : 'dark');
                });
            }
        },
        apply(theme) {
            STATE.theme = theme;
            localStorage.setItem('ah_theme', theme);
            DOM.html.setAttribute('data-theme', theme);
            if (DOM.themeIcon) {
                DOM.themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
            }
        }
    };

    // --- Share / Copy Link Controller ---
    const Share = {
        init() {
            if (!DOM.shareBtn) return;
            DOM.shareBtn.addEventListener('click', () => {
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {
                    const msg = (TRANSLATIONS[STATE.lang] && TRANSLATIONS[STATE.lang].toast_shared)
                        ? TRANSLATIONS[STATE.lang].toast_shared
                        : "Link copied!";
                    
                    if (DOM.toastContainer) {
                        const toast = document.createElement('div');
                        toast.className = 'toast';
                        toast.innerHTML = `<i class="fas fa-circle-check"></i><span>${msg}</span>`;
                        DOM.toastContainer.appendChild(toast);
                        setTimeout(() => toast.remove(), 2500);
                    }
                });
            });
        }
    };

    // --- Background Tab Visibility Guard (Zero CPU/GPU when minimized) ---
    const Visibility = {
        init() {
            document.addEventListener('visibilitychange', () => {
                STATE.isTabActive = !document.hidden;
            });
        }
    };

    return {
        start() {
            Visibility.init();
            Loader.init();
            Content.init();
            Theme.init();
            LiveClock.init();
            Spotlight.init();
            Typewriter.init();
            LCDSimulator.init();
            Share.init();
        }
    };

})();

document.addEventListener('DOMContentLoaded', App.start);
