/* ============================================================
   1. ANIMASI CANVAS MATRIX / DIGITAL RAIN EFFECT
   ============================================================ */
const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const characters = '01ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+-/<>~';
const fontSize = 14;
let columns = Math.floor(canvas.width / fontSize);
let drops = [];

function initDrops() {
  columns = Math.floor(canvas.width / fontSize);
  drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = Math.random() * -100;
  }
}
initDrops();
window.addEventListener('resize', initDrops);

function drawMatrix() {
  ctx.fillStyle = 'rgba(8, 11, 17, 0.12)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#00f0ff';
  ctx.font = fontSize + 'px monospace';

  for (let i = 0; i < drops.length; i++) {
    const text = characters.charAt(Math.floor(Math.random() * characters.length));
    ctx.fillText(text, i * fontSize, drops[i] * fontSize);

    if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
      drops[i] = 0;
    }
    drops[i]++;
  }
}
setInterval(drawMatrix, 45);

/* ============================================================
   2. TYPEWRITER EFFECT UNTUK SUBTITLE
   ============================================================ */
const phrases = [
  "Cybersecurity Enthusiast & Tech Explorer",
  "Fullstack Web & Systems Developer",
  "Automating the Future with Code",
  "Secret Code Core Initialized..."
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedElement = document.getElementById("typed-text");

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typedElement.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedElement.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;

    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      setTimeout(typeLoop, 500);
      return;
    }
  }

  const speed = isDeleting ? 40 : 80;
  setTimeout(typeLoop, speed);
}
document.addEventListener("DOMContentLoaded", typeLoop);

/* ============================================================
   3. INTERACTIVE LINUX TERMINAL CLI SIMULATOR
   ============================================================ */
const terminalInput = document.getElementById("terminal-input");
const terminalBody = document.getElementById("terminal-body");

function focusTerminal() {
  terminalInput.focus();
}

const commands = {
  help: () => `Perintah yang tersedia:
- <span class="highlight-cmd">about</span>    : Informasi profil Adaptive Horizon
- <span class="highlight-cmd">skills</span>   : Daftar keahlian teknis & tools
- <span class="highlight-cmd">projects</span> : Informasi proyek yang sedang dikembangkan
- <span class="highlight-cmd">whoami</span>   : Menampilkan identitas pengguna saat ini
- <span class="highlight-cmd">date</span>     : Menampilkan waktu server saat ini
- <span class="highlight-cmd">clear</span>    : Membersihkan layar terminal`,

  about: () => `Adaptive Horizon:
Spesialis dalam eksplorasi teknologi, sistem keamanan informasi,
serta pengembangan aplikasi web modern yang adaptif dan terstruktur.`,

  skills: () => `Daftar Keahlian:
[+] OS       : Linux (Arch, Debian, Ubuntu)
[+] Dev      : Python, JavaScript, HTML5, CSS3, Bash
[+] Security : Network Analysis, Penetration Testing Basics
[+] Tools    : Git, Docker, VS Code, Terminal CLI`,

  projects: () => `Proyek Terdaftar:
1. adaptivehorizon51.github.io [Live Portfolio]
2. Secret Code Engine [Research Project]`,

  whoami: () => `guest@adaptivehorizon-system [Privilege: Read-Only]`,

  date: () => new Date().toUTCString(),

  clear: () => {
    terminalBody.innerHTML = '';
    return null;
  }
};

terminalInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const rawInput = this.value.trim();
    const cmd = rawInput.toLowerCase();

    if (rawInput !== "") {
      // Tampilkan prompt input yang baru dimasukkan
      const inputLine = document.createElement("div");
      inputLine.className = "terminal-line";
      inputLine.innerHTML = `<span class="terminal-prompt">adaptive@horizon:~$</span> <span>${escapeHtml(rawInput)}</span>`;
      terminalBody.appendChild(inputLine);

      // Eksekusi Perintah
      if (commands[cmd]) {
        const outputText = commands[cmd]();
        if (outputText !== null) {
          const outputLine = document.createElement("div");
          outputLine.className = "terminal-line";
          outputLine.style.color = "#94a3b8";
          outputLine.innerHTML = outputText.replace(/\n/g, "<br>");
          terminalBody.appendChild(outputLine);
        }
      } else {
        const errorLine = document.createElement("div");
        errorLine.className = "terminal-line";
        errorLine.style.color = "#ff5f56";
        errorLine.textContent = `bash: ${rawInput}: command not found. Ketik 'help' untuk bantuan.`;
        terminalBody.appendChild(errorLine);
      }

      this.value = "";
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  }
});

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
