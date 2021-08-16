# 0599 Merge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/599-medium-merge/README.md)

Merge two types into a new type. Keys of the second type overrides keys of the first type.

将两个类型合并为一个, 其中第二个类型的属性会覆盖第一个的

举个栗子

```ts
type A = {
  foo: number;
  bar: string;
};
type B = {
  foo: boolean;
  baz: Function;
};

type M = Merge<A, B>;
/* 
type M = {
  foo: boolean;
  bar: string;
  baz: Function;
}
*/
```

## 答案

```ts
type Merge<A, B> = {
  [K in keyof A | keyof B]: K extends keyof B
    ? B[K]
    : K extends keyof A
    ? A[K]
    : never;
};
```

## 分析

同[527 Append To Object](../0527-AppendToObject-medium/)一题, 我们不能分别遍历`A`和`B`的属性, 因为
声明 type 的时候只能写一个中括号, 所以我们要一并遍历二者的属性, 再根据其来源分别处理

```ts
type Merge<A, B> = {
  // 遍历两者的并集
  [K in keyof A | keyof B]: K extends keyof B // 如果是 B 的属性, 直接使用(因为`B`优先级更高)
    ? B[K]
    : K extends keyof A // 此外就是`A`的属性了, 但是TS不认识, 还得再写一个判断
    ? A[K]
    : never; // 事实上到不了这一步
};
```
