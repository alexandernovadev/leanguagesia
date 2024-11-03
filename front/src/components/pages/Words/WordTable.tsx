import { Pencil, Trash2, Volume2 } from "lucide-react";
import { Word } from "../Lecture/types/Word";

export const WordTable = ({
  words,
  onEdit,
  onRemove,
}: {
  words: Word[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}) => {
  // Function to listen to the word pronunciation
  const listenWord = (word: string) => {
    if (word) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = "en-US";
      speechSynthesis.speak(utterance);
    }
  };
  return (
    <table className="min-w-full text-black-100">
      <tbody>
        {words.map((word) => (
          <tr key={word._id} className="border-t border-gray-700">
            <td className="">
              <div className="flex items-center ">
                <p className="p-0 m-1 text-2xl capitalize font-bold text-green-700">{word.word}</p>
                <span className="cursor-pointer" onClick={() => listenWord(word.word)}>
                  <Volume2 className="w-6 h-6" />
                </span>
              </div>
              <p className="p-0 m-1 font-semibold">{word.IPA}</p>
            </td>
            <td className="">
              <p className="p-0 m-1 font-semibold capitalize">
                {word?.spanish.word}
              </p>
              <p className="p-0 m-1  capitalize">seen: {word.seen}</p>
            </td>
            <td className="p-2">{word.level}</td>
            <td className="p-2 flex gap-2">
              <button onClick={() => onEdit(word._id)} className="px-4 py-1">
                <Pencil className="text-yellow-400" />
              </button>
              <button onClick={() => onRemove(word._id)} className="px-4 py-1">
                <Trash2 className="text-red-600" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
