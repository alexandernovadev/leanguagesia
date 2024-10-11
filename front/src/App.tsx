import React, { useEffect, useState, useRef } from "react";
import subtitle from "./data/ejaudio.json";
import AudioFile from "./assets/audio/1728618786940.wav";
import { processSubtitles, WordTiming } from "./components/processSub";

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const words: WordTiming[] = processSubtitles(subtitle.subtitles.segments);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      const playbackRate = audio.playbackRate || 1;
      // Ajuste del tiempo actual en función de la tasa de reproducción
      setCurrentTime(audio.currentTime / playbackRate);
    };

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
            const isActive = currentTime >= w.start && currentTime < w.end;
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
