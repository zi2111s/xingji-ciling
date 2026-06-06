const XLSX = require('xlsx');
const fs = require('fs');

// 读取 Excel 文件
const workbook = XLSX.readFile('/workspace/5500词汇-20210509.xlsx');
const firstSheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[firstSheetName];

console.log('工作表名称:', firstSheetName);
console.log('工作表范围:', worksheet['!ref']);

// 获取所有单元格
const cells = Object.keys(worksheet).filter(key => !key.startsWith('!'));
console.log('单元格数量:', cells.length);

// 查看前 20 个单元格
console.log('\n前 20 个单元格:');
cells.slice(0, 20).forEach(cell => {
    console.log(`  ${cell}: ${JSON.stringify(worksheet[cell])}`);
});

// 尝试以不同方式解析
console.log('\n\n=== 尝试以文本方式解析 ===');
const csvContent = XLSX.utils.sheet_to_csv(worksheet);
const lines = csvContent.split('\n').slice(0, 20);
console.log('\nCSV 格式前 20 行:');
lines.forEach((line, i) => {
    console.log(`${i + 1}. ${line}`);
});

// 尝试以 html 方式查看
console.log('\n\n=== 尝试以 html 方式查看 ===');
const htmlContent = XLSX.utils.sheet_to_html(worksheet);
console.log(htmlContent.substring(0, 1000));
