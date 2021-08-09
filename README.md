
# TS 类型体操中文解答及分析

[Type Challenges](https://github.com/type-challenges/type-challenges)是一个收录了许多TS类型编程相关题目及解答的库, 本项目旨在对其中的问题做出全面且详细的解答和分析, 同时也是通过费曼学习法来提升自己的能力

## 前置知识

开始挑战前需要了解 TS 的基本概念, 在此推荐[菜鸟教程的TS基本语法教程](https://www.runoob.com/typescript/ts-tutorial.html). 还需要 TS 编译编辑环境, 推荐使用 VSCode+npm下载TS, 亦可[在线运行 TS 代码](https://www.tslang.cn/play/index.html)

其次, 最好先了解一下 TS 的高阶特性, 如泛型, `keyof`, `typeof`, `extend`等. 在此推荐[TS官网上的英文文档](https://www.typescriptlang.org/docs/handbook/2/types-from-types.html)

接着, 你可以前去[Type Challenges](https://github.com/type-challenges/type-challenges)官方地址处逛逛, 看看其中的题目及规范等

最后, 参考下方目录结构, `cd ./src`, 开始旅程吧

## 目录结构

`/src`目录下对每个题目建立了一个文件夹, 命名为`${编号}-${题目名称}-${难度}`, 其中各个文件夹下有两个文件

- `README.md`中依次包含
  -  题干
  -  我的解答
  -  详细分析
- `index.ts`中是最小可通过编译的代码, 其中包括
  - 可能存在的前置类型定义
  - 题干
  - 题解
  - 测试
