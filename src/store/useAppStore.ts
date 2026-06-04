import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WordBook, Chapter, ReadingPassage, PracticeRecord, UserProgress } from '@/types';
import { wordBooks } from '@/data/wordBooks';
import { generatePassage } from '@/data/passageGenerator';

interface AppState {
  // Data
  wordBooks: WordBook[];
  currentBook: WordBook | null;
  currentChapter: Chapter | null;
  currentPassage: ReadingPassage | null;
  practiceRecords: PracticeRecord[];
  passages: ReadingPassage[];
  userProgress: UserProgress;

  // Actions
  selectBook: (bookId: string) => void;
  selectChapter: (chapterId: string) => void;
  generateNewPassage: () => ReadingPassage | null;
  submitAnswer: (questionId: string, answer: string) => void;
  loadHistory: () => void;
  getWrongQuestions: () => Array<PracticeRecord & { passage: ReadingPassage }>;
  getTodayProgress: () => { completed: number; total: number };
  markChapterComplete: (chapterId: string) => void;
  isChapterCompleted: (chapterId: string) => boolean;
}

const initialUserProgress: UserProgress = {
  odoneId: 'user1',
  completedPassages: [],
  correctCount: 0,
  totalCount: 0,
  wrongQuestions: [],
  streakDays: 0,
  lastStudyDate: ''
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      wordBooks: wordBooks,
      currentBook: null,
      currentChapter: null,
      currentPassage: null,
      practiceRecords: [],
      passages: [],
      userProgress: initialUserProgress,

      selectBook: (bookId: string) => {
        const book = wordBooks.find(b => b.id === bookId);
        set({ currentBook: book || null, currentChapter: null });
      },

      selectChapter: (chapterId: string) => {
        const { currentBook } = get();
        if (!currentBook) return;
        const chapter = currentBook.chapters.find(c => c.id === chapterId);
        set({ currentChapter: chapter || null });
      },

      generateNewPassage: () => {
        const { currentChapter, passages } = get();
        if (!currentChapter) return null;

        // Check if we already have a passage for this chapter
        const existingPassage = passages.find(p => p.chapterId === currentChapter.id);
        if (existingPassage) {
          set({ currentPassage: existingPassage });
          return existingPassage;
        }

        // Generate new passage
        const newPassage = generatePassage(currentChapter.id, currentChapter.wordIds);

        set(state => ({
          passages: [...state.passages, newPassage],
          currentPassage: newPassage
        }));

        return newPassage;
      },

      submitAnswer: (questionId: string, answer: string) => {
        const { currentPassage, practiceRecords, userProgress } = get();
        if (!currentPassage) return;

        const question = currentPassage.questions.find(q => q.id === questionId);
        if (!question) return;

        const isCorrect = answer === question.correctAnswer;
        const newRecord: PracticeRecord = {
          id: `record_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          passageId: currentPassage.id,
          questionId,
          userAnswer: answer,
          isCorrect,
          answeredAt: Date.now()
        };

        const newWrongQuestions = isCorrect
          ? userProgress.wrongQuestions
          : [...userProgress.wrongQuestions.filter(id => id !== questionId), questionId];

        const completedPassages = isCorrect && question.type === 'inference'
          ? [...new Set([...userProgress.completedPassages, currentPassage.id])]
          : userProgress.completedPassages;

        set(state => ({
          practiceRecords: [...state.practiceRecords, newRecord],
          userProgress: {
            ...state.userProgress,
            correctCount: state.userProgress.correctCount + (isCorrect ? 1 : 0),
            totalCount: state.userProgress.totalCount + 1,
            wrongQuestions: newWrongQuestions,
            completedPassages,
            streakDays: state.userProgress.streakDays,
            lastStudyDate: new Date().toISOString().split('T')[0]
          }
        }));
      },

      loadHistory: () => {
        // History is automatically loaded via persist middleware
      },

      getWrongQuestions: () => {
        const { practiceRecords, passages } = get();
        const wrongRecords = practiceRecords.filter(r => !r.isCorrect);
        return wrongRecords.map(r => {
          const passage = passages.find(p => p.id === r.passageId);
          const question = passage?.questions.find(q => q.id === r.questionId);
          return { ...r, passage: passage!, question: question! } as any;
        }).filter(r => r.passage && r.question);
      },

      getTodayProgress: () => {
        const { practiceRecords } = get();
        const today = new Date().toISOString().split('T')[0];
        const todayRecords = practiceRecords.filter(r => {
          const recordDate = new Date(r.answeredAt).toISOString().split('T')[0];
          return recordDate === today;
        });

        // Each passage has 4 questions, so 4 correct answers = 1 completed passage
        const passageIds = new Set(todayRecords.filter(r => r.isCorrect).map(r => r.passageId));
        return {
          completed: passageIds.size,
          total: 5 // Daily goal of 5 passages
        };
      },

      markChapterComplete: (chapterId: string) => {
        // Could be used for additional tracking
      },

      isChapterCompleted: (chapterId: string) => {
        const { passages } = get();
        return passages.some(p => p.chapterId === chapterId);
      }
    }),
    {
      name: 'yancitong-storage',
      partialize: (state) => ({
        currentBook: state.currentBook,
        currentChapter: state.currentChapter,
        practiceRecords: state.practiceRecords,
        passages: state.passages,
        userProgress: state.userProgress
      })
    }
  )
);
