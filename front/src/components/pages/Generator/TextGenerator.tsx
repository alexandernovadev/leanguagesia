import { useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

export const TextGenerator = () => {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");

  const [error, setError] = useState("");
  const textRef = useRef<HTMLDivElement>(null);

  const handleGenerateText = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    // setText("");
    // setError("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/ai/generate-text",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            prompt: "MAXIMO 300 characters",
            // level,
            // ammountQuestions,
          }),
        }
      );

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: streamDone } = await reader!.read();
        done = streamDone;
        const chunk = decoder.decode(value, { stream: true });
        setText((prevText) => {
          const newText = prevText + chunk;
          return newText;
        });
        if (textRef.current) {
          textRef.current.scrollTop = textRef.current.scrollHeight;
        }
      }
    } catch (err) {
      setError("Failed to fetch the generated text.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className="bg-black-200 text-black-800"
        onClick={handleGenerateText}
      >
        Generate Text
      </button>
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
    </>
  );
};
