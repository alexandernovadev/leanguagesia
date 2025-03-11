import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { SendHorizontal, Brain, Save } from "lucide-react";

import { BACKURL } from "../../../api/backConf";

import { MainLayout } from "../../shared/Layouts/MainLayout";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

import { writeStyle } from "./data/writesStyles";
import { levels } from "./data/levels";
import "../../../styles/buttonanimatiocss.css";
import { useNavigate } from "react-router-dom";
import Checkbox from "../../ui/Checkbox";

export const GeneratorPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isLoadedSaveWord, setIsLoadedSaveWord] = useState<boolean>(false);

  const [text, setText] = useState("");

  const navigate = useNavigate();
  const textRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      prompt: " ",
      typeWrite: "blog",
      level: "B2",
      addEasyWords: false,
    },
  });
  const escapeMarkdown = (text: string) => {
    return text.replace(/```/g, "\\`\\`\\`").replace(/`/g, "\\`");
  };

  // TODO Improve the calculation of the reading time
  const calculateReadingTime = (text: string) => {
    const wordsPerMinute = 225; // Puedes ajustar este valor según el nivel de los estudiantes
    const words = text.split(/\s+/).length; // Contar el número de palabras
    const minutes = Math.ceil(words / wordsPerMinute); // Calcular el tiempo y redondear al entero más cercano
    return minutes;
  };
  const saveLecture = async () => {
    setIsLoadedSaveWord(true);
    const { typeWrite, level } = getValues();

    const lecture = {
      time: calculateReadingTime(text),
      level,
      typeWrite,
      language: "en",
      img: "",
      content: text,
    };

    try {
      const response = await fetch(`${BACKURL}/api/lectures`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lecture),
      });

      if (response.ok) {
        toast.success("Lecture saved successfully!");
        navigate(`/`);
      } else {
        console.error("Failed to save the lecture.");
      }
    } catch (err) {
      console.error("Failed to save the lecture.");
    } finally {
      setIsLoadedSaveWord(true);
    }
  };

  const handleGenerateText = async () => {
    setIsLoaded(true);
    setText("");

    const { prompt, typeWrite, level, addEasyWords } = getValues();

    try {
      const response = await fetch(`${BACKURL}/api/ai/generate-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          level,
          typeWrite,
          addEasyWords,
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
      console.error("Failed to fetch the generated text.");
    } finally {
      setIsLoaded(false);
    }
  };
  const onSubmit = () => {
    handleGenerateText();
  };
  return (
    <MainLayout>
      <section className="flex flex-col h-[93%]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-5 pt-4">
          <div>
            <Input
              name="prompt"
              icon={<Brain />}
              disabled={isLoaded}
              placeholder="Write an article about..."
              control={control}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <div className="max-w-[420px] w-full">
              <Select
                label="Style"
                name="typeWrite"
                control={control}
                disabled={isLoaded}
                options={writeStyle}
              />
            </div>
            <div className="max-w-[360px] w-full">
              <Select
                label="Level"
                name="level"
                disabled={isLoaded}
                control={control}
                options={levels}
              />
            </div>
            <div className="w-full">
              <label htmlFor="">Easy Words</label>
              <Checkbox label="30" name="addEasyWords" control={control} />
            </div>
            <button
              type="submit"
              disabled={isLoaded}
              className={`w-[360px] ${
                isLoaded ? " box cursor-not-allowed" : "boxEmp"
              } m-4`}
            >
              <span className="relative">
                <SendHorizontal />
              </span>
            </button>
            {/* Conditionally render the SAVE button only if there's generated text */}
            {!isLoaded && text.length > 0 && (
              <button
                type="button"
                disabled={isLoadedSaveWord}
                onClick={saveLecture}
                className={`border  text-white 
              rounded-lg px-3 py-2 mt-4 sticky top-4 right-0
              ${
                isLoadedSaveWord
                  ? "cursor-not-allowed border-green-900 bg-black-800 text-gray-500"
                  : "border-green-700 text-white "
              }
              `}
              >
                <Save />
              </button>
            )}{" "}
          </div>
        </form>

        <section
          ref={textRef}
          className="flex-1 border border-white m-5 overflow-auto rounded-lg px-4 relative"
        >
          {text.length === 0 && (
            <div className="flex-1 h-[100%] text-zinc-400 flex justify-center items-center">
              No text generated yet.
            </div>
          )}
          <ReactMarkdown>{text}</ReactMarkdown>
        </section>
      </section>
    </MainLayout>
  );
};
