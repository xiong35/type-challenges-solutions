# 0645 Diff

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/645-medium-diff/README.md)

实现`Diff`类, 接受两个类型作为参数, 返回二者不同名的属性的集合

举个栗子

```ts
type A = {
  foo: string;
  bar: number;
  a: Function;
};
type B = {
  foo: string;
  bar: boolean;
  b: symbol;
};

type D = Diff<A, B>;
/* 
type D = {
  a: Function;
  b: symbol;
}
*/
```

## 答案

```ts
type Diff<A, B> = {
  [K in keyof A | keyof B as Exclude<K, keyof A & keyof B>]:
    K extends keyof A
      ? A[K]
      : K extends keyof B
        ? B[K]
        : never;
};
```

## 分析

将`keyof A`记作`Ak`, `keyof B`记作`Bk`

`Ak`与`Bk`的并集 减去 `Ak`与`Bk`的交集 即为二者不同的属性名, 对于其中的每一个属性, 判断它是来自`A`
还是来自`B`, 据此找出其来源的类型并使用之即可

```ts
type Diff<A, B> = {
  //                                    A B 的交集
  // -----------------------------------∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨∨
  [K in keyof A | keyof B as Exclude<K, keyof A & keyof B>]:
  // ---^^^^^^^^^^^^^^^^^
  //    A B 的并集
    K extends keyof A // 如果来自 A
      ? A[K] // 取 A 中对应的类型
      : K extends keyof B // 如果来自 B
        ? B[K] // 取 A 中对应的类型
        : never; // 不可能到这一步
```
