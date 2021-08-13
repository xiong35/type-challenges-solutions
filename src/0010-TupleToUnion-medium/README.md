# 0010 TupleToUnion

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/10-medium-tuple-to-union/README.zh-CN.md)

实现一个通用类`TupleToUnion<T>`, 该类将一个元组转化成其中值的联合类型

例如

```ts
type Arr = ["1", "2", "3"];

const a: TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
```

## 答案

```ts
type TupleToUnion<T extends readonly any[]> = T[number];
```

## 分析

TS 2.1 以后定义了一种叫做 **[look up type](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-1.html#keyof-and-lookup-types)** 的操作, 改操作允许通过对类型取属性名以得到其值的类型

```ts
type P1 = string["charAt"]; // (pos: number) => string
type P2 = string[]["push"]; // (...items: string[]) => number
```

除了可以取属性名, 还可以取属性名的联合类型, 或者取一整个类型(据初步测试, 只支持`number`类型):

```ts
/* 取属性名的联合类型 */
type P3 = string[]["shift" | "push"]; // (() => number) | ((...items: number[]) => number)
/* 取一整个类型(只支持 number) */
type P4 = string[][number]; // string
type P5 = string[][string]; // Error 类型“string”不能作为索引类型使用
type P6 = string[][Function]; // Error 类型“Function”不能作为索引类型使用
```

回到本题, 使用`number`做索引就可以完美解决问题了, 注意需要限制类型参数`T`为数组

```ts
type TupleToUnion<T extends readonly any[]> = T[number];
```
