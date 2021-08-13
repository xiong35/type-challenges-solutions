const fs = require("fs");

// 预定义变量
const title = "## 题目速览 🗺";
const EN2CH = {
  easy: "简单",
  medium: "中等",
  hard: "困难",
  extrem: "地狱",
};

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

answerDirNames.forEach((name) => {
  const linkContent = name.replace(
    /^0*(\d*)-(\w+)-(\w+)$/,
    (_match, id, name, lv) => {
      console.log(id, name, lv);
      return `${id} ${cammel2Words(name)} ${EN2CH[lv]}`;
    }
  );

  newContent += `- [${linkContent}](src/${name})\n`;
});

// 执行写入操作
console.log("- 开始写入");
fs.writeFileSync("README.md", newContent);
console.log("- 写入完成");
