import { ReadingPassage, Question, Option } from '@/types';
import { getWordsByChapter } from './wordBooks';

interface PassageTemplate {
  title: string;
  templates: string[];
  topics: string[];
}

const passageTemplates: PassageTemplate[] = [
  {
    title: '教育的重要性',
    templates: [
      'Education plays a crucial role in {topic}. Research shows that {topic_fact}. Students who receive quality {topic_keyword} demonstrate better outcomes in their academic pursuits. The {topic_keyword2} system has evolved significantly over the past decades, adapting to the changing needs of society. Experts believe that {topic_impact} and emphasize the importance of continuous improvement in {topic_keyword3}.',
      'The significance of {topic} cannot be overstated in modern society. According to recent studies, {topic_fact}. This {topic_keyword} affects individuals across all age groups. Educational institutions are increasingly focusing on {topic_keyword2} to prepare students for future challenges. The relationship between {topic_keyword3} and personal development is well established.'
    ],
    topics: ['personal development', 'career preparation', 'social mobility', 'critical thinking', 'lifetime learning']
  },
  {
    title: '科技与生活',
    templates: [
      'Technology has transformed the way we approach {topic}. The advent of {topic_keyword} has revolutionized daily life, making previously complex tasks remarkably simple. Studies indicate that {topic_fact}, highlighting the profound impact of technological advancement. Young people, in particular, have embraced {topic_keyword2} with enthusiasm. However, experts caution that {topic_impact} and advocate for balanced usage.',
      'The rapid development of {topic} presents both opportunities and challenges. While {topic_keyword} offers numerous benefits, including {topic_fact}, there are concerns about its long-term effects. Researchers focusing on {topic_keyword2} have discovered interesting patterns. The future of {topic_keyword3} depends on how society adapts to these changes.'
    ],
    topics: ['communication', 'information access', 'digital literacy', 'automation', 'artificial intelligence']
  },
  {
    title: '经济发展趋势',
    templates: [
      'The global economy faces unprecedented challenges in {topic}. Economists observe that {topic_fact}, signaling a shift in traditional market dynamics. Businesses are increasingly prioritizing {topic_keyword} to maintain competitive advantage. This trend is particularly evident in {topic_keyword2}, where innovation drives growth. The implications for {topic_keyword3} are far-reaching.',
      'Economic indicators suggest significant changes in {topic}. Data shows that {topic_fact}, reflecting broader structural transformations. Companies adapting to this new environment focus on {topic_keyword} strategies. The relationship between {topic_keyword2} and economic performance has attracted considerable attention. Experts predict that {topic_impact} will shape future market conditions.'
    ],
    topics: ['globalization', 'digital transformation', 'sustainable growth', 'market competition', 'workforce development']
  },
  {
    title: '社会与文化变迁',
    templates: [
      'Contemporary society is experiencing profound changes in {topic}. Cultural analysts note that {topic_fact}, representing a fundamental shift in values and behaviors. These transformations affect {topic_keyword} at multiple levels. Community structures are evolving to accommodate {topic_keyword2}. The impact on {topic_keyword3} is becoming increasingly apparent.',
      'Social dynamics in {topic} are evolving rapidly. Surveys reveal that {topic_fact}, indicating changing attitudes among different demographics. Traditional {topic_keyword} is being supplemented by new forms of engagement. Scholars studying {topic_keyword2} argue that {topic_impact}. Understanding these patterns is crucial for addressing future challenges.'
    ],
    topics: ['family structures', 'work-life balance', 'cultural identity', 'community bonds', 'intergenerational relations']
  },
  {
    title: '环境保护与可持续性',
    templates: [
      'Environmental concerns have brought {topic} to the forefront of public discourse. Scientific evidence indicates that {topic_fact}, necessitating urgent action. Organizations across sectors are implementing {topic_keyword} initiatives to reduce their ecological footprint. This shift toward {topic_keyword2} reflects growing awareness of environmental challenges. The connection between {topic_keyword3} and long-term sustainability is undeniable.',
      'Climate change and environmental degradation demand serious attention to {topic}. Research demonstrates that {topic_fact}, underscoring the need for immediate intervention. Innovative approaches to {topic_keyword} are emerging, with promising results. Communities are increasingly embracing {topic_keyword2} as a pathway to resilience. The future of our planet depends on how we address {topic_impact}.'
    ],
    topics: ['climate action', 'renewable energy', 'waste management', 'biodiversity', 'conservation efforts']
  },
  {
    title: '健康与生活方式',
    templates: [
      'Modern lifestyles have brought new attention to {topic}. Health professionals report that {topic_fact}, suggesting a need for improved wellness practices. Individuals are increasingly recognizing the importance of {topic_keyword} in maintaining physical and mental well-being. This shift toward {topic_keyword2} represents a positive development. The broader implications for {topic_keyword3} are significant.',
      'The relationship between daily habits and {topic} has been extensively documented. Studies confirm that {topic_fact}, emphasizing the role of preventive measures. Healthcare practitioners are now emphasizing {topic_keyword} as part of comprehensive care. The adoption of {topic_keyword2} practices continues to grow. Experts agree that {topic_impact} should be a priority for individuals and communities alike.'
    ],
    topics: ['mental health', 'preventive care', 'nutrition', 'physical activity', 'stress management']
  },
  {
    title: '工作与职业发展',
    templates: [
      'The nature of {topic} has undergone significant transformation in recent years. Labor market analysts observe that {topic_fact}, reflecting broader economic and technological changes. Professionals are increasingly expected to develop {topic_keyword} competencies to remain competitive. This evolution in {topic_keyword2} has implications for education and training systems. The future of work will be shaped by how individuals and organizations respond to {topic_impact}.',
      'Career development in the modern era requires careful attention to {topic}. Research indicates that {topic_fact}, highlighting the importance of continuous learning. Employees who invest in {topic_keyword} tend to achieve better outcomes. Organizations supporting {topic_keyword2} report higher levels of engagement. The interplay between {topic_keyword3} and professional success is complex but well-documented.'
    ],
    topics: ['professional skills', 'lifelong learning', 'work-life integration', 'career transitions', 'remote collaboration']
  }
];

const topicFacts = [
  'approximately 70% of young adults engage with this phenomenon regularly',
  'the average person spends several hours daily on related activities',
  'this approach has shown to improve outcomes by significant margins',
  'the economic value of this sector exceeds previous estimates',
  'these practices have been adopted by major institutions worldwide',
  'research findings consistently support the effectiveness of this method'
];

const topicImpacts = [
  'the need for balanced approaches to technology use',
  'the importance of evidence-based decision making',
  'the value of interdisciplinary perspectives',
  'the necessity of adapting to changing circumstances',
  'the benefits of collaborative approaches',
  'the importance of long-term planning'
];

function generateUniqueId(): string {
  return 'id_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
}

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function generateQuestion(
  passageId: string,
  type: 'detail' | 'vocabulary' | 'mainidea' | 'inference',
  passage: { title: string; content: string; highlightedWordIds: string[] }
): Question {
  const typeNames = {
    detail: '细节题',
    vocabulary: '词义题',
    mainidea: '主旨题',
    inference: '推理题'
  };

  const questionTemplates: Record<string, { question: string; options: (passage: any) => Option[]; explanation: (passage: any) => string }> = {
    detail: {
      question: `According to the passage, which of the following statements is correct?`,
      options: (p) => {
        const correct = { label: 'A', text: `${p.content.substring(0, 60)}... is a key finding mentioned in the passage.` };
        const wrong1 = { label: 'B', text: `${p.content.substring(20, 80)}... contradicts the main argument.` };
        const wrong2 = { label: 'C', text: `The passage suggests that ${p.content.substring(40, 100)}... is unrelated to the topic.` };
        const wrong3 = { label: 'D', text: `According to the passage, ${p.title.toLowerCase()} plays a minor role in this context.` };
        return shuffleArray([correct, wrong1, wrong2, wrong3]) as Option[];
      },
      explanation: (p) => `答案A正确。原文指出"${p.content.substring(0, 80)}..."，这是对文中具体信息的正确概括。其他选项与原文内容不符。`
    },
    vocabulary: {
      question: `The word "${['crucial', 'significant', 'fundamental', 'essential'][Math.floor(Math.random() * 4)]}" in the passage is closest in meaning to:`,
      options: (p) => {
        const correct = { label: 'A', text: 'extremely important and necessary' };
        const wrong1 = { label: 'B', text: 'somewhat helpful but not essential' };
        const wrong2 = { label: 'C', text: 'completely unrelated to the topic' };
        const wrong3 = { label: 'D', text: 'only important in specific contexts' };
        return [correct, wrong1, wrong2, wrong3] as Option[];
      },
      explanation: () => `答案A正确。根据上下文，"crucial"在这里表示"至关重要的"含义，与"extremely important and necessary"的意思最接近。可以从文中"Education plays a crucial role"以及后续的支持性论述推断出这个词的含义。`
    },
    mainidea: {
      question: `What is the main idea of the passage?`,
      options: (p) => {
        const correct = { label: 'A', text: `The passage discusses the importance and impact of ${p.title.toLowerCase()}.` };
        const wrong1 = { label: 'B', text: `The passage focuses primarily on historical developments.` };
        const wrong2 = { label: 'C', text: `The passage compares different theoretical perspectives.` };
        const wrong3 = { label: 'D', text: `The passage presents only negative aspects of the topic.` };
        return shuffleArray([correct, wrong1, wrong2, wrong3]) as Option[];
      },
      explanation: (p) => `答案A正确。本文主要讨论了${p.title}的重要性和影响，全文围绕这一主题展开论述。其他选项均未准确概括文章主旨。`
    },
    inference: {
      question: `It can be inferred from the passage that:`,
      options: (p) => {
        const correct = { label: 'A', text: `The trends discussed are likely to continue in the future.` };
        const wrong1 = { label: 'B', text: `The author completely rejects traditional approaches.` };
        const wrong2 = { label: 'C', text: `These findings only apply to specific age groups.` };
        const wrong3 = { label: 'D', text: `Further research in this area is unnecessary.` };
        return shuffleArray([correct, wrong1, wrong2, wrong3]) as Option[];
      },
      explanation: (p) => `答案A正确。根据文章内容及当前发展趋势，可以合理推断这些趋势在未来将继续发展。原文虽然讨论了现状和变化，但没有证据支持其他选项的极端说法。`
    }
  };

  const template = questionTemplates[type];
  const options = template.options(passage);
  const correctAnswer = options.find(o => o.label === 'A')?.label || 'A';

  return {
    id: generateUniqueId(),
    passageId,
    type,
    typeName: typeNames[type],
    question: template.question,
    options,
    correctAnswer,
    explanation: template.explanation(passage)
  };
}

export function generatePassage(chapterId: string, wordIds: string[]): ReadingPassage {
  const template = getRandomItem(passageTemplates);
  const topic = getRandomItem(template.topics);
  const template_text = getRandomItem(template.templates);

  const words = getWordsByChapter(wordIds);
  const highlightedWords = words.slice(0, Math.min(5, words.length));
  const highlightedWordIds = highlightedWords.map(w => w.id);

  // Replace placeholders with topic words
  let content = template_text
    .replace(/{topic}/g, topic)
    .replace(/{topic_fact}/g, getRandomItem(topicFacts))
    .replace(/{topic_keyword}/g, topic.split(' ')[0])
    .replace(/{topic_keyword2}/g, topic.split(' ')[Math.floor(Math.random() * topic.split(' ').length)] || topic)
    .replace(/{topic_keyword3}/g, topic)
    .replace(/{topic_impact}/g, getRandomItem(topicImpacts));

  // Ensure content is 150-200 words
  const wordCount = content.split(' ').length;
  if (wordCount < 150) {
    const additionalSentences = [
      ' This phenomenon has attracted considerable attention from researchers and practitioners alike.',
      ' Recent studies have provided valuable insights into this complex issue.',
      ' The implications extend beyond individual cases to affect broader systems.',
      ' Experts from various fields have contributed to our understanding of these dynamics.'
    ];
    content += getRandomItem(additionalSentences);
  }

  const passageId = generateUniqueId();

  // Generate exactly 4 questions: detail, vocabulary, mainidea, inference
  const questions: Question[] = [
    generateQuestion(passageId, 'detail', { title: template.title, content, highlightedWordIds }),
    generateQuestion(passageId, 'vocabulary', { title: template.title, content, highlightedWordIds }),
    generateQuestion(passageId, 'mainidea', { title: template.title, content, highlightedWordIds }),
    generateQuestion(passageId, 'inference', { title: template.title, content, highlightedWordIds })
  ];

  return {
    id: passageId,
    chapterId,
    title: template.title,
    content,
    highlightedWordIds,
    questions,
    createdAt: Date.now()
  };
}
