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

  // Obtener todas las palabras con paginación y ordenadas por fecha de creación
  async getWords(
    page: number = 1,
    limit: number = 10
  ): Promise<PaginatedResult<IWord>> {
    const total = await Word.countDocuments();
    const pages = Math.ceil(total / limit);
    const data = await Word.find()
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
}

export default new WordService();
