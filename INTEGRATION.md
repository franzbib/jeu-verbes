# Contrat d'intégration - Chute des mots

Le mini-jeu reste autonome avec `index.html`, mais il expose aussi une API JavaScript globale pour être lancé depuis Mission ISPA ou depuis une iframe.

## Configuration

La configuration par défaut est déclarée dans `data.js` :

```js
DEFAULT_GAME_CONFIG
```

Champs principaux :

- `contentMode` : `tenses`, `grammar`, `lexical`, `tools`
- `cefrLevel` : `A2`, `B1`, `B2`
- `playMode` : `game` ou `training`
- `wordsPerGame` : nombre de mots pour une partie limitée
- `missionId` : identifiant libre fourni par le jeu appelant
- `integrationMode` : `true` si le lancement vient d'un autre jeu
- `messageTargetOrigin` : origine cible utilisée par `postMessage`, `*` par défaut
- `successCriteria.minScore`
- `successCriteria.minCorrect`
- `successCriteria.minAccuracy`
- `successCriteria.allowColumnDeath`

## API JavaScript

```js
window.ChuteDesMots.configure(config);
window.ChuteDesMots.start(config);
window.ChuteDesMots.getLastResult();
window.ChuteDesMots.getState();
```

Exemple :

```js
window.ChuteDesMots.start({
  contentMode: "tools",
  cefrLevel: "B1",
  playMode: "game",
  wordsPerGame: 30,
  missionId: "mission-outils-b1",
  integrationMode: true,
  messageTargetOrigin: "*",
  successCriteria: {
    minScore: 120,
    minCorrect: null,
    minAccuracy: 70,
    allowColumnDeath: false,
  },
});
```

## Résultat final

À la fin, le jeu :

- stocke le résultat dans `window.ChuteDesMots.getLastResult()`;
- déclenche l'événement `chuteDesMots:complete`;
- envoie un `postMessage` au parent si le jeu est dans une iframe.

Les deux noms sont volontairement différents :

- `completeEventName` vaut `chuteDesMots:complete` et concerne l'événement DOM interne déclenché dans la page du mini-jeu.
- `completeMessageType` vaut `chute-des-mots:complete` et concerne le message envoyé au parent par `postMessage`.

Mission ISPA doit lire ces valeurs depuis `window.ChuteDesMots.CONTRACT` quand il accède directement à l'iframe, afin d'éviter de recopier des chaînes en dur.

Exemple avec l'événement interne :

```js
const { completeEventName } = window.ChuteDesMots.CONTRACT;

window.addEventListener(completeEventName, (event) => {
  console.log(event.detail);
});
```

Exemple côté parent avec `postMessage` :

```js
const expectedType = "chute-des-mots:complete";

window.addEventListener("message", (event) => {
  if (event.data?.type !== expectedType) return;
  console.log(event.data.payload);
});
```

Si le parent peut lire la fenêtre de l'iframe parce qu'elle est en même origine, il peut aussi récupérer la constante sans la recopier :

```js
const expectedType = iframe.contentWindow.ChuteDesMots.CONTRACT.completeMessageType;
```

Format réel du message envoyé :

```js
{
  type: "chute-des-mots:complete",
  payload: result
}
```

Le résultat contient notamment `missionId`, `contentMode`, `cefrLevel`, `playMode`, `score`, `correct`, `errors`, `answered`, `accuracy`, `endedByColumnDeath`, `successCriteria`, `success` et le détail par tiroir dans `buckets`.

Le contrat stable est centralisé dans `CHUTE_DES_MOTS_CONTRACT` :

```js
{
  gameId: "chute-des-mots",
  version: 1,
  completeEventName: "chuteDesMots:complete",
  completeMessageType: "chute-des-mots:complete"
}
```

## Lancement par URL

Une intégration simple peut aussi préconfigurer la page avec des paramètres d'URL :

```text
index.html?contentMode=tools&cefrLevel=B1&playMode=game&wordsPerGame=30&missionId=mission-outils-b1&integrationMode=1&minScore=120&minAccuracy=70&allowColumnDeath=false&autostart=1
```

`autostart=1` lance immédiatement la partie.

## Tests

Le contrat peut être vérifié sans dépendance externe :

```bash
node integration-contract.test.js
```

Un test manuel par iframe est aussi disponible :

```text
integration-harness.html
```

Cette page simule un parent intégrateur, charge `index.html` dans une iframe, écoute le message `chute-des-mots:complete` et affiche le résultat reçu.
