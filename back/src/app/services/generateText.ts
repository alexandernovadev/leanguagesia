import OpenAI from "openai";

export const generateText = async (prompt: string) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        Genera un texto en markdown que contenga una lista con los nombres de los 
        5 primeros países de la lista de países por población de la Wikipedia.
        La rta should be JSON.
        `,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    model: "gpt-4o",
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: "json_object",
    },
  });

  // console.log(completion);
  const content = completion.choices[0].message.content;
  if (content === null) {
    throw new Error("Completion content is null");
  }
  const jsonResp = JSON.parse(content);

  return jsonResp;
};
