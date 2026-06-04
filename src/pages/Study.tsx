import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, BookOpen, Eye } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { getWordsByChapter } from '@/data/wordBooks';

export default function Study() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const navigate = useNavigate();
  const {
    currentBook,
    currentChapter,
    currentPassage,
    selectChapter,
    generateNewPassage,
    submitAnswer
  } = useAppStore();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showVocabulary, setShowVocabulary] = useState(false);

  useEffect(() => {
    if (chapterId && (!currentChapter || currentChapter.id !== chapterId)) {
      selectChapter(chapterId);
    }
  }, [chapterId, currentChapter, selectChapter]);

  useEffect(() => {
    if (currentChapter && !currentPassage) {
      generateNewPassage();
    }
  }, [currentChapter, currentPassage, generateNewPassage]);

  if (!currentChapter || !currentPassage) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4" />
        <p className="text-slate-500">正在生成学习内容...</p>
      </div>
    );
  }

  const currentQuestion = currentPassage.questions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion?.correctAnswer;
  const words = getWordsByChapter(currentChapter.wordIds);

  const handleSelectAnswer = (answer: string) => {
    if (showResult) return;
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer || !currentQuestion) return;
    submitAnswer(currentQuestion.id, selectedAnswer);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentPassage.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleFinish = () => {
    navigate('/books');
  };

  const highlightWordsInText = (text: string) => {
    const highlightedWordIds = currentPassage.highlightedWordIds;
    let result = text;
    words.forEach(word => {
      if (highlightedWordIds.includes(word.id)) {
        const regex = new RegExp(`\\b${word.word}\\b`, 'gi');
        result = result.replace(
          regex,
          `<span class="bg-yellow-100 text-yellow-800 px-1 rounded font-medium">${word.word}</span>`
        );
      }
    });
    return result;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/books')}
          className="w-10 h-10 rounded-xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-slate-500 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500">
            {currentQuestionIndex + 1} / {currentPassage.questions.length}
          </span>
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-300"
              style={{ width: `${((currentQuestionIndex + 1) / currentPassage.questions.length) * 100}%` }}
            />
          </div>
        </div>
        <button
          onClick={() => setShowVocabulary(!showVocabulary)}
          className={`w-10 h-10 rounded-xl shadow-sm border flex items-center justify-center transition-colors ${
            showVocabulary
              ? 'bg-indigo-50 border-indigo-200 text-indigo-500'
              : 'bg-white border-slate-100 text-slate-400 hover:text-indigo-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
        </button>
      </div>

      {/* Vocabulary Panel */}
      {showVocabulary && (
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 animate-in slide-in-from-top-2">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-800">本章核心词汇</h3>
            <button
              onClick={() => setShowVocabulary(false)}
              className="text-xs text-slate-400 hover:text-slate-600"
            >
              收起
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
            {words.slice(0, 10).map(word => (
              <div
                key={word.id}
                className="p-2 bg-slate-50 rounded-lg text-left"
              >
                <span className="font-medium text-indigo-600 text-sm">{word.word}</span>
                <span className="text-slate-400 text-xs ml-1">{word.phonetic}</span>
                <p className="text-xs text-slate-500 mt-0.5">{word.meaning}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Passage */}
      {currentQuestionIndex === 0 && !showResult && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <h2 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-500" />
            阅读短文
          </h2>
          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4">
            <h3 className="font-medium text-slate-700 mb-2">{currentPassage.title}</h3>
            <p
              className="text-slate-600 leading-relaxed text-sm"
              dangerouslySetInnerHTML={{ __html: highlightWordsInText(currentPassage.content) }}
            />
          </div>
          <p className="text-xs text-slate-400 mt-3 text-center">
            提示：短文中的高亮词汇是本章学习的重点
          </p>
        </div>
      )}

      {/* Question */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        {/* Question Type Badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              currentQuestion.type === 'detail'
                ? 'bg-blue-50 text-blue-600'
                : currentQuestion.type === 'vocabulary'
                ? 'bg-purple-50 text-purple-600'
                : currentQuestion.type === 'mainidea'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-orange-50 text-orange-600'
            }`}
          >
            {currentQuestion.typeName}
          </span>
        </div>

        {/* Question Text */}
        <p className="text-slate-800 font-medium mb-4">{currentQuestion.question}</p>

        {/* Options */}
        <div className="space-y-3">
          {currentQuestion.options.map(option => {
            const isSelected = selectedAnswer === option.label;
            const isCorrectOption = option.label === currentQuestion.correctAnswer;
            const showCorrect = showResult && isCorrectOption;
            const showWrong = showResult && isSelected && !isCorrectOption;

            return (
              <button
                key={option.label}
                onClick={() => handleSelectAnswer(option.label)}
                disabled={showResult}
                className={`w-full p-4 rounded-xl text-left transition-all border-2 ${
                  showCorrect
                    ? 'border-emerald-500 bg-emerald-50'
                    : showWrong
                    ? 'border-red-500 bg-red-50'
                    : isSelected
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-slate-100 bg-white hover:border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      showCorrect
                        ? 'bg-emerald-500 text-white'
                        : showWrong
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'bg-indigo-500 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {option.label}
                  </span>
                  <span className="text-sm text-slate-700 flex-1">{option.text}</span>
                  {showCorrect && <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />}
                  {showWrong && <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className="mt-4 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100 animate-in slide-in-from-top-2">
            <p className="text-sm font-medium text-indigo-700 mb-2">答案解析</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="mt-6">
          {!showResult ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className={`w-full py-3 rounded-xl font-medium transition-all ${
                selectedAnswer
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg shadow-indigo-200 active:scale-98'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              确认答案
            </button>
          ) : currentQuestionIndex < currentPassage.questions.length - 1 ? (
            <button
              onClick={handleNextQuestion}
              className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              下一题
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-medium shadow-lg shadow-emerald-200 active:scale-98 transition-all"
            >
              完成学习
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
