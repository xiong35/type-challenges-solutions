# 1042 Is Never

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/1042-medium-isnever/README.md)

实现`IsNever`类, 当且仅当传入`never`时返回 true, 其他时候返回 false

举个栗子:

```ts
type A = IsNever<never>; // expected to be true
type B = IsNever<undefined>; // expected to be false
type C = IsNever<null>; // expected to be false
type D = IsNever<[]>; // expected to be false
type E = IsNever<number>; // expected to be false
```

## 答案

```ts
type IsNever<T> = [T] extends [never] ? true : false;
```

## 分析

如果凭直觉写下这样的代码是不能达到预期的:

```ts
type IsNever<T> = T extends never ? true : false;
```

原因是`extends`会对类型进行**分配**的操作, 也就是会遍历联合类型中的每一项, 如果是单个类型, 视为只有
一个元素的联合, 如果是`never`, 视为空集, 根本不会遍历它, 而是直接返回`never`

那么要怎么判断呢? 很简单, 只需要任选一种方式进行一层包装即可:

```ts
type IsNever<T> = [T] extends [never] ? true : false;
type IsNever<T> = T[] extends never[] ? true : false;
type IsNever<T> = { foo: T } extends { foo: never } ? true : false;
```
