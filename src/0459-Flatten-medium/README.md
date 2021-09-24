# 0459 Flatten

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/459-medium-flatten/README.md)

实现`Flatten`类, 接受一个多维数组作为参数, 将其展开成一维并返回

例子:

```ts
type F = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
```

## 答案

```ts
type Flatten<T> = T extends []
  ? []
  : T extends [infer F, ...(infer R)]
  ? [...Flatten<F>, ...Flatten<R>]
  : [T];
```

## 分析

不论过程如何, 我们一定需要遍历数组的每一个元素, 分别将他们展开, 最后再合并.  
遍历的操作并不好实现, 我们换一个思路, 我们可以每次对数组的第一个元素做展开, 再对
剩余元素构成的数组做展开, 再将二者合并, 即能达到遍历的效果

```ts
type Flatten<T> = T extends [infer F, ...(infer R)]
  ? [...Flatten<F>, ...Flatten<R>]
  : /* TODO */;
```

如果递归到了最后一层, 当前元素不是数组的话, 我们也要将其包装为数组, 方便上一层递归做展开操作

```ts
type Flatten<T> = T extends [infer F, ...(infer R)]
  ? [...Flatten<F>, ...Flatten<R>]
  : [T];
```

再处理一下空数组的边界情况即可:

```ts
type Flatten<T> = T extends []
  ? [] // 如果不加这一步, 空数组会变成`[[]]`, 展开后还会有一个空数组
  : T extends [infer F, ...(infer R)]
  ? [...Flatten<F>, ...Flatten<R>]
  : [T];
```
