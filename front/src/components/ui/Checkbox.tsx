import React from "react";
import { useController, Control } from "react-hook-form";

interface CheckboxProps {
  label: string;
  name: string;
  control: Control<any>; // Este es el objeto 'control' que react-hook-form maneja
  rules?: any; // Reglas de validación opcionales
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  control,
  rules,
}) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    rules,
    defaultValue: false,
  });

  return (
    <label className="flex items-center space-x-3 cursor-pointer">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        onBlur={onBlur}
        className="hidden peer"
      />
      <span
        className={`w-6 h-6 rounded-md bg-gray-700 border border-gray-700 flex items-center justify-center transition-all duration-200 
        text-transparent peer-checked:bg-green-500 peer-checked:text-white`} // Controla el color del texto
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 stroke-current" // Usa stroke-current
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7" // El "chulito"
          />
        </svg>
      </span>
      <span className="text-white">{label}</span>
    </label>
  );
};

export default Checkbox;
