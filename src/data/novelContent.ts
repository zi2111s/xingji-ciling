import { vocabularyList } from './pdfWords';

export interface NovelChapter {
  id: string;
  title: string;
  content: string;
  wordIds: string[];
  illustration: string;
}

const generateChapterContent = (chapterIndex: number, wordCount: number): NovelChapter => {
  const startWord = chapterIndex * 100;
  const chapterWords = vocabularyList.slice(startWord, startWord + wordCount);
  
  const chapterTitles = [
    "The Awakening: Word Power Unleashed",
    "The Journey Begins",
    "Through the Vocabulary Forest",
    "The Temple of Learning",
    "Challenges on the Horizon",
    "The Hidden Wisdom",
    "Rising to the Challenge",
    "The Secret Passage",
    "The Guardian of Words",
    "Crossing the Knowledge Bridge",
    "The Mysterious Key",
    "The Whispering Library",
    "The Final Test",
    "The Eureka Moment",
    "The Summit of Understanding",
    "Victory of Persistence",
    "The Master's Path",
    "Eternal Wisdom",
    "The Legacy of Lexicon"
  ];
  
  const illustrationPrompts = [
    "epic futuristic sci-fi scene, neon glowing words floating in deep space, cosmic warrior student surrounded by magical vocabulary particles, swirling galaxies and nebulae background, cyberpunk aesthetic, vibrant purple and blue neon colors, cinematic lighting, ultra detailed, digital art masterpiece",
    "fantasy adventure through enchanted forest, magical words glowing on tree leaves, hero walking on crystal path made of books, fireflies and floating runes, whimsical and mystical, epic fantasy art style, dramatic lighting, ultra detailed",
    "ancient temple of forbidden knowledge, glowing blue runes covering walls, floating books spinning in air, mysterious golden light from above, epic fantasy, cinematic atmosphere, ultra detailed, digital painting",
    "heroic battle with giant book monster, epic action scene, vocabulary shields glowing, word weapons blazing, dynamic composition, sparks and explosions, anime style, vibrant colors, ultra detailed",
    "wise cosmic sage in grand celestial library, wisdom flowing like golden water from ancient books, holographic words floating, spiritual and transcendent, sacred geometry, radiant light, ultra detailed, ethereal art",
    "epic climb up dictionary mountain, giant books forming peaks, perseverance theme, sunrise with rainbow light, motivational, anime style, dramatic composition, ultra detailed",
    "interdimensional portal made of swirling glowing words, cosmic gateway to knowledge dimensions, mysterious purple and blue energy, adventure theme, sci-fi fantasy, cinematic lighting, ultra detailed",
    "majestic mythical dragon guardian of vocabulary realm, shimmering scales made of letters, protecting golden book treasure, gentle but powerful, epic fantasy, magical atmosphere, ultra detailed",
    "grand crystalline bridge of knowledge connecting floating book islands, cosmic journey theme, breathtaking view of word galaxies, epic fantasy, dramatic perspective, ultra detailed",
    "glowing golden key forged from ancient letters, unlocking secrets of the universe, mysterious light rays, magical artifacts, cinematic composition, ultra detailed",
    "whispering ethereal library with books floating in zero gravity, ghostly voices as glowing particles, magical blue and purple atmosphere, mysterious, cinematic lighting, ultra detailed",
    "epic final showdown with knowledge dragon, triumphant hero wielding word sword, sparks flying, victory moment, anime style, dynamic action, ultra detailed",
    "eureka moment explosion of light, giant lightbulb made of glowing words, sudden realization, brilliant white and gold light, inspirational, cinematic composition, ultra detailed",
    "standing triumphant atop mountain of glowing books, overlooking vast knowledge universe, galaxies below, victorious hero, epic composition, sunrise lighting, ultra detailed",
    "victory celebration with word confetti exploding, rainbow colors, joyful party atmosphere, magical fireworks made of letters, anime style, vibrant and fun, ultra detailed",
    "master walking path of enlightenment, glowing aura around, books floating in orbit, wise and peaceful, spiritual journey, golden hour lighting, ultra detailed",
    "eternal world tree with books as leaves, infinite knowledge flowing through branches, galaxies in canopy, majestic and timeless, cosmic fantasy, ultra detailed",
    "passing the torch of wisdom, teacher and student with glowing book, heartwarming moment, golden light connecting them, inspirational, ultra detailed",
    "ultimate knowledge universe, galaxies made of swirling words, cosmic landscape, magnificent and awe-inspiring, sci-fi epic, ultra detailed masterpiece"
  ];

  // 生成精彩的故事内容
  const generateParagraphs = () => {
    const paragraphs: string[] = [];
    const wordCount = chapterWords.length;
    
    if (wordCount === 0) return paragraphs;
    
    // 第一段：精彩的开篇
    paragraphs.push(`# Chapter ${chapterIndex + 1}: The <span class="vocab-word" data-word-id="pdf_${startWord + 1}">${chapterWords[0]}</span> of Destiny`);
    
    paragraphs.push(`In a world where words hold magical power, our hero embarks on an epic journey through the realm of vocabulary. The ancient prophecy speaks of a chosen one who will master the <span class="vocab-word" data-word-id="pdf_${startWord + 2}">${chapterWords[1] || ''}</span> and bring balance to the land of lexicons.`);
    
    if (wordCount > 2) {
      paragraphs.push(`As the sun rose over the <span class="vocab-word" data-word-id="pdf_${startWord + 3}">${chapterWords[2]}</span> mountains, our hero prepared for the challenges ahead. With <span class="vocab-word" data-word-id="pdf_${startWord + 4}">${chapterWords[3]}</span> in their heart and <span class="vocab-word" data-word-id="pdf_${startWord + 5}">${chapterWords[4]}</span> in their mind, they stepped forward into the unknown.`);
    }
    
    // 每10个单词生成一段精彩的故事
    for (let i = 5; i < wordCount; i += 10) {
      const endIdx = Math.min(i + 10, wordCount);
      const wordSlice = chapterWords.slice(i, endIdx);
      
      // 为每个单词创建带span的标签
      const spanWords = wordSlice.map((word, idx) => 
        `<span class="vocab-word" data-word-id="pdf_${startWord + i + idx + 1}">${word}</span>`
      );
      
      // 生成精彩的故事段落
      if (spanWords.length > 0) {
        const storyTemplates = [
          `Suddenly, a mysterious figure appeared, wielding the power of ${spanWords[0]}. "Beware," they warned, "the path ahead is filled with ${spanWords[1] || 'danger'} and ${spanWords[2] || 'treachery'}!"`,
          `Deep in the enchanted forest, they discovered a hidden clearing where ${spanWords[0]} grew wild. The air was thick with ${spanWords[1] || 'magic'}, and the trees whispered secrets of ${spanWords[2] || 'ancient times'}.`,
          `The guardian of the valley stepped forward, blocking the path with ${spanWords[0]}. "To pass," they said, "you must prove your worth by demonstrating your knowledge of ${spanWords[1] || 'the ancient arts'}."`,
          `With a burst of courage, our hero summoned the power of ${spanWords[0]}, shattering the barriers that stood in their way. The ground shook with ${spanWords[1] || 'tremors'}, and the sky lit up with ${spanWords[2] || 'brilliant light'}!`,
          `As they ventured deeper, the landscape transformed into a breathtaking vista of ${spanWords[0]} and ${spanWords[1] || 'wonder'}. It was a sight that filled their heart with ${spanWords[2] || 'awe'} and their mind with ${spanWords[3] || 'inspiration'}.`
        ];
        
        const randomTemplate = storyTemplates[Math.floor(Math.random() * storyTemplates.length)];
        paragraphs.push(randomTemplate);
        
        if (spanWords.length > 3) {
          paragraphs.push(`The journey continued through landscapes of ${spanWords[3]}, where time seemed to move differently. Every step revealed new ${spanWords[4] || 'discoveries'} and unexpected ${spanWords[5] || 'challenges'} that tested their resolve.`);
        }
      }
    }
    
    // 结尾段落
    paragraphs.push(`And so, with ${wordCount} new words mastered, our hero stood triumphantly at the chapter's end, ready to face whatever lay beyond. The knowledge gained here would prove invaluable in the adventures yet to come!`);
    
    return paragraphs;
  };
  
  const content = generateParagraphs().join('\n\n');
  
  const wordIds: string[] = [];
  for (let i = 0; i < Math.min(100, chapterWords.length); i++) {
    wordIds.push(`pdf_${startWord + i + 1}`);
  }
  
  return {
    id: `novel-chapter-${chapterIndex}`,
    title: chapterTitles[chapterIndex % chapterTitles.length] || `Chapter ${chapterIndex + 1}: The Journey Continues`,
    content: content.trim(),
    wordIds,
    illustration: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(illustrationPrompts[chapterIndex % illustrationPrompts.length] || illustrationPrompts[0])}&image_size=landscape_16_9`,
  };
};

export const novelChapters: NovelChapter[] = [];

// 生成所有章节
const chapterCount = Math.ceil(vocabularyList.length / 100);
for (let i = 0; i < chapterCount; i++) {
  novelChapters.push(generateChapterContent(i, 100));
}
