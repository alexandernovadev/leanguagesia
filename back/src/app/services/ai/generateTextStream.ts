import OpenAI from "openai";

interface Options {
  prompt: string;
  level: string;
  typeWrite: string;
  language?: "es" | "en" | "pt"; // ISO 639-1
}

export const generateTextStreamService = async ({
  prompt,
  level = "A1",
  typeWrite = "Engaging Article",
  language = "en",
}: Options) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  return await openai.chat.completions.create({
    stream: true,
    model: "gpt-4o-2024-08-06",
    messages: [
      {
        role: "system",
        content: `
          Generate a Markdown text in laguage "${language}" according with ( ISO 639-1 para los idiomas ) , 
          this text is for an educational purpose with a "${typeWrite}" style, using vocabulary and 
          complexity appropriate for a ${level} level. 

          Formatting guidelines:
          - Title should be "# Title".
          - Use one main subtitle as "## Subtitle".
          - Use additional subtitles as "### Subtitle" if needed.
          - Avoid using additional H1 or H2 headers after the initial title and subtitle.

          Content guidelines:
          - Avoid using rare, uncommon words or special symbols, as each word should be clickable and easily searchable in a dictionary.
          - Length should be between 2000 and 3000 characters.
          - For ${level} level:
            - **A1-A2:** Use simple words, basic sentences, and give short, clear examples. Define complex words as needed.
            - **B1-B2:** Use intermediate vocabulary, compound sentences, and provide real-world examples.
            - **C1-C2:** Use advanced vocabulary, complex sentence structures, and offer deeper analysis or insights.
          - Include quotes or examples to enrich the content where relevant.
          - Organize content in sections with brief introductions and conclusions.

          Learning aids:
          - At the end, add 2-3 reflection questions or a short exercise.
          - For A1-B1 levels, add a glossary of key terms at the end.
          - For C1-C2 levels, include a brief summary of the main points.

          The markdown should be engaging, informative, and structured to enhance comprehension for readers.
             `,
      },
      {
        role: "user",
        content: "The topic would be " + prompt,
      },
    ],
    temperature: 0.8,
    // max_tokens: 500,
  });
};
