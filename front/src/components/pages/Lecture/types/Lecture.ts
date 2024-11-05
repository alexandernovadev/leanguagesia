export interface Lecture {
  _id?: string;
  time: number;
  level: string;
  typeWrite: string;
  language: string;
  img: string;
  content: string;
  createdAt?: Date; 
  updatedAt?: Date; 
  __v?: number;
}
