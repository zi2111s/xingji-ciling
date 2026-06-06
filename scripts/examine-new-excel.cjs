const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const workbook = XLSX.readFile('/workspace/考研英语5500词汇.xlsx');
console.log('工作表列表:', workbook.SheetNames);

const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

console.log('工作表范围:', worksheet['!ref']);

// 解析为文本并查看前几行
const csvContent = XLSX.utils.sheet_to_csv(worksheet);
const lines = csvContent.split('\n').filter(line => line.trim());

console.log('\n前 20 行数据:');
lines.slice(0, 20).forEach((line, i) => {
    console.log(`${i + 1}. ${line}`);
});

// 也查看一下原始单元格格式
const cells = Object.keys(worksheet).filter(key => !key.startsWith('!'));
console.log('\n前 10 个原始单元格:');
cells.slice(0, 10).forEach(cell => {
    console.log(`  ${cell}: ${JSON.stringify(worksheet[cell])}`);
});
