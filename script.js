const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const settingsForm = document.getElementById("settingsForm");
const lastResultPanel = document.getElementById("lastResultPanel");
const lastResultTitle = document.getElementById("lastResultTitle");
const lastResultSummary = document.getElementById("lastResultSummary");
const lastResultBreakdown = document.getElementById("lastResultBreakdown");
const contentModeSelector = document.getElementById("contentModeSelector");
const contentModeDescription = document.getElementById("contentModeDescription");
const testDataButton = document.getElementById("testDataButton");
const soundToggle = document.getElementById("soundToggle");
const musicToggle = document.getElementById("musicToggle");
const hintPanel = document.getElementById("hintPanel");
const playfield = document.getElementById("playfield");
const laneGrid = document.getElementById("laneGrid");
const fallingWord = document.getElementById("fallingWord");
const fastDropButton = document.getElementById("fastDropButton");
const judgementLine = document.querySelector(".judgement-line");
const binsContainer = document.getElementById("bins");
const feedback = document.getElementById("feedback");
const unlockBanner = document.getElementById("unlockBanner");
const restartButton = document.getElementById("restartButton");
const homeButton = document.getElementById("homeButton");
const gameEyebrow = document.getElementById("gameEyebrow");
const gameTitle = document.getElementById("gameTitle");
const scoreEl = document.getElementById("score");
const correctEl = document.getElementById("correctCount");
const errorEl = document.getElementById("errorCount");
const streakEl = document.getElementById("streakCount");
const progressEl = document.getElementById("progressStat");
const progressBar = document.getElementById("progressBar");

let bins = [];
let lanes = [];

const state = {
  mode: "game",
  contentMode: DEFAULT_CONTENT_MODE,
  cefrLevel: "A2",
  wordsPerGame: DEFAULT_GAME_CONFIG.wordsPerGame,
  missionId: DEFAULT_GAME_CONFIG.missionId,
  integrationMode: DEFAULT_GAME_CONFIG.integrationMode,
  messageTargetOrigin: DEFAULT_GAME_CONFIG.messageTargetOrigin,
  successCriteria: { ...DEFAULT_GAME_CONFIG.successCriteria },
  externalConfig: null,
  lastResult: null,
  useTestData: false,
  activeBuckets: [...GAME_MODES[DEFAULT_CONTENT_MODE].initialBuckets],
  unlockedDuringGame: 0,
  deck: [],
  current: null,
  laneIndex: 1,
  currentX: 0,
  targetX: 0,
  y: 0,
  isFastDropping: false,
  lastFrameTime: 0,
  animationId: 0,
  spawnTimer: 0,
  resolveTimer: 0,
  unlockTimer: 0,
  feedbackTimer: 0,
  isResolving: false,
  gameOverReason: "",
  score: 0,
  correct: 0,
  errors: 0,
  streak: 0,
  bestStreak: 0,
  answered: 0,
  soundEnabled: GAME_RULES.soundDefaultOn,
  musicEnabled: GAME_RULES.musicDefaultOn,
  touch: {
    active: false,
    startX: 0,
    startY: 0,
    lastMoveAt: 0,
    pointerId: null,
  },
  errorStacks: createBucketCounter(DEFAULT_CONTENT_MODE),
  errorStackItems: createBucketStacks(DEFAULT_CONTENT_MODE),
  attemptsByBucket: createBucketCounter(DEFAULT_CONTENT_MODE),
  correctByBucket: createBucketCounter(DEFAULT_CONTENT_MODE),
  errorsByBucket: createBucketCounter(DEFAULT_CONTENT_MODE),
};

function createBucketCounter(modeId = DEFAULT_CONTENT_MODE) {
  return Object.fromEntries(getModeConfig(modeId).bucketOrder.map((bucket) => [bucket, 0]));
}

function createBucketStacks(modeId = DEFAULT_CONTENT_MODE) {
  return Object.fromEntries(getModeConfig(modeId).bucketOrder.map((bucket) => [bucket, []]));
}

function showScreen(screen) {
  [homeScreen, gameScreen].forEach((item) => item.classList.remove("screen--active"));
  screen.classList.add("screen--active");
}

function renderContentModeSelector() {
  const legend = contentModeSelector.querySelector("legend");
  contentModeSelector.innerHTML = "";
  contentModeSelector.appendChild(legend);

  CONTENT_MODE_ORDER.forEach((modeId) => {
    const mode = GAME_MODES[modeId];
    const label = document.createElement("label");
    label.className = "mode-card";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "contentMode";
    input.value = mode.id;
    input.checked = mode.id === DEFAULT_CONTENT_MODE;
    input.addEventListener("change", updateContentModeDescription);
    label.classList.toggle("is-selected", input.checked);

    const text = document.createElement("span");
    text.className = "mode-card__text";
    const title = document.createElement("strong");
    title.textContent = mode.label;
    const description = document.createElement("small");
    description.textContent = mode.description;
    text.append(title, description);
    label.append(input, text);
    contentModeSelector.appendChild(label);
  });
}

function updateContentModeDescription() {
  const mode = GAME_MODES[getSelectedContentMode()] ?? GAME_MODES[DEFAULT_CONTENT_MODE];
  contentModeDescription.textContent = mode.description;
  testDataButton.hidden = mode.id !== DEFAULT_CONTENT_MODE;
  contentModeSelector.querySelectorAll(".mode-card").forEach((card) => {
    card.classList.toggle("is-selected", card.querySelector("input")?.checked);
  });
}

function getSelectedValue(name) {
  return settingsForm.querySelector(`input[name="${name}"]:checked`).value;
}

function getSelectedContentMode() {
  return settingsForm.querySelector('input[name="contentMode"]:checked')?.value ?? DEFAULT_CONTENT_MODE;
}

function getSelectedCefrLevel() {
  return settingsForm.querySelector('input[name="cefrLevel"]:checked')?.value ?? "A2";
}

function selectRadio(name, value) {
  const input = settingsForm.querySelector(`input[name="${name}"][value="${value}"]`);
  if (!input) return false;
  input.checked = true;
  input.dispatchEvent(new Event("change", { bubbles: true }));
  return true;
}

function normalizeNumber(value, fallback = null) {
  if (value === null || value === undefined || value === "") return fallback;
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function normalizeGameConfig(config = {}) {
  const mergedCriteria = {
    ...DEFAULT_GAME_CONFIG.successCriteria,
    ...(config.successCriteria ?? {}),
  };
  const wordsPerGame = normalizeNumber(config.wordsPerGame, DEFAULT_GAME_CONFIG.wordsPerGame);

  return {
    ...DEFAULT_GAME_CONFIG,
    ...config,
    contentMode: GAME_MODES[config.contentMode] ? config.contentMode : DEFAULT_GAME_CONFIG.contentMode,
    cefrLevel: CEFR_LEVELS[config.cefrLevel] ? config.cefrLevel : DEFAULT_GAME_CONFIG.cefrLevel,
    playMode: ["game", "training"].includes(config.playMode) ? config.playMode : DEFAULT_GAME_CONFIG.playMode,
    wordsPerGame: Math.max(1, Math.round(wordsPerGame)),
    successCriteria: {
      minScore: normalizeNumber(mergedCriteria.minScore, null),
      minCorrect: normalizeNumber(mergedCriteria.minCorrect, null),
      minAccuracy: normalizeNumber(mergedCriteria.minAccuracy, null),
      allowColumnDeath: mergedCriteria.allowColumnDeath !== false,
    },
    integrationMode: Boolean(config.integrationMode),
    messageTargetOrigin: typeof config.messageTargetOrigin === "string" && config.messageTargetOrigin ? config.messageTargetOrigin : DEFAULT_GAME_CONFIG.messageTargetOrigin,
    missionId: config.missionId ?? null,
  };
}

function applyGameConfig(config = {}) {
  const normalized = normalizeGameConfig(config);
  selectRadio("contentMode", normalized.contentMode);
  selectRadio("cefrLevel", normalized.cefrLevel);
  selectRadio("mode", normalized.playMode);
  updateContentModeDescription();
  state.contentMode = normalized.contentMode;
  state.cefrLevel = normalized.cefrLevel;
  state.mode = normalized.playMode;
  state.wordsPerGame = normalized.wordsPerGame;
  state.missionId = normalized.missionId;
  state.integrationMode = normalized.integrationMode;
  state.messageTargetOrigin = normalized.messageTargetOrigin;
  state.successCriteria = { ...normalized.successCriteria };
  state.externalConfig = normalized;
  return normalized;
}

function getModeConfig(modeId = state.contentMode) {
  return GAME_MODES[modeId] ?? GAME_MODES[DEFAULT_CONTENT_MODE];
}

function getBucketInfo(bucketId) {
  const mode = getModeConfig();
  return mode.buckets[bucketId] ?? GAME_MODES[DEFAULT_CONTENT_MODE].buckets[bucketId];
}

function getBucketOrder() {
  return getModeConfig().bucketOrder;
}

function getItemBucket(item) {
  return item.answer ?? item.correctBucket ?? item.tense;
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const other = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[other]] = [copy[other], copy[index]];
  }
  return copy;
}

function getInitialActiveBuckets() {
  const mode = getModeConfig();
  if (!GAME_RULES.enableProgressiveBucketUnlocks) {
    return [...mode.bucketOrder];
  }

  return [...mode.initialBuckets];
}

function renderLanesAndBins(highlightedBucket = "") {
  playfield.style.setProperty("--lane-count", state.activeBuckets.length);
  playfield.style.setProperty("--error-brick-height", `${GAME_RULES.errorBrickHeight}px`);
  laneGrid.style.setProperty("--lane-count", state.activeBuckets.length);
  binsContainer.style.setProperty("--lane-count", state.activeBuckets.length);
  laneGrid.innerHTML = "";
  binsContainer.innerHTML = "";

  state.activeBuckets.forEach((bucket, index) => {
    const info = getBucketInfo(bucket);
    const lane = document.createElement("div");
    lane.className = `lane${bucket === highlightedBucket ? " lane--new" : ""}`;
    lane.dataset.laneLabel = info.label;
    lane.style.setProperty("--bucket-color", info.color);

    const stack = document.createElement("div");
    stack.className = "error-stack";
    lane.appendChild(stack);
    laneGrid.appendChild(lane);

    const button = document.createElement("button");
    button.className = `bin${bucket === highlightedBucket ? " bin--new" : ""}`;
    button.type = "button";
    button.dataset.bucket = bucket;
    button.style.setProperty("--bucket-color", info.color);
    button.addEventListener("click", () => setLane(index));

    const label = document.createElement("span");
    label.textContent = info.label;
    const hint = document.createElement("small");
    hint.textContent = info.hint;
    button.append(label, hint);
    binsContainer.appendChild(button);
  });

  bins = Array.from(binsContainer.querySelectorAll(".bin"));
  lanes = Array.from(laneGrid.querySelectorAll(".lane"));
  renderErrorStacks();
  updateLaneHighlights();
}

function renderHints() {
  const mode = getModeConfig();
  hintPanel.innerHTML = "";

  const summary = document.createElement("summary");
  summary.textContent = mode.helpTitle;
  hintPanel.appendChild(summary);

  state.activeBuckets.forEach((bucket) => {
    const info = getBucketInfo(bucket);
    const line = document.createElement("p");
    const strong = document.createElement("strong");
    strong.textContent = info.label;
    line.append(strong, ` : ${info.hint}`);
    hintPanel.appendChild(line);
  });
}

function renderErrorStacks() {
  state.activeBuckets.forEach((bucket, index) => {
    const lane = lanes[index];
    const stack = lane?.querySelector(".error-stack");
    if (!lane || !stack) return;

    const items = state.errorStackItems[bucket] ?? [];
    const count = items.length;
    stack.innerHTML = "";
    lane.classList.toggle("lane--danger", count >= GAME_RULES.maxErrorBricksPerLane - 2);
    lane.classList.toggle("lane--overflow", count >= GAME_RULES.maxErrorBricksPerLane);
    lane.style.setProperty("--stack-level", count);

    items.forEach((item) => {
      const brick = document.createElement("div");
      brick.className = "error-brick";
      brick.textContent = item.text;
      brick.title = `${item.text} : ${getBucketInfo(item.expected).label}`;
      stack.appendChild(brick);
    });
  });
}

function setLane(index) {
  if (!state.current || state.isResolving) return;
  state.laneIndex = Math.max(0, Math.min(state.activeBuckets.length - 1, index));
  state.targetX = getLaneCenter(state.laneIndex);
  updateLaneHighlights();
}

function unlockNextBucketIfReady() {
  if (!GAME_RULES.enableProgressiveBucketUnlocks) return false;

  const mode = getModeConfig();
  const unlocks = mode.unlocks?.[state.cefrLevel] ?? {};
  const nextBucket = mode.bucketOrder.find((bucket) => {
    return !state.activeBuckets.includes(bucket) && unlocks[bucket] && state.correct >= unlocks[bucket];
  });

  if (!nextBucket) return false;

  state.activeBuckets = mode.bucketOrder.filter((bucket) => {
    return state.activeBuckets.includes(bucket) || bucket === nextBucket;
  });
  state.unlockedDuringGame += 1;
  state.deck = [];
  renderLanesAndBins(nextBucket);
  renderHints();
  showUnlockBanner(`Nouveau tiroir débloqué : ${getBucketInfo(nextBucket).label}`);
  playSound("unlock");
  return true;
}

function showUnlockBanner(message) {
  window.clearTimeout(state.unlockTimer);
  unlockBanner.textContent = message;
  unlockBanner.className = "unlock-banner is-visible";
  state.unlockTimer = window.setTimeout(() => {
    unlockBanner.className = "unlock-banner";
  }, 1900);
}

let audioContext = null;

function getAudioContext() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) return null;
  if (!audioContext) {
    audioContext = new AudioContextClass();
  }
  return audioContext;
}

function primeAudio() {
  if (!state.soundEnabled && !state.musicEnabled) return;
  const context = getAudioContext();
  if (context?.state === "suspended") {
    context.resume();
  }
}

function playSound(type) {
  if (!state.soundEnabled) return;
  const context = getAudioContext();
  if (!context) return;

  const now = context.currentTime;
  const patterns = {
    correct: [
      [520, 0, 0.075, "sine", 0.045],
      [720, 0.07, 0.095, "sine", 0.035],
    ],
    error: [[164, 0, 0.14, "triangle", 0.055]],
    unlock: [
      [392, 0, 0.08, "sine", 0.04],
      [588, 0.075, 0.1, "sine", 0.035],
      [784, 0.15, 0.12, "sine", 0.032],
    ],
    end: [
      [330, 0, 0.12, "triangle", 0.04],
      [220, 0.1, 0.18, "triangle", 0.035],
    ],
  };

  (patterns[type] ?? []).forEach(([frequency, offset, duration, wave, volume]) => {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = wave;
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, now + offset);
    gain.gain.exponentialRampToValueAtTime(volume, now + offset + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + offset + duration);
    oscillator.connect(gain).connect(context.destination);
    oscillator.start(now + offset);
    oscillator.stop(now + offset + duration + 0.02);
  });
}

let musicGain = null;
let musicTimer = 0;
let musicStep = 0;

function startBackgroundMusic() {
  if (!state.musicEnabled || musicTimer) return;

  const context = getAudioContext();
  if (!context) return;
  if (context.state === "suspended") {
    context.resume();
  }

  musicGain = context.createGain();
  musicGain.gain.setValueAtTime(GAME_RULES.musicVolume, context.currentTime);
  musicGain.connect(context.destination);
  scheduleMusicNote();
  musicTimer = window.setInterval(scheduleMusicNote, 860);
}

function scheduleMusicNote() {
  const context = audioContext;
  if (!context || !musicGain) return;

  const notes = [196, 246.94, 293.66, 329.63, 246.94, 220];
  const frequency = notes[musicStep % notes.length];
  musicStep += 1;

  const oscillator = context.createOscillator();
  const gain = context.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.32, context.currentTime + 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.62);
  oscillator.connect(gain).connect(musicGain);
  oscillator.start(context.currentTime);
  oscillator.stop(context.currentTime + 0.68);
}

function stopBackgroundMusic() {
  window.clearInterval(musicTimer);
  musicTimer = 0;

  if (musicGain) {
    musicGain.disconnect();
    musicGain = null;
  }
}

function getAvailableItems() {
  const mode = getModeConfig();
  const isActiveItem = (item) => state.activeBuckets.includes(getItemBucket(item));

  if (state.useTestData) {
    return (mode.testItems ?? mode.items).filter(isActiveItem);
  }

  const allowed = CEFR_LEVELS[state.cefrLevel].contentLevels;
  const pool = mode.items.filter((item) => allowed.includes(item.level) && isActiveItem(item));

  if (mode.weightIrregulars && state.cefrLevel === "B2") {
    const irregulars = pool.filter((item) => item.irregular);
    return shuffle([...pool, ...irregulars.slice(0, 28)]);
  }

  if (mode.weightIrregulars && state.cefrLevel === "B1" && state.correct >= 12) {
    const irregulars = pool.filter((item) => item.irregular);
    return shuffle([...pool, ...irregulars.slice(0, 12)]);
  }

  return pool;
}

function refillDeckIfNeeded() {
  if (state.deck.length > 0) return;
  state.deck = shuffle(getAvailableItems());
}

function resetStats() {
  state.activeBuckets = getInitialActiveBuckets();
  state.unlockedDuringGame = 0;
  state.deck = [];
  state.current = null;
  state.laneIndex = Math.floor(state.activeBuckets.length / 2);
  state.currentX = 0;
  state.targetX = 0;
  state.y = 0;
  state.isFastDropping = false;
  state.touch.active = false;
  state.touch.pointerId = null;
  state.lastFrameTime = 0;
  state.spawnTimer = 0;
  state.resolveTimer = 0;
  state.unlockTimer = 0;
  state.feedbackTimer = 0;
  state.isResolving = false;
  state.gameOverReason = "";
  state.score = 0;
  state.correct = 0;
  state.errors = 0;
  state.streak = 0;
  state.bestStreak = 0;
  state.answered = 0;
  state.lastResult = null;
  state.errorStacks = createBucketCounter(state.contentMode);
  state.errorStackItems = createBucketStacks(state.contentMode);
  state.attemptsByBucket = createBucketCounter(state.contentMode);
  state.correctByBucket = createBucketCounter(state.contentMode);
  state.errorsByBucket = createBucketCounter(state.contentMode);
}

function updateStats() {
  scoreEl.textContent = state.score;
  correctEl.textContent = state.correct;
  errorEl.textContent = state.errors;
  streakEl.textContent = state.streak;
  streakEl.parentElement.classList.toggle("stat--combo", state.streak >= 3);

  if (state.mode === "training") {
    progressEl.textContent = `${state.answered} réponses`;
    progressBar.style.width = `${Math.min(100, (state.answered % 12) * 8.34)}%`;
  } else {
    progressEl.textContent = `${state.answered} / ${state.wordsPerGame}`;
    progressBar.style.width = `${Math.min(100, (state.answered / state.wordsPerGame) * 100)}%`;
  }
}

function currentSpeed() {
  const level = CEFR_LEVELS[state.cefrLevel];
  const speed = level.baseSpeed + state.answered * level.speedIncrease;
  const cappedSpeed = Math.min(speed, level.maxSpeed);
  return state.isFastDropping ? cappedSpeed * GAME_RULES.downAccelerationFactor : cappedSpeed;
}

function getLaneCenter(index) {
  const bin = bins[index];
  if (!bin) return playfield.clientWidth / 2;
  return binsContainer.offsetLeft + bin.offsetLeft + bin.offsetWidth / 2;
}

function clearLaneHighlights() {
  bins.forEach((bin) => bin.classList.remove("bin--active", "bin--target", "bin--error"));
  lanes.forEach((lane) => lane.classList.remove("is-active"));
}

function updateLaneHighlights() {
  clearLaneHighlights();
  if (!state.current || state.isResolving) return;
  bins[state.laneIndex]?.classList.add("bin--active");
  lanes[state.laneIndex]?.classList.add("is-active");
}

function startGame({ useTestData = false, config = null } = {}) {
  cancelAnimationFrame(state.animationId);
  window.clearTimeout(state.spawnTimer);
  window.clearTimeout(state.resolveTimer);
  window.clearTimeout(state.unlockTimer);
  window.clearTimeout(state.feedbackTimer);
  if (config) {
    applyGameConfig(config);
  } else if (state.externalConfig) {
    applyGameConfig({
      ...state.externalConfig,
      contentMode: getSelectedContentMode(),
      cefrLevel: getSelectedCefrLevel(),
      playMode: getSelectedValue("mode"),
    });
  } else {
    state.mode = getSelectedValue("mode");
    state.contentMode = getSelectedContentMode();
    state.cefrLevel = getSelectedCefrLevel();
    state.wordsPerGame = DEFAULT_GAME_CONFIG.wordsPerGame;
    state.missionId = DEFAULT_GAME_CONFIG.missionId;
    state.integrationMode = DEFAULT_GAME_CONFIG.integrationMode;
    state.messageTargetOrigin = DEFAULT_GAME_CONFIG.messageTargetOrigin;
    state.successCriteria = { ...DEFAULT_GAME_CONFIG.successCriteria };
  }
  state.useTestData = useTestData;
  state.soundEnabled = soundToggle.checked;
  state.musicEnabled = musicToggle.checked;
  resetStats();
  state.deck = shuffle(getAvailableItems());
  fallingWord.hidden = true;
  lastResultPanel.hidden = true;
  hintPanel.hidden = false;
  hintPanel.open = true;
  renderLanesAndBins();
  renderHints();
  updateStats();
  clearFeedback();
  clearLaneHighlights();
  unlockBanner.className = "unlock-banner";
  unlockBanner.textContent = "";
  gameEyebrow.textContent = getModeConfig().headerEyebrow;
  gameTitle.textContent = getModeConfig().headerTitle;
  showScreen(gameScreen);
  primeAudio();
  startBackgroundMusic();
  playfield.focus();
  state.spawnTimer = window.setTimeout(spawnWord, 180);
}

function spawnWord() {
  if (shouldEndGame()) {
    finishGame();
    return;
  }

  refillDeckIfNeeded();
  if (state.deck.length === 0) {
    finishGame();
    return;
  }

  state.current = state.deck.shift();
  state.isResolving = false;
  state.laneIndex = Math.floor(state.activeBuckets.length / 2);
  state.targetX = getLaneCenter(state.laneIndex);
  state.currentX = state.targetX;
  state.y = GAME_RULES.spawnY;
  state.lastFrameTime = performance.now();

  fallingWord.textContent = state.current.text;
  fallingWord.className = "falling-word";
  fallingWord.hidden = false;
  updateLaneHighlights();
  placeWord();
  state.animationId = requestAnimationFrame(tick);
}

function placeWord() {
  fallingWord.style.left = `${state.currentX}px`;
  fallingWord.style.top = `${state.y}px`;
}

function tick(now) {
  if (!state.current || state.isResolving) return;

  const elapsedSeconds = Math.min((now - state.lastFrameTime) / 1000, 0.05);
  state.lastFrameTime = now;
  state.y += currentSpeed() * elapsedSeconds;
  state.currentX += (state.targetX - state.currentX) * Math.min(1, GAME_RULES.horizontalEase * elapsedSeconds);
  placeWord();

  if (hasReachedBins()) {
    resolveAnswer();
    return;
  }

  state.animationId = requestAnimationFrame(tick);
}

function hasReachedBins() {
  const wordBottom = state.y + fallingWord.offsetHeight;
  const judgementY = judgementLine.offsetTop;
  return wordBottom >= judgementY;
}

function moveWord(direction) {
  if (!state.current || state.isResolving) return;
  setLane(state.laneIndex + direction);
}

function getChosenBucket() {
  return bins[state.laneIndex]?.dataset.bucket ?? state.activeBuckets[0];
}

function getStreakBonus(streak) {
  return GAME_RULES.streakBonuses?.[streak] ?? 0;
}

function resolveAnswer() {
  if (!state.current || state.isResolving) return;

  state.isResolving = true;
  cancelAnimationFrame(state.animationId);

  const expected = getItemBucket(state.current);
  const chosen = getChosenBucket();
  const isCorrect = chosen === expected;
  const expectedInfo = getBucketInfo(expected);
  const expectedLabel = expectedInfo.label;
  const chosenBin = bins.find((bin) => bin.dataset.bucket === chosen);
  const expectedBin = bins.find((bin) => bin.dataset.bucket === expected);

  state.answered += 1;
  state.attemptsByBucket[expected] += 1;

  if (isCorrect) {
    state.correct += 1;
    state.streak += 1;
    state.bestStreak = Math.max(state.bestStreak, state.streak);
    state.correctByBucket[expected] += 1;
    const streakBonus = getStreakBonus(state.streak);
    state.score += GAME_RULES.correctBaseScore + streakBonus;
    fallingWord.classList.add("correct");
    chosenBin?.classList.remove("bin--active");
    chosenBin?.classList.add("bin--target");
    showFeedback(streakBonus > 0 ? `Correct : ${expectedLabel} · série x${state.streak} (+${streakBonus})` : `Correct : ${expectedLabel}`, true);
    playSound("correct");
  } else {
    state.errors += 1;
    state.streak = 0;
    state.score = Math.max(0, state.score - GAME_RULES.errorPenalty);
    state.errorsByBucket[chosen] += 1;
    fallingWord.classList.add("wrong");
    chosenBin?.classList.remove("bin--active");
    chosenBin?.classList.add("bin--error");
    expectedBin?.classList.add("bin--target");
    addErrorBrick(chosen, state.current);
    showFeedback(formatErrorFeedback(expected), false);
    playSound("error");
  }

  updateStats();

  if (shouldEndGame()) {
    finishGame();
    return;
  }

  state.resolveTimer = window.setTimeout(() => {
    fallingWord.hidden = true;
    clearLaneHighlights();

    state.current = null;
    unlockNextBucketIfReady();
    state.spawnTimer = window.setTimeout(spawnWord, GAME_RULES.spawnDelayMs);
  }, GAME_RULES.feedbackDurationMs);
}

function formatErrorFeedback(expectedBucket) {
  const info = getBucketInfo(expectedBucket);
  const hint = info.errorHint ? ` ${info.errorHint}.` : "";
  return `Erreur : ${info.errorLabel ?? info.label}.${hint}`;
}

function addErrorBrick(chosenBucket, item) {
  state.errorStacks[chosenBucket] = state.errorStacks[chosenBucket] ?? 0;
  state.errorStackItems[chosenBucket] = state.errorStackItems[chosenBucket] ?? [];
  state.errorStacks[chosenBucket] += 1;
  state.errorStackItems[chosenBucket].push({
    text: item.text,
    expected: getItemBucket(item),
  });

  if (state.errorStacks[chosenBucket] >= GAME_RULES.maxErrorBricksPerLane) {
    state.gameOverReason = `Débordement du tiroir ${getBucketInfo(chosenBucket).label}`;
  }

  renderErrorStacks();
}

function showFeedback(message, isCorrect) {
  window.clearTimeout(state.feedbackTimer);
  feedback.textContent = message;
  feedback.className = `feedback is-visible ${isCorrect ? "is-correct" : "is-wrong"}`;
  state.feedbackTimer = window.setTimeout(() => {
    feedback.className = "feedback";
  }, GAME_RULES.feedbackDurationMs + 260);
}

function clearFeedback() {
  window.clearTimeout(state.feedbackTimer);
  feedback.textContent = "";
  feedback.className = "feedback";
}

function shouldEndGame() {
  const overflowBucket = state.activeBuckets.find((bucket) => state.errorStacks[bucket] >= GAME_RULES.maxErrorBricksPerLane);
  if (overflowBucket) {
    state.gameOverReason = `Débordement du tiroir ${getBucketInfo(overflowBucket).label}`;
    return true;
  }

  if (state.mode === "training") return false;
  if (state.answered >= state.wordsPerGame) {
    state.gameOverReason = "Manche terminée";
    return true;
  }

  return false;
}

function buildBucketResults() {
  const mode = getModeConfig();
  return Object.fromEntries(
    mode.bucketOrder.map((bucket) => [
      bucket,
      {
        label: getBucketInfo(bucket).label,
        attempts: state.attemptsByBucket[bucket] ?? 0,
        correct: state.correctByBucket[bucket] ?? 0,
        errorsInChosenBucket: state.errorsByBucket[bucket] ?? 0,
        errorStack: [...(state.errorStackItems[bucket] ?? [])],
      },
    ]),
  );
}

function evaluateSuccess(result) {
  const criteria = result.successCriteria;
  const checks = [];

  if (criteria.minScore !== null) {
    checks.push(result.score >= criteria.minScore);
  }

  if (criteria.minCorrect !== null) {
    checks.push(result.correct >= criteria.minCorrect);
  }

  if (criteria.minAccuracy !== null) {
    checks.push(result.accuracy >= criteria.minAccuracy);
  }

  if (!criteria.allowColumnDeath) {
    checks.push(!result.endedByColumnDeath);
  }

  return checks.length === 0 ? null : checks.every(Boolean);
}

function buildGameResult() {
  const mode = getModeConfig();
  const total = state.correct + state.errors;
  const accuracy = total === 0 ? 0 : Math.round((state.correct / total) * 100);
  const endedByColumnDeath = Object.values(state.errorStacks).some((count) => count >= GAME_RULES.maxErrorBricksPerLane);
  const result = {
    gameId: CHUTE_DES_MOTS_CONTRACT.gameId,
    version: CHUTE_DES_MOTS_CONTRACT.version,
    missionId: state.missionId,
    integrationMode: state.integrationMode,
    messageTargetOrigin: state.messageTargetOrigin,
    contentMode: state.contentMode,
    contentModeLabel: mode.label,
    cefrLevel: state.cefrLevel,
    playMode: state.mode,
    wordsPerGame: state.wordsPerGame,
    endReason: state.gameOverReason || "Partie terminée",
    endedByColumnDeath,
    score: state.score,
    correct: state.correct,
    errors: state.errors,
    answered: state.answered,
    accuracy,
    bestStreak: state.bestStreak,
    unlockedBuckets: state.unlockedDuringGame,
    successCriteria: { ...state.successCriteria },
    buckets: buildBucketResults(),
  };

  result.success = evaluateSuccess(result);
  return result;
}

function publishGameResult(result) {
  state.lastResult = result;
  window.dispatchEvent(new CustomEvent(CHUTE_DES_MOTS_CONTRACT.completeEventName, { detail: result }));

  if (window.parent && window.parent !== window) {
    window.parent.postMessage(
      {
        type: CHUTE_DES_MOTS_CONTRACT.completeMessageType,
        payload: result,
      },
      state.messageTargetOrigin,
    );
  }
}

function finishGame() {
  cancelAnimationFrame(state.animationId);
  window.clearTimeout(state.spawnTimer);
  window.clearTimeout(state.resolveTimer);
  window.clearTimeout(state.feedbackTimer);
  fallingWord.hidden = true;
  state.current = null;
  setFastDrop(false);
  clearLaneHighlights();
  clearFeedback();
  playSound("end");
  stopBackgroundMusic();
  const result = buildGameResult();
  publishGameResult(result);
  renderFinalSummary();
  showScreen(homeScreen);
}

function renderFinalSummary() {
  const mode = getModeConfig();
  const total = state.correct + state.errors;
  const successRate = total === 0 ? 0 : Math.round((state.correct / total) * 100);
  const playedBuckets = mode.bucketOrder.filter((bucket) => state.attemptsByBucket[bucket] > 0 || state.errorsByBucket[bucket] > 0);
  const rankedBySuccess = [...playedBuckets].sort((a, b) => {
    const rateA = state.attemptsByBucket[a] > 0 ? state.correctByBucket[a] / state.attemptsByBucket[a] : 0;
    const rateB = state.attemptsByBucket[b] > 0 ? state.correctByBucket[b] / state.attemptsByBucket[b] : 0;
    return rateB - rateA || state.attemptsByBucket[b] - state.attemptsByBucket[a];
  });
  const rankedByErrors = [...playedBuckets].sort((a, b) => {
    return state.errorsByBucket[b] - state.errorsByBucket[a] || state.attemptsByBucket[b] - state.attemptsByBucket[a];
  });
  const bestBucket = rankedBySuccess[0] ? getBucketInfo(rankedBySuccess[0]).label : mode.emptyBestLabel;
  const hardestBucket = rankedByErrors[0] && state.errorsByBucket[rankedByErrors[0]] > 0 ? getBucketInfo(rankedByErrors[0]).label : mode.noProblemLabel;

  lastResultPanel.hidden = false;
  lastResultTitle.textContent = `${mode.label} · ${state.cefrLevel}`;
  lastResultSummary.innerHTML = "";
  [
    ["Mode", mode.label],
    ["Niveau", state.cefrLevel],
    ["Fin", state.gameOverReason || "Partie terminée"],
    ["Score final", state.score],
    ["Réponses", state.answered],
    ["Réussite", `${successRate} %`],
    ["Erreurs", state.errors],
    ["Meilleure série", state.bestStreak],
    ["Tiroirs débloqués", state.unlockedDuringGame],
    [mode.bestLabel, bestBucket],
    [mode.hardestLabel, hardestBucket],
  ].forEach(([label, value]) => {
    const card = document.createElement("div");
    card.className = "summary-card";
    const labelEl = document.createElement("span");
    labelEl.textContent = label;
    const valueEl = document.createElement("strong");
    valueEl.textContent = value;
    card.append(labelEl, valueEl);
    lastResultSummary.appendChild(card);
  });

  lastResultBreakdown.innerHTML = "";
  mode.bucketOrder.forEach((bucket) => {
    const info = getBucketInfo(bucket);
    const attempts = state.attemptsByBucket[bucket];
    const correct = state.correctByBucket[bucket];
    const errors = state.errorsByBucket[bucket];
    const row = document.createElement("div");
    row.className = "breakdown-row";
    const label = document.createElement("strong");
    label.textContent = info.label;
    const value = document.createElement("span");
    value.textContent = attempts > 0 || errors > 0 ? `${correct}/${attempts} OK · ${errors} erreur(s)` : "non joué";
    row.append(label, value);
    lastResultBreakdown.appendChild(row);
  });
}

function getStateSnapshot() {
  return {
    mode: state.mode,
    contentMode: state.contentMode,
    cefrLevel: state.cefrLevel,
    wordsPerGame: state.wordsPerGame,
    missionId: state.missionId,
    integrationMode: state.integrationMode,
    score: state.score,
    correct: state.correct,
    errors: state.errors,
    answered: state.answered,
    streak: state.streak,
    bestStreak: state.bestStreak,
    gameOverReason: state.gameOverReason,
    activeBuckets: [...state.activeBuckets],
  };
}

function parseBooleanParam(value, fallback = false) {
  if (value === null) return fallback;
  return ["1", "true", "yes", "oui"].includes(value.toLowerCase());
}

function getConfigFromUrl() {
  const params = new URLSearchParams(window.location.search);
  if ([...params.keys()].length === 0) return null;

  return {
    contentMode: params.get("contentMode") ?? undefined,
    cefrLevel: params.get("cefrLevel") ?? undefined,
    playMode: params.get("playMode") ?? params.get("mode") ?? undefined,
    wordsPerGame: params.get("wordsPerGame") ?? undefined,
    missionId: params.get("missionId") ?? null,
    integrationMode: parseBooleanParam(params.get("integrationMode"), false),
    messageTargetOrigin: params.get("messageTargetOrigin") ?? undefined,
    successCriteria: {
      minScore: params.get("minScore"),
      minCorrect: params.get("minCorrect"),
      minAccuracy: params.get("minAccuracy"),
      allowColumnDeath: params.has("allowColumnDeath") ? parseBooleanParam(params.get("allowColumnDeath"), true) : true,
    },
  };
}

window.ChuteDesMots = {
  CONTRACT: CHUTE_DES_MOTS_CONTRACT,
  DEFAULT_GAME_CONFIG,
  completeEventName: CHUTE_DES_MOTS_CONTRACT.completeEventName,
  completeMessageType: CHUTE_DES_MOTS_CONTRACT.completeMessageType,
  configure(config = {}) {
    return applyGameConfig(config);
  },
  start(config = {}) {
    const normalized = applyGameConfig(config);
    startGame({ config: normalized });
    return normalized;
  },
  getLastResult() {
    return state.lastResult;
  },
  getState() {
    return getStateSnapshot();
  },
};

renderContentModeSelector();
updateContentModeDescription();

const urlGameConfig = getConfigFromUrl();
if (urlGameConfig) {
  applyGameConfig(urlGameConfig);
  if (parseBooleanParam(new URLSearchParams(window.location.search).get("autostart"), false)) {
    startGame({ config: urlGameConfig });
  }
}

settingsForm.addEventListener("submit", (event) => {
  event.preventDefault();
  startGame({ useTestData: false });
});

testDataButton.addEventListener("click", () => {
  startGame({ useTestData: true });
});

restartButton.addEventListener("click", () => startGame({ useTestData: state.useTestData }));

homeButton.addEventListener("click", () => {
  cancelAnimationFrame(state.animationId);
  window.clearTimeout(state.spawnTimer);
  window.clearTimeout(state.resolveTimer);
  window.clearTimeout(state.unlockTimer);
  window.clearTimeout(state.feedbackTimer);
  fallingWord.hidden = true;
  state.current = null;
  setFastDrop(false);
  stopBackgroundMusic();
  clearLaneHighlights();
  clearFeedback();
  showScreen(homeScreen);
});

soundToggle.checked = GAME_RULES.soundDefaultOn;
soundToggle.addEventListener("change", () => {
  state.soundEnabled = soundToggle.checked;
  if (state.soundEnabled) primeAudio();
});

musicToggle.checked = GAME_RULES.musicDefaultOn;
musicToggle.addEventListener("change", () => {
  state.musicEnabled = musicToggle.checked;
  if (state.musicEnabled && gameScreen.classList.contains("screen--active")) {
    primeAudio();
    startBackgroundMusic();
  } else {
    stopBackgroundMusic();
  }
});

function setFastDrop(isActive) {
  state.isFastDropping = isActive;
  fastDropButton.classList.toggle("is-pressed", isActive);
}

function handleSwipeStart(event) {
  if (!gameScreen.classList.contains("screen--active")) return;
  if (event.target.closest(".bin") || event.target.closest(".fast-drop-button")) return;

  state.touch.active = true;
  state.touch.startX = event.clientX;
  state.touch.startY = event.clientY;
  state.touch.lastMoveAt = 0;
  state.touch.pointerId = event.pointerId;
  playfield.setPointerCapture?.(event.pointerId);
}

function handleSwipeMove(event) {
  if (!state.touch.active || state.touch.pointerId !== event.pointerId) return;

  const deltaX = event.clientX - state.touch.startX;
  const deltaY = event.clientY - state.touch.startY;
  const now = performance.now();
  const isHorizontal = Math.abs(deltaX) > GAME_RULES.touchSwipeThreshold && Math.abs(deltaX) > Math.abs(deltaY) * GAME_RULES.touchSwipeDominance;

  if (!isHorizontal || now - state.touch.lastMoveAt < GAME_RULES.touchSwipeCooldownMs) return;

  event.preventDefault();
  moveWord(deltaX > 0 ? 1 : -1);
  state.touch.startX = event.clientX;
  state.touch.startY = event.clientY;
  state.touch.lastMoveAt = now;
  playfield.classList.add("is-swiping");
  window.setTimeout(() => playfield.classList.remove("is-swiping"), 120);
}

function handleSwipeEnd(event) {
  if (state.touch.pointerId !== event.pointerId) return;
  state.touch.active = false;
  state.touch.pointerId = null;
  playfield.releasePointerCapture?.(event.pointerId);
}

playfield.addEventListener("pointerdown", handleSwipeStart);
playfield.addEventListener("pointermove", handleSwipeMove);
playfield.addEventListener("pointerup", handleSwipeEnd);
playfield.addEventListener("pointercancel", handleSwipeEnd);

fastDropButton.addEventListener("pointerdown", (event) => {
  event.preventDefault();
  setFastDrop(true);
  fastDropButton.setPointerCapture?.(event.pointerId);
});

["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
  fastDropButton.addEventListener(eventName, (event) => {
    event.preventDefault();
    setFastDrop(false);
  });
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

  if (event.key === "ArrowDown") {
    event.preventDefault();
    setFastDrop(true);
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowDown") {
    setFastDrop(false);
  }
});

window.addEventListener("blur", () => {
  setFastDrop(false);
});

window.addEventListener("resize", () => {
  if (!state.current) return;
  state.targetX = getLaneCenter(state.laneIndex);
  state.currentX = state.targetX;
  placeWord();
});
