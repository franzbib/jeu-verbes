const TENSES = {
  imparfait: {
    label: "imparfait",
    color: "#0f8b8d",
    hint: "-ais, -ait, -ions, -iez, -aient",
    errorHint: "terminaisons en -ais, -ait, -ions...",
    errorLabel: "c'était de l'imparfait",
  },
  futur: {
    label: "futur",
    color: "#2867c8",
    hint: "-rai, -ras, -ra, -rons, -rez, -ront",
    errorHint: "base du futur + terminaison",
    errorLabel: "c'était du futur",
  },
  passe_simple: {
    label: "passé simple",
    color: "#7557b8",
    hint: "-ai, -as, -a, -âmes, -âtes, -èrent",
    errorHint: "formes brèves ou littéraires",
    errorLabel: "c'était du passé simple",
  },
  conditionnel_present: {
    label: "conditionnel présent",
    color: "#c95f36",
    hint: "-rais, -rait, -rions, -riez, -raient",
    errorHint: "base du futur + terminaisons de l'imparfait",
    errorLabel: "c'était du conditionnel présent",
  },
  passe_compose: {
    label: "passé composé",
    color: "#1f9d68",
    hint: "auxiliaire + participe passé",
    errorHint: "auxiliaire + participe passé",
    errorLabel: "c'était du passé composé",
  },
};

const TENSE_ORDER = ["imparfait", "futur", "passe_simple", "conditionnel_present", "passe_compose"];
const INITIAL_TENSES = TENSE_ORDER.slice(0, 3);
const DEFAULT_CONTENT_MODE = "tenses";
const CONTENT_MODE_ORDER = ["tenses", "grammar", "lexical", "tools"];

// Réglages faciles à modifier pour ajuster la durée, la difficulté et les sensations.
const GAME_RULES = {
  enableProgressiveBucketUnlocks: true,
  wordsPerGame: 30,
  spawnY: -168,
  spawnDelayMs: 520,
  horizontalEase: 24,
  downAccelerationFactor: 2.35,
  maxErrorBricksPerLane: 6,
  errorBrickHeight: 38,
  correctBaseScore: 12,
  comboBonusStep: 2,
  comboBonusCap: 12,
  errorPenalty: 4,
  feedbackDurationMs: 740,
  soundDefaultOn: true,
};

// Vitesses en pixels par seconde. Elles augmentent après chaque réponse.
const DIFFICULTIES = {
  easy: {
    label: "facile",
    baseSpeed: 92,
    speedIncrease: 2.25,
    maxSpeed: 172,
    allowedLevels: ["easy"],
  },
  medium: {
    label: "moyen",
    baseSpeed: 118,
    speedIncrease: 3.2,
    maxSpeed: 220,
    allowedLevels: ["easy", "medium"],
  },
  hard: {
    label: "difficile",
    baseSpeed: 142,
    speedIncrease: 4.35,
    maxSpeed: 274,
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
  { text: "je parlerais", tense: "conditionnel_present", verb: "parler", person: "je", level: "easy", irregular: false },
  { text: "nous irions", tense: "conditionnel_present", verb: "aller", person: "nous", level: "easy", irregular: true },
  { text: "elle aurait", tense: "conditionnel_present", verb: "avoir", person: "elle", level: "easy", irregular: true },
  { text: "ils feraient", tense: "conditionnel_present", verb: "faire", person: "ils", level: "medium", irregular: true },
  { text: "j'ai parlé", tense: "passe_compose", verb: "parler", person: "je", level: "easy", irregular: false },
  { text: "tu es allé", tense: "passe_compose", verb: "aller", person: "tu", level: "easy", irregular: true },
  { text: "nous avons vu", tense: "passe_compose", verb: "voir", person: "nous", level: "medium", irregular: true },
  { text: "elles ont compris", tense: "passe_compose", verb: "comprendre", person: "elles", level: "medium", irregular: true },
];

// Liste pédagogique principale. Pour ajouter des verbes, copier un objet et modifier
// text, tense, verb, person. Pour ajouter un temps, compléter TENSES et TENSE_ORDER.
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

  { text: "je serais", tense: "conditionnel_present", verb: "être", person: "je", level: "easy", irregular: true },
  { text: "tu serais", tense: "conditionnel_present", verb: "être", person: "tu", level: "easy", irregular: true },
  { text: "nous serions", tense: "conditionnel_present", verb: "être", person: "nous", level: "easy", irregular: true },
  { text: "ils auraient", tense: "conditionnel_present", verb: "avoir", person: "ils", level: "easy", irregular: true },
  { text: "j'aurais", tense: "conditionnel_present", verb: "avoir", person: "je", level: "easy", irregular: true },
  { text: "vous auriez", tense: "conditionnel_present", verb: "avoir", person: "vous", level: "easy", irregular: true },
  { text: "j'irais", tense: "conditionnel_present", verb: "aller", person: "je", level: "easy", irregular: true },
  { text: "nous irions", tense: "conditionnel_present", verb: "aller", person: "nous", level: "easy", irregular: true },
  { text: "elles iraient", tense: "conditionnel_present", verb: "aller", person: "elles", level: "easy", irregular: true },
  { text: "je ferais", tense: "conditionnel_present", verb: "faire", person: "je", level: "easy", irregular: true },
  { text: "vous feriez", tense: "conditionnel_present", verb: "faire", person: "vous", level: "medium", irregular: true },
  { text: "il viendrait", tense: "conditionnel_present", verb: "venir", person: "il", level: "easy", irregular: true },
  { text: "elles viendraient", tense: "conditionnel_present", verb: "venir", person: "elles", level: "medium", irregular: true },
  { text: "je prendrais", tense: "conditionnel_present", verb: "prendre", person: "je", level: "easy", irregular: true },
  { text: "nous prendrions", tense: "conditionnel_present", verb: "prendre", person: "nous", level: "medium", irregular: true },
  { text: "tu verrais", tense: "conditionnel_present", verb: "voir", person: "tu", level: "easy", irregular: true },
  { text: "nous verrions", tense: "conditionnel_present", verb: "voir", person: "nous", level: "medium", irregular: true },
  { text: "je pourrais", tense: "conditionnel_present", verb: "pouvoir", person: "je", level: "easy", irregular: true },
  { text: "ils pourraient", tense: "conditionnel_present", verb: "pouvoir", person: "ils", level: "easy", irregular: true },
  { text: "tu voudrais", tense: "conditionnel_present", verb: "vouloir", person: "tu", level: "easy", irregular: true },
  { text: "elle voudrait", tense: "conditionnel_present", verb: "vouloir", person: "elle", level: "easy", irregular: true },
  { text: "je devrais", tense: "conditionnel_present", verb: "devoir", person: "je", level: "easy", irregular: true },
  { text: "nous devrions", tense: "conditionnel_present", verb: "devoir", person: "nous", level: "medium", irregular: true },
  { text: "il dirait", tense: "conditionnel_present", verb: "dire", person: "il", level: "easy", irregular: true },
  { text: "vous diriez", tense: "conditionnel_present", verb: "dire", person: "vous", level: "easy", irregular: true },
  { text: "je lirais", tense: "conditionnel_present", verb: "lire", person: "je", level: "easy", irregular: true },
  { text: "tu écrirais", tense: "conditionnel_present", verb: "écrire", person: "tu", level: "medium", irregular: true },
  { text: "ils mettraient", tense: "conditionnel_present", verb: "mettre", person: "ils", level: "easy", irregular: true },
  { text: "elle partirait", tense: "conditionnel_present", verb: "partir", person: "elle", level: "easy", irregular: true },
  { text: "nous sortirions", tense: "conditionnel_present", verb: "sortir", person: "nous", level: "easy", irregular: true },
  { text: "je finirais", tense: "conditionnel_present", verb: "finir", person: "je", level: "easy", irregular: false },
  { text: "vous choisiriez", tense: "conditionnel_present", verb: "choisir", person: "vous", level: "easy", irregular: false },
  { text: "tu parlerais", tense: "conditionnel_present", verb: "parler", person: "tu", level: "easy", irregular: false },
  { text: "elle aimerait", tense: "conditionnel_present", verb: "aimer", person: "elle", level: "easy", irregular: false },
  { text: "nous habiterions", tense: "conditionnel_present", verb: "habiter", person: "nous", level: "easy", irregular: false },
  { text: "ils travailleraient", tense: "conditionnel_present", verb: "travailler", person: "ils", level: "easy", irregular: false },
  { text: "je mangerais", tense: "conditionnel_present", verb: "manger", person: "je", level: "easy", irregular: false },
  { text: "nous commencerions", tense: "conditionnel_present", verb: "commencer", person: "nous", level: "medium", irregular: false },
  { text: "tu apprendrais", tense: "conditionnel_present", verb: "apprendre", person: "tu", level: "medium", irregular: true },
  { text: "ils comprendraient", tense: "conditionnel_present", verb: "comprendre", person: "ils", level: "medium", irregular: true },
  { text: "je connaîtrais", tense: "conditionnel_present", verb: "connaître", person: "je", level: "medium", irregular: true },
  { text: "elle boirait", tense: "conditionnel_present", verb: "boire", person: "elle", level: "medium", irregular: true },
  { text: "nous vivrions", tense: "conditionnel_present", verb: "vivre", person: "nous", level: "medium", irregular: true },
  { text: "ils attendraient", tense: "conditionnel_present", verb: "attendre", person: "ils", level: "easy", irregular: false },
  { text: "vous vendriez", tense: "conditionnel_present", verb: "vendre", person: "vous", level: "easy", irregular: false },

  { text: "j'ai été", tense: "passe_compose", verb: "être", person: "je", level: "easy", irregular: true },
  { text: "tu as été", tense: "passe_compose", verb: "être", person: "tu", level: "easy", irregular: true },
  { text: "nous avons été", tense: "passe_compose", verb: "être", person: "nous", level: "easy", irregular: true },
  { text: "j'ai eu", tense: "passe_compose", verb: "avoir", person: "je", level: "easy", irregular: true },
  { text: "elle a eu", tense: "passe_compose", verb: "avoir", person: "elle", level: "easy", irregular: true },
  { text: "vous avez eu", tense: "passe_compose", verb: "avoir", person: "vous", level: "easy", irregular: true },
  { text: "je suis allé", tense: "passe_compose", verb: "aller", person: "je", level: "easy", irregular: true },
  { text: "tu es allé", tense: "passe_compose", verb: "aller", person: "tu", level: "easy", irregular: true },
  { text: "elles sont allées", tense: "passe_compose", verb: "aller", person: "elles", level: "easy", irregular: true },
  { text: "j'ai fait", tense: "passe_compose", verb: "faire", person: "je", level: "easy", irregular: true },
  { text: "nous avons fait", tense: "passe_compose", verb: "faire", person: "nous", level: "easy", irregular: true },
  { text: "il est venu", tense: "passe_compose", verb: "venir", person: "il", level: "easy", irregular: true },
  { text: "elles sont venues", tense: "passe_compose", verb: "venir", person: "elles", level: "medium", irregular: true },
  { text: "j'ai pris", tense: "passe_compose", verb: "prendre", person: "je", level: "easy", irregular: true },
  { text: "nous avons pris", tense: "passe_compose", verb: "prendre", person: "nous", level: "medium", irregular: true },
  { text: "tu as vu", tense: "passe_compose", verb: "voir", person: "tu", level: "easy", irregular: true },
  { text: "nous avons vu", tense: "passe_compose", verb: "voir", person: "nous", level: "medium", irregular: true },
  { text: "j'ai pu", tense: "passe_compose", verb: "pouvoir", person: "je", level: "easy", irregular: true },
  { text: "ils ont pu", tense: "passe_compose", verb: "pouvoir", person: "ils", level: "easy", irregular: true },
  { text: "tu as voulu", tense: "passe_compose", verb: "vouloir", person: "tu", level: "easy", irregular: true },
  { text: "elle a voulu", tense: "passe_compose", verb: "vouloir", person: "elle", level: "easy", irregular: true },
  { text: "j'ai dû", tense: "passe_compose", verb: "devoir", person: "je", level: "easy", irregular: true },
  { text: "nous avons dû", tense: "passe_compose", verb: "devoir", person: "nous", level: "medium", irregular: true },
  { text: "il a dit", tense: "passe_compose", verb: "dire", person: "il", level: "easy", irregular: true },
  { text: "vous avez dit", tense: "passe_compose", verb: "dire", person: "vous", level: "easy", irregular: true },
  { text: "j'ai lu", tense: "passe_compose", verb: "lire", person: "je", level: "easy", irregular: true },
  { text: "tu as écrit", tense: "passe_compose", verb: "écrire", person: "tu", level: "medium", irregular: true },
  { text: "ils ont mis", tense: "passe_compose", verb: "mettre", person: "ils", level: "easy", irregular: true },
  { text: "elle est partie", tense: "passe_compose", verb: "partir", person: "elle", level: "easy", irregular: true },
  { text: "nous sommes sortis", tense: "passe_compose", verb: "sortir", person: "nous", level: "easy", irregular: true },
  { text: "j'ai fini", tense: "passe_compose", verb: "finir", person: "je", level: "easy", irregular: false },
  { text: "vous avez choisi", tense: "passe_compose", verb: "choisir", person: "vous", level: "easy", irregular: false },
  { text: "tu as parlé", tense: "passe_compose", verb: "parler", person: "tu", level: "easy", irregular: false },
  { text: "elle a aimé", tense: "passe_compose", verb: "aimer", person: "elle", level: "easy", irregular: false },
  { text: "nous avons habité", tense: "passe_compose", verb: "habiter", person: "nous", level: "easy", irregular: false },
  { text: "ils ont travaillé", tense: "passe_compose", verb: "travailler", person: "ils", level: "easy", irregular: false },
  { text: "j'ai mangé", tense: "passe_compose", verb: "manger", person: "je", level: "easy", irregular: false },
  { text: "nous avons commencé", tense: "passe_compose", verb: "commencer", person: "nous", level: "medium", irregular: false },
  { text: "tu as appris", tense: "passe_compose", verb: "apprendre", person: "tu", level: "medium", irregular: true },
  { text: "ils ont compris", tense: "passe_compose", verb: "comprendre", person: "ils", level: "medium", irregular: true },
  { text: "j'ai connu", tense: "passe_compose", verb: "connaître", person: "je", level: "medium", irregular: true },
  { text: "elle a bu", tense: "passe_compose", verb: "boire", person: "elle", level: "medium", irregular: true },
  { text: "nous avons vécu", tense: "passe_compose", verb: "vivre", person: "nous", level: "medium", irregular: true },
  { text: "ils ont attendu", tense: "passe_compose", verb: "attendre", person: "ils", level: "easy", irregular: false },
  { text: "vous avez vendu", tense: "passe_compose", verb: "vendre", person: "vous", level: "easy", irregular: false },
];

const GRAMMAR_BUCKETS = {
  nom: {
    label: "nom",
    color: "#0f8b8d",
    hint: "personne, lieu, objet ou idée",
    errorHint: "on peut souvent mettre un déterminant devant",
    errorLabel: "c'était un nom",
  },
  verbe: {
    label: "verbe",
    color: "#2867c8",
    hint: "action ou état",
    errorHint: "il se conjugue avec un sujet",
    errorLabel: "c'était un verbe",
  },
  adjectif: {
    label: "adjectif",
    color: "#c95f36",
    hint: "précise un nom",
    errorHint: "il décrit une qualité",
    errorLabel: "c'était un adjectif",
  },
  adverbe: {
    label: "adverbe",
    color: "#1f9d68",
    hint: "précise un verbe ou une phrase",
    errorHint: "il indique souvent comment, où ou quand",
    errorLabel: "c'était un adverbe",
  },
  pronom: {
    label: "pronom",
    color: "#7557b8",
    hint: "remplace un nom ou un groupe nominal",
    errorHint: "il évite de répéter un nom",
    errorLabel: "c'était un pronom",
  },
};

const GRAMMAR_ORDER = ["nom", "verbe", "adjectif", "adverbe", "pronom"];

const GRAMMAR_ITEMS = [
  { text: "table", answer: "nom", level: "easy", tags: ["objet"], hint: "un objet" },
  { text: "voiture", answer: "nom", level: "easy", tags: ["objet"], hint: "un objet" },
  { text: "étudiant", answer: "nom", level: "easy", tags: ["personne"], hint: "une personne" },
  { text: "livre", answer: "nom", level: "easy", tags: ["objet"], hint: "un objet" },
  { text: "maison", answer: "nom", level: "easy", tags: ["lieu"], hint: "un lieu" },
  { text: "école", answer: "nom", level: "easy", tags: ["lieu"], hint: "un lieu" },
  { text: "jardin", answer: "nom", level: "easy", tags: ["lieu"], hint: "un lieu" },
  { text: "chaise", answer: "nom", level: "easy", tags: ["objet"], hint: "un objet" },
  { text: "fenêtre", answer: "nom", level: "medium", tags: ["objet"], hint: "un objet" },
  { text: "ordinateur", answer: "nom", level: "medium", tags: ["objet"], hint: "un objet" },
  { text: "dormir", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "courir", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "écrire", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "chanter", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "manger", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "parler", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "lire", answer: "verbe", level: "easy", tags: ["infinitif"], hint: "une action" },
  { text: "voyager", answer: "verbe", level: "medium", tags: ["infinitif"], hint: "une action" },
  { text: "attendre", answer: "verbe", level: "medium", tags: ["infinitif"], hint: "une action" },
  { text: "choisir", answer: "verbe", level: "medium", tags: ["infinitif"], hint: "une action" },
  { text: "grand", answer: "adjectif", level: "easy", tags: ["qualité"], hint: "une qualité" },
  { text: "utile", answer: "adjectif", level: "easy", tags: ["qualité"], hint: "une qualité" },
  { text: "rapide", answer: "adjectif", level: "easy", tags: ["qualité"], hint: "une qualité" },
  { text: "joli", answer: "adjectif", level: "easy", tags: ["qualité"], hint: "une qualité" },
  { text: "bleu", answer: "adjectif", level: "easy", tags: ["couleur"], hint: "une qualité" },
  { text: "chaud", answer: "adjectif", level: "easy", tags: ["qualité"], hint: "une qualité" },
  { text: "propre", answer: "adjectif", level: "easy", tags: ["qualité"], hint: "une qualité" },
  { text: "difficile", answer: "adjectif", level: "medium", tags: ["qualité"], hint: "une qualité" },
  { text: "simple", answer: "adjectif", level: "medium", tags: ["qualité"], hint: "une qualité" },
  { text: "ancien", answer: "adjectif", level: "medium", tags: ["qualité"], hint: "une qualité" },
  { text: "vite", answer: "adverbe", level: "easy", tags: ["manière"], hint: "comment ?" },
  { text: "souvent", answer: "adverbe", level: "easy", tags: ["fréquence"], hint: "combien de fois ?" },
  { text: "demain", answer: "adverbe", level: "easy", tags: ["temps"], hint: "quand ?" },
  { text: "ici", answer: "adverbe", level: "easy", tags: ["lieu"], hint: "où ?" },
  { text: "dehors", answer: "adverbe", level: "easy", tags: ["lieu"], hint: "où ?" },
  { text: "bientôt", answer: "adverbe", level: "medium", tags: ["temps"], hint: "quand ?" },
  { text: "toujours", answer: "adverbe", level: "medium", tags: ["fréquence"], hint: "combien de fois ?" },
  { text: "lentement", answer: "adverbe", level: "medium", tags: ["manière"], hint: "comment ?" },
  { text: "maintenant", answer: "adverbe", level: "medium", tags: ["temps"], hint: "quand ?" },
  { text: "ailleurs", answer: "adverbe", level: "hard", tags: ["lieu"], hint: "où ?" },
  { text: "elle", answer: "pronom", level: "easy", tags: ["personnel"], hint: "remplace un nom" },
  { text: "nous", answer: "pronom", level: "easy", tags: ["personnel"], hint: "remplace un nom" },
  { text: "ceci", answer: "pronom", level: "medium", tags: ["démonstratif"], hint: "remplace une chose" },
  { text: "chacun", answer: "pronom", level: "medium", tags: ["indéfini"], hint: "remplace une personne" },
  { text: "celui-ci", answer: "pronom", level: "medium", tags: ["démonstratif"], hint: "remplace un nom" },
  { text: "elles", answer: "pronom", level: "easy", tags: ["personnel"], hint: "remplace un nom" },
  { text: "vous", answer: "pronom", level: "easy", tags: ["personnel"], hint: "remplace un nom" },
  { text: "moi", answer: "pronom", level: "easy", tags: ["personnel"], hint: "remplace une personne" },
  { text: "quelqu'un", answer: "pronom", level: "medium", tags: ["indéfini"], hint: "remplace une personne" },
  { text: "lequel", answer: "pronom", level: "hard", tags: ["interrogatif"], hint: "remplace un nom" },
];

const LEXICAL_BUCKETS = {
  alimentation: {
    label: "alimentation",
    color: "#1f9d68",
    hint: "manger, boire, cuisiner",
    errorHint: "mot lié aux repas",
    errorLabel: "champ lexical de l'alimentation",
  },
  transports: {
    label: "transports",
    color: "#2867c8",
    hint: "se déplacer",
    errorHint: "mot lié aux déplacements",
    errorLabel: "champ lexical des transports",
  },
  etudes: {
    label: "études",
    color: "#7557b8",
    hint: "apprendre, lire, passer un examen",
    errorHint: "mot lié à l'école ou l'université",
    errorLabel: "champ lexical des études",
  },
  logement: {
    label: "logement",
    color: "#0f8b8d",
    hint: "pièces, meubles, habitation",
    errorHint: "mot lié à la maison",
    errorLabel: "champ lexical du logement",
  },
  travail: {
    label: "travail",
    color: "#c95f36",
    hint: "emploi, bureau, collègues",
    errorHint: "mot lié à la vie professionnelle",
    errorLabel: "champ lexical du travail",
  },
};

const LEXICAL_ORDER = ["alimentation", "transports", "etudes", "logement", "travail"];

const LEXICAL_ITEMS = [
  { text: "pain", answer: "alimentation", level: "easy", tags: ["aliment"], hint: "à manger" },
  { text: "pomme", answer: "alimentation", level: "easy", tags: ["fruit"], hint: "à manger" },
  { text: "salade", answer: "alimentation", level: "easy", tags: ["aliment"], hint: "à manger" },
  { text: "fourchette", answer: "alimentation", level: "easy", tags: ["ustensile"], hint: "pour manger" },
  { text: "fromage", answer: "alimentation", level: "easy", tags: ["aliment"], hint: "à manger" },
  { text: "eau", answer: "alimentation", level: "easy", tags: ["boisson"], hint: "à boire" },
  { text: "restaurant", answer: "alimentation", level: "medium", tags: ["lieu"], hint: "où l'on mange" },
  { text: "assiette", answer: "alimentation", level: "medium", tags: ["objet"], hint: "pour manger" },
  { text: "casserole", answer: "alimentation", level: "medium", tags: ["objet"], hint: "pour cuisiner" },
  { text: "recette", answer: "alimentation", level: "hard", tags: ["cuisine"], hint: "pour préparer un plat" },
  { text: "bus", answer: "transports", level: "easy", tags: ["véhicule"], hint: "pour se déplacer" },
  { text: "gare", answer: "transports", level: "easy", tags: ["lieu"], hint: "lieu de départ" },
  { text: "train", answer: "transports", level: "easy", tags: ["véhicule"], hint: "pour voyager" },
  { text: "vélo", answer: "transports", level: "easy", tags: ["véhicule"], hint: "pour se déplacer" },
  { text: "métro", answer: "transports", level: "easy", tags: ["véhicule"], hint: "en ville" },
  { text: "billet", answer: "transports", level: "medium", tags: ["document"], hint: "pour voyager" },
  { text: "aéroport", answer: "transports", level: "medium", tags: ["lieu"], hint: "pour prendre l'avion" },
  { text: "tramway", answer: "transports", level: "medium", tags: ["véhicule"], hint: "transport urbain" },
  { text: "parking", answer: "transports", level: "medium", tags: ["lieu"], hint: "pour garer une voiture" },
  { text: "passager", answer: "transports", level: "hard", tags: ["personne"], hint: "personne qui voyage" },
  { text: "professeur", answer: "etudes", level: "easy", tags: ["personne"], hint: "à l'école" },
  { text: "cahier", answer: "etudes", level: "easy", tags: ["objet"], hint: "pour écrire" },
  { text: "examen", answer: "etudes", level: "easy", tags: ["évaluation"], hint: "à réussir" },
  { text: "bibliothèque", answer: "etudes", level: "easy", tags: ["lieu"], hint: "pour lire ou étudier" },
  { text: "leçon", answer: "etudes", level: "easy", tags: ["cours"], hint: "à apprendre" },
  { text: "diplôme", answer: "etudes", level: "medium", tags: ["document"], hint: "après des études" },
  { text: "classe", answer: "etudes", level: "medium", tags: ["lieu"], hint: "lieu d'apprentissage" },
  { text: "devoir", answer: "etudes", level: "medium", tags: ["activité"], hint: "à faire pour apprendre" },
  { text: "université", answer: "etudes", level: "medium", tags: ["lieu"], hint: "après le lycée" },
  { text: "manuel", answer: "etudes", level: "hard", tags: ["objet"], hint: "livre de cours" },
  { text: "chambre", answer: "logement", level: "easy", tags: ["pièce"], hint: "dans une maison" },
  { text: "clé", answer: "logement", level: "easy", tags: ["objet"], hint: "pour ouvrir" },
  { text: "canapé", answer: "logement", level: "easy", tags: ["meuble"], hint: "dans le salon" },
  { text: "loyer", answer: "logement", level: "medium", tags: ["argent"], hint: "à payer chaque mois" },
  { text: "douche", answer: "logement", level: "medium", tags: ["pièce"], hint: "dans la salle de bain" },
  { text: "balcon", answer: "logement", level: "medium", tags: ["espace"], hint: "à l'extérieur du logement" },
  { text: "placard", answer: "logement", level: "medium", tags: ["meuble"], hint: "pour ranger" },
  { text: "immeuble", answer: "logement", level: "hard", tags: ["bâtiment"], hint: "plusieurs appartements" },
  { text: "entretien", answer: "travail", level: "easy", tags: ["recrutement"], hint: "avant un emploi" },
  { text: "bureau", answer: "travail", level: "easy", tags: ["lieu"], hint: "où l'on travaille" },
  { text: "salaire", answer: "travail", level: "easy", tags: ["argent"], hint: "argent du travail" },
  { text: "collègue", answer: "travail", level: "easy", tags: ["personne"], hint: "personne au travail" },
  { text: "réunion", answer: "travail", level: "medium", tags: ["activité"], hint: "moment professionnel" },
  { text: "contrat", answer: "travail", level: "medium", tags: ["document"], hint: "document d'emploi" },
  { text: "poste", answer: "travail", level: "medium", tags: ["emploi"], hint: "emploi occupé" },
  { text: "entreprise", answer: "travail", level: "medium", tags: ["lieu"], hint: "lieu professionnel" },
];

const TOOL_BUCKETS = {
  articles: {
    label: "articles",
    color: "#0f8b8d",
    hint: "le, la, un, une...",
    errorHint: "ils introduisent un nom",
    errorLabel: "article",
  },
  prepositions: {
    label: "prépositions",
    color: "#2867c8",
    hint: "dans, sur, avec...",
    errorHint: "elles relient un mot à un complément",
    errorLabel: "préposition",
  },
  conjonctions: {
    label: "conjonctions",
    color: "#c95f36",
    hint: "mais, ou, et, donc, car",
    errorHint: "elles relient deux mots ou deux idées",
    errorLabel: "conjonction",
  },
  pronoms_relatifs: {
    label: "pronoms relatifs",
    color: "#1f9d68",
    hint: "qui, que, où, dont",
    errorHint: "ils introduisent une proposition relative",
    errorLabel: "pronom relatif",
  },
  connecteurs: {
    label: "connecteurs",
    color: "#7557b8",
    hint: "ensuite, pourtant, enfin...",
    errorHint: "ils organisent le discours",
    errorLabel: "connecteur logique",
  },
};

const TOOL_ORDER = ["articles", "prepositions", "conjonctions", "pronoms_relatifs", "connecteurs"];

const TOOL_ITEMS = [
  { text: "le", answer: "articles", level: "easy", tags: ["défini"], hint: "introduit un nom" },
  { text: "la", answer: "articles", level: "easy", tags: ["défini"], hint: "introduit un nom" },
  { text: "les", answer: "articles", level: "easy", tags: ["défini"], hint: "introduit un nom" },
  { text: "un", answer: "articles", level: "easy", tags: ["indéfini"], hint: "introduit un nom" },
  { text: "une", answer: "articles", level: "easy", tags: ["indéfini"], hint: "introduit un nom" },
  { text: "des", answer: "articles", level: "easy", tags: ["indéfini"], hint: "introduit un nom" },
  { text: "du", answer: "articles", level: "medium", tags: ["partitif"], hint: "introduit un nom" },
  { text: "de la", answer: "articles", level: "medium", tags: ["partitif"], hint: "introduit un nom" },
  { text: "dans", answer: "prepositions", level: "easy", tags: ["lieu"], hint: "introduit un complément" },
  { text: "sur", answer: "prepositions", level: "easy", tags: ["lieu"], hint: "introduit un complément" },
  { text: "avec", answer: "prepositions", level: "easy", tags: ["accompagnement"], hint: "introduit un complément" },
  { text: "sans", answer: "prepositions", level: "easy", tags: ["manque"], hint: "introduit un complément" },
  { text: "chez", answer: "prepositions", level: "easy", tags: ["lieu"], hint: "introduit un complément" },
  { text: "pour", answer: "prepositions", level: "medium", tags: ["but"], hint: "introduit un complément" },
  { text: "depuis", answer: "prepositions", level: "medium", tags: ["temps"], hint: "introduit un complément" },
  { text: "près de", answer: "prepositions", level: "medium", tags: ["lieu"], hint: "introduit un complément" },
  { text: "mais", answer: "conjonctions", level: "easy", tags: ["opposition"], hint: "relie deux idées" },
  { text: "ou", answer: "conjonctions", level: "easy", tags: ["choix"], hint: "relie deux idées" },
  { text: "et", answer: "conjonctions", level: "easy", tags: ["addition"], hint: "relie deux idées" },
  { text: "donc", answer: "conjonctions", level: "easy", tags: ["conséquence"], hint: "relie deux idées" },
  { text: "car", answer: "conjonctions", level: "easy", tags: ["cause"], hint: "relie deux idées" },
  { text: "lorsque", answer: "conjonctions", level: "medium", tags: ["temps"], hint: "introduit une proposition" },
  { text: "puisque", answer: "conjonctions", level: "medium", tags: ["cause"], hint: "introduit une proposition" },
  { text: "quoique", answer: "conjonctions", level: "hard", tags: ["concession"], hint: "introduit une proposition" },
  { text: "qui", answer: "pronoms_relatifs", level: "easy", tags: ["relatif"], hint: "introduit une relative" },
  { text: "que", answer: "pronoms_relatifs", level: "easy", tags: ["relatif"], hint: "introduit une relative" },
  { text: "ce qui", answer: "pronoms_relatifs", level: "easy", tags: ["relatif"], hint: "introduit une relative" },
  { text: "ce que", answer: "pronoms_relatifs", level: "easy", tags: ["relatif"], hint: "introduit une relative" },
  { text: "où", answer: "pronoms_relatifs", level: "medium", tags: ["relatif"], hint: "introduit une relative" },
  { text: "dont", answer: "pronoms_relatifs", level: "medium", tags: ["relatif"], hint: "introduit une relative" },
  { text: "lequel", answer: "pronoms_relatifs", level: "hard", tags: ["relatif"], hint: "introduit une relative" },
  { text: "laquelle", answer: "pronoms_relatifs", level: "hard", tags: ["relatif"], hint: "introduit une relative" },
  { text: "ensuite", answer: "connecteurs", level: "easy", tags: ["ordre"], hint: "organise le discours" },
  { text: "puis", answer: "connecteurs", level: "easy", tags: ["ordre"], hint: "organise le discours" },
  { text: "enfin", answer: "connecteurs", level: "easy", tags: ["ordre"], hint: "organise le discours" },
  { text: "par exemple", answer: "connecteurs", level: "easy", tags: ["exemple"], hint: "organise le discours" },
  { text: "pourtant", answer: "connecteurs", level: "medium", tags: ["opposition"], hint: "organise le discours" },
  { text: "cependant", answer: "connecteurs", level: "medium", tags: ["opposition"], hint: "organise le discours" },
  { text: "d'abord", answer: "connecteurs", level: "medium", tags: ["ordre"], hint: "organise le discours" },
  { text: "en résumé", answer: "connecteurs", level: "medium", tags: ["synthèse"], hint: "organise le discours" },
  { text: "par conséquent", answer: "connecteurs", level: "hard", tags: ["conséquence"], hint: "organise le discours" },
];

const GAME_MODES = {
  tenses: {
    id: "tenses",
    label: "Temps verbaux",
    description: "Classe des formes conjuguées selon leur temps. Le mode historique reste le plus complet.",
    headerEyebrow: "Classement des temps",
    headerTitle: "Quelle boîte choisir ?",
    itemLabel: "forme verbale",
    helpTitle: "Rappel des terminaisons",
    buckets: TENSES,
    bucketOrder: TENSE_ORDER,
    initialBuckets: INITIAL_TENSES,
    items: GAME_FORMS,
    testItems: TEST_FORMS,
    unlocks: {
      easy: { conditionnel_present: 8, passe_compose: 18 },
      medium: { conditionnel_present: 6, passe_compose: 14 },
      hard: { conditionnel_present: 5, passe_compose: 12 },
    },
    bestLabel: "Temps le plus réussi",
    hardestLabel: "Temps à retravailler",
    emptyBestLabel: "à découvrir",
    noProblemLabel: "aucun",
    weightIrregulars: true,
  },
  grammar: {
    id: "grammar",
    label: "Catégories grammaticales",
    description: "Trie des mots simples : nom, verbe, adjectif, puis adverbe et pronom.",
    headerEyebrow: "Catégories grammaticales",
    headerTitle: "Quelle nature grammaticale ?",
    itemLabel: "mot",
    helpTitle: "Mini-repères grammaticaux",
    buckets: GRAMMAR_BUCKETS,
    bucketOrder: GRAMMAR_ORDER,
    initialBuckets: GRAMMAR_ORDER.slice(0, 3),
    items: GRAMMAR_ITEMS,
    unlocks: {
      easy: { adverbe: 8, pronom: 18 },
      medium: { adverbe: 6, pronom: 14 },
      hard: { adverbe: 5, pronom: 12 },
    },
    bestLabel: "Catégorie la plus réussie",
    hardestLabel: "Catégorie à retravailler",
    emptyBestLabel: "à découvrir",
    noProblemLabel: "aucune",
  },
  lexical: {
    id: "lexical",
    label: "Champs lexicaux",
    description: "Classe des mots concrets par famille de vocabulaire utile en FLE.",
    headerEyebrow: "Champs lexicaux",
    headerTitle: "Dans quelle famille va ce mot ?",
    itemLabel: "mot",
    helpTitle: "Familles de vocabulaire",
    buckets: LEXICAL_BUCKETS,
    bucketOrder: LEXICAL_ORDER,
    initialBuckets: LEXICAL_ORDER.slice(0, 3),
    items: LEXICAL_ITEMS,
    unlocks: {
      easy: { logement: 8, travail: 18 },
      medium: { logement: 6, travail: 14 },
      hard: { logement: 5, travail: 12 },
    },
    bestLabel: "Champ le plus réussi",
    hardestLabel: "Champ à retravailler",
    emptyBestLabel: "à découvrir",
    noProblemLabel: "aucun",
  },
  tools: {
    id: "tools",
    label: "Mots outils",
    description: "Trie des petits mots par familles claires : articles, prépositions, conjonctions...",
    headerEyebrow: "Mots outils",
    headerTitle: "Quelle famille de mot outil ?",
    itemLabel: "mot outil",
    helpTitle: "Rôle des mots outils",
    buckets: TOOL_BUCKETS,
    bucketOrder: TOOL_ORDER,
    initialBuckets: TOOL_ORDER.slice(0, 3),
    items: TOOL_ITEMS,
    unlocks: {
      easy: { pronoms_relatifs: 8, connecteurs: 18 },
      medium: { pronoms_relatifs: 6, connecteurs: 14 },
      hard: { pronoms_relatifs: 5, connecteurs: 12 },
    },
    bestLabel: "Famille la plus réussie",
    hardestLabel: "Famille à retravailler",
    emptyBestLabel: "à découvrir",
    noProblemLabel: "aucune",
  },
};

const homeScreen = document.getElementById("homeScreen");
const gameScreen = document.getElementById("gameScreen");
const endScreen = document.getElementById("endScreen");
const settingsForm = document.getElementById("settingsForm");
const contentModeSelector = document.getElementById("contentModeSelector");
const contentModeDescription = document.getElementById("contentModeDescription");
const testDataButton = document.getElementById("testDataButton");
const hintToggle = document.getElementById("hintToggle");
const soundToggle = document.getElementById("soundToggle");
const hintPanel = document.getElementById("hintPanel");
const playfield = document.getElementById("playfield");
const laneGrid = document.getElementById("laneGrid");
const fallingWord = document.getElementById("fallingWord");
const judgementLine = document.querySelector(".judgement-line");
const binsContainer = document.getElementById("bins");
const feedback = document.getElementById("feedback");
const unlockBanner = document.getElementById("unlockBanner");
const restartButton = document.getElementById("restartButton");
const homeButton = document.getElementById("homeButton");
const playAgainButton = document.getElementById("playAgainButton");
const backToHomeButton = document.getElementById("backToHomeButton");
const gameEyebrow = document.getElementById("gameEyebrow");
const gameTitle = document.getElementById("gameTitle");
const scoreEl = document.getElementById("score");
const correctEl = document.getElementById("correctCount");
const errorEl = document.getElementById("errorCount");
const streakEl = document.getElementById("streakCount");
const progressEl = document.getElementById("progressStat");
const progressBar = document.getElementById("progressBar");
const finalSummary = document.getElementById("finalSummary");
const tenseBreakdown = document.getElementById("tenseBreakdown");

let bins = [];
let lanes = [];

const state = {
  mode: "game",
  contentMode: DEFAULT_CONTENT_MODE,
  difficulty: "easy",
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
  [homeScreen, gameScreen, endScreen].forEach((item) => item.classList.remove("screen--active"));
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
  const unlocks = mode.unlocks?.[state.difficulty] ?? {};
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
  if (!state.soundEnabled) return;
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

function getAvailableItems() {
  const mode = getModeConfig();
  const isActiveItem = (item) => state.activeBuckets.includes(getItemBucket(item));

  if (state.useTestData) {
    return (mode.testItems ?? mode.items).filter(isActiveItem);
  }

  const allowed = DIFFICULTIES[state.difficulty].allowedLevels;
  const pool = mode.items.filter((item) => allowed.includes(item.level) && isActiveItem(item));

  if (mode.weightIrregulars && state.difficulty === "hard") {
    const irregulars = pool.filter((item) => item.irregular);
    return shuffle([...pool, ...irregulars.slice(0, 28)]);
  }

  if (mode.weightIrregulars && state.difficulty === "medium" && state.correct >= 12) {
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
    progressEl.textContent = `${state.answered} / ${GAME_RULES.wordsPerGame}`;
    progressBar.style.width = `${Math.min(100, (state.answered / GAME_RULES.wordsPerGame) * 100)}%`;
  }
}

function currentSpeed() {
  const difficulty = DIFFICULTIES[state.difficulty];
  const speed = difficulty.baseSpeed + state.answered * difficulty.speedIncrease;
  const cappedSpeed = Math.min(speed, difficulty.maxSpeed);
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

function startGame({ useTestData = false } = {}) {
  cancelAnimationFrame(state.animationId);
  window.clearTimeout(state.spawnTimer);
  window.clearTimeout(state.resolveTimer);
  window.clearTimeout(state.unlockTimer);
  window.clearTimeout(state.feedbackTimer);
  state.mode = getSelectedValue("mode");
  state.contentMode = getSelectedContentMode();
  state.difficulty = getSelectedValue("difficulty");
  state.useTestData = useTestData;
  state.soundEnabled = soundToggle.checked;
  resetStats();
  state.deck = shuffle(getAvailableItems());
  fallingWord.hidden = true;
  hintPanel.hidden = !hintToggle.checked;
  hintPanel.open = hintToggle.checked;
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
    state.score += GAME_RULES.correctBaseScore + Math.min(state.streak * GAME_RULES.comboBonusStep, GAME_RULES.comboBonusCap);
    fallingWord.classList.add("correct");
    chosenBin?.classList.remove("bin--active");
    chosenBin?.classList.add("bin--target");
    showFeedback(state.streak >= 3 ? `Correct : ${expectedLabel} · série x${state.streak}` : `Correct : ${expectedLabel}`, true);
    playSound("correct");
  } else {
    state.errors += 1;
    state.streak = 0;
    state.score = Math.max(0, state.score - GAME_RULES.errorPenalty);
    state.errorsByBucket[expected] += 1;
    fallingWord.classList.add("wrong");
    chosenBin?.classList.remove("bin--active");
    chosenBin?.classList.add("bin--error");
    expectedBin?.classList.add("bin--target");
    addErrorBrick(chosen, state.current);
    showFeedback(formatErrorFeedback(expected), false);
    playSound("error");
  }

  updateStats();

  state.resolveTimer = window.setTimeout(() => {
    fallingWord.hidden = true;
    clearLaneHighlights();

    if (shouldEndGame()) {
      finishGame();
    } else {
      state.current = null;
      unlockNextBucketIfReady();
      state.spawnTimer = window.setTimeout(spawnWord, GAME_RULES.spawnDelayMs);
    }
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
  if (state.answered >= GAME_RULES.wordsPerGame) {
    state.gameOverReason = "Manche terminée";
    return true;
  }

  return false;
}

function finishGame() {
  cancelAnimationFrame(state.animationId);
  window.clearTimeout(state.spawnTimer);
  window.clearTimeout(state.resolveTimer);
  window.clearTimeout(state.feedbackTimer);
  fallingWord.hidden = true;
  state.current = null;
  clearLaneHighlights();
  clearFeedback();
  playSound("end");
  renderFinalSummary();
  showScreen(endScreen);
}

function renderFinalSummary() {
  const mode = getModeConfig();
  const total = state.correct + state.errors;
  const successRate = total === 0 ? 0 : Math.round((state.correct / total) * 100);
  const playedBuckets = mode.bucketOrder.filter((bucket) => state.attemptsByBucket[bucket] > 0);
  const rankedBySuccess = [...playedBuckets].sort((a, b) => {
    const rateA = state.correctByBucket[a] / state.attemptsByBucket[a];
    const rateB = state.correctByBucket[b] / state.attemptsByBucket[b];
    return rateB - rateA || state.attemptsByBucket[b] - state.attemptsByBucket[a];
  });
  const rankedByErrors = [...playedBuckets].sort((a, b) => {
    return state.errorsByBucket[b] - state.errorsByBucket[a] || state.attemptsByBucket[b] - state.attemptsByBucket[a];
  });
  const bestBucket = rankedBySuccess[0] ? getBucketInfo(rankedBySuccess[0]).label : mode.emptyBestLabel;
  const hardestBucket = rankedByErrors[0] && state.errorsByBucket[rankedByErrors[0]] > 0 ? getBucketInfo(rankedByErrors[0]).label : mode.noProblemLabel;

  finalSummary.innerHTML = "";
  [
    ["Mode", mode.label],
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
    finalSummary.appendChild(card);
  });

  tenseBreakdown.innerHTML = "";
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
    value.textContent = attempts > 0 ? `${correct}/${attempts} OK · ${errors} erreur(s)` : "non joué";
    row.append(label, value);
    tenseBreakdown.appendChild(row);
  });
}

renderContentModeSelector();
updateContentModeDescription();

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
  window.clearTimeout(state.spawnTimer);
  window.clearTimeout(state.resolveTimer);
  window.clearTimeout(state.unlockTimer);
  window.clearTimeout(state.feedbackTimer);
  fallingWord.hidden = true;
  state.current = null;
  state.isFastDropping = false;
  clearLaneHighlights();
  clearFeedback();
  showScreen(homeScreen);
});

backToHomeButton.addEventListener("click", () => {
  showScreen(homeScreen);
});

soundToggle.checked = GAME_RULES.soundDefaultOn;
soundToggle.addEventListener("change", () => {
  state.soundEnabled = soundToggle.checked;
  if (state.soundEnabled) primeAudio();
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
    state.isFastDropping = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (event.key === "ArrowDown") {
    state.isFastDropping = false;
  }
});

window.addEventListener("blur", () => {
  state.isFastDropping = false;
});

window.addEventListener("resize", () => {
  if (!state.current) return;
  state.targetX = getLaneCenter(state.laneIndex);
  state.currentX = state.targetX;
  placeWord();
});
