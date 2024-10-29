const mongoose = require("mongoose");

// Definir el esquema para cada palabra en un idioma
const WordSchema = new mongoose.Schema(
  {
    word: {
      type: String,
      required: true,
      unique: true,
      minlength: 1,
      maxlength: 100,
    },
    definition: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1000,
    },
    examples: {
      type: [String],
      default: [],
    },
    type: {
      type: [String],
      enum: [
        "noun",
        "verb",
        "adjective",
        "adverb",
        "personal pronoun",
        "possessive pronoun",
        "preposition",
        "conjunction",
        "determiner",
        "article",
        "quantifier",
        "interjection",
        "auxiliary verb",
        "modal verb",
        "infinitive",
        "participle",
        "gerund",
        "reflexive verb",
      ],
      default: [],
    },
    IPA: {
      type: String, 
    },
    seen: {
      type: Number, 
      default: 0,
    },
    img: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i.test(v);
        },
        message: (props: any) =>
          `${props.value} no es una URL de imagen válida.`,
      },
    },
    level: {
      type: String, 
      enum: ["A1", "A2", "B1", "B2", "C1", "C2"],
      default: "A1",
    },
    codeSwitching: {
      type: [String], 
      default: [],
    },
  },
  { timestamps: true }
);

// Índice para optimizar las búsquedas de palabras
WordSchema.index({ word: 1 });

// Definir el esquema general para el diccionario con múltiples idiomas
const DictionarySchema = new mongoose.Schema(
  {
    languages: {
      type: Map, // Mapa dinámico para diferentes idiomas
      of: WordSchema, // Cada idioma sigue la estructura de WordSchema
    },
  },
  { timestamps: true }
); // timestamps para la creación y modificación del diccionario

// Exportar el modelo
module.exports = mongoose.model("Dictionary", DictionarySchema);
