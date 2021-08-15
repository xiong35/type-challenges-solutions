# 0296 Permutation

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/296-medium-permutation/README.md)

Implement permutation type that transforms union types into the array that includes permutations of unions.

实现一个`Permutation`类, 该类能将联合类型转化成一个包含 其中各项的排列组合 的数组类型

举个栗子

```ts
type perm = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
```

## 答案

```ts
type Permutation<T, K = T> = [T] extends [never]
  ? []
  : T extends any
  ? [T, ...Permutation<Exclude<K, T>>]
  : never;
```

## 分析

我们可以用分治的方法, 将问题化为一个个更小的问题来解决:

首先, 我们遍历联合类型的每一项, 将此项和剩余项的排列组合并在一起, 就得到了这个问题的答案

1. **遍历联合类型的每一项**: 用 TS 中使用条件语句产生的分配([distribute](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types))特性, 可以对联合类型进行迭代
2. **剩余项的排列组合**: 递归地使用`Permutation<Exclude<所有项, 当前项>>`即可

我们将代码实现如下

```ts
type Permutation<T> = T extends any // `T extends any`仅是为了遍历`T`
  ? [T, ...Permutation<Exclude<原来的联合, T>>] // 此处T已经是原本联合中的一个项(而非传入的联合了, 尽管名字相同)
  : never;
```

如何得到原来的联合呢, 我们可以多声明一个类型来储存之

```ts
type Permutation<T, K = T> = T extends any
  ? [T, ...Permutation<Exclude<K, T>>] // 此处T已经是原本联合中的一个项(而非传入的联合了, 尽管名字相同)
  : never;
```

接下来我们处理边界情况, 递归的终点是什么呢?  
递归到最后只剩一项的时候, 迭代`T`(一个联合, 即`K`)产生的`T`(联合中的一项)是相同的, 那么`Exclude<K, T>`
会变成`never`类型, 在传入`never`时我们应该停止递归, 返回一个空数组:

```ts
type Permutation<T, K = T> = [T] extends [never] // 判断是否为 never
  ? [] // 是 never 的话返回空数组
  : T extends any
  ? [T, ...Permutation<Exclude<K, T>>]
  : never;
```

> 关于如何判断 `never`, 可以参考[这个 issue](https://github.com/microsoft/TypeScript/issues/23182#issuecomment-379091887)
