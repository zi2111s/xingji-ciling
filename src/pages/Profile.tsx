import { User, TrendingUp, Target, Flame, Award, BookOpen, Clock, Settings } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function Profile() {
  const { userProgress, passages, practiceRecords } = useAppStore();

  const accuracy = userProgress.totalCount > 0
    ? Math.round((userProgress.correctCount / userProgress.totalCount) * 100)
    : 0;

  // Calculate stats by question type
  const questionTypeStats = {
    detail: { correct: 0, total: 0 },
    vocabulary: { correct: 0, total: 0 },
    mainidea: { correct: 0, total: 0 },
    inference: { correct: 0, total: 0 }
  };

  passages.forEach(passage => {
    passage.questions.forEach(question => {
      const record = practiceRecords.find(r => r.questionId === question.id);
      if (record) {
        questionTypeStats[question.type].total++;
        if (record.isCorrect) {
          questionTypeStats[question.type].correct++;
        }
      }
    });
  });

  const typeNames: Record<string, string> = {
    detail: '细节题',
    vocabulary: '词义题',
    mainidea: '主旨题',
    inference: '推理题'
  };

  const typeColors: Record<string, string> = {
    detail: 'from-blue-500 to-blue-600',
    vocabulary: 'from-purple-500 to-purple-600',
    mainidea: 'from-emerald-500 to-emerald-600',
    inference: 'from-orange-500 to-orange-600'
  };

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl p-6 text-white shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
            <User className="w-8 h-8 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">考研战士</h2>
            <p className="text-white/80 text-sm mt-1">坚持就是胜利</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-white/20">
          <div className="text-center">
            <p className="text-2xl font-bold">{userProgress.streakDays}</p>
            <p className="text-xs text-white/70">连续天数</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{passages.length}</p>
            <p className="text-xs text-white/70">学习短文</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{accuracy}%</p>
            <p className="text-xs text-white/70">正确率</p>
          </div>
        </div>
      </div>

      {/* Question Type Analysis */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-500" />
          题型正确率分析
        </h3>

        <div className="space-y-3">
          {Object.entries(questionTypeStats).map(([type, stats]) => {
            const typeAccuracy = stats.total > 0
              ? Math.round((stats.correct / stats.total) * 100)
              : 0;
            return (
              <div key={type} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">{typeNames[type]}</span>
                  <span className="text-sm font-medium text-slate-700">
                    {stats.correct}/{stats.total} ({typeAccuracy}%)
                  </span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${typeColors[type]} rounded-full transition-all duration-500`}
                    style={{ width: `${typeAccuracy}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Learning Stats */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <h3 className="font-semibold text-slate-800 flex items-center gap-2 mb-4">
          <Award className="w-5 h-5 text-amber-500" />
          学习成就
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
            <BookOpen className="w-6 h-6 text-blue-500 mb-2" />
            <p className="text-xl font-bold text-slate-800">{passages.length}</p>
            <p className="text-xs text-slate-500">已完成短文</p>
          </div>

          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-100">
            <Target className="w-6 h-6 text-emerald-500 mb-2" />
            <p className="text-xl font-bold text-slate-800">{userProgress.correctCount}</p>
            <p className="text-xs text-slate-500">答对题目</p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-100">
            <Flame className="w-6 h-6 text-amber-500 mb-2" />
            <p className="text-xl font-bold text-slate-800">{userProgress.streakDays}天</p>
            <p className="text-xs text-slate-500">连续学习</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <Clock className="w-6 h-6 text-purple-500 mb-2" />
            <p className="text-xl font-bold text-slate-800">{userProgress.totalCount}</p>
            <p className="text-xs text-slate-500">总答题数</p>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <button className="w-full p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
          <div className="flex items-center gap-3">
            <Settings className="w-5 h-5 text-slate-400" />
            <span className="text-slate-700">学习设置</span>
          </div>
          <span className="text-slate-400">→</span>
        </button>
      </div>

      {/* App Info */}
      <div className="text-center py-4">
        <p className="text-sm text-slate-400">研词通 v1.0</p>
        <p className="text-xs text-slate-300 mt-1">考研英语背单词专家</p>
      </div>
    </div>
  );
}
