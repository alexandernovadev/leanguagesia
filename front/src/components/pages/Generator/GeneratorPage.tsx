import { MainLayout } from "../../shared/Layouts/MainLayout";
import "../../../styles/buttonanimatiocss.css";
import { SendHorizontal, Brain } from "lucide-react";
import { useRef, useState } from "react";
import Input from "../../ui/Input";
import { useForm } from "react-hook-form";
import Select from "../../ui/Select";
import { writeStyle } from "./data/writesStyles";
import { levels } from "./data/levels";
import { BACKURL } from "../../../api/backConf";
import ReactMarkdown from "react-markdown";

export const GeneratorPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [text, setText] = useState("");

  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);
  const { handleSubmit, control } = useForm<FormData>();


  const escapeMarkdown = (text:string) => {
    return text.replace(/```/g, "\\`\\`\\`").replace(/`/g, "\\`");
  };

  const handleGenerateText = async () => {
    setIsLoaded(true);
    setText("");
    setError("");

    try {
      const response = await fetch(`${BACKURL}/api/ai/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "MAXIMO 600 characters",
          // level,
          // ammountQuestions,
        }),
      });

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader!.read();
        done = streamDone;
        const chunk = decoder.decode(value, { stream: true });
        setText((prevText) => {
          const newText = prevText + chunk;
          return escapeMarkdown(newText);
        });
        if (textRef.current) {
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
      }
    } catch (err) {
      setError("Failed to fetch the generated text.");
    } finally {
      setIsLoaded(false);
    }
  };

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
              onClick={() => {
                setIsLoaded(!isLoaded);
                handleGenerateText();
              }}
              className={`${isLoaded ? "box" : "boxEmp"} m-4`}
            >
              <span className="relative">
                <SendHorizontal />
              </span>
            </button>
          </div>
        </form>

        <section
          ref={textRef}
          className="flex-1 border border-white m-5 overflow-auto rounded-lg px-4"
        >
          {text.length === 0 && (
            <div className="text-center text-zinc-400">
              No text generated yet.
            </div>
          )}
          <ReactMarkdown>{text}</ReactMarkdown>
        </section>
      </section>
    </MainLayout>
  );
};
