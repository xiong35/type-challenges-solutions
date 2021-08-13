const fs = require("fs");

// 预定义变量
const title = "## 题目速览 🗺";
const EN2CH = [
  { en: "easy", cn: "简单" },
  { en: "medium", cn: "中等" },
  { en: "hard", cn: "困难" },
  { en: "extrem", cn: "地狱" },
];

// 读取原文件
const READMEContent = fs.readFileSync("README.md").toString();
let newContent = READMEContent.split(title)[0] + title + "\n\n";

// 读取最新的答案列表写入文件
const answerDirNames = fs.readdirSync("./src");

function cammel2Words(str) {
  return str.replace(/[A-Z]/g, (c, index) =>
    index ? " " + c.toLowerCase() : c.toLowerCase()
  );
}
const reg = /^0*(\d*)-(\w+)-(\w+)$/;
answerDirNames
  .map((fullName) => {
    // 提取出需要的信息
    const [_match, id, name, lv] = reg.exec(fullName);
    return {
      name,
      fullName,
      id,
      level: EN2CH.findIndex((item) => item.en === lv),
    };
  })
  .sort((a, b) => a.level - b.level) // 按难度升序排列
  .forEach((i) => {
    // 加入文末
    newContent += `- [${i.id} ${cammel2Words(i.name)}, ${
      EN2CH[i.level].cn
    }](src/${i.fullName})\n`;
  });

// 执行写入操作
console.log("- 开始写入");
fs.writeFileSync("README.md", newContent);
console.log("- 写入完成");
