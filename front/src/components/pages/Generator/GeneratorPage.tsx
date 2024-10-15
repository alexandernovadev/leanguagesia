import { useForm, SubmitHandler } from "react-hook-form";
import { MainLayout } from "../../shared/Layouts/MainLayout";
import Select from "../../ui/Select";
import Checkbox from "../../ui/Checkbox";
// Asegúrate de importar tu Select

interface FormData {
  textInput: string;
  selectOption: string;
  multipleSelectOption: string[];
  acceptTerms: boolean;
}

export const GeneratorPage = () => {
  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  // Opciones para los Select
  const selectOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];

  const multipleSelectOptions = [
    { label: "Multi Option 1", value: "multiOption1" },
    { label: "Multi Option 2", value: "multiOption2" },
    { label: "Multi Option 3", value: "multiOption3" },
  ];

  return (
    <MainLayout>
      <div className="max-w-lg mx-auto mt-10 bg-gray-900 p-8 rounded-lg">
        <h1 className="text-2xl text-white mb-5">Generator Form</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Text Input */}
          <div>
            <label className="text-white">Text Input</label>
            <input
              type="text"
              className="w-full p-2 mt-2 border border-gray-700 rounded-md bg-gray-800 text-white"
              {...control.register("textInput", { required: true })}
            />
          </div>

          {/* Single Select */}
          <Select
            label="Select an option"
            name="selectOption"
            control={control}
            options={selectOptions}
          />

          {/* Multiple Select */}
          <Select
            label="Select multiple options"
            name="multipleSelectOption"
            control={control}
            options={multipleSelectOptions}
            multiple={true}
          />

          {/* Checkbox */}
          <Checkbox
            label="I accept the terms and conditions"
            name="acceptTerms"
            control={control}
            rules={{ required: true }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition-colors"
          >
            Submit
          </button>
        </form>
      </div>
    </MainLayout>
  );
};

export default GeneratorPage;
