const fs = require('fs');
const csvContent = fs.readFileSync('/workspace/src/data/vocabulary.csv', 'utf8');
const lines = csvContent.split('\n');

// 解析CSV
const vocabularyData = [];
for (let i = 1; i < lines.length; i++) {
  const line = lines[i].trim();
  if (!line) continue;
  
  const match = line.match(/^"([^"]+)","([^"]*)","([^"]*)","([^"]*)"$/);
  if (match) {
    vocabularyData.push({
      word: match[1],
      meaning: match[2],
      partOfSpeech: match[3],
      phonetic: match[4]
    });
  }
}

// 生成TypeScript代码
let tsCode = 'export interface VocabEntry {\n';
tsCode += '  word: string;\n';
tsCode += '  meaning: string;\n';
tsCode += '  partOfSpeech: string;\n';
tsCode += '  phonetic: string;\n';
tsCode += '  example?: string;\n';
tsCode += '}\n\n';
tsCode += 'export const vocabularyData: VocabEntry[] = [\n';

for (let i = 0; i < vocabularyData.length; i++) {
  const entry = vocabularyData[i];
  // 使用单引号并转义内容中的单引号
  const safeExample = entry.word.length > 4 
    ? "This is an example sentence with the word '" + entry.word + "'." 
    : "Learning '" + entry.word + "' helps expand your vocabulary.";
  
  // 转义所有字段中的特殊字符
  const safeWord = entry.word.replace(/'/g, "\\'");
  const safeMeaning = entry.meaning.replace(/'/g, "\\'");
  const safePOS = entry.partOfSpeech.replace(/'/g, "\\'");
  const safePhonetic = entry.phonetic.replace(/'/g, "\\'");
  
  tsCode += "  {\n";
  tsCode += "    word: '" + safeWord + "',\n";
  tsCode += "    meaning: '" + safeMeaning + "',\n";
  tsCode += "    partOfSpeech: '" + safePOS + "',\n";
  tsCode += "    phonetic: '" + safePhonetic + "',\n";
  tsCode += "    example: '" + safeExample + "'\n";
  tsCode += "  }";
  
  if (i < vocabularyData.length - 1) {
    tsCode += ',';
  }
  tsCode += '\n';
}

tsCode += '];\n';

fs.writeFileSync('/workspace/src/data/vocabularyData.ts', tsCode, 'utf8');
console.log('已生成 vocabularyData.ts，共', vocabularyData.length, '个单词');
