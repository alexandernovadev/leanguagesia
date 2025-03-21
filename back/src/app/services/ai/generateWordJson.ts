import OpenAI from "openai";

export const generateWordJson = async (prompt: string, language = "en") => {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || "",
  });

  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
        You are an expert in the English language with a focus on teaching and lexicography. 
        Please generate a JSON object with the following properties, ensuring each is accurate, 
        error-free, and appropriate for English learners:
        
        {
          "word": "[word]",
          "language": "${language}",
          "definition": "[A clear and concise definition appropriate to B2 English level]",
          "examples": [
              "[5 example sentences in English using the word in realistic contexts that are understandable at B2 level]"
          ],
          "type": [
              "[one or more grammatical types, such as 'noun', 'adjective', or 'verb', selected only from the list below]"
          ],
          "IPA": "[IPA notation in standard format]",
          "codeSwitching": [
              "[5 sentences that use the word in English and rest of the sentence in spanish language]"
          ],
          "spanish": {
              "definition": "[Clear and concise Spanish translation of the definition]",
              "word": "[Spanish equivalent of the word]"
          }
          "sinonyms": [ List of sinonyms in english, minimum 5]
        }

        // SOME EXAMPLES:
        {
          "word": "challenges",
          "language": "en",
          "definition": "Difficult situations or tasks that require effort and determination to overcome.",
          "examples": [
              "Starting a new job comes with its own set of challenges.",
              "The team faced several challenges in completing the project on time.",
              "One of the main challenges in learning a language is mastering pronunciation.",
              "They overcame many challenges to reach their goal.",
              "Climate change presents serious challenges for all nations."
          ],
          "type": [
              "noun","verb","adjective"
          ],
          "IPA": "/ˈtʃæl.ɪn.dʒɪz/",
          "codeSwitching": [
              "Hay muchos challenges en el camino hacia el éxito.",
              "Enfrentamos varios challenges al implementar el proyecto.",
              "La vida está llena de challenges que nos ayudan a crecer.",
              "Superar estos challenges nos hará más fuertes.",
              "El cambio climático trae numerosos challenges para el futuro."
          ],
          "sinonyms": [ "obstacles", "difficulties", "problems", "hurdles", "obstructions" ],
          "spanish": {
              "definition": "Situaciones o tareas difíciles que requieren esfuerzo y determinación para superarse.",
              "word": "desafíos"
          }
        }   
       "spanish": {
                "definition": "Las estructuras físicas y organizativas básicas necesarias para el funcionamiento de una sociedad o empresa.",
                "word": "infraestructura"
            },
            "word": "infrastructure",
            "language": "English",
            "definition": "The basic physical and organizational structures and facilities needed for the operation of a society or enterprise.",
            "examples": [
                "The government invested heavily in the country's infrastructure to support economic growth.",
                "Infrastructure projects like roads and bridges are essential for a growing city.",
                "The company expanded its infrastructure to improve its production capabilities.",
                "Good digital infrastructure is key to the success of online businesses.",
                "After the natural disaster, rebuilding infrastructure became the government's top priority."
            ],
            "type": [
                "noun","adjective"
            ],
            "IPA": "/ˈɪnfrəˌstrʌktʃə/",
            "sinonyms": ["base", "platform", "system", "network", "support"];
            "codeSwitching": [
                "La infrastructure de la ciudad ha mejorado mucho en los últimos años.",
                "La nueva infrastructure ayuda a que el tráfico sea más eficiente.",
                "Estamos trabajando en mejorar la infrastructure de nuestras oficinas.",
                "Es importante invertir en la infrastructure para el futuro del país.",
                "La falta de infrastructure adecuada limita el crecimiento económico."
            ],



        Make sure that Its So IMPORTANT all :
        - "type" can contain one or multiple values, but each must be selected only from the following allowed types:
          ["noun", "verb", "adjective", "adverb", "personal pronoun", "possessive pronoun", "preposition", "conjunction",
           "determiner", "article", "quantifier", "interjection", "auxiliary verb",
            "modal verb", "infinitive", "participle", "gerund", "other","phrasal verb"].

        - "level" remains "B2" unless specified otherwise.
        - Every field contains accurate, B2-appropriate content with correct grammar and relevant contexts.
        - The "IPA" field is in standard format need to be perfect THINK WELL the IPA con ingles de USA.
        - The example and codeSwitching must be different. 
        `.trim(),
      },
      {
        role: "user",
        content: "The word is " + prompt,
      },
    ],
    model: "gpt-4o-2024-08-06",
    temperature: 0.1,
    response_format: {
      type: "json_object",
    },
  });

  // Process the completion response
  const content = completion.choices[0].message.content;
  if (!content) {
    throw new Error("Completion content is null");
  }
  const jsonResp = JSON.parse(content);

  return jsonResp;
};
