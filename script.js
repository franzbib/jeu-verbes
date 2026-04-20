const TENSES = {
  imparfait: { label: "imparfait" },
  futur: { label: "futur" },
  passe_simple: { label: "passé simple" },
};

// Réglages faciles à modifier pour ajuster la durée et la difficulté.
const GAME_RULES = {
  wordsPerGame: 30,
  maxErrors: 6,
  keyboardStep: 34,
  spawnDelayMs: 520,
};

// Vitesses en pixels par seconde. Elles augmentent après chaque réponse.
const DIFFICULTIES = {
  easy: {
    label: "facile",
    baseSpeed: 72,
    speedIncrease: 2.2,
    maxSpeed: 150,
    allowedLevels: ["easy"],
  },
  medium: {
    label: "moyen",
    baseSpeed: 96,
    speedIncrease: 3.2,
    maxSpeed: 190,
    allowedLevels: ["easy", "medium"],
  },
  hard: {
    label: "difficile",
    baseSpeed: 124,
    speedIncrease: 4.3,
    maxSpeed: 245,
    allowedLevels: ["easy", "medium", "hard"],
  },
};

// Petite sélection initiale pour tester rapidement la mécanique.
const TEST_FORMS = [
  { text: "je parlais", tense: "imparfait", verb: "parler", person: "je", level: "easy", irregular: false },
  { text: "nous finirons", tense: "futur", verb: "finir", person: "nous", level: "easy", irregular: false },
  { text: "il prit", tense: "passe_simple", verb: "prendre", person: "il", level: "medium", irregular: true },
  { text: "elles travaillaient", tense: "imparfait", verb: "travailler", person: "elles", level: "easy", irregular: false },
  { text: "tu iras", tense: "futur", verb: "aller", person: "tu", level: "easy", irregular: true },
  { text: "nous vîmes", tense: "passe_simple", verb: "voir", person: "nous", level: "hard", irregular: true },
  { text: "vous aviez", tense: "imparfait", verb: "avoir", person: "vous", level: "easy", irregular: true },
  { text: "ils comprendront", tense: "futur", verb: "comprendre", person: "ils", level: "medium", irregular: true },
  { text: "elle choisit", tense: "passe_simple", verb: "choisir", person: "elle", level: "easy", irregular: false },
];

// Liste pédagogique principale. Pour ajouter des verbes, copier un objet et modifier
// text, tense, verb, person. Pour ajouter un temps, compléter TENSES et les boîtes HTML.
const GAME_FORMS = [
  { text: "j'étais", tense: "imparfait", verb: "être", person: "je", level: "easy", irregular: true },
  { text: "tu étais", tense: "imparfait", verb: "être", person: "tu", level: "easy", irregular: true },
  { text: "nous étions", tense: "imparfait", verb: "être", person: "nous", level: "easy", irregular: true },
  { text: "elles étaient", tense: "imparfait", verb: "être", person: "elles", level: "easy", irregular: true },
  { text: "j'avais", tense: "imparfait", verb: "avoir", person: "je", level: "easy", irregular: true },
  { text: "il avait", tense: "imparfait", verb: "avoir", person: "il", level: "easy", irregular: true },
  { text: "vous aviez", tense: "imparfait", verb: "avoir", person: "vous", level: "easy", irregular: true },
  { text: "nous allions", tense: "imparfait", verb: "aller", person: "nous", level: "easy", irregular: true },
  { text: "ils allaient", tense: "imparfait", verb: "aller", person: "ils", level: "easy", irregular: true },
  { text: "je faisais", tense: "imparfait", verb: "faire", person: "je", level: "easy", irregular: true },
  { text: "vous faisiez", tense: "imparfait", verb: "faire", person: "vous", level: "easy", irregular: true },
  { text: "elle venait", tense: "imparfait", verb: "venir", person: "elle", level: "easy", irregular: true },
  { text: "nous venions", tense: "imparfait", verb: "venir", person: "nous", level: "medium", irregular: true },
  { text: "tu prenais", tense: "imparfait", verb: "prendre", person: "tu", level: "easy", irregular: true },
  { text: "ils prenaient", tense: "imparfait", verb: "prendre", person: "ils", level: "easy", irregular: true },
  { text: "je voyais", tense: "imparfait", verb: "voir", person: "je", level: "easy", irregular: true },
  { text: "nous voyions", tense: "imparfait", verb: "voir", person: "nous", level: "medium", irregular: true },
  { text: "il pouvait", tense: "imparfait", verb: "pouvoir", person: "il", level: "easy", irregular: true },
  { text: "vous pouviez", tense: "imparfait", verb: "pouvoir", person: "vous", level: "easy", irregular: true },
  { text: "je voulais", tense: "imparfait", verb: "vouloir", person: "je", level: "easy", irregular: true },
  { text: "elles voulaient", tense: "imparfait", verb: "vouloir", person: "elles", level: "easy", irregular: true },
  { text: "tu devais", tense: "imparfait", verb: "devoir", person: "tu", level: "easy", irregular: true },
  { text: "nous devions", tense: "imparfait", verb: "devoir", person: "nous", level: "medium", irregular: true },
  { text: "il disait", tense: "imparfait", verb: "dire", person: "il", level: "easy", irregular: true },
  { text: "vous disiez", tense: "imparfait", verb: "dire", person: "vous", level: "easy", irregular: true },
  { text: "je lisais", tense: "imparfait", verb: "lire", person: "je", level: "easy", irregular: true },
  { text: "elles lisaient", tense: "imparfait", verb: "lire", person: "elles", level: "easy", irregular: true },
  { text: "tu écrivais", tense: "imparfait", verb: "écrire", person: "tu", level: "easy", irregular: true },
  { text: "nous écrivions", tense: "imparfait", verb: "écrire", person: "nous", level: "medium", irregular: true },
  { text: "je mettais", tense: "imparfait", verb: "mettre", person: "je", level: "easy", irregular: true },
  { text: "ils mettaient", tense: "imparfait", verb: "mettre", person: "ils", level: "easy", irregular: true },
  { text: "elle partait", tense: "imparfait", verb: "partir", person: "elle", level: "easy", irregular: true },
  { text: "nous sortions", tense: "imparfait", verb: "sortir", person: "nous", level: "easy", irregular: true },
  { text: "je finissais", tense: "imparfait", verb: "finir", person: "je", level: "easy", irregular: false },
  { text: "vous choisissiez", tense: "imparfait", verb: "choisir", person: "vous", level: "easy", irregular: false },
  { text: "tu parlais", tense: "imparfait", verb: "parler", person: "tu", level: "easy", irregular: false },
  { text: "elle aimait", tense: "imparfait", verb: "aimer", person: "elle", level: "easy", irregular: false },
  { text: "nous habitions", tense: "imparfait", verb: "habiter", person: "nous", level: "easy", irregular: false },
  { text: "ils travaillaient", tense: "imparfait", verb: "travailler", person: "ils", level: "easy", irregular: false },
  { text: "je mangeais", tense: "imparfait", verb: "manger", person: "je", level: "easy", irregular: false },
  { text: "nous commencions", tense: "imparfait", verb: "commencer", person: "nous", level: "medium", irregular: false },
  { text: "tu apprenais", tense: "imparfait", verb: "apprendre", person: "tu", level: "medium", irregular: true },
  { text: "ils comprenaient", tense: "imparfait", verb: "comprendre", person: "ils", level: "medium", irregular: true },
  { text: "je connaissais", tense: "imparfait", verb: "connaître", person: "je", level: "medium", irregular: true },
  { text: "elle buvait", tense: "imparfait", verb: "boire", person: "elle", level: "medium", irregular: true },
  { text: "nous vivions", tense: "imparfait", verb: "vivre", person: "nous", level: "medium", irregular: true },
  { text: "ils attendaient", tense: "imparfait", verb: "attendre", person: "ils", level: "easy", irregular: false },
  { text: "vous vendiez", tense: "imparfait", verb: "vendre", person: "vous", level: "easy", irregular: false },

  { text: "je serai", tense: "futur", verb: "être", person: "je", level: "easy", irregular: true },
  { text: "tu seras", tense: "futur", verb: "être", person: "tu", level: "easy", irregular: true },
  { text: "nous serons", tense: "futur", verb: "être", person: "nous", level: "easy", irregular: true },
  { text: "ils auront", tense: "futur", verb: "avoir", person: "ils", level: "easy", irregular: true },
  { text: "j'aurai", tense: "futur", verb: "avoir", person: "je", level: "easy", irregular: true },
  { text: "vous aurez", tense: "futur", verb: "avoir", person: "vous", level: "easy", irregular: true },
  { text: "j'irai", tense: "futur", verb: "aller", person: "je", level: "easy", irregular: true },
  { text: "tu iras", tense: "futur", verb: "aller", person: "tu", level: "easy", irregular: true },
  { text: "elles iront", tense: "futur", verb: "aller", person: "elles", level: "easy", irregular: true },
  { text: "je ferai", tense: "futur", verb: "faire", person: "je", level: "easy", irregular: true },
  { text: "nous ferons", tense: "futur", verb: "faire", person: "nous", level: "easy", irregular: true },
  { text: "il viendra", tense: "futur", verb: "venir", person: "il", level: "easy", irregular: true },
  { text: "vous viendrez", tense: "futur", verb: "venir", person: "vous", level: "medium", irregular: true },
  { text: "je prendrai", tense: "futur", verb: "prendre", person: "je", level: "easy", irregular: true },
  { text: "elles prendront", tense: "futur", verb: "prendre", person: "elles", level: "easy", irregular: true },
  { text: "tu verras", tense: "futur", verb: "voir", person: "tu", level: "easy", irregular: true },
  { text: "nous verrons", tense: "futur", verb: "voir", person: "nous", level: "medium", irregular: true },
  { text: "je pourrai", tense: "futur", verb: "pouvoir", person: "je", level: "easy", irregular: true },
  { text: "ils pourront", tense: "futur", verb: "pouvoir", person: "ils", level: "easy", irregular: true },
  { text: "tu voudras", tense: "futur", verb: "vouloir", person: "tu", level: "easy", irregular: true },
  { text: "elle voudra", tense: "futur", verb: "vouloir", person: "elle", level: "easy", irregular: true },
  { text: "je devrai", tense: "futur", verb: "devoir", person: "je", level: "easy", irregular: true },
  { text: "nous devrons", tense: "futur", verb: "devoir", person: "nous", level: "medium", irregular: true },
  { text: "il dira", tense: "futur", verb: "dire", person: "il", level: "easy", irregular: true },
  { text: "vous direz", tense: "futur", verb: "dire", person: "vous", level: "easy", irregular: true },
  { text: "je lirai", tense: "futur", verb: "lire", person: "je", level: "easy", irregular: true },
  { text: "elles liront", tense: "futur", verb: "lire", person: "elles", level: "easy", irregular: true },
  { text: "tu écriras", tense: "futur", verb: "écrire", person: "tu", level: "easy", irregular: true },
  { text: "nous écrirons", tense: "futur", verb: "écrire", person: "nous", level: "medium", irregular: true },
  { text: "je mettrai", tense: "futur", verb: "mettre", person: "je", level: "easy", irregular: true },
  { text: "ils mettront", tense: "futur", verb: "mettre", person: "ils", level: "easy", irregular: true },
  { text: "elle partira", tense: "futur", verb: "partir", person: "elle", level: "easy", irregular: true },
  { text: "nous sortirons", tense: "futur", verb: "sortir", person: "nous", level: "easy", irregular: true },
  { text: "je finirai", tense: "futur", verb: "finir", person: "je", level: "easy", irregular: false },
  { text: "vous choisirez", tense: "futur", verb: "choisir", person: "vous", level: "easy", irregular: false },
  { text: "tu parleras", tense: "futur", verb: "parler", person: "tu", level: "easy", irregular: false },
  { text: "elle aimera", tense: "futur", verb: "aimer", person: "elle", level: "easy", irregular: false },
  { text: "nous habiterons", tense: "futur", verb: "habiter", person: "nous", level: "easy", irregular: false },
  { text: "ils travailleront", tense: "futur", verb: "travailler", person: "ils", level: "easy", irregular: false },
  { text: "je mangerai", tense: "futur", verb: "manger", person: "je", level: "easy", irregular: false },
  { text: "nous commencerons", tense: "futur", verb: "commencer", person: "nous", level: "medium", irregular: false },
  { text: "tu apprendras", tense: "futur", verb: "apprendre", person: "tu", level: "medium", irregular: true },
  { text: "ils comprendront", tense: "futur", verb: "comprendre", person: "ils", level: "medium", irregular: true },
  { text: "je connaîtrai", tense: "futur", verb: "connaître", person: "je", level: "medium", irregular: true },
  { text: "elle boira", tense: "futur", verb: "boire", person: "elle", level: "medium", irregular: true },
  { text: "nous vivrons", tense: "futur", verb: "vivre", person: "nous", level: "medium", irregular: true },
  { text: "ils attendront", tense: "futur", verb: "attendre", person: "ils", level: "easy", irregular: false },
  { text: "vous vendrez", tense: "futur", verb: "vendre", person: "vous", level: "easy", irregular: false },

  { text: "je fus", tense: "passe_simple", verb: "être", person: "je", level: "medium", irregular: true },
  { text: "il fut", tense: "passe_simple", verb: "être", person: "il", level: "medium", irregular: true },
  { text: "ils furent", tense: "passe_simple", verb: "être", person: "ils", level: "medium", irregular: true },
  { text: "j'eus", tense: "passe_simple", verb: "avoir", person: "je", level: "medium", irregular: true },
  { text: "elle eut", tense: "passe_simple", verb: "avoir", person: "elle", level: "medium", irregular: true },
  { text: "nous eûmes", tense: "passe_simple", verb: "avoir", person: "nous", level: "hard", irregular: true },
  { text: "j'allai", tense: "passe_simple", verb: "aller", person: "je", level: "easy", irregular: true },
  { text: "tu allas", tense: "passe_simple", verb: "aller", person: "tu", level: "easy", irregular: true },
  { text: "ils allèrent", tense: "passe_simple", verb: "aller", person: "ils", level: "easy", irregular: true },
  { text: "je fis", tense: "passe_simple", verb: "faire", person: "je", level: "medium", irregular: true },
  { text: "elle fit", tense: "passe_simple", verb: "faire", person: "elle", level: "medium", irregular: true },
  { text: "vous fîtes", tense: "passe_simple", verb: "faire", person: "vous", level: "hard", irregular: true },
  { text: "il vint", tense: "passe_simple", verb: "venir", person: "il", level: "medium", irregular: true },
  { text: "ils vinrent", tense: "passe_simple", verb: "venir", person: "ils", level: "medium", irregular: true },
  { text: "je pris", tense: "passe_simple", verb: "prendre", person: "je", level: "medium", irregular: true },
  { text: "elle prit", tense: "passe_simple", verb: "prendre", person: "elle", level: "medium", irregular: true },
  { text: "nous prîmes", tense: "passe_simple", verb: "prendre", person: "nous", level: "hard", irregular: true },
  { text: "je vis", tense: "passe_simple", verb: "voir", person: "je", level: "medium", irregular: true },
  { text: "il vit", tense: "passe_simple", verb: "voir", person: "il", level: "medium", irregular: true },
  { text: "nous vîmes", tense: "passe_simple", verb: "voir", person: "nous", level: "hard", irregular: true },
  { text: "je pus", tense: "passe_simple", verb: "pouvoir", person: "je", level: "medium", irregular: true },
  { text: "elles purent", tense: "passe_simple", verb: "pouvoir", person: "elles", level: "medium", irregular: true },
  { text: "tu voulus", tense: "passe_simple", verb: "vouloir", person: "tu", level: "medium", irregular: true },
  { text: "il voulut", tense: "passe_simple", verb: "vouloir", person: "il", level: "medium", irregular: true },
  { text: "je dus", tense: "passe_simple", verb: "devoir", person: "je", level: "medium", irregular: true },
  { text: "nous dûmes", tense: "passe_simple", verb: "devoir", person: "nous", level: "hard", irregular: true },
  { text: "il dit", tense: "passe_simple", verb: "dire", person: "il", level: "medium", irregular: true },
  { text: "ils dirent", tense: "passe_simple", verb: "dire", person: "ils", level: "medium", irregular: true },
  { text: "je lus", tense: "passe_simple", verb: "lire", person: "je", level: "medium", irregular: true },
  { text: "elles lurent", tense: "passe_simple", verb: "lire", person: "elles", level: "medium", irregular: true },
  { text: "tu écrivis", tense: "passe_simple", verb: "écrire", person: "tu", level: "medium", irregular: true },
  { text: "nous écrivîmes", tense: "passe_simple", verb: "écrire", person: "nous", level: "hard", irregular: true },
  { text: "je mis", tense: "passe_simple", verb: "mettre", person: "je", level: "medium", irregular: true },
  { text: "ils mirent", tense: "passe_simple", verb: "mettre", person: "ils", level: "medium", irregular: true },
  { text: "elle partit", tense: "passe_simple", verb: "partir", person: "elle", level: "easy", irregular: true },
  { text: "nous sortîmes", tense: "passe_simple", verb: "sortir", person: "nous", level: "hard", irregular: true },
  { text: "je finis", tense: "passe_simple", verb: "finir", person: "je", level: "easy", irregular: false },
  { text: "elle choisit", tense: "passe_simple", verb: "choisir", person: "elle", level: "easy", irregular: false },
  { text: "je parlai", tense: "passe_simple", verb: "parler", person: "je", level: "easy", irregular: false },
  { text: "tu aimas", tense: "passe_simple", verb: "aimer", person: "tu", level: "easy", irregular: false },
  { text: "nous habitâmes", tense: "passe_simple", verb: "habiter", person: "nous", level: "hard", irregular: false },
  { text: "ils travaillèrent", tense: "passe_simple", verb: "travailler", person: "ils", level: "easy", irregular: false },
  { text: "je mangeai", tense: "passe_simple", verb: "manger", person: "je", level: "easy", irregular: false },
  { text: "nous commençâmes", tense: "passe_simple", verb: "commencer", person: "nous", level: "hard", irregular: false },
  { text: "tu appris", tense: "passe_simple", verb: "apprendre", person: "tu", level: "medium", irregular: true },
  { text: "ils comprirent", tense: "passe_simple", verb: "comprendre", person: "ils", level: "medium", irregular: true },
  { text: "je connus", tense: "passe_simple", verb: "connaître", person: "je", level: "medium", irregular: true },
  { text: "elle but", tense: "passe_simple", verb: "boire", person: "elle", level: "medium", irregular: true },
  { text: "nous vécûmes", tense: "passe_simple", verb: "vivre", person: "nous", level: "hard", irregular: true },
  { text: "ils attendirent", tense: "passe_simple", verb: "attendre", person: "ils", level: "easy", irregular: false },
  { text: "vous vendîtes", tense: "passe_simple", verb: "vendre", person: "vous", level: "hard", irregular: false },
];

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const settingsForm = document.getElementById("settingsForm");
const testDataButton = document.getElementById("testDataButton");
const hintToggle = document.getElementById("hintToggle");
const hintPanel = document.getElementById("hintPanel");
const playfield = document.getElementById("playfield");
const fallingWord = document.getElementById("fallingWord");
const bins = Array.from(document.querySelectorAll(".bin"));
const feedback = document.getElementById("feedback");
const restartButton = document.getElementById("restartButton");
const homeButton = document.getElementById("homeButton");
const playAgainButton = document.getElementById("playAgainButton");
const backToHomeButton = document.getElementById("backToHomeButton");
const scoreEl = document.getElementById("score");
const correctEl = document.getElementById("correctCount");
const errorEl = document.getElementById("errorCount");
const streakEl = document.getElementById("streakCount");
const progressEl = document.getElementById("progressStat");
const finalSummary = document.getElementById("finalSummary");
const tenseBreakdown = document.getElementById("tenseBreakdown");

const state = {
  mode: "game",
  difficulty: "easy",
  useTestData: false,
  deck: [],
  current: null,
  x: 0,
  y: 0,
  lastFrameTime: 0,
  animationId: 0,
  isResolving: false,
  score: 0,
  correct: 0,
  errors: 0,
  streak: 0,
  answered: 0,
  errorsByTense: createTenseCounter(),
};

function createTenseCounter() {
  return Object.fromEntries(Object.keys(TENSES).map((tense) => [tense, 0]));
}

function showScreen(screen) {
  [homeScreen, gameScreen, endScreen].forEach((item) => item.classList.remove("screen--active"));
  screen.classList.add("screen--active");
}

function getSelectedValue(name) {
  return settingsForm.querySelector(`input[name="${name}"]:checked`).value;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function getAvailableForms() {
  if (state.useTestData) {
    return TEST_FORMS;
  }

  const allowed = DIFFICULTIES[state.difficulty].allowedLevels;
  const pool = GAME_FORMS.filter((item) => allowed.includes(item.level));

  if (state.difficulty === "hard") {
    const irregulars = pool.filter((item) => item.irregular);
    return shuffle([...pool, ...irregulars.slice(0, 22)]);
  }

  return pool;
}

function refillDeckIfNeeded() {
  if (state.deck.length > 0) return;
  state.deck = shuffle(getAvailableForms());
}

function resetStats() {
  state.current = null;
  state.x = 0;
  state.y = 0;
  state.lastFrameTime = 0;
  state.isResolving = false;
  state.score = 0;
  state.correct = 0;
  state.errors = 0;
  state.streak = 0;
  state.answered = 0;
  state.errorsByTense = createTenseCounter();
}

function updateStats() {
  scoreEl.textContent = state.score;
  correctEl.textContent = state.correct;
  errorEl.textContent = state.errors;
  streakEl.textContent = state.streak;

  if (state.mode === "training") {
    progressEl.textContent = `${state.answered} réponses`;
  } else {
    progressEl.textContent = `${state.answered} / ${GAME_RULES.wordsPerGame}`;
  }
}

function currentSpeed() {
  const difficulty = DIFFICULTIES[state.difficulty];
  const speed = difficulty.baseSpeed + state.answered * difficulty.speedIncrease;
  return Math.min(speed, difficulty.maxSpeed);
}

function startGame({ useTestData = false } = {}) {
  cancelAnimationFrame(state.animationId);
  state.mode = getSelectedValue("mode");
  state.difficulty = getSelectedValue("difficulty");
  state.useTestData = useTestData;
  state.deck = shuffle(getAvailableForms());
  resetStats();
  hintPanel.hidden = !hintToggle.checked;
  updateStats();
  clearFeedback();
  bins.forEach((bin) => bin.classList.remove("bin--target", "bin--error"));
  showScreen(gameScreen);
  playfield.focus();
  window.setTimeout(spawnWord, 180);
}

function spawnWord() {
  if (shouldEndGame()) {
    finishGame();
    return;
  }

  refillDeckIfNeeded();
  state.current = state.deck.shift();
  state.isResolving = false;
  state.y = 18;
  state.x = playfield.clientWidth / 2;
  state.lastFrameTime = performance.now();

  fallingWord.textContent = state.current.text;
  fallingWord.className = "falling-word";
  fallingWord.hidden = false;
  placeWord();
  state.animationId = requestAnimationFrame(tick);
}

function placeWord() {
  const halfWidth = fallingWord.offsetWidth / 2;
  const minX = halfWidth + 8;
  const maxX = playfield.clientWidth - halfWidth - 8;
  state.x = Math.max(minX, Math.min(maxX, state.x));
  fallingWord.style.left = `${state.x}px`;
  fallingWord.style.top = `${state.y}px`;
}

function tick(now) {
  if (!state.current || state.isResolving) return;

  const elapsedSeconds = Math.min((now - state.lastFrameTime) / 1000, 0.05);
  state.lastFrameTime = now;
  state.y += currentSpeed() * elapsedSeconds;
  placeWord();

  if (hasReachedBins()) {
    resolveAnswer();
    return;
  }

  state.animationId = requestAnimationFrame(tick);
}

function hasReachedBins() {
  const wordBottom = state.y + fallingWord.offsetHeight;
  const binsTop = bins[0].offsetTop;
  return wordBottom >= binsTop + 8;
}

function moveWord(direction) {
  if (!state.current || state.isResolving) return;
  state.x += direction * GAME_RULES.keyboardStep;
  placeWord();
}

function getChosenTense() {
  const chosen = bins.find((bin) => {
    const left = bin.offsetLeft;
    const right = left + bin.offsetWidth;
    return state.x >= left && state.x <= right;
  });
  return chosen?.dataset.tense ?? bins[1].dataset.tense;
}

function resolveAnswer() {
  if (!state.current || state.isResolving) return;

  state.isResolving = true;
  cancelAnimationFrame(state.animationId);

  const expected = state.current.tense;
  const chosen = getChosenTense();
  const isCorrect = chosen === expected;
  const expectedLabel = TENSES[expected].label;
  const chosenBin = bins.find((bin) => bin.dataset.tense === chosen);
  const expectedBin = bins.find((bin) => bin.dataset.tense === expected);

  state.answered += 1;

  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.score += 10 + Math.min(state.streak, 6) * 2;
    fallingWord.classList.add("correct");
    chosenBin.classList.add("bin--target");
    showFeedback(`Correct : ${expectedLabel}`, true);
  } else {
    state.errors += 1;
    state.streak = 0;
    state.score = Math.max(0, state.score - 3);
    state.errorsByTense[expected] += 1;
    fallingWord.classList.add("wrong");
    chosenBin.classList.add("bin--error");
    expectedBin.classList.add("bin--target");
    showFeedback(`Erreur : c'était du ${expectedLabel}`, false);
  }

  updateStats();

  window.setTimeout(() => {
    fallingWord.hidden = true;
    bins.forEach((bin) => bin.classList.remove("bin--target", "bin--error"));

    if (shouldEndGame()) {
      finishGame();
    } else {
      state.current = null;
      window.setTimeout(spawnWord, GAME_RULES.spawnDelayMs);
    }
  }, 760);
}

function showFeedback(message, isCorrect) {
  feedback.textContent = message;
  feedback.className = `feedback is-visible ${isCorrect ? "is-correct" : "is-wrong"}`;
}

function clearFeedback() {
  feedback.textContent = "";
  feedback.className = "feedback";
}

function shouldEndGame() {
  if (state.mode === "training") return false;
  return state.errors >= GAME_RULES.maxErrors || state.answered >= GAME_RULES.wordsPerGame;
}

function finishGame() {
  cancelAnimationFrame(state.animationId);
  fallingWord.hidden = true;
  state.current = null;
  clearFeedback();
  renderFinalSummary();
  showScreen(endScreen);
}

function renderFinalSummary() {
  const total = state.correct + state.errors;
  const successRate = total === 0 ? 0 : Math.round((state.correct / total) * 100);

  finalSummary.innerHTML = "";
  [
    ["Score final", state.score],
    ["Réponses", total],
    ["Réussite", `${successRate} %`],
    ["Erreurs", state.errors],
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "summary-card";
    card.innerHTML = `<span>${label}</span><strong>${value}</strong>`;
    finalSummary.appendChild(card);
  });

  tenseBreakdown.innerHTML = "";
  Object.entries(TENSES).forEach(([tense, info]) => {
    const row = document.createElement("div");
    row.className = "breakdown-row";
    row.innerHTML = `<strong>${info.label}</strong><span>${state.errorsByTense[tense]} erreur(s)</span>`;
    tenseBreakdown.appendChild(row);
  });
}

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startGame({ useTestData: false });
});

testDataButton.addEventListener("click", () => {
  startGame({ useTestData: true });
});

restartButton.addEventListener("click", () => startGame({ useTestData: state.useTestData }));
playAgainButton.addEventListener("click", () => startGame({ useTestData: state.useTestData }));

homeButton.addEventListener("click", () => {
  cancelAnimationFrame(state.animationId);
  fallingWord.hidden = true;
  showScreen(homeScreen);
});

backToHomeButton.addEventListener("click", () => {
  showScreen(homeScreen);
});

window.addEventListener("keydown", (event) => {
  if (!gameScreen.classList.contains("screen--active")) return;

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    moveWord(-1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    moveWord(1);
  }
});

window.addEventListener("resize", () => {
  if (!state.current) return;
  placeWord();
});
