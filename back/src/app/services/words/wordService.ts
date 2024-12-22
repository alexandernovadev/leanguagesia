import Word, { IWord } from "../../db/models/Word";

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export class WordService {
  // Crear una palabra
  async createWord(wordData: IWord): Promise<IWord> {
    const word = new Word(wordData);
    return await word.save();
  }

  // Obtener una palabra por ID
  async getWordById(id: string): Promise<IWord | null> {
    return await Word.findById(id);
  }

  // Obtener todas las palabras con paginación, ordenadas por fecha de creación y
  // filtro opcional por 'wordUser'
  async getWords(
    page: number = 1,
    limit: number = 10,
    wordUser?: string
  ): Promise<PaginatedResult<IWord>> {
    const filter: Record<string, unknown> = {};

    // Añadir filtro por palabra si 'wordUser' está definido
    if (wordUser) {
      filter.word = { $regex: wordUser, $options: "i" }; 
      // Búsqueda parcial, insensible a mayúsculas
    }

    const total = await Word.countDocuments(filter);
    const pages = Math.ceil(total / limit);

    const data = await Word.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return { data, total, page, pages };
  }

  // Actualizar una palabra por ID
  async updateWord(
    id: string,
    updateData: Partial<IWord>
  ): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Update level of a word by ID
  async updateWordLevel(id: string, level: string): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, { level }, { new: true });
  }

  // Eliminar una palabra por ID
  async deleteWord(id: string): Promise<IWord | null> {
    return await Word.findByIdAndDelete(id);
  }

  // Método para buscar una palabra ignorando mayúsculas y minúsculas
  async findWordByWord(word: string): Promise<IWord | null> {
    const lowercaseWord = word.toLowerCase();
    return await Word.findOne({
      word: { $regex: `^${lowercaseWord}$`, $options: "i" },
    });
  }

  // Obtener las últimas 20 palabras donde el nivel sea "hard" o "medium",
  // ordenadas por fecha de creación
  async getRecentHardOrMediumWords(): Promise<IWord[]> {
    return await Word.find({ level: { $in: ["hard", "medium"] } })
      .sort({ createdAt: -1 })
      .limit(60)
      .exec();
  }
}

export default new WordService();
