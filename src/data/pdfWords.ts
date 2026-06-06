import { vocabularyData } from './vocabularyData';
import type { WordBook } from '@/types';

export interface WordEntry {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
}

export const pdfWords: Record<string, WordEntry> = {};

for (let i = 0; i < vocabularyData.length; i++) {
  const entry = vocabularyData[i];
  pdfWords[`pdf_${i + 1}`] = {
    id: `pdf_${i + 1}`,
    word: entry.word,
    phonetic: entry.phonetic,
    partOfSpeech: entry.partOfSpeech,
    meaning: entry.meaning
  };
}

export const vocabularyList: string[] = vocabularyData.map(entry => entry.word);

// 动态生成章节
const chapters: WordBook['chapters'] = [];
const chapterCount = Math.ceil(vocabularyData.length / 100);

for (let i = 0; i < chapterCount; i++) {
  const startWordId = i * 100 + 1;
  const endWordId = Math.min((i + 1) * 100, vocabularyData.length);
  
  const wordIds: string[] = [];
  for (let j = startWordId; j <= endWordId; j++) {
    wordIds.push(`pdf_${j}`);
  }
  
  chapters.push({
    id: `chapter-${i + 1}`,
    bookId: 'pdf-word-book',
    name: `第${i + 1}章`,
    wordIds
  });
}

export const pdfWordBook: WordBook = {
  id: 'pdf-word-book',
  name: '考研英语词汇表',
  type: 'yingyu1',
  chapters
};
