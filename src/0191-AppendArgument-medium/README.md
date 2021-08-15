# 0191 AppendArgument

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/191-medium-append-argument/README.ja.md)

实现一个范型 `AppendArgument<Fn, A>`，对于给定的函数类型 `Fn`，以及一个任意类型 `A`，返回一个新的函数 `G`。
`G` 拥有 `Fn` 的所有参数并在末尾追加类型为 `A` 的参数。

举个栗子

```ts
type Fn = (a: number, b: string) => number;

type Result = AppendArgument<Fn, boolean>;
// 期望是 (a: number, b: string, x: boolean) => number
```

## 答案

```ts
type AppendArgument<Fn extends Function, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, A]) => R
  : never;
```

## 分析

我们可以通过`infer`来得到原函数的参数类型及返回值类型, 只需要返回一个函数类型, 该类型的
参数是原来参数基础上添加`A`类型, 返回值类型和原来相同

```ts
type AppendArgument<Fn extends Function, A> = Fn extends (
  ...args: infer Args // 得到原函数参数类型
) => infer R // 得到原函数返回值类型
  ? (...args: Args, a: A) => R // 返回的函数
  : never;
```

可是这样写是错误的, 因为 rest 参数必须是参数列表中的最后一个参数.

我们改进写法如下即可

```ts
type AppendArgument<Fn extends Function, A> = Fn extends (
  ...args: infer Args
) => infer R
  ? (...args: [...Args, A]) => R
  : never;
```
