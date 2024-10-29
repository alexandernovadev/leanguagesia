import OpenAI from "openai";

interface Options {
  prompt: string;
  level: string;
  typeWrite: string;
}

export const generateTextStreamService = async ({
  prompt,
  level = "A1",
  typeWrite = "Engaging Article",
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
            Genera un Markdown en INGLES con un estilo de "${typeWrite}"
            con vocabulario ${level}, el texto tendra
            # Title
            ## Subtitle

            Contentent, and if un need to add more subititles it would be use ### Subtitles

            MINIMO 800 characters
            MAXIMO 2000 characters
          `,
      },
      {
        role: "user",
        content: "The topic would be "+ prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
};
