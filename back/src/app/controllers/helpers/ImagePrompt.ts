export const imageWordPrompt = (word: string) => {
  return `
    Create a highly descriptive and visually clear 
   illustration of the meaning of the word {${word}}. 
   The image should vividly convey the concept in an
   intuitive, easy-to-understand way, using detailed
   and realistic elements that directly represent the word's
   definition. The scene must be straightforward 
   and clear, avoiding any abstract or symbolic visuals. 

   - Do not include any text, letters, or symbols 
   — the image should rely solely on visuals to communicate the word’s meaning
   - Keep in mind if its homograph or homophone
  `.trim();
};
