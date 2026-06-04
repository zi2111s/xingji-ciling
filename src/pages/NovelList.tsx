
import React from 'react';
import { Link } from 'react-router-dom';
import { novelChapters } from '../data/novelContent';

const NovelList: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            星际词灵
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Learn 1883 postgraduate English vocabulary through an immersive sci-fi adventure
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              {novelChapters.length} Chapters
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              1883 Vocabulary Words
            </span>
          </div>
        </header>

        <div className="grid gap-6">
          {novelChapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              to={`/novel/${index}`}
              className="block bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 overflow-hidden hover:border-blue-300 dark:hover:border-blue-600 hover:scale-[1.02]"
            >
              <div className="flex flex-col md:flex-row">
                {/* Chapter Illustration Preview */}
                <div className="md:w-1/3">
                  <img 
                    src={chapter.illustration}
                    alt={chapter.title}
                    className="w-full h-40 md:h-full object-cover"
                    loading="lazy"
                  />
                </div>
                
                {/* Chapter Info */}
                <div className="flex-1 p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg shadow-md">
                      {index + 1}
                    </span>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {chapter.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                    Dive into this chapter and master {chapter.wordIds.length} new vocabulary words in an immersive sci-fi setting
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        Words: {chapter.wordIds.length}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium">
                      Start Reading
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              How to Learn
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full mx-auto mb-2">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-center">Read & Explore</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Read the story and explore new words in natural context
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mx-auto mb-2">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-center">Tap to Learn</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Tap on highlighted words to see definitions and examples
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-center w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full mx-auto mb-2">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white text-center">Progress Gradually</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                  Complete chapters one by one to master all vocabulary
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NovelList;
