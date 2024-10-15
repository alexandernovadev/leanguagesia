import { MainLayout } from "../../shared/Layouts/MainLayout";
import "../../../styles/buttonanimatiocss.css";
import { SendHorizontal, Brain } from "lucide-react";
import { useState } from "react";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Select from "../../ui/Select";

// Opciones para los Select
const selectOptions = [
  { label: "Narracion", value: "option1" },
  { label: "Cuento", value: "option2" },
  { label: "Ariticle", value: "option3" },
];

// Opciones para los Select
const levels = [
  { label: "A1", value: "A1" },
  { label: "A2", value: "A2" },
  { label: "B1", value: "B1" },
  { label: "B2", value: "B2" },
  { label: "C1", value: "C1" },
  { label: "C2", value: "C2" },
];

export const GeneratorPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  }

  return (
    <MainLayout>
      <section>
        <form  onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            name={"Search"}
            icon={<Brain />}
            disabled={isLoaded}
            placeholder="Write an article about..."
            control={control}
          />

          {/* Single Select */}
          <Select
            label="Style"
            name="selectOption"
            control={control}
            disabled={isLoaded}
            options={selectOptions}
          />

          <Select
            label="Levels"
            name="levels"
            disabled={isLoaded}
            control={control}
            options={levels}
          />

          <button
            onClick={() => setIsLoaded(!isLoaded)}
            className={`${isLoaded ? "box" : "boxEmp"} m-4`}
          >
            <span>
              <SendHorizontal />
            </span>
          </button>
        </form>
      </section>
    </MainLayout>
  );
};
