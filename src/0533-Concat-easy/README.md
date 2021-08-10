# 0533 Concat

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/533-easy-concat/README.md)

在类型系统中实现 JavaScript `Array.concat` 函数.  
实现一个类`Concat`, 它接受两个类型参数, 返回类型应该将两个输入按照从左到右的顺序合并

举个栗子

```ts
type Result = Concat<[1], [2]>; // expected to be [1, 2]
```

## 答案

```ts
type Concat<A extends any[], B extends any[]> = [...A, ...B];
```

## 分析

TS 支持类似 JS 中的数组展开运算符`...`, 详见[Push type to the end of the tuple](https://stackoverflow.com/questions/58546710/push-type-to-the-end-of-the-tuple)

利用这个运算符我们可以很轻松的得到答案

```ts
type Concat<A extends any[], B extends any[]> = [...A, ...B];
```

伪码如下

```ts
function Concat(A, B) {
  if((A is not subset of Array<any>) && (B is not subset of Array<any>)) throw new Error()

  return [...A, ...B]
}
```
