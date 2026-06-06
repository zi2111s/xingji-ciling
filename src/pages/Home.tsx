import { useNavigate } from 'react-router-dom';
import { BookOpen, Sparkles } from 'lucide-react';
import { vocabularyList } from '../data/pdfWords';
import { novelChapters } from '../data/novelContent';

export default function Home() {
  const navigate = useNavigate();
  const totalWords = vocabularyList.length;
  const totalChapters = novelChapters.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500" />
          
          {/* Decorative Elements */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
          
          {/* Content */}
          <div className="relative z-10 p-8 text-center">
            {/* Icon */}
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
            </div>
            
            {/* Title */}
            <h1 className="text-3xl font-bold text-white mb-2">星际词灵</h1>
            <p className="text-white/90 mb-8">
              通过科幻故事<br />学习{totalWords}个考研核心词汇
            </p>
            
            {/* Stats */}
            <div className="flex justify-center gap-6 mb-8 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalChapters}</div>
                <div className="text-xs">章节</div>
              </div>
              <div className="w-px bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{totalWords}</div>
                <div className="text-xs">词汇</div>
              </div>
            </div>
            
            {/* Start Button */}
            <button
              onClick={() => navigate('/novel')}
              className="w-full py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <BookOpen className="w-5 h-5" />
              开始阅读
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
