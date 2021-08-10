# 14 First Of Array

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/14-easy-first/README.zh-CN.md)

实现一个通用类`First<T>`，它接受一个数组 T 并返回它的第一个元素的类型。

例如

```ts
type arr1 = ["a", "b", "c"];
type arr2 = [3, 2, 1];

type head1 = First<arr1>; // expected to be 'a'
type head2 = First<arr2>; // expected to be 3
```

## 答案

```ts
type First<T extends any[]> = T["length"] extends 0 ? unknown : T[0];
```

## 分析

`First`接受的泛型参数需为数组类型, 所以约束他为`T extends any[]`

我们可以直接通过下标`0`来获取数组的第一个类型

```ts
type First<T extends any[]> = T[0];
```

且慢, 万一传入的是个空数组怎么办? (虽然题目没有说)

通过数组的`"length"`属性可获得其长度, 假如它长度为`0`, 即`T["length"] extends 0`为`true`
(`T["length"]`可以为`0, 1, 2, ...`, 此处数字均为类型而非值),
则返回`unknown`, 否则才返回第一个类型

```ts
type First<T extends any[]> = T["length"] extends 0 ? unknown : T[0];
```

伪码如下

```js
function First(T) {
  if(!(T extends Array)) throw new Error()

  if(typeOf(T.length) is subset of 0) return unknown

  return typeOf(T[0])
}
```
