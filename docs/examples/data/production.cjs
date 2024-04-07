const fs = require('fs');
const archiver = require('archiver');
const { faker } = require('@faker-js/faker');
const JSZip = require('jszip');

// 生成JSON数据
const data = [];
for (let i = 0; i < 300000; i++) {
  data.push({
    index: i,
    id: faker.string.nanoid(),
    text: faker.lorem.sentences(),
    // text: '111',
  });
}
const jsonData = JSON.stringify(data);

// 创建输出文件流，用于存储ZIP文件
const output = fs.createWriteStream(`${__dirname}/data.zip`);

// 创建ZIP压缩文件的实例
const archive = archiver('zip');

// 设置输出文件流与压缩实例的关联
archive.pipe(output);

// 将JSON数据添加到压缩文件中
archive.append(jsonData, { name: 'data.json' });

// 结束添加文件并生成压缩文件
archive.finalize();

console.log('data.zip 已生成');

// 读取ZIP文件并解压
// setTimeout(() => {
//   fs.readFile(`${__dirname}/data.zip`, (err, data) => {
//     if (err) throw err;
//     JSZip.loadAsync(data).then(async (zip) => {
//       const data1 = await zip.file(`data.json`)?.async('string');
//       console.log('data1', data1);
//     });
//   });
// }, 5000);
