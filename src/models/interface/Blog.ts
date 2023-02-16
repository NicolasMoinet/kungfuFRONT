import { WriterType } from './Writer';

export interface BlogType {
  id?: string;
  title: string;
  writer: WriterType;
  date: string;
  description: string;
  picture?: string;
}
