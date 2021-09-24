# 0110 Capitalize

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/110-medium-capitalize/README.md)

实现内置类`Capitalize<T>`, 该类接受一个字符串类型作为参数, 返回的类型将这个串的首字母变成大写, 其他不变

举个栗子

```ts
type capitalized = MyCapitalize<"hello world">; // expected to be 'Hello world'
```

## 答案

```ts
  type CharMap = {
    "a": "A",
    "b": "B",
    /* ... */
    "z": "Z",
  }
  type MyCapitalize<T extends string> = T extends `${infer F}${infer R}`
    ? `${F extends keyof CharMap ? CharMap[F] : F}${R}`
    : T
```

## 分析

通过模板字面量的语法, 我们可以提取出一个字符串类型的首字母和剩余字符串, 之后我们构造一个 map 用来将
小写字母映射成大写, 将首字母作为索引可找到其对应的大写字母, 最后使用模板语法拼接回去即可

```ts
type MyCapitalize<T extends string> = T extends `${infer F}${infer R}`
  ? `${F extends keyof CharMap ? CharMap[F] : F}${R}`
  : T
```
