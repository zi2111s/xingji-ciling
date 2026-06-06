
import React, { useState, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { novelChapters, NovelChapter } from '../data/novelContent';
import { pdfWords } from '../data/pdfWords';

const NovelReader: React.FC = () => {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const [fontSize, setFontSize] = useState<'small' | 'medium' | 'large' | 'extra-large'>('medium');
  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>('light');

  const chapterIndex = useMemo(() => {
    const idx = chapterId ? parseInt(chapterId) : 0;
    return isNaN(idx) ? 0 : idx;
  }, [chapterId]);

  const currentChapter = useMemo(() => {
    return novelChapters[chapterIndex] || novelChapters[0];
  }, [chapterIndex]);

  const fontSizeClasses = {
    small: 'text-base leading-relaxed',
    medium: 'text-lg leading-loose',
    large: 'text-xl leading-loose',
    'extra-large': 'text-2xl leading-loose',
  };

  const themeClasses = {
    light: 'bg-white text-gray-800',
    dark: 'bg-gray-900 text-gray-100',
    sepia: 'bg-amber-50 text-amber-90',
  };

  const closeWordPopup = () => {
    setSelectedWord(null);
  };

  const goToPrevChapter = () => {
    if (chapterIndex > 0) {
      navigate(`/novel/${chapterIndex - 1}`);
      setSelectedWord(null);
    }
  };

  const goToNextChapter = () => {
    if (chapterIndex < novelChapters.length - 1) {
      navigate(`/novel/${chapterIndex + 1}`);
      setSelectedWord(null);
    }
  };

  const selectedWordData = selectedWord ? pdfWords[selectedWord] : null;

  return (
    <div className={`min-h-screen ${themeClasses[theme]} transition-colors duration-300`}>
      <div className="sticky top-0 z-10 bg-opacity-95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link 
            to="/novel" 
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Chapters
          </Link>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'sepia' : 'light')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </button>
            <button 
              onClick={() => setFontSize(size => size === 'small' ? 'medium' : size === 'medium' ? 'large' : size === 'large' ? 'extra-large' : 'small')}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="font-bold">A</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Chapter Illustration */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
          <img 
            src={currentChapter.illustration}
            alt={currentChapter.title}
            className="w-full h-64 md:h-80 object-cover"
            loading="lazy"
          />
        </div>

        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{currentChapter.title}</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Chapter {chapterIndex + 1} of {novelChapters.length} • {currentChapter.wordIds.length} vocab words
          </p>
        </header>

        <article 
          className={`${fontSizeClasses[fontSize]} prose prose-lg max-w-none prose-headings:font-bold prose-p:mb-4 prose-p:indent-8`}
        >
          <div 
            dangerouslySetInnerHTML={{ __html: currentChapter.content }} 
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target.classList.contains('vocab-word')) {
                const wordId = target.dataset.wordId;
                if (wordId) {
                  setSelectedWord(wordId);
                }
              }
            }}
          />
        </article>

        <div className="mt-12 flex items-center justify-between gap-4 pt-8 border-t border-gray-200 dark:border-gray-700">
          <button 
            onClick={goToPrevChapter}
            disabled={chapterIndex === 0}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              chapterIndex === 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Previous Chapter
          </button>

          <span className="text-gray-500 dark:text-gray-400">
            {chapterIndex + 1} / {novelChapters.length}
          </span>

          <button 
            onClick={goToNextChapter}
            disabled={chapterIndex === novelChapters.length - 1}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
              chapterIndex === novelChapters.length - 1 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20'
            }`}
          >
            Next Chapter
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {selectedWordData && (
        <div 
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={closeWordPopup}
        >
          <div 
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 transform transition-all"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  {selectedWordData.word}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 font-mono">
                  {selectedWordData.phonetic}
                </p>
              </div>
              <button 
                onClick={closeWordPopup}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <p className="text-sm text-blue-700 dark:text-blue-300 font-medium mb-1">Part of Speech</p>
                <p className="text-blue-900 dark:text-blue-100">{selectedWordData.partOfSpeech}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">Meaning</p>
                <p className="text-gray-800 dark:text-gray-200">{selectedWordData.meaning}</p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button 
                onClick={closeWordPopup}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NovelReader;
