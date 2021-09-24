# 0108 Trim

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/108-medium-trim/README.md)

实现`Trim<T>`类, 该类型接受一个`string`类星作为参数, 返回将这个类型两侧的空格去掉后的类型

举个栗子:

```ts
type trimed = Trim<"  Hello World  ">; // expected to be 'Hello World'
```

## 答案

```ts
type W = " " | "\t" | "\n";
type Trim<T extends string> = T extends `${W}${infer R}`
  ? Trim<R>
  : T extends `${infer L}${W}`
    ? Trim<L>
    : T;
```

## 分析

同[0106-TrimLeft](../0106-TrimLeft-medium)的解法, 只是变成了双边, 需要进行二重判断
