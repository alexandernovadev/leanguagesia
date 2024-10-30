import { CircleX } from "lucide-react";
import React from "react";
import { TextLorem } from "../../shared/TextLorem";

interface SidePanelProps {
  isVisible: boolean;
  wordSelected: string | null;
  onClose: () => void;
}

export const SidePanelModalWord: React.FC<SidePanelProps> = ({
  isVisible,
  wordSelected,
  onClose,
}) => {
  return (
    <div
      className={`fixed top-0 right-0 h-full w-[35%] bg-black-800
        border border-green-500 rounded-xl
        text-white shadow-lg transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
    >
      <button
        className="absolute top-2 left-2 text-white text-2xl w-full flex justify-end outline-none border-none"
        onClick={onClose}
      >
        <CircleX className="relative right-2 mt-2 mx-2"/>
      </button>
      <div className="p-4 mt-4 overflow-auto h-[100%]">
        <h1 className="text-2xl font-semibold capitalize">{wordSelected}</h1>
        <TextLorem length={20} />
      </div>
    </div>
  );
};
