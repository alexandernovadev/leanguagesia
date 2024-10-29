import { MainLayout } from "../../shared/Layouts/MainLayout";
import "../../../styles/buttonanimatiocss.css";
import { SendHorizontal, Brain } from "lucide-react";
import { useState } from "react";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Select from "../../ui/Select";
import { writeStyle } from "./data/writesStyles";
import { levels } from "./data/levels";

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
        <section className="flex-1 border border-white m-5 overflow-auto rounded-lg">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="p-4 border-b border-white">
              <h1 className="text-2xl">Title</h1>
              <p className="text-lg">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
                quae, tempore, voluptas, quod quibusdam quia doloremque
                repudiandae voluptates quidem doloribus quos. Quisquam, quas
                doloremque. Quisquam, quas doloremque.
              </p>
            </div>
          ))}
        </section>
      </section>
    </MainLayout>
  );
};
