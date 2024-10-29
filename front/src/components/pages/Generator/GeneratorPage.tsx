import { MainLayout } from "../../shared/Layouts/MainLayout";
import "../../../styles/buttonanimatiocss.css";
import { SendHorizontal, Brain } from "lucide-react";
import { useState } from "react";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Select from "../../ui/Select";
import { writeStyle } from "./data/writesStyles";
import { levels } from "./data/levels";
import { TextGenerator } from "./textGenerator";

export const GeneratorPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const { handleSubmit, control } = useForm<FormData>();

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <section className="flex flex-col h-[93%]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-5 pt-4">
          <div>
            <Input
              name={"Search"}
              icon={<Brain />}
              disabled={isLoaded}
              placeholder="Write an article about..."
              control={control}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <Select
              label="Style"
              name="selectOption"
              control={control}
              disabled={isLoaded}
              options={writeStyle}
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
              <span className="relative">
                <SendHorizontal />
              </span>
            </button>
          </div>
        </form>

        {/* Content section that will take the remaining height */}
        <TextGenerator />
      </section>
    </MainLayout>
  );
};
