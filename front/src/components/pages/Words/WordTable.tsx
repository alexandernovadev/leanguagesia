import { Pencil, Trash2 } from "lucide-react";
import { Word } from "../Lecture/types/Word";

export const WordTable = ({
  words,
  onEdit,
  onRemove,
}: {
  words: Word[];
  onEdit: (id: string) => void;
  onRemove: (id: string) => void;
}) => (
  <table className="min-w-full text-black-100 mt-4">
    <thead>
      <tr>
        <th className="p-2 text-left font-semibold">Word</th>
        <th className="p-2 text-left font-semibold">Seen</th>
        <th className="p-2 text-left font-semibold">Level</th>
        <th className="p-2 text-left font-semibold">Actions</th>
      </tr>
    </thead>
    <tbody>
      {words.map((word) => (
        <tr key={word._id} className="border-t border-gray-700">
          <td className="p-2">{word.word}</td>
          <td className="p-2">{word.seen}</td>
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
