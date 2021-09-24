# 0020 PromiseAll

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/20-medium-promise-all/README.zh-CN.md)

实现函数`PromiseAll`，它接受 PromiseLike 对象数组，返回值应为`Promise<T>`，其中`T`是 resolve 的结果数组。

例子:

```ts
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise<string>((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

// expected to be `Promise<[number, number, string]>`
const p = PromiseAll([promise1, promise2, promise3] as const);
```

## 答案

```ts
declare function PromiseAll<T extends readonly any[]>(
  promises: T
): Promise<
  {
    -readonly [K in keyof T]: T[K] extends Promise<infer P> ? P : T[K];
  }
>;
```

## 分析

首先题目要求我们声明一个函数的定义, 而不用实现它, 我们可以使用`declare function`的语法来声明

```ts
// 声明一个名为"PromiseAll"的函数, 接受一个数组作为参数, 返回一个 promise
declare function PromiseAll<T extends readonly any[]>(
  promises: T
): Promise<any>; // TODO
```

接下来, 如何限定我们返回的`Promise`的具体类型呢? 注意到, **数组也是对象**, 只是属性名 number 类型, 所以我们
可以用构造对象的方式构造一个数组!

```ts
declare function PromiseAll<T extends any[]>(
  promises: T
): Promise<
  // keyof T 是 "0" | "1" | "2" | "3" ...
  {
    [K in keyof T]: T[K] extends Promise<infer P> ? P : T[K]; // 如果是 Promise 类型就解构, 否则原样返回
  }
>;
```

最后, 在传入的参数检查中加上`readonly`, 在返回对象上去除此标记, 就得到了最后的代码

```ts
declare function PromiseAll<T extends readonly any[]>(
  promises: T
): Promise<
  {
    -readonly [K in keyof T]: T[K] extends Promise<infer P> ? P : T[K];
  }
>;
```
