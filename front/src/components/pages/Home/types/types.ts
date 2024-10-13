export type Language = "English" | "Portugues"; // TODO Esto no debería estar aquí
export type Level = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";// TODO Esto no debería estar aquí

export interface Filters {
  languages: Language[];
  levels: Level[];
}// TODO Esto no debería estar aquí

export interface Card {
  id: number;
  flag: string;
  level: Level;
  duration: number;
  title: string;
}
