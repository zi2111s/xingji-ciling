# 考研英语背单词APP - 技术架构文档

## 1. 架构设计

```
┌─────────────────────────────────────────────────────────┐
│                      前端 (React)                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐        │
│  │  首页   │ │ 词书页  │ │ 阅读页  │ │ 历史页  │        │
│  └────┬────┘ └────┬────┘ └────┬────┘ └────┬────┘        │
│       └───────────┴───────────┴───────────┘             │
│                         │                               │
│              ┌──────────┴──────────┐                    │
│              │    状态管理 (Zustand) │                   │
│              └──────────┬──────────┘                    │
└─────────────────────────┼───────────────────────────────┘
                          │
┌─────────────────────────┼───────────────────────────────┐
│                    本地存储层                            │
│         (localStorage + IndexedDB)                       │
└─────────────────────────────────────────────────────────┘
```

## 2. 技术选型

| 技术 | 版本 | 用途 |
|-----|------|-----|
| React | 18.x | UI框架 |
| TypeScript | 5.x | 类型安全 |
| Vite | 5.x | 构建工具 |
| TailwindCSS | 3.x | 样式框架 |
| Zustand | 4.x | 状态管理 |
| React Router | 6.x | 路由管理 |
| Lucide React | latest | 图标库 |

## 3. 路由定义

| 路由 | 页面名称 | 功能描述 |
|-----|---------|---------|
| `/` | 首页 | 今日任务、进度概览 |
| `/books` | 单词书 | 书单列表、章节选择 |
| `/study/:chapterId` | 学习页面 | 阅读短文、完成练习 |
| `/history` | 历史记录 | 做题记录、错题本 |
| `/profile` | 个人中心 | 用户信息、统计 |

## 4. 数据模型

### 4.1 核心数据结构

```typescript
// 单词
interface Word {
  id: string;
  word: string;           // 单词拼写
  phonetic: string;        // 音标
  partOfSpeech: string;    // 词性
  meaning: string;         // 中文释义
  example: string;        // 真题例句
}

// 单词书
interface WordBook {
  id: string;
  name: string;            // 书名（如：考研英语核心词汇）
  type: 'yingyu1' | 'yingyu2';  // 英语一/英语二
  chapters: Chapter[];
}

// 章节
interface Chapter {
  id: string;
  bookId: string;
  name: string;            // 章节名（如：Unit 1 - 核心词汇）
  wordIds: string[];       // 本章包含的单词ID列表
}

// 阅读短文
interface ReadingPassage {
  id: string;
  chapterId: string;
  title: string;           // 短文标题
  content: string;         // 短文内容（150-200词）
  highlightedWords: string[];  // 高亮词汇ID列表
  questions: Question[];    // 配套4道题目
  createdAt: number;        // 生成时间
}

// 题目
interface Question {
  id: string;
  passageId: string;
  type: 'detail' | 'vocabulary' | 'mainidea' | 'inference';
  typeName: string;         // 题型名称（细节题/词义题/主旨题/推理题）
  question: string;        // 题目文本
  options: Option[];        // 选项列表
  correctAnswer: string;   // 正确答案（A/B/C/D）
  explanation: string;      // 答案解析
}

// 选项
interface Option {
  label: string;            // 选项标签（A/B/C/D）
  text: string;             // 选项内容
}

// 做题记录
interface PracticeRecord {
  id: string;
  passageId: string;
  questionId: string;
  userAnswer: string;       // 用户选择的答案
  isCorrect: boolean;       // 是否正确
  answeredAt: number;       // 答题时间
}

// 用户进度
interface UserProgress {
  oderId: string;
  completedPassages: string[];   // 已完成的短文ID
  correctCount: number;          // 正确题目数
  totalCount: number;            // 总题目数
  wrongQuestions: string[];      // 错题ID列表
  streakDays: number;            // 连续学习天数
  lastStudyDate: string;         // 最后学习日期
}
```

### 4.2 ER关系图

```
WordBook 1───n Chapter
Chapter 1───n Word (通过wordIds关联)
Chapter 1───n ReadingPassage
ReadingPassage 1───n Question
Question 1───n PracticeRecord
UserProgress 1───n PracticeRecord
```

## 5. 状态管理 (Zustand Store)

```typescript
// 主要Store结构
interface AppStore {
  // 数据
  wordBooks: WordBook[];
  currentBook: WordBook | null;
  currentChapter: Chapter | null;
  currentPassage: ReadingPassage | null;
  practiceRecords: PracticeRecord[];
  userProgress: UserProgress;

  // 操作
  selectBook: (bookId: string) => void;
  selectChapter: (chapterId: string) => void;
  generatePassage: (chapterId: string) => ReadingPassage;
  submitAnswer: (questionId: string, answer: string) => void;
  loadHistory: () => void;
}
```

## 6. 短文生成算法

由于是纯前端实现，采用预设模板+词汇填充的方式：

1. 预设10-15篇不同主题的短文模板（涵盖教育、科技、文化、生活等考研常考话题）
2. 根据章节词汇，智能替换模板中的占位词
3. 确保生成短文：
   - 长度控制在150-200词
   - 包含本章3-5个核心词汇
   - 语句通顺、逻辑连贯
   - 风格贴近真题阅读材料

## 7. 题目生成规则

每篇短文固定生成4道题目，严格对标考研阅读题型：

| 题型 | 题号位置 | 生成规则 |
|-----|---------|---------|
| 细节题 | 第1题 | 选取文中具体事实，改写数字/时间/程度 |
| 词义题 | 第2题 | 选取文中1-2个关键词，改变表述方式 |
| 主旨题 | 第3题 | 基于全文内容，概括中心思想 |
| 推理题 | 第4题 | 选取文中暗示性信息，要求推断隐含意义 |

## 8. 本地存储策略

| 数据类型 | 存储方式 | 说明 |
|---------|---------|-----|
| 用户进度 | localStorage | 轻量级键值对存储 |
| 历史记录 | IndexedDB | 大量数据存储，支持索引查询 |
| 单词书数据 | 内置JSON | 随应用加载 |
| 生成的短文 | IndexedDB | 缓存已生成的短文 |

## 9. 响应式设计

- 移动端优先设计（375px - 428px）
- 触摸友好的按钮尺寸（最小44px）
- 单手操作优化
- 暗色模式支持
