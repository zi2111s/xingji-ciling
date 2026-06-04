import { useState } from 'react';
import { History, BookOpen, AlertCircle, ChevronRight, CheckCircle, XCircle, Eye } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';
import { Question, ReadingPassage } from '@/types';

interface WrongQuestionData {
  record: {
    id: string;
    passageId: string;
    questionId: string;
    userAnswer: string;
    isCorrect: boolean;
    answeredAt: number;
  };
  passage: ReadingPassage;
  question: Question;
}

export default function HistoryPage() {
  const { passages, practiceRecords } = useAppStore();
  const [activeTab, setActiveTab] = useState<'records' | 'wrong'>('records');
  const [selectedWrongQuestion, setSelectedWrongQuestion] = useState<WrongQuestionData | null>(null);

  // Get wrong questions with full data
  const wrongQuestions: WrongQuestionData[] = practiceRecords
    .filter(r => !r.isCorrect)
    .map(record => {
      const passage = passages.find(p => p.id === record.passageId);
      const question = passage?.questions.find(q => q.id === record.questionId);
      if (!passage || !question) return null;
      return { record, passage, question };
    })
    .filter(Boolean) as WrongQuestionData[];

  // Remove duplicates (same question wrong multiple times)
  const uniqueWrongQuestions = wrongQuestions.reduce((acc, item) => {
    const exists = acc.find(q => q.question.id === item.question.id);
    if (!exists) acc.push(item);
    return acc;
  }, [] as WrongQuestionData[]);

  // Group records by date
  const groupedRecords = practiceRecords.reduce((acc, record) => {
    const date = new Date(record.answeredAt).toLocaleDateString('zh-CN');
    if (!acc[date]) acc[date] = [];
    acc[date].push(record);
    return acc;
  }, {} as Record<string, typeof practiceRecords>);

  const accuracy = practiceRecords.length > 0
    ? Math.round((practiceRecords.filter(r => r.isCorrect).length / practiceRecords.length) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* Stats Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl p-5 text-white shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold flex items-center gap-2">
            <History className="w-5 h-5" />
            学习统计
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold">{practiceRecords.length}</p>
            <p className="text-xs text-white/70">总题数</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{uniqueWrongQuestions.length}</p>
            <p className="text-xs text-white/70">错题数</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{accuracy}%</p>
            <p className="text-xs text-white/70">正确率</p>
          </div>
        </div>
      </div>

      {/* Tab Switch */}
      <div className="flex gap-2 bg-white p-1.5 rounded-xl shadow-sm border border-slate-100">
        <button
          onClick={() => setActiveTab('records')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'records'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          练习记录
        </button>
        <button
          onClick={() => setActiveTab('wrong')}
          className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
            activeTab === 'wrong'
              ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <AlertCircle className="w-4 h-4" />
          错题本
          {uniqueWrongQuestions.length > 0 && (
            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
              {uniqueWrongQuestions.length}
            </span>
          )}
        </button>
      </div>

      {/* Records List */}
      {activeTab === 'records' && (
        <div className="space-y-4">
          {Object.entries(groupedRecords).length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">暂无练习记录</p>
              <p className="text-sm text-slate-400 mt-1">开始学习后可查看历史记录</p>
            </div>
          ) : (
            Object.entries(groupedRecords).map(([date, records]) => (
              <div key={date} className="space-y-2">
                <p className="text-sm text-slate-500 font-medium px-2">{date}</p>
                <div className="bg-white rounded-xl shadow-sm border border-slate-100 divide-y divide-slate-50">
                  {records.map(record => {
                    const passage = passages.find(p => p.id === record.passageId);
                    const question = passage?.questions.find(q => q.id === record.questionId);
                    return (
                      <div
                        key={record.id}
                        className="p-4 flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          {record.isCorrect ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-500" />
                          )}
                          <div>
                            <p className="text-sm text-slate-700 font-medium">
                              {question?.typeName || '题目'}
                            </p>
                            <p className="text-xs text-slate-400">
                              {passage?.title || '短文'}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs text-slate-400">
                          {new Date(record.answeredAt).toLocaleTimeString('zh-CN', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Wrong Questions */}
      {activeTab === 'wrong' && (
        <div className="space-y-4">
          {uniqueWrongQuestions.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <p className="text-slate-700 font-medium">太棒了！</p>
              <p className="text-sm text-slate-500 mt-1">暂无错题，保持得很好</p>
            </div>
          ) : (
            uniqueWrongQuestions.map(item => (
              <button
                key={item.question.id}
                onClick={() => setSelectedWrongQuestion(item)}
                className="w-full bg-white rounded-xl p-4 shadow-sm border border-slate-100 text-left hover:border-red-200 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-4 h-4 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-700 font-medium line-clamp-2">
                        {item.question.question}
                      </p>
                      <p className="text-xs text-slate-400 mt-1">
                        {item.passage.title} · {item.question.typeName}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                </div>
              </button>
            ))
          )}
        </div>
      )}

      {/* Wrong Question Detail Modal */}
      {selectedWrongQuestion && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-end justify-center animate-in fade-in">
          <div
            className="bg-white w-full max-w-lg rounded-t-3xl p-6 max-h-[85vh] overflow-y-auto animate-in slide-in-from-bottom-4"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-800">错题详情</h3>
              <button
                onClick={() => setSelectedWrongQuestion(null)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            {/* Passage */}
            <div className="bg-slate-50 rounded-xl p-4 mb-4">
              <p className="text-sm font-medium text-slate-700 mb-2">
                {selectedWrongQuestion.passage.title}
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedWrongQuestion.passage.content}
              </p>
            </div>

            {/* Question */}
            <div className="mb-4">
              <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">
                {selectedWrongQuestion.question.typeName}
              </span>
              <p className="text-slate-800 font-medium mt-2">
                {selectedWrongQuestion.question.question}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2 mb-4">
              {selectedWrongQuestion.question.options.map(option => {
                const isCorrect = option.label === selectedWrongQuestion.question.correctAnswer;
                const isUserAnswer = option.label === selectedWrongQuestion.record.userAnswer;
                return (
                  <div
                    key={option.label}
                    className={`p-3 rounded-xl border-2 ${
                      isCorrect
                        ? 'border-emerald-500 bg-emerald-50'
                        : isUserAnswer
                        ? 'border-red-500 bg-red-50'
                        : 'border-slate-100 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-slate-700">{option.label}.</span>
                      <span className="text-sm text-slate-600">{option.text}</span>
                      {isCorrect && <CheckCircle className="w-4 h-4 text-emerald-500 ml-auto" />}
                      {isUserAnswer && !isCorrect && <XCircle className="w-4 h-4 text-red-500 ml-auto" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Explanation */}
            <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <p className="text-sm font-medium text-indigo-700 mb-1">答案解析</p>
              <p className="text-sm text-slate-600 leading-relaxed">
                {selectedWrongQuestion.question.explanation}
              </p>
            </div>

            <button
              onClick={() => setSelectedWrongQuestion(null)}
              className="w-full mt-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium"
            >
              我知道了
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
