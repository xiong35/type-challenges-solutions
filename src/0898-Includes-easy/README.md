# 0898 Includes

## 题目

在类型系统中实现 JS 中的`Array.includes`函数. `Includes`类接受两个泛型参数, 返回值应为`true`或者`false`

举个栗子

```ts
type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
```

## 答案

```ts
type Includes<A extends any[], T> = T extends A[number] ? true : false;
```

## 分析

对于一个数组的类型`A`, 我们通过`A[number]`可以很快的获得它里面元素类型的 union, 如

```ts
type Arr = [1, 2, 3];
type U = Arr[number]; // 1 | 2 | 3
```

判断`T`是否`extends`给定数组是不能解决此问题, 而判断它是否`extends`数组里面元素类型的 union 就可以解决问题

```ts
type Includes<A extends any[], T> = T extends A[number] ? true : false;
```

伪码如下

```js
function Includes(A, T) {
  let unionType;
  for(let K in A) {
    if(K extends number) {
      unionType |= A[K]
    }
  }

  return (T is subset of unionType)
}
```
