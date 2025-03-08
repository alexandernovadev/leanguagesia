import Word, { IWord } from "../../db/models/Word";

interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pages: number;
}

export class WordService {
  // Create a new word
  async createWord(wordData: IWord): Promise<IWord> {
    const word = new Word(wordData);
    return await word.save();
  }

  // Get a word by ID
  async getWordById(id: string): Promise<IWord | null> {
    return await Word.findById(id);
  }

  // Get all words with pagination, ordered by creation date
  async getWords(
    page: number = 1,
    limit: number = 10,
    wordUser?: string
  ): Promise<PaginatedResult<IWord>> {
    const filter: Record<string, unknown> = {};

    if (wordUser) {
      filter.word = { $regex: wordUser, $options: "i" };
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

  // Update a word by ID
  async updateWord(
    id: string,
    updateData: Partial<IWord>
  ): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Update only the level of a word
  async updateWordLevel(id: string, level: string): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, { level }, { new: true });
  }

  // Update only examples
  async updateWordExamples(
    id: string,
    examples: string[]
  ): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, { examples }, { new: true });
  }

  // Update only codeSwitching
  async updateWordCodeSwitching(
    id: string,
    codeSwitching: string[]
  ): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, { codeSwitching }, { new: true });
  }

  // Update only synonyms
  async updateWordSynonyms(
    id: string,
    synonyms: string[]
  ): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(
      id,
      { sinonyms: synonyms },
      { new: true }
    );
  }

  // Update only type
  async updateWordType(id: string, type: string[]): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, { type }, { new: true });
  }

  // Update only img
  async updateWordImg(id: string, img: string): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, { img }, { new: true });
  }

  // Increment seen count by 1
  async incrementWordSeen(id: string): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(
      id,
      { $inc: { seen: 1 } },
      { new: true }
    );
  }

  // Delete a word by ID
  async deleteWord(id: string): Promise<IWord | null> {
    return await Word.findByIdAndDelete(id);
  }

  // Search for a word ignoring case sensitivity
  async findWordByWord(word: string): Promise<IWord | null> {
    const lowercaseWord = word.toLowerCase();
    return await Word.findOne({
      word: { $regex: `^${lowercaseWord}$`, $options: "i" },
    });
  }

  // Get the last 20 words with level "hard" or "medium"
  async getRecentHardOrMediumWords(): Promise<IWord[]> {
    return await Word.find({ level: { $in: ["hard", "medium"] } })
      .sort({ createdAt: -1 })
      .limit(60)
      .exec();
  }
}

export default new WordService();
