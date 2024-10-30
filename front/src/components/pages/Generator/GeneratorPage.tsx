import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useForm } from "react-hook-form";
import { SendHorizontal, Brain } from "lucide-react";

import { BACKURL } from "../../../api/backConf";

import { MainLayout } from "../../shared/Layouts/MainLayout";
import Input from "../../ui/Input";
import Select from "../../ui/Select";

import { writeStyle } from "./data/writesStyles";
import { levels } from "./data/levels";
import "../../../styles/buttonanimatiocss.css";

export const GeneratorPage = () => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [text, setText] = useState("");

  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      prompt: "Write an article about why the english language is important.",
      typeWrite: "narration",
      level: "C1",
    },
  });

  const escapeMarkdown = (text: string) => {
    return text.replace(/```/g, "\\`\\`\\`").replace(/`/g, "\\`");
  };

  const saveLecture = async () => {
    const lecture = {
      time: 2,
      level: "B1",
      typeWrite: "Engaging Article",
      language: "en",
      img: "",
      content: text,
    };

    try {
      const response = await fetch(`${BACKURL}/api/lecture`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(lecture),
      });

      if (response.ok) {
        console.log("Lecture saved successfully.");
      } else {
        console.error("Failed to save the lecture.");
      }
    } catch (err) {
      console.error("Failed to save the lecture.");
    }
  };

  const handleGenerateText = async () => {
    setIsLoaded(true);
    setText("");
    setError("");

    const { prompt, typeWrite, level } = getValues();

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

  const onSubmit = (data: {
    typeWrite: string;
    level: string;
    prompt: string;
  }) => {
    handleGenerateText();
    console.log(data);
  };

  return (
    <MainLayout>
      <section className="flex flex-col h-[93%]">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 px-5 pt-4">
          <div>
            <Input
              name={"prompt"}
              icon={<Brain />}
              disabled={isLoaded}
              placeholder="Write an article about..."
              control={control}
            />
          </div>

          <div className="flex justify-center items-center gap-2">
            <Select
              label="Style"
              name="typeWrite"
              control={control}
              disabled={isLoaded}
              options={writeStyle}
            />
            <Select
              label="Level"
              name="level"
              disabled={isLoaded}
              control={control}
              options={levels}
            />

            <button
              type="submit"
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
