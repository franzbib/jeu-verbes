const fs = require("fs");
const vm = require("vm");

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const dataCode = `${fs.readFileSync("data.js", "utf8")}
;({
  CHUTE_DES_MOTS_CONTRACT,
  DEFAULT_GAME_CONFIG,
  GAME_RULES,
  GAME_MODES,
  CEFR_LEVELS,
});`;

const data = vm.runInNewContext(dataCode, {});
const script = fs.readFileSync("script.js", "utf8");
const docs = fs.readFileSync("INTEGRATION.md", "utf8");

assert(data.CHUTE_DES_MOTS_CONTRACT.gameId === "chute-des-mots", "gameId contract changed");
assert(data.CHUTE_DES_MOTS_CONTRACT.version === 1, "contract version changed");
assert(data.CHUTE_DES_MOTS_CONTRACT.completeEventName === "chuteDesMots:complete", "complete event name changed");
assert(data.CHUTE_DES_MOTS_CONTRACT.completeMessageType === "chute-des-mots:complete", "postMessage type changed");

assert(data.DEFAULT_GAME_CONFIG.contentMode === "tenses", "unexpected default contentMode");
assert(data.DEFAULT_GAME_CONFIG.cefrLevel === "A2", "unexpected default cefrLevel");
assert(data.DEFAULT_GAME_CONFIG.playMode === "game", "unexpected default playMode");
assert(data.DEFAULT_GAME_CONFIG.wordsPerGame === 30, "unexpected default wordsPerGame");
assert(data.DEFAULT_GAME_CONFIG.messageTargetOrigin === "*", "unexpected default messageTargetOrigin");
assert(data.DEFAULT_GAME_CONFIG.successCriteria.allowColumnDeath === true, "unexpected allowColumnDeath default");

assert(data.GAME_RULES.wordsPerGame === data.DEFAULT_GAME_CONFIG.wordsPerGame, "GAME_RULES wordsPerGame must mirror DEFAULT_GAME_CONFIG");
assert(data.GAME_RULES.maxErrorBricksPerLane === 4, "column death must stay at 4 errors");
assert(data.GAME_RULES.correctBaseScore === 10, "correct answer score must stay at +10");
assert(data.GAME_RULES.errorPenalty === 5, "error penalty must stay at -5");
assert(data.GAME_RULES.streakBonuses[3] === 5, "missing streak bonus at 3");
assert(data.GAME_RULES.streakBonuses[5] === 10, "missing streak bonus at 5");
assert(data.GAME_RULES.streakBonuses[10] === 25, "missing streak bonus at 10");

["tenses", "grammar", "lexical", "tools"].forEach((mode) => {
  assert(data.GAME_MODES[mode], `missing content mode ${mode}`);
});

["A2", "B1", "B2"].forEach((level) => {
  assert(data.CEFR_LEVELS[level], `missing CEFR level ${level}`);
});

[
  "window.ChuteDesMots",
  "configure(config = {})",
  "start(config = {})",
  "getLastResult()",
  "getState()",
  "buildGameResult",
  "evaluateSuccess",
  "publishGameResult",
  "postMessage",
  "getConfigFromUrl",
].forEach((needle) => {
  assert(script.includes(needle), `script contract missing ${needle}`);
});

[
  "DEFAULT_GAME_CONFIG",
  "window.ChuteDesMots.start",
  "chuteDesMots:complete",
  "chute-des-mots:complete",
  "messageTargetOrigin",
  "autostart=1",
].forEach((needle) => {
  assert(docs.includes(needle), `integration docs missing ${needle}`);
});

console.log("Integration contract OK");
