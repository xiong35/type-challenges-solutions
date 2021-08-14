# 0119 Replace All

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/119-medium-replaceall/README.md)

实现`ReplaceAll<S, From, To>`类, 该类接受三个字符串类型, 将`S`串中所有出现的`From`修改为`To`并返回

举个栗子:

```ts
type replaced = ReplaceAll<"t y p e s", " ", "">; // expected to be 'types'
```

## 答案

```ts
  type Replace<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
    ? `${L}${T}${R}`
    : S;
  type ReplaceAll<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
    ? ReplaceAll<Replace<S, F, T>, F, T>
    : S
```

## 分析

逻辑基本同[0116-Replace-medium](../0116-Replace-medium), 只是增加了一个递归的处理
