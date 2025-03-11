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

  // Update a word by ID (full update)
  async updateWord(
    id: string,
    updateData: Partial<IWord>
  ): Promise<IWord | null> {
    return await Word.findByIdAndUpdate(id, updateData, { new: true });
  }

  // Update only the level of a word and return only the "level" field
  async updateWordLevel(
    id: string,
    level: string
  ): Promise<{ level?: string } | null> {
    return await Word.findByIdAndUpdate(id, { level }, { new: true })
      .select("level updatedAt")
      .lean();
  }

  // Update only examples
  async updateWordExamples(
    id: string,
    examples: string[]
  ): Promise<{ examples?: string[] } | null> {
    return await Word.findByIdAndUpdate(id, { examples }, { new: true })
      .select("examples updatedAt")
      .lean();
  }

  // Update only codeSwitching
  async updateWordCodeSwitching(
    id: string,
    codeSwitching: string[]
  ): Promise<{ codeSwitching?: string[] } | null> {
    return await Word.findByIdAndUpdate(id, { codeSwitching }, { new: true })
      .select("codeSwitching updatedAt")
      .lean();
  }

  // Update only synonyms
  async updateWordSynonyms(
    id: string,
    synonyms: string[]
  ): Promise<{ sinonyms?: string[] } | null> {
    return await Word.findByIdAndUpdate(
      id,
      { sinonyms: synonyms },
      { new: true }
    )
      .select("sinonyms updatedAt")
      .lean();
  }

  // Update only type
  async updateWordType(
    id: string,
    type: string[]
  ): Promise<{ type?: string[] } | null> {
    return await Word.findByIdAndUpdate(id, { type }, { new: true })
      .select("type updatedAt")
      .lean();
  }

  // Update only img
  async updateWordImg(
    id: string,
    img: string
  ): Promise<{ img?: string } | null> {
    return await Word.findByIdAndUpdate(id, { img }, { new: true })
      .select("img updatedAt")
      .lean();
  }

  // Increment seen count by 1
  async incrementWordSeen(id: string): Promise<{ seen?: number } | null> {
    return await Word.findByIdAndUpdate(
      id,
      { $inc: { seen: 1 } },
      { new: true }
    )
      .select("seen updatedAt")
      .lean();
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

  // Get the last 60 words with level "hard" or "medium"
  async getRecentHardOrMediumWords(): Promise<IWord[]> {
    return await Word.find({ level: { $in: ["hard", "medium"] } })
      .sort({ createdAt: -1 })
      .limit(60)
      .exec();
  }

  // Get the last 30 words with level "easy" 
  async getLastEasyWords(): Promise<IWord[]> {
    return await Word.find({ level: { $in: ["easy"] } })
      .sort({ createdAt: -1 })
      .limit(30)
      .select("word")
      .lean()
  }
}

export default new WordService();
