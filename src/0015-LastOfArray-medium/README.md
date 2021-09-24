# 0015 Last Of Array

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/15-medium-last/README.zh-CN.md)

实现一个通用类`Last<T>`，它接受一个数组`T`并返回其最后一个元素的类型。

例如

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type tail1 = Last<arr1>; // expected to be 'c'
type tail2 = Last<arr2>; // expected to be 1
```

## 答案

```ts
type Last<T extends any[]> = T extends [...any, infer R] ? R : unknown;
```

## 分析

首先限制`T`是一个数组: `T extends any[]`, 然后通过`extends`条件可以"声明"一个新类型`R`,
这里`R`是数组最后一项的类型, 而前面项的类型我不关心, 使用 rest 运算符`...any`概括了, 随后返回`R`

伪码如下

```js
function Last(T) {
  if(!(T extends Array<any>)) throw new Error()

  const [...foo, R] = T // js 中的 rest 运算符只能用在数组末尾, 而ts类型中可以用在开头

  return R
}
```
