# 18 Tuple Length

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/18-easy-tuple-length/README.zh-CN.md)

对于给定的元组，您需要创建一个通用的`Length`，选择元组的长度

例如

```ts
type tesla = ["tesla", "model 3", "model X", "model Y"];
type spaceX = [
  "FALCON 9",
  "FALCON HEAVY",
  "DRAGON",
  "STARSHIP",
  "HUMAN SPACEFLIGHT"
];

type teslaLength = Length<tesla>; // expected 4
type spaceXLength = Length<spaceX>; // expected 5
```

## 答案

```ts
type Length<T extends any[]> = T["length"];
```

## 分析

`Length`的类型参数首先要是元组, 约束`T extends any[]`

对于`T`, 我们只需要获取`"length"`属性并返回即可

伪码如下

```js
function Length(T) {
  if(!(T extends Array)) throw new Error()

  return typeOf(T["length"])
}
```
