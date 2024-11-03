import { Control, useController } from "react-hook-form";

interface TextAreaCustomProps {
  control: Control<any>;
  name: string;
  placeholder?: string;
  className?: string;
}

export const TextAreaCustom: React.FC<TextAreaCustomProps> = ({
  control,
  name,
  placeholder,
  className,
}) => {
  const {
    field: { value, onChange, onBlur },
  } = useController({
    name,
    control,
    defaultValue: "",
  });

  return (
    <textarea
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      rows={4}
      className={`w-full p-2 border border-gray-700 rounded-md bg-gray-800 text-white resize-none ${className}`}
    />
  );
};
