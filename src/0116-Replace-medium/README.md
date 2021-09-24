# 0116 Replace

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/116-medium-replace/README.md)

实现`Replace<S, From, To>`类, 该类接受三个字符串类型, 将`S`串中的`From`修改为`To`并返回

举个栗子:

```ts
type replaced = Replace<"types are fun!", "fun", "awesome">; // expected to be 'types are awesome!'
```

## 答案

```ts
type Replace<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
  ? `${L}${T}${R}`
  : S;
```

## 分析

我们将`S`拆分成 _左, 匹配, 右_ 三个部分, 并返回 _左, 替换, 右_ 的拼接即可

通过模板字面量+`infer`的语法, 我们可以很轻松的实现

```ts
// 注意`F extends string, T extends string`中 `extends string`是必须的, 否则无法在模板中使用
type Replace<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
  ? `${L}${T}${R}`
  : S;
```
