import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, CheckCircle, Circle, ChevronRight, BookMarked } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function Books() {
  const navigate = useNavigate();
  const { wordBooks, currentBook, selectBook, selectChapter, isChapterCompleted } = useAppStore();
  const [selectedType, setSelectedType] = useState<'yingyu1' | 'yingyu2' | 'all'>('all');

  const filteredBooks = wordBooks.filter(
    book => selectedType === 'all' || book.type === selectedType
  );

  const handleSelectBook = (bookId: string) => {
    selectBook(bookId);
  };

  const handleSelectChapter = (chapterId: string) => {
    selectChapter(chapterId);
    navigate(`/study/${chapterId}`);
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
        {[
          { value: 'all', label: '全部' },
          { value: 'yingyu1', label: '英语一' },
          { value: 'yingyu2', label: '英语二' }
        ].map(tab => (
          <button
            key={tab.value}
            onClick={() => setSelectedType(tab.value as any)}
            className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all ${
              selectedType === tab.value
                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Book Cards */}
      {filteredBooks.map(book => (
        <div key={book.id} className="space-y-4">
          {/* Book Header */}
          <div
            onClick={() => handleSelectBook(book.id)}
            className={`bg-white rounded-2xl p-5 shadow-sm border transition-all cursor-pointer ${
              currentBook?.id === book.id
                ? 'border-indigo-300 ring-2 ring-indigo-100'
                : 'border-slate-100 hover:border-slate-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <BookMarked className="w-7 h-7 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800">{book.name}</h3>
                  <p className="text-sm text-slate-500 mt-1">
                    {book.chapters.length}个章节 ·{' '}
                    {book.chapters.reduce((acc, ch) => acc + ch.wordIds.length, 0)}词汇
                  </p>
                </div>
              </div>
              <ChevronRight
                className={`w-5 h-5 text-slate-400 transition-transform ${
                  currentBook?.id === book.id ? 'rotate-90' : ''
                }`}
              />
            </div>

            {/* Book Type Badge */}
            <div className="mt-3 flex gap-2">
              <span
                className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                  book.type === 'yingyu1'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                {book.type === 'yingyu1' ? '英语（一）' : '英语（二）'}
              </span>
            </div>
          </div>

          {/* Chapters List */}
          {currentBook?.id === book.id && (
            <div className="space-y-2 pl-4 animate-in slide-in-from-top-2 duration-200">
              <p className="text-sm text-slate-500 font-medium px-2">选择章节开始学习</p>
              {book.chapters.map((chapter, index) => {
                const completed = isChapterCompleted(chapter.id);
                return (
                  <button
                    key={chapter.id}
                    onClick={() => handleSelectChapter(chapter.id)}
                    className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-3">
                      {completed ? (
                        <CheckCircle className="w-5 h-5 text-emerald-500" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors" />
                      )}
                      <div className="text-left">
                        <p className="font-medium text-slate-700 group-hover:text-indigo-700">
                          {chapter.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {chapter.wordIds.length}个词汇
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {completed && (
                        <span className="text-xs text-emerald-500 font-medium">已学习</span>
                      )}
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-400 transition-colors" />
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      {/* Empty State */}
      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500">暂无相关词汇书</p>
        </div>
      )}
    </div>
  );
}
