const fs = require('fs');

// 读取原始单词表
const rawContent = fs.readFileSync('/workspace/src/data/kaoyan-words-full.txt', 'utf8');
const lines = rawContent.split('\n').filter(line => line.trim());

// 解析单词数据
const wordData = {};

for (const line of lines) {
    const parts = line.split('\t');
    if (parts.length >= 2) {
        const word = parts[0].trim();
        const meaningPart = parts[1].trim();
        
        // 分离词性和释义
        let pos = '';
        let meaning = meaningPart;
        
        const posMatch = meaningPart.match(/^([a-z.]+)\s*(.*)$/i);
        if (posMatch) {
            pos = posMatch[1];
            meaning = posMatch[2];
        }
        
        wordData[word] = {
            word,
            meaning,
            partOfSpeech: pos,
            phonetic: `/${word.toLowerCase().replace(/[^a-z]/g, '')}/` // 简单生成音标占位符
        };
    }
}

console.log(`成功解析了 ${Object.keys(wordData).length} 个单词`);

// 生成 vocabularyData.ts
let tsContent = `export interface VocabEntry {
  word: string;
  meaning: string;
  partOfSpeech: string;
  phonetic: string;
  example?: string;
}

export const vocabularyData: VocabEntry[] = [
`;

for (const word in wordData) {
    const entry = wordData[word];
    const example = `This is an example sentence with the word "${entry.word}".`;
    
    // 转义双引号
    const safeWord = entry.word.replace(/"/g, '\\"');
    const safeMeaning = entry.meaning.replace(/"/g, '\\"');
    const safePOS = entry.partOfSpeech.replace(/"/g, '\\"');
    const safePhonetic = entry.phonetic.replace(/"/g, '\\"');
    const safeExample = example.replace(/"/g, '\\"');
    
    tsContent += `  {
    word: "${safeWord}",
    meaning: "${safeMeaning}",
    partOfSpeech: "${safePOS}",
    phonetic: "${safePhonetic}",
    example: "${safeExample}"
  },
`;
}

tsContent += `];
`;

fs.writeFileSync('/workspace/src/data/vocabularyData.ts', tsContent, 'utf8');
console.log('已生成 vocabularyData.ts');

// 更新 pdfWords.ts
let pdfWordsContent = `import { vocabularyData } from './vocabularyData';
import type { WordBook } from '@/types';

export interface WordEntry {
  id: string;
  word: string;
  phonetic: string;
  partOfSpeech: string;
  meaning: string;
  example: string;
}

export const pdfWords: Record<string, WordEntry> = {};

for (let i = 0; i < vocabularyData.length; i++) {
  const entry = vocabularyData[i];
  pdfWords[\`pdf_\${i + 1}\`] = {
    id: \`pdf_\${i + 1}\`,
    word: entry.word,
    phonetic: entry.phonetic,
    partOfSpeech: entry.partOfSpeech,
    meaning: entry.meaning,
    example: entry.example
  };
}

export const vocabularyList: string[] = vocabularyData.map(entry => entry.word);
`;

// 添加 pdfWordBook
const chapterCount = Math.ceil(Object.keys(wordData).length / 100);
pdfWordsContent += `
export const pdfWordBook: WordBook = {
  id: 'pdf-word-book',
  name: '考研英语词汇表',
  type: 'kaoyan',
  chapters: [
`;

for (let i = 0; i < chapterCount; i++) {
    const startWord = i * 100;
    const endWord = Math.min((i + 1) * 100, Object.keys(wordData).length);
    const wordIds = [];
    for (let j = startWord; j < endWord; j++) {
        wordIds.push(`pdf_${j + 1}`);
    }
    pdfWordsContent += `    {
      id: 'chapter-${i + 1}',
      bookId: 'pdf-word-book',
      name: '第${i + 1}章',
      wordIds: ${JSON.stringify(wordIds)}
    }${i < chapterCount - 1 ? ',' : ''}
`;
}

pdfWordsContent += `  ]
};
`;

fs.writeFileSync('/workspace/src/data/pdfWords.ts', pdfWordsContent, 'utf8');
console.log('已更新 pdfWords.ts');

// 更新 CSV 文件
const csvLines = ['word,meaning,partOfSpeech,phonetic'];
for (const word in wordData) {
    const entry = wordData[word];
    const safeMeaning = entry.meaning.replace(/"/g, '""');
    const safePOS = entry.partOfSpeech.replace(/"/g, '""');
    const safePhonetic = entry.phonetic.replace(/"/g, '""');
    csvLines.push(`"${word}","${safeMeaning}","${safePOS}","${safePhonetic}"`);
}

fs.writeFileSync('/workspace/src/data/vocabulary.csv', csvLines.join('\n'), 'utf8');
console.log('已更新 vocabulary.csv');

console.log('✅ 所有文件已更新完成！');
