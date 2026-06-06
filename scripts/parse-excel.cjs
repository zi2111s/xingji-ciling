const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const workbook = XLSX.readFile('/workspace/5500词汇-20210509.xlsx');
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

// 解析为文本并获取每一行
const csvContent = XLSX.utils.sheet_to_csv(worksheet);
const lines = csvContent.split('\n').filter(line => line.trim());

console.log(`读取到 ${lines.length} 行数据`);

// 解析每一行 - 保持原始顺序
const wordArray = [];

for (const line of lines) {
    let cleanLine = line.trim().replace(/^"|"$/g, '');
    
    let match = cleanLine.match(/^(\d+\.?)\s*([^\s\[]+)\s*(\[.*?\])\s*(.*)$/);
    
    if (!match) {
        match = cleanLine.match(/^(\d+[.]*)\s*([^\s]+?)\s*(\[.*?\])\s*(.*)$/);
    }
    
    if (match) {
        let [, , word, phoneticRaw, explanation] = match;
        
        word = word.trim();
        
        let phonetic = phoneticRaw.replace(/^\[|\]$/g, '').trim();
        if (!phonetic.startsWith('/')) {
            phonetic = `/${phonetic}`;
        }
        if (!phonetic.endsWith('/')) {
            phonetic = `${phonetic}/`;
        }
        
        let partOfSpeech = '';
        let meaning = explanation;
        
        const posMatch = explanation.match(/^([a-z.]+)\s*(.*)$/i);
        if (posMatch) {
            partOfSpeech = posMatch[1];
            meaning = posMatch[2];
        } else {
            const anotherPosMatch = explanation.match(/^([a-z]+\.?)\s*(.*)$/i);
            if (anotherPosMatch) {
                partOfSpeech = anotherPosMatch[1];
                meaning = anotherPosMatch[2];
            }
        }
        
        if (word) {
            wordArray.push({
                word,
                meaning,
                partOfSpeech,
                phonetic
            });
        }
    }
}

console.log(`\n成功解析了 ${wordArray.length} 个单词（保持原始顺序）`);
console.log('解析的前 20 个单词:');
wordArray.slice(0, 20).forEach((entry, i) => {
    console.log(`${i + 1}. ${entry.word} ${entry.phonetic} ${entry.partOfSpeech} ${entry.meaning}`);
});

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

for (const entry of wordArray) {
    const example = `This is an example sentence with the word "${entry.word}".`;
    
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
console.log('\n✅ 已生成 vocabularyData.ts');

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

const chapterCount = Math.ceil(wordArray.length / 100);
pdfWordsContent += `
export const pdfWordBook: WordBook = {
  id: 'pdf-word-book',
  name: '考研英语词汇表',
  type: 'yingyu1',
  chapters: [
`;

for (let i = 0; i < chapterCount; i++) {
    const startWord = i * 100;
    const endWord = Math.min((i + 1) * 100, wordArray.length);
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
console.log('✅ 已更新 pdfWords.ts');

// 更新 CSV 文件
const csvLines = ['word,meaning,partOfSpeech,phonetic'];
for (const entry of wordArray) {
    const safeMeaning = entry.meaning.replace(/"/g, '""');
    const safePOS = entry.partOfSpeech.replace(/"/g, '""');
    const safePhonetic = entry.phonetic.replace(/"/g, '""');
    csvLines.push(`"${entry.word}","${safeMeaning}","${safePOS}","${safePhonetic}"`);
}

fs.writeFileSync('/workspace/src/data/vocabulary.csv', csvLines.join('\n'), 'utf8');
console.log('✅ 已更新 vocabulary.csv');

console.log('\n🎉 所有文件更新完成！');
console.log(`📊 总单词数: ${wordArray.length}`);
console.log(`✅ 保持了 Excel 中的原始顺序！`);
