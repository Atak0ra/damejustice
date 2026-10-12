// Chronologie de la démo du héro. Tout est dérivé d'un temps t (ms) :
// le lecteur n'a qu'une horloge à gérer (lecture, pause, boucle).

export const TICK_MS = 50;

export const T = {
  filesStart: 400,
  filesStep: 650,
  loadStart: 300,
  loadEnd: 3600,
  typeStart: 4400,
  typeEnd: 7600,
  sendAt: 7900,
  resultsAt: 8250,
  answerStart: 9900,
  answerEnd: 14400,
  sourceStep: 450,
  fadeOut: 18400,
  end: 19000,
} as const;

// Image fixe affichée en mode « mouvement réduit » : tout est visible.
export const FINAL_T = 16525;

export const LIBRARY_DOCS = 693;
const LIBRARY_MB = 246.6;
const SOURCE_COUNT = 3;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const easeOut = (x: number) => 1 - (1 - x) ** 3;

export type DemoFrame = {
  libraryDocs: number;
  libraryMb: string;
  processing: boolean;
  chipsVisible: number;
  chipsOut: boolean;
  typedChars: number;
  caret: boolean;
  sending: boolean;
  sent: boolean;
  showResults: boolean;
  searching: boolean;
  answerChars: number;
  sourcesVisible: number;
  fading: boolean;
};

export function frameAt(t: number, questionLength: number, answerLength: number): DemoFrame {
  const libraryDocs = Math.round(
    LIBRARY_DOCS * easeOut(clamp01((t - T.loadStart) / (T.loadEnd - T.loadStart))),
  );

  let chipsVisible = 0;
  for (let i = 0; i < SOURCE_COUNT; i++) {
    if (t >= T.filesStart + i * T.filesStep) chipsVisible = i + 1;
  }

  let sourcesVisible = 0;
  for (let i = 0; i < SOURCE_COUNT; i++) {
    if (t >= T.answerEnd + i * T.sourceStep) sourcesVisible = i + 1;
  }

  return {
    libraryDocs,
    libraryMb: ((libraryDocs / LIBRARY_DOCS) * LIBRARY_MB).toFixed(1),
    processing: t >= T.loadStart && t < T.loadEnd + 100,
    chipsVisible,
    chipsOut: t >= T.loadEnd,
    typedChars: Math.floor(questionLength * clamp01((t - T.typeStart) / (T.typeEnd - T.typeStart))),
    caret: t >= T.typeStart - 300 && t < T.sendAt,
    sending: t >= T.sendAt && t < T.sendAt + 200,
    sent: t >= T.sendAt,
    showResults: t >= T.resultsAt,
    searching: t >= T.resultsAt && t < T.answerStart,
    answerChars: Math.floor(answerLength * clamp01((t - T.answerStart) / (T.answerEnd - T.answerStart))),
    sourcesVisible,
    fading: t >= T.fadeOut,
  };
}
