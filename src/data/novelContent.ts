
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
    "futuristic sci-fi scene with glowing words floating in space, young student standing amidst magical vocabulary particles, cosmic background with stars and nebulae, vibrant colors, digital art style",
    "fantasy journey through a magical forest with word symbols on leaves, adventurer walking on a path made of books, enchanted atmosphere, whimsical and inspiring",
    "ancient temple of knowledge with glowing runes and floating books, mysterious atmosphere, epic fantasy art style",
    "hero facing a giant book monster, epic battle of intellect, action scene with vocabulary shields and word weapons, dynamic composition",
    "wise sage teaching in a grand library, wisdom flowing from books, golden light rays, spiritual and educational",
    "character climbing a mountain made of dictionaries, perseverance theme, motivational scene, sunrise at peak",
    "magic portal made of glowing words leading to another dimension, adventure and discovery theme, mysterious",
    "mythical creature guardian of the vocabulary realm, majestic and gentle, protecting a treasure of books",
    "grand bridge of knowledge connecting two floating islands, journey theme, breathtaking view",
    "glowing golden key made of letters, revealing secrets, mysterious and magical",
    "whispering library with books floating around, ethereal voices, magical atmosphere",
    "final showdown with knowledge dragon, epic and heroic, triumphant moment",
    "sudden realization moment with lightbulb made of words, eureka moment, bright and inspiring",
    "standing atop a mountain of books, overlooking a vast knowledge landscape, victorious",
    "celebration of learning victory, confetti made of words, joyful atmosphere",
    "master walking on a path of enlightenment, glow around, wise and peaceful",
    "eternal wisdom tree with books as leaves, infinite knowledge, majestic and timeless",
    "passing on the legacy, teacher and student with glowing book, heartwarming and inspiring",
    "ultimate knowledge universe, galaxies made of words, cosmic and magnificent"
  ];
  
  let content = '';
  
  if (chapterIndex === 0) {
    content = `
In the vast expanse of the universe, there exists an <span class="vocab-word" data-word-id="pdf_2">exclusive</span> kingdom
where <span class="vocab-word" data-word-id="pdf_4">establish</span> themselves as the <span class="vocab-word" data-word-id="pdf_6">specialist</span> in linguistic power. Every <span class="vocab-word" data-word-id="pdf_3">alongside</span> this reality, the <span class="vocab-word" data-word-id="pdf_5">limit</span> of vocabulary holds the <span class="vocab-word" data-word-id="pdf_7">hostility</span> that threatens to <span class="vocab-word" data-word-id="pdf_9">inherit</span> to <span class="vocab-word" data-word-id="pdf_8">upgrade</span> and <span class="vocab-word" data-word-id="pdf_11">apart</span> the <span class="vocab-word" data-word-id="pdf_13">statistics</span> of <span class="vocab-word" data-word-id="pdf_14">mobile</span> to <span class="vocab-word" data-word-id="pdf_15">well-being</span> and <span class="vocab-word" data-word-id="pdf_16">security</span> across the <span class="vocab-word" data-word-id="pdf_17">clue</span> world.

Our story begins with Lin Chen, a young student with <span class="vocab-word" data-word-id="pdf_19">regulatory</span> dreams of <span class="vocab-word" data-word-id="pdf_21">modest</span> origin. He <span class="vocab-word" data-word-id="pdf_20">reminder</span> his <span class="vocab-word" data-word-id="pdf_22">cue</span> and <span class="vocab-word" data-word-id="pdf_23">suggest</span> that he should <span class="vocab-word" data-word-id="pdf_24">sort</span> through his priorities, seeking <span class="vocab-word" data-word-id="pdf_25">valid</span> ways to <span class="vocab-word" data-word-id="pdf_26">productivity</span>. The <span class="vocab-word" data-word-id="pdf_27">hinder</span> his progress <span class="vocab-word" data-word-id="pdf_29">aspect</span> of his <span class="vocab-word" data-word-id="pdf_30">dim</span> and <span class="vocab-word" data-word-id="pdf_31">nasty</span> fears, <span class="vocab-word" data-word-id="pdf_32">supervision</span> and <span class="vocab-word" data-word-id="pdf_33">pick up</span> his <span class="vocab-word" data-word-id="pdf_34">dramatically</span> and <span class="vocab-word" data-word-id="pdf_35">contrary</span> to <span class="vocab-word" data-word-id="pdf_36">wrong</span> thoughts.
    `;
  } else {
    content = `
Chapter ${chapterIndex + 1}: The <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 1}">${chapterWords[0]}</span> of <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 2}">${chapterWords[1]}</span>

As Lin Chen's journey continued, he discovered the <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 3}">${chapterWords[2]}</span> of <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 4}">${chapterWords[3]}</span> and the <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 5}">${chapterWords[4]}</span> of <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 6}">${chapterWords[5]}</span> power. The <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 7}">${chapterWords[6]}</span> world <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 8}">${chapterWords[7]}</span> with <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 9}">${chapterWords[8]}</span> as he <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 10}">${chapterWords[9]}</span> towards his <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 11}">${chapterWords[10]}</span> destiny.

Every step forward revealed new <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 12}">${chapterWords[11]}</span> and <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 13}">${chapterWords[12]}</span> that <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 14}">${chapterWords[13]}</span> his <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 15}">${chapterWords[14]}</span> understanding. The <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 16}">${chapterWords[15]}</span> challenges only made him <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 17}">${chapterWords[16]}</span> more <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 18}">${chapterWords[17]}</span> and <span class="vocab-word" data-word-id="pdf_${(chapterIndex % 20) + 19}">${chapterWords[18]}</span>.
    `;
  }
  
  const wordIds: string[] = [];
  for (let i = 0; i < Math.min(100, chapterWords.length); i++) {
    wordIds.push(`pdf_${startWord + i + 1}`);
  }
  
  return {
    id: `novel-chapter-${chapterIndex}`,
    title: chapterTitles[chapterIndex] || `Chapter ${chapterIndex + 1}: The Journey Continues`,
    content: content.trim(),
    wordIds,
    illustration: `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=${encodeURIComponent(illustrationPrompts[chapterIndex] || illustrationPrompts[0])}&image_size=landscape_16_9`,
  };
};

export const novelChapters: NovelChapter[] = [];

for (let i = 0; i < 19; i++) {
  novelChapters.push(generateChapterContent(i, 100));
}
