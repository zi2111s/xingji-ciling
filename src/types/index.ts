// 单词
export interface Word {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
}

// 单词书
export interface WordBook {
  id: string;
  name: string;
  type: 'yingyu1' | 'yingyu2';
  chapters: Chapter[];
}

// 章节
export interface Chapter {
  id: string;
  bookId: string;
  name: string;
  wordIds: string[];
}

// 阅读短文
export interface ReadingPassage {
  id: string;
  chapterId: string;
  title: string;
  content: string;
  highlightedWordIds: string[];
  questions: Question[];
  createdAt: number;
}

// 题目
export interface Question {
  id: string;
  passageId: string;
  type: 'detail' | 'vocabulary' | 'mainidea' | 'inference';
  typeName: string;
  question: string;
  options: Option[];
  correctAnswer: string;
  explanation: string;
}

// 选项
export interface Option {
  label: string;
  text: string;
}

// 做题记录
export interface PracticeRecord {
  id: string;
  passageId: string;
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  answeredAt: number;
}

// 用户进度
export interface UserProgress {
  odoneId: string;
  completedPassages: string[];
  correctCount: number;
  totalCount: number;
  wrongQuestions: string[];
  streakDays: number;
  lastStudyDate: string;
}

// 错题
export interface WrongQuestion extends Question {
  passageTitle: string;
  passageContent: string;
  userAnswer: string;
}
