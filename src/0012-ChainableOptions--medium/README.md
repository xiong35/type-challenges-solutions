# 0012 Chainable Options

## 题目

在 JavaScript 中我们很常会使用可串联（Chainable/Pipeline）的函数构造一个对象，但在 TypeScript 中，你能合理的给他附上类型吗？

在这个挑战中，你可以使用任意你喜欢的方式实现这个类型 - Interface, Type 或 Class 都行。你需要提供两个函数 option(key, value) 和 get()。在 option 中你需要使用提供的 key 和 value 扩展当前的对象类型，通过 get 获取最终结果。

例如

```ts
declare const config: Chainable;

const result = config
  .option("foo", 123)
  .option("name", "type-challenges")
  .option("bar", { value: "Hello World" })
  .get();

// 期望 result 的类型是：
interface Result {
  foo: number;
  name: string;
  bar: {
    value: string;
  };
}
```

你只需要在类型层面实现这个功能 - 不需要实现任何 TS/JS 的实际逻辑。

你可以假设 key 只接受字符串而 value 接受任何类型，你只需要暴露它传递的类型而不需要进行任何处理。同样的 key 只会被使用一次。

## 答案

```ts
type Chainable<R = {}> = {
  option<K extends number | string | symbol, V>(
    key: K,
    value: V
  ): Chainable<R & { [k in K]: V }>;
  get(): R;
};
```

## 分析

首先, 我们根据题意知道`Chainable`类至少有两个方法: `option, get`, 先写下初版代码

```ts
type Chainable = {
  option(key: string | number | symbol, value: any): Chainable;
  get(): any;
};
```

由于我们构建返回的类型时需要用到`option`函数的参数的类型, 我们可以现获得这两个类型:

```ts
type Chainable = {
  option<K extends number | string | symbol, V>(key: K, value: V): Chainable;
  get(): any;
};
```

我们需要根据函数调用逐步**拓展一个类型**, 但是要在哪里保存这个类型呢? 类型系统中能"声明变量"的地方
不多, 我们可以在类型参数里声明并保存它

```ts
// `R` 即为最后要返回的类型, 每次调用`option`方法我们都要在`R`上追加
type Chainable<R = {}> = {
  option<K extends number | string | symbol, V>(
    key: K,
    value: V
  ): Chainable</* TODO */>;
  get(): R;
};
```

`R` 即为最后要返回的类型, 每次调用`option`方法我们都要在`R`上**追加**一组 key value, 最后直接返回`R`即为所求  
追加的方法如下:

```ts
type Chainable<R = {}> = {
  option<K extends number | string | symbol, V>(
    key: K,
    value: V
  ): Chainable<R & { [k in K]: V }>;
  get(): R;
};
```

bingo!
