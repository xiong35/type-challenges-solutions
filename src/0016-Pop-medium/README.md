# 0016 Pop-medium

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/16-medium-pop/README.zh-CN.md)

实现一个通用类`Pop<T>`，它接受一个数组 T 并返回一个没有最后一个元素的数组。

例如

```ts
type arr1 = ["a", "b", "c", "d"];
type arr2 = [3, 2, 1];

type re1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
type re2 = Pop<arr2>; // expected to be [3, 2]
```

**额外任务**：同样地，您也可以实现`Shift`，`Push`和`Unshift`吗？

## 答案

```ts
type Pop<T extends any[]> = T extends [...(infer P), any] ? P : unknown;
type Shift<T extends any[]> = T extends [any, ...(infer S)] ? S : unknown;
type Push<T extends any[], E> = [...T, E];
type Unshift<T extends any[], E> = [E, ...T];
```

## 分析

对于`Pop`和`Shift`, 只要我们熟悉 [rest 运算符的用法](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html#variadic-tuple-types)
, 配合使用`extends`来"声明"一个类得到它捕获到的类型就能很轻易地写出答案了

对于`Push`和`Unshift`,
