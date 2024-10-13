import React, { useEffect, useState, useRef } from "react";
import subtitle from "./data/ejaudio.json";
import AudioFile from "./assets/audio/1728618786940.wav";
import { debounce } from "lodash"; // Asegúrate de tener lodash instalado

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const words: WordTiming[] = processSubtitles(subtitle.subtitles.segments);

  // Usamos debounce para reducir la cantidad de renders en las actualizaciones de tiempo
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Usamos debounce para manejar la actualización del tiempo
    const handleTimeUpdate = debounce(() => {
      setCurrentTime(audio.currentTime);
    }, 100); // Actualiza cada 100 ms para evitar demasiados renders

    audio.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
    };
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <audio
          ref={audioRef}
          src={AudioFile}
          controls
          className="w-full mb-6"
        />
        <div className="text-lg leading-relaxed">
          {words.map((w, idx) => {
            const offset = 0.1; // Ajuste fino manual de 100ms para sincronización
            const isActive =
              currentTime >= w.start + offset && currentTime < w.end + offset;
            return (
              <span
                key={idx}
                className={`transition-all ${
                  isActive ? "bg-blue-600 rounded-xl px-1" : ""
                }`}
              >
                {w.word}{" "}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;

// Interfaces para manejo de tiempos de palabras
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

// Función para procesar los subtítulos y dividir palabras con tiempos
export const processSubtitles = (segments: Segment[]): WordTiming[] => {
  const wordsWithTimings: WordTiming[] = [];

  segments.forEach((segment: Segment) => {
    const { start, end, text } = segment;
    const words: string[] = text.match(/[\w'-]+|[.,!?;"]/g) || [];

    if (words.length === 0) return;

    const totalChars: number = words.reduce(
      (sum: number, word: string) => sum + word.length,
      0
    );
    const duration: number = end - start;

    if (duration > 0 && totalChars > 0) {
      let accumulatedTime: number = start;

      words.forEach((word: string, index: number) => {
        const isPunctuation = /^[.,!?;"]$/.test(word);
        const wordDuration = isPunctuation
          ? 0.01 // Duración mínima para puntuaciones
          : (word.length / totalChars) * duration;

        const wordStart: number = accumulatedTime;
        const wordEnd: number = Math.min(wordStart + wordDuration, end);

        wordsWithTimings.push({
          word,
          start: wordStart,
          end: wordEnd,
        });

        accumulatedTime = wordEnd; // Actualizar el tiempo acumulado
      });
    }
  });

  return wordsWithTimings;
};
