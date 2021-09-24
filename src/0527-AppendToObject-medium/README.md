# 0527 Append To Object

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/527-medium-append-to-object/README.md)

实现一个类, 能将一个新的字段插入给定的类型中, 并返回之

举个栗子:

```ts
type Test = { id: "1" };
type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }
```

## 答案

```ts
type Key = string | number | symbol;
type AppendToObject<O extends Record<Key, any>, K extends Key, V> = {
  [k in keyof O | K]: k extends K ? V : O[k];
};
```

## 分析

一开始我直觉地写下这样的代码:

```ts
type AppendToObject<O extends Record<Key, any>, K extends Key, V> = {
  [k in keyof O]: O[k];
  K: V;
};
```

但是`K: V`这一行报错了, 不支持这样的写法, 我们只能写一次类型这样的语句`[k in keyof O]: O[k]`

那么我们就需要一次遍历完`keyof O`及`K`, 我们可以先把他们并在一起, 再对`K`做特殊处理即可:

```ts
type AppendToObject<O extends Record<Key, any>, K extends Key, V> = {
  [k in keyof O | K]: k extends K ? V : O[k];
};
```
