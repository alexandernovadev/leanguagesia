import OpenAI from "openai";

interface Options {
  prompt: string;
}

export const generateTextStreamService= async ({ prompt }: Options) => {
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
            Genera un Markdown en ingles sobre un ARTICULO que contenga 
            una descripcion about tecnología blockchain y sus aplicaciones.
            debera tner un title un subtitle y una descripcion larga.
          `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.8,
    max_tokens: 500,
  });
};
