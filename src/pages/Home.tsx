import { useNavigate } from 'react-router-dom';
import { BookOpen, Target, TrendingUp, Clock, ChevronRight, Flame, Sparkles } from 'lucide-react';
import { useAppStore } from '@/store/useAppStore';

export default function Home() {
  const navigate = useNavigate();
  const { userProgress, getTodayProgress, practiceRecords } = useAppStore();
  const todayProgress = getTodayProgress();

  const accuracy = userProgress.totalCount > 0
    ? Math.round((userProgress.correctCount / userProgress.totalCount) * 100)
    : 0;

  const stats = [
    {
      label: '今日进度',
      value: `${todayProgress.completed}/${todayProgress.total}`,
      icon: Target,
      color: 'from-emerald-500 to-teal-500',
      bgColor: 'bg-emerald-50'
    },
    {
      label: '累计正确率',
      value: `${accuracy}%`,
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50'
    },
    {
      label: '已学短文',
      value: `${userProgress.completedPassages.length}`,
      icon: BookOpen,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50'
    },
    {
      label: '连续学习',
      value: `${userProgress.streakDays}天`,
      icon: Flame,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50'
    }
  ];

  const recentRecords = practiceRecords.slice(-5).reverse();

  return (
    <div className="space-y-6">
      {/* Welcome Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-6 text-white shadow-xl">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-1">备战考研 · 词汇先行</h2>
          <p className="text-white/80 text-sm">每天进步一点点</p>
        </div>
        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
        <div className="absolute -right-2 top-2 w-20 h-20 bg-white/5 rounded-full blur-xl" />
      </div>

      {/* Today's Task */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-slate-800 flex items-center gap-2">
            <Target className="w-5 h-5 text-indigo-500" />
            今日任务
          </h3>
          <span className="text-sm text-slate-500">
            {todayProgress.completed >= todayProgress.total ? '已完成' : '进行中'}
          </span>
        </div>

        {/* Progress Ring */}
        <div className="flex items-center justify-center py-4">
          <div className="relative w-36 h-36">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-slate-100"
              />
              <circle
                cx="72"
                cy="72"
                r="60"
                stroke="url(#progressGradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 60}
                strokeDashoffset={
                  2 * Math.PI * 60 * (1 - todayProgress.completed / todayProgress.total)
                }
                className="transition-all duration-700 ease-out"
              />
              <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#a855f7" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold text-slate-800">
                {Math.round((todayProgress.completed / todayProgress.total) * 100)}%
              </span>
              <span className="text-xs text-slate-500">完成率</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigate('/books')}
          className="w-full mt-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-medium shadow-lg shadow-indigo-200 active:scale-98 transition-transform flex items-center justify-center gap-2"
        >
          <BookOpen className="w-5 h-5" />
          {todayProgress.completed >= todayProgress.total ? '查看已学' : '开始学习'}
        </button>
      </div>

      {/* Novel Reading Card */}
      <div 
        onClick={() => navigate('/novel')}
        className="cursor-pointer bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-6 h-6" />
              <h3 className="text-xl font-bold">星际词灵</h3>
            </div>
            <p className="text-white/90 mb-4">
              通过科幻故事学习1883个考研核心词汇
            </p>
            <div className="flex items-center gap-2 text-sm text-white/80">
              <span>📖 19章</span>
              <span>•</span>
              <span>📚 1883词</span>
            </div>
          </div>
          <div className="bg-white/20 rounded-xl p-3">
            <BookOpen className="w-8 h-8" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bgColor} rounded-xl p-4 border border-slate-100`}
          >
            <stat.icon className={`w-5 h-5 mb-2 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
            <p className="text-2xl font-bold text-slate-800">{stat.value}</p>
            <p className="text-xs text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      {recentRecords.length > 0 && (
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-500" />
              最近学习
            </h3>
            <button
              onClick={() => navigate('/history')}
              className="text-sm text-indigo-500 flex items-center gap-1"
            >
              查看全部
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {recentRecords.slice(0, 3).map((record) => (
              <div
                key={record.id}
                className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      record.isCorrect ? 'bg-emerald-500' : 'bg-red-500'
                    }`}
                  />
                  <span className="text-sm text-slate-600">
                    {record.isCorrect ? '答对' : '答错'}了一道题
                  </span>
                </div>
                <span className="text-xs text-slate-400">
                  {new Date(record.answeredAt).toLocaleTimeString('zh-CN', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
