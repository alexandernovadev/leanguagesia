export const imageWordPrompt = (word: string) => {
  return `
  Create a highly descriptive and visually clear illustration that represents the 
  meaning of the word {${word}} in an intuitive and easy-to-understand way. 
  The scene should be realistic and detailed, avoiding abstractions, and adapt 
  to the grammatical category of the word to reinforce its visual interpretation:

	•	Nouns: Depict objects, people, or abstract concepts directly related to the word, 
  with clear details that make them instantly recognizable.
	•	Adjectives: Accompany the main objects with visual elements that highlight 
  their qualities, such as vibrant colors, contrasting sizes, or noticeable textures.
	•	Verbs: Show actions in progress, capturing movement and energy with dynamic 
  poses, speed effects, or expressive gestures.
	•	Adverbs: Add details that modify the actions represented, like speed lines, 
  changes in direction, or glows to emphasize intensity.
	•	Pronouns: Use stylized human figures or silhouettes to represent subjects 
  in a general way, emphasizing their relationship with other objects in the scene.
	•	Prepositions: Illustrate spatial or temporal relationships between objects, 
  such as a ball on top of a table or a person walking towards a door.
	•	Conjunctions: Represent connections or contrasts between elements, 
  like paths that merge or split, or hands coming together.
	•	Articles: Subtly differentiate the main objects to indicate specificity 
  (a highlighted object) or generality (several similar objects).
	•	Interjections: Express intense emotions or reactions with exaggerated 
  facial expressions, bold gestures, or visual effects like bursts of color or impact lines.

The scene should rely solely on visual elements to communicate the meaning, without using text,
 letters, or symbols. Utilize composition, lighting, and color 
 palettes to reinforce clarity and visual impact
  `.trim();
};
