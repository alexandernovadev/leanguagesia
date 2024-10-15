import { useEffect, useState } from "react";
import { MainLayout } from "../../shared/Layouts/MainLayout";
import useVoiceStore from "../../../store/useVoiceStore";

export const SettingsPage: React.FC = () => {
  const voices = useVoiceStore((state) => state.voices);
  const setVoices = useVoiceStore((state) => state.setVoices);
  const setSelectedVoice = useVoiceStore((state) => state.setSelectedVoice);
  const selectedVoice = useVoiceStore((state) => state.selectedVoice);

  const [languageFilter, setLanguageFilter] = useState<string>("");
  const [regionFilter, setRegionFilter] = useState<string>("");
  const [defaultOnly, setDefaultOnly] = useState<boolean>(false);

  // Cargar las voces de Speech Synthesis
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setVoices(voices);
    };

    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      loadVoices();
    }
  }, [setVoices]);

  // Función para seleccionar una voz
  const handleSelectVoice = (voice: SpeechSynthesisVoice) => {
    setSelectedVoice(voice);
  };

  // Función para probar la voz de cada tarjeta
  const handleTestVoice = (voice: SpeechSynthesisVoice) => {
    const utterance = new SpeechSynthesisUtterance(
      `This is a test of the voice: ${voice.name}`
    );
    utterance.voice = voice; // Usamos la voz específica de la tarjeta
    window.speechSynthesis.speak(utterance);
  };

  // Filtrar por idioma, región, y si es default
  const filteredVoices = voices.filter((voice) => {
    const matchesLanguage = languageFilter
      ? voice.lang.startsWith(languageFilter)
      : true;
    const matchesRegion = regionFilter
      ? voice.lang.split("-")[0] === regionFilter
      : true;
    const matchesDefault = defaultOnly ? voice.default : true;

    return matchesLanguage && matchesRegion && matchesDefault;
  });

  // Idiomas disponibles para el filtro
  const availableLanguages = Array.from(
    new Set(voices.map((voice) => voice.lang))
  );

  // Regiones disponibles para el filtro
  const availableRegions = Array.from(
    new Set(voices.map((voice) => voice.lang.split("-")[0]))
  );

  return (
    <MainLayout>
      <div className="px-12 pt-8 pb-24">
        <h1 className="text-2xl font-bold mb-4 text-white">Available Voices</h1>

        {/* Filtros */}
        <div className="mb-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro por idioma */}
          <div>
            <label
              htmlFor="languageFilter"
              className="block text-sm font-medium text-gray-200"
            >
              Filter by Language:
            </label>
            <select
              id="languageFilter"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-md"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="">All Languages</option>
              {availableLanguages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por región */}
          <div>
            <label
              htmlFor="regionFilter"
              className="block text-sm font-medium text-gray-200"
            >
              Filter by Region:
            </label>
            <select
              id="regionFilter"
              className="mt-1 block w-full p-2 bg-gray-700 border border-gray-600 text-white rounded-md"
              value={regionFilter}
              onChange={(e) => setRegionFilter(e.target.value)}
            >
              <option value="">All Regions</option>
              {availableRegions.map((region) => (
                <option key={region} value={region}>
                  {region.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          {/* Filtro por voces predeterminadas */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="defaultOnly"
              checked={defaultOnly}
              onChange={() => setDefaultOnly(!defaultOnly)}
              className="h-4 w-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500"
            />
            <label
              htmlFor="defaultOnly"
              className="ml-2 block text-sm font-medium text-gray-200"
            >
              Show Default Voices Only
            </label>
          </div>
        </div>

        {/* Grid para las voces */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredVoices.map((voice) => (
            <div
              key={voice.name}
              className="p-2 border border-gray-700 rounded-lg shadow-md flex flex-col justify-between items-start text-sm bg-gray-800 max-w-xs"
            >
              <div className="flex flex-col items-start">
                <h2 className="font-semibold text-sm text-gray-300">
                  {voice.name}
                </h2>
                <p className="text-xs text-gray-400">{voice.lang}</p>
              </div>

              {/* Botones de acción */}
              <div className="mt-1 flex space-x-2">
                {/* Botón para probar la voz */}
                <button
                  className="px-2 py-1 bg-green-700 text-white rounded hover:bg-green-600 text-xs"
                  onClick={() => handleTestVoice(voice)}
                >
                  Test
                </button>

                {/* Botón para seleccionar la voz */}
                <button
                  className={`px-2 py-1 rounded text-white text-xs ${
                    selectedVoice?.name === voice.name
                      ? "bg-blue-500"
                      : "bg-gray-500"
                  } hover:bg-blue-600`}
                  onClick={() => handleSelectVoice(voice)}
                >
                  {selectedVoice?.name === voice.name ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};
