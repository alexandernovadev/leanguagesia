// store/useVoiceStore.ts
import { create } from "zustand";

// Define los tipos para las voces y el estado
interface VoiceStore {
  voices: SpeechSynthesisVoice[];
  selectedVoice: SpeechSynthesisVoice | null;
  setVoices: (voices: SpeechSynthesisVoice[]) => void;
  setSelectedVoice: (voice: SpeechSynthesisVoice) => void;
  selectDefaultVoice: () => void;
  speak: (text: string) => void;
}

const useVoiceStore = create<VoiceStore>((set) => ({
  voices: [],
  selectedVoice: null,

  // Acción para cargar las voces disponibles
  setVoices: (voices) => {
    // Verificar si hay una voz seleccionada previamente en localStorage
    const savedVoiceName = localStorage.getItem("selectedVoiceName");
    const selectedVoice = voices.find((voice) => voice.name === savedVoiceName);
    set({ voices, selectedVoice: selectedVoice || null });
  },

  // Acción para establecer la voz seleccionada
  setSelectedVoice: (voice) => {
    // Guardar la voz seleccionada en localStorage
    localStorage.setItem("selectedVoiceName", voice.name);
    set({ selectedVoice: voice });
  },

  // Función que selecciona una voz por defecto
  selectDefaultVoice: () =>
    set((state) => {
      const defaultVoice =
        state.voices.find((voice) => voice.default) || state.voices[0];
      return { selectedVoice: defaultVoice };
    }),

  // Función para hacer hablar un texto con la voz seleccionada
  speak: (text) =>
    set((state) => {
      if (state.selectedVoice) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = state.selectedVoice;
        window.speechSynthesis.speak(utterance);
      }
      return {}; // Return an empty object to satisfy the type requirement
    }),
}));

export default useVoiceStore;
