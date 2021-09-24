# 0009 DeepReadonly

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/9-medium-deep-readonly/README.zh-CN.md)

实现一个通用的`DeepReadonly<T>`，它将对象的每个参数及其子对象递归地设为只读。

您可以假设在此挑战中我们仅处理对象。数组，函数，类等都无需考虑。但是，您仍然可以通过覆盖尽可能多的不同案例来挑战自己。

例如

```ts
type X = {
  x: {
    a: 1;
    b: "hi";
  };
  y: "hey";
};

type Expected = {
  readonly x: {
    readonly a: 1;
    readonly b: "hi";
  };
  readonly y: "hey";
};

const todo: DeepReadonly<X>; // should be same as `Expected`
```

## 答案

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string | number | symbol, any>
    ? DeepReadonly<T[K]>
    : T[K];
};
```

## 分析

此处的关键在于递归, 对于一个对象, 如果我们只使用普通的`Readonly`处理, 那么只有第一层的属性会被
设置成只读, 而其内部的深层的属性会原封不动的照搬原来的对象. 为了实现深层次的`readonly`, 我们可以递归地
对其内部属性设置`readonly`

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};
```

此外, 根据题目要求, 对数组，函数，类等不需要处理, 即我们只处理 JS 对象即可, 改写为以下即为答案

```ts
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends Record<string | number | symbol, any>
    ? DeepReadonly<T[K]>
    : T[K];
};
```

伪码如下:

```js
function DeepReadonly(T) {
  const returnType = {};

  for (let K in T) {
    if(T[K] is object) returnType[K] = DeepReadonly(T[K]);
    else returnType[K] = T[K];
  }

  return returnType;
}
```
