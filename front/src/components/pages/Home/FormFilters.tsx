import { useState } from "react";
import { Filters, Language, Level } from "./types/types";

export const FormFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    languages: [],
    levels: [],
  });

  const handleFilterChange = (
    type: "languages" | "levels",
    value: Language | Level
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type]: (prev[type] as (Language | Level)[]).includes(value)
        ? (prev[type] as (Language | Level)[]).filter((item) => item !== value)
        : [...(prev[type] as (Language | Level)[]), value],
    }));
  };

  return (
    <div className="bg-customBlack-200 rounded-lg p-6 w-5/6 max-w-md border border-gray-600">
      <h2 className="text-xl font-bold mb-4">Filters</h2>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Languages</h3>
        {["English", "Portugues"].map((lang) => (
          <label key={lang} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={filters.languages.includes(lang as Language)}
              onChange={() => handleFilterChange("languages", lang as Language)}
              className="mr-2"
            />
            {lang}
          </label>
        ))}
      </div>
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Levels</h3>
        <div className="grid grid-cols-3 gap-2">
          {["A1", "A2", "B1", "B2", "C1", "C2"].map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={filters.levels.includes(level as Level)}
                onChange={() => handleFilterChange("levels", level as Level)}
                className="mr-1"
              />
              {level}
            </label>
          ))}
        </div>
      </div>
      <button
        onClick={() => {}}
        className="w-full bg-green-900 text-white py-2 rounded-lg hover:bg-green-800 transition-colors"
      >
        Apply
      </button>
    </div>
  );
};
