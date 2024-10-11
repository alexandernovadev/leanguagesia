export interface WordTiming {
  word: string;
  start: number;
  end: number;
}

export interface Segment {
  start: number;
  end: number;
  text: string;
}

export const processSubtitles = (segments: Segment[]): WordTiming[] => {
  const wordsWithTimings: WordTiming[] = [];

  segments.forEach((segment: Segment) => {
    const { start, end, text } = segment;
    const words: string[] = text.match(/[\w'-]+|[.,!?;"]/g) || [];

    // Si no hay palabras en el segmento, lo saltamos
    if (words.length === 0) return;

    const totalChars: number = words.reduce((sum: number, word: string) => sum + word.length, 0);
    const duration: number = end - start;

    // Solo procesamos si hay duración positiva y texto
    if (duration > 0 && totalChars > 0) {
      let accumulatedTime: number = start;

      words.forEach((word: string, index: number) => {
        // Ajustar la duración para puntuaciones cortas como comas o puntos
        const isPunctuation = /^[.,!?;"]$/.test(word);
        const wordDuration = isPunctuation
          ? Math.min(0.05, duration * 0.1) // Duración mínima para puntuación
          : (word.length / totalChars) * duration;

        const wordStart: number = accumulatedTime;
        const wordEnd: number = wordStart + wordDuration;

        // Asegurarnos de que no se solapen las palabras
        wordsWithTimings.push({
          word,
          start: wordStart,
          end: wordEnd,
        });

        // Actualizar el tiempo acumulado
        accumulatedTime += wordDuration;
      });

      // Asegurar que el último tiempo no supere el tiempo final del segmento
      if (accumulatedTime > end) {
        wordsWithTimings[wordsWithTimings.length - 1].end = end;
      }
    }
  });

  return wordsWithTimings;
};
