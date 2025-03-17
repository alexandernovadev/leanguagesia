import { useState } from "react";
import { Pencil, Trash2, Volume2 } from "lucide-react";
import { Word } from "../Lecture/types/Word";
import EditWordModal from "./Form/FormWordModal";

export const WordTable = ({
  words,
  onEdit,
  onRemove,
}: {
  words: Word[];
  onEdit: (updatedWord: Word) => void;
  onRemove: (id: string) => void;
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeWord, setActiveWord] = useState<Word | null>(null);

  // Function to listen to the word pronunciation
  const listenWord = (word: string) => {
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };

  // Function to handle opening the modal and setting the active word
  const handleEditClick = (word: Word) => {
    setActiveWord(word);
    setIsModalOpen(true);
  };

  // Function to handle the submission from the modal
  const handleEditSubmit = (updatedWord: Word) => {
    onEdit(updatedWord); // Pass the updated word to the parent component
    setIsModalOpen(false);
    setActiveWord(null);
  };

  // Function to handle closing the modal
  const handleModalClose = () => {
    setIsModalOpen(false);
    setActiveWord(null);
  };

  return (
    <div className="overflow-y-auto w-full h-[70vh] customHeightApp">
      <table className="min-w-full text-gray-100 table-auto">
        <tbody>
          {words.map((word) => (
            <tr key={word._id} className="border-t border-gray-600 text-sm">
              {/* Palabra e icono de reproducción */}
              <td className="px-1">
                <div className="flex items-center justify-start gap-2">
                  <div>
                    <p className="text-base font-bold text-green-700">
                      {word.word}
                    </p>
                    <span className="text-green-900">{word.IPA}</span>
                  </div>

                  <button
                    className="flex justify-center items-center"
                    onClick={() => listenWord(word.word)}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              </td>

              {/* Traducción y detalles */}
              <td className="px-1 text-center">
                <p className="capitalize">{word?.spanish.word}</p>
                <p className="text-xs text-gray-400">Seen: {word.seen}</p>
              </td>

              {/* Nivel de dificultad */}
              <td className="px-1 py-1 text-center">{word.level}</td>

              {/* Íconos de acción */}
              <td className="px-1 py-1">
                <div className="flex justify-center items-center gap-2">
                  <button onClick={() => handleEditClick(word)}>
                    <Pencil className="w-4 h-4 text-yellow-400" />
                  </button>
                  <button onClick={() => onRemove(word._id)}>
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal para editar */}
      {isModalOpen && activeWord && (
        <EditWordModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleEditSubmit}
          wordData={activeWord}
        />
      )}
    </div>
  );
};
