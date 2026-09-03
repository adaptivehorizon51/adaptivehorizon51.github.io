'use strict';

/**
 * Adaptive Horizon 5.1 | Master Interactive Script Engine
 * - 3D Tilt & Mouse Spotlight Tracking
 * - Multi-Role Dynamic Typewriter
 * - Real-Time Indonesia (WIB) Clock & Status
 * - Mini Interactive ESP32 BetterLyrics LCD 16x2 Simulator
 * - Toast Notification System & Link Sharing
 * - Multi-Language Controller (ID, EN, MS)
 * - Theme Switcher (Dark OLED / Light Frosted Glass)
 */

const App = (() => {

    const STATE = {
        lang: localStorage.getItem('ah_lang') || 'id',
        theme: localStorage.getItem('ah_theme') || 'dark',
        lcdPlaying: true,
        lcdIndex: 0
    };

    const TRANSLATIONS = {
        id: {
            pre_sub: "Memuat Sistem...",
            pre_ready: "Sistem Siap!",
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
            toast_shared: "Tautan portofolio berhasil disalin ke clipboard!",
            toast_copied: "Berhasil disalin!",
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
            pre_ready: "System Ready!",
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
            toast_copied: "Copied successfully!",
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
            pre_ready: "Sistem Sedia!",
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
            toast_shared: "Pautan portfolio berjaya disalin ke papan klip!",
            toast_copied: "Berjaya disalin!",
            roles: [
                "Peminat Teknologi",
                "Pembangun IoT & Terbenam",
                "Pencipta ESP32 & Arduino",
                "Pembuat Perkakasan Kreatif",
                "Penyumbang Sumber Terbuka"
            ]
        }
    };

    // Simulated Lyrics for ESP32 BetterLyrics Showcase
    const LCD_TRACKS = [
        { title: "BetterLyrics v2.0", lyric: "♪ Syncing Wi-Fi..." },
        { title: "Bohemian Rhapsody", lyric: "Mama, just killed.." },
        { title: "Counting Stars", lyric: "♪ No more counting $" },
        { title: "Viva La Vida", lyric: "I used to rule..." },
        { title: "Adaptive Horizon", lyric: "★ Hardware Active ★" }
    ];

    // DOM Cache
    const DOM = {
        html: document.documentElement,
        body: document.body,
        preloader: document.getElementById('preloader'),
        preSub: document.getElementById('pre-sub'),
        preLog: document.getElementById('pre-log'),
        greeting: document.getElementById('greeting-text'),
        themeToggle: document.getElementById('theme-toggle'),
        themeIcon: document.querySelector('#theme-toggle i'),
        langBtns: document.querySelectorAll('.lang-btn'),
        shareBtn: document.getElementById('share-btn'),
        typewriter: document.getElementById('typewriter'),
        liveClock: document.getElementById('live-clock'),
        translatables: document.querySelectorAll('[data-i18n]'),
        cursorGlow: document.getElementById('cursor-glow'),
        cards: document.querySelectorAll('.bento-card'),
        toastContainer: document.getElementById('toast-container'),
        lcdRow1: document.getElementById('lcd-row-1'),
        lcdRow2: document.getElementById('lcd-row-2'),
        lcdPlayBtn: document.getElementById('lcd-play-btn'),
        lcdPrevBtn: document.getElementById('lcd-prev-btn'),
        lcdNextBtn: document.getElementById('lcd-next-btn'),
        lcdModeBadge: document.getElementById('lcd-mode-badge')
    };

    // --- Toast Notification Engine ---
    const Toast = {
        show(message, iconClass = 'fas fa-circle-check') {
            if (!DOM.toastContainer) return;
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.innerHTML = `<i class="${iconClass}"></i><span>${message}</span>`;
            DOM.toastContainer.appendChild(toast);

            setTimeout(() => {
                toast.classList.add('toast-out');
                setTimeout(() => toast.remove(), 320);
            }, 3000);
        }
    };

    // --- Preloader Driver ---
    const Loader = {
        init() {
            const percentEl = document.querySelector('.pre-percentage');
            const progressBar = document.querySelector('.pre-progress-bar');
            let count = 0;

            const logs = [
                "Loading kernel modules...",
                "Mounting virtual DOM...",
                "Configuring ESP32 simulator...",
                "Activating frosted glass shaders...",
                "System online."
            ];

            const counterInterval = setInterval(() => {
                count += Math.floor(Math.random() * 3) + 2;
                if (count > 100) count = 100;

                if (percentEl) percentEl.textContent = count.toString().padStart(2, '0') + "%";
                if (progressBar) progressBar.style.width = count + "%";

                if (DOM.preLog) {
                    const logIdx = Math.min(Math.floor((count / 100) * logs.length), logs.length - 1);
                    DOM.preLog.textContent = logs[logIdx];
                }

                if (count >= 100) {
                    clearInterval(counterInterval);
                    setTimeout(() => this.dismiss(), 200);
                }
            }, 25);
        },
        dismiss() {
            if (DOM.preloader) {
                DOM.preloader.classList.add('preloader-hidden');
                setTimeout(() => {
                    if (DOM.preloader) DOM.preloader.remove();
                }, 700);
            }
        }
    };

    // --- Dynamic Typewriter Engine ---
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
            this.roles = (t && t.roles) ? t.roles : [
                "Tech Enthusiast",
                "IoT & Embedded Developer",
                "ESP32 & Arduino Creator"
            ];
        },

        tick() {
            if (!DOM.typewriter) return;
            const currentRole = this.roles[this.roleIndex % this.roles.length];

            if (this.isDeleting) {
                this.charIndex--;
                DOM.typewriter.textContent = currentRole.substring(0, this.charIndex);
            } else {
                this.charIndex++;
                DOM.typewriter.textContent = currentRole.substring(0, this.charIndex);
            }

            let typeSpeed = this.isDeleting ? 40 : 80;

            if (!this.isDeleting && this.charIndex === currentRole.length) {
                typeSpeed = 2200; // Pause at full word
                this.isDeleting = true;
            } else if (this.isDeleting && this.charIndex === 0) {
                this.isDeleting = false;
                this.roleIndex++;
                typeSpeed = 400; // Pause before typing new word
            }

            clearTimeout(this.timer);
            this.timer = setTimeout(() => this.tick(), typeSpeed);
        }
    };

    // --- Interactive Mouse Spotlight & 3D Tilt ---
    const SpotlightAndTilt = {
        init() {
            // Global cursor glow follower
            window.addEventListener('pointermove', (e) => {
                if (DOM.cursorGlow) {
                    DOM.cursorGlow.style.left = `${e.clientX}px`;
                    DOM.cursorGlow.style.top = `${e.clientY}px`;
                }
            });

            // Card spotlight and subtle 3D tilt
            DOM.cards.forEach((card) => {
                card.addEventListener('pointermove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);

                    // 3D Tilt calculation (subtle and high performance)
                    if (window.innerWidth > 820) {
                        const centerX = rect.width / 2;
                        const centerY = rect.height / 2;
                        const rotateX = ((y - centerY) / centerY) * -5;
                        const rotateY = ((x - centerX) / centerX) * 5;
                        card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
                    }
                });

                card.addEventListener('pointerleave', () => {
                    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
                });
            });
        }
    };

    // --- Real-time Indonesia Time (WIB) Clock ---
    const LiveClock = {
        init() {
            this.update();
            setInterval(() => this.update(), 1000);
        },
        update() {
            if (!DOM.liveClock) return;
            const now = new Date();
            // WIB is UTC+7
            const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
            const wibDate = new Date(utc + (3600000 * 7));

            const h = String(wibDate.getHours()).padStart(2, '0');
            const m = String(wibDate.getMinutes()).padStart(2, '0');
            const s = String(wibDate.getSeconds()).padStart(2, '0');
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
            DOM.shareBtn.addEventListener('click', async () => {
                const url = window.location.href;
                const shareData = {
                    title: "Adaptive Horizon 5.1",
                    text: "Check out the official portfolio of Adaptive Horizon 5.1",
                    url: url
                };

                if (navigator.share) {
                    try {
                        await navigator.share(shareData);
                    } catch (err) {
                        // Dismissed share or error, fallback to clipboard
                        this.copyToClipboard(url);
                    }
                } else {
                    this.copyToClipboard(url);
                }
            });
        },
        copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
                const msg = (TRANSLATIONS[STATE.lang] && TRANSLATIONS[STATE.lang].toast_shared)
                    ? TRANSLATIONS[STATE.lang].toast_shared
                    : "Link copied to clipboard!";
                Toast.show(msg);
            }).catch(() => {
                Toast.show("URL: " + text, "fas fa-link");
            });
        }
    };

    return {
        start() {
            Loader.init();
            Content.init();
            Theme.init();
            LiveClock.init();
            SpotlightAndTilt.init();
            Typewriter.init();
            LCDSimulator.init();
            Share.init();
        }
    };

})();

document.addEventListener('DOMContentLoaded', App.start);
