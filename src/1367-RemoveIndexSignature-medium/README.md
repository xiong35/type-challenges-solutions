# 1367 Remove Index Signature

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/1367-medium-remove-index-signature/README.md)

实现`RemoveIndexSignature<T>`类, 将给定对象类型的索引 , 去除对象的 [index signature](https://basarat.gitbook.io/typescript/type-system/index-signatures) 属性

举个栗子:

```ts
type Foo = {
  [key: string]: any;
  foo(): void;
};

type A = RemoveIndexSignature<Foo>; // expected { foo(): void }
```

## 答案

```ts
type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
};
```

## 分析

去除 index signature, 即去除原对象中`string`或`number`类型的 key, 利用 TS 中的[`as`](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html#key-remapping-via-as)关键字我们很容易做到:

```ts
type RemoveIndexSignature<T> = {
  [K in keyof T as (string extends K ? never : number extends K ? never : K)]: T[K]
  // ---------------^^^^^^^^^^^^^^^^ 如果 K 是 string 或 number 返回 never, 否则照常返回
  // 此操作相当于 filter 了 K, 返回 never 的丢弃, 同时 map 了 K, 只是 map 的结果是原样返回
};
```
