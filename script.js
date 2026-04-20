const verbs = [
  ["manger", "to eat"],
  ["boire", "to drink"],
  ["aller", "to go"],
  ["voir", "to see"],
  ["prendre", "to take"],
  ["faire", "to do"],
  ["venir", "to come"],
  ["aimer", "to love"],
  ["écrire", "to write"],
  ["lire", "to read"],
];

const playfield = document.getElementById("playfield");
const answerInput = document.getElementById("answer");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");

let score = 0;
let lives = 3;
let active = null;
let audioCtx;

function ensureAudio() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
}

function beep({ freq = 440, dur = 0.12, type = "sine", gain = 0.05 }) {
  ensureAudio();
  const osc = audioCtx.createOscillator();
  const g = audioCtx.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  g.gain.value = gain;
  osc.connect(g);
  g.connect(audioCtx.destination);
  osc.start();
  g.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
  osc.stop(audioCtx.currentTime + dur);
}

function randomVerb() {
  const [fr, en] = verbs[Math.floor(Math.random() * verbs.length)];
  return { fr, en };
}

function spawnVerb() {
  if (lives <= 0) return;

  const vb = randomVerb();
  const el = document.createElement("div");
  el.className = "verb";
  el.textContent = vb.fr;

  const width = playfield.clientWidth;
  const x = 60 + Math.random() * (width - 120);
  el.style.left = `${x}px`;
  el.style.top = "-65px";

  playfield.appendChild(el);

  const fallDurationMs = 5200; // chute plus longue (plus de hauteur ressentie)
  const totalDistance = playfield.clientHeight + 95;
  const start = performance.now();

  active = { vb, el, done: false };

  function tick(now) {
    if (!active || active.el !== el || active.done) return;
    const p = Math.min((now - start) / fallDurationMs, 1);
    const y = -65 + p * totalDistance;
    el.style.top = `${y}px`;

    if (p < 1) {
      requestAnimationFrame(tick);
    } else {
      missVerb();
    }
  }

  requestAnimationFrame(tick);
}

function clearActive() {
  if (!active) return;
  active.done = true;
  active.el.remove();
  active = null;
}

function markAndRemove(className) {
  if (!active) return;
  active.done = true;
  active.el.classList.add(className);
  setTimeout(() => active?.el.remove(), 220);
  active = null;
}

function hitVerb() {
  score += 1;
  scoreEl.textContent = score;
  beep({ freq: 740, dur: 0.12, type: "triangle", gain: 0.07 });
  beep({ freq: 980, dur: 0.1, type: "triangle", gain: 0.045 });
  markAndRemove("ok");
  setTimeout(spawnVerb, 250);
}

function missVerb() {
  if (lives <= 0) return;
  lives -= 1;
  livesEl.textContent = lives;
  beep({ freq: 170, dur: 0.24, type: "sawtooth", gain: 0.08 });
  markAndRemove("miss");

  if (lives <= 0) {
    alert(`Partie terminée ! Score final: ${score}`);
    resetGame();
    return;
  }

  setTimeout(spawnVerb, 300);
}

function resetGame() {
  clearActive();
  score = 0;
  lives = 3;
  scoreEl.textContent = score;
  livesEl.textContent = lives;
  answerInput.value = "";
  setTimeout(spawnVerb, 500);
}

answerInput.addEventListener("input", () => {
  if (!active) return;
  if (answerInput.value.trim().toLowerCase() === active.vb.en) {
    answerInput.value = "";
    hitVerb();
  }
});

window.addEventListener("pointerdown", ensureAudio, { once: true });
spawnVerb();
