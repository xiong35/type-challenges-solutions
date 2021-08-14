# 0106 Trim Left

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/106-medium-trimleft/README.md)

实现`TrimLeft<T>`类, 该类型接受一个`string`类星作为参数, 返回将这个类型左侧的空格去掉后的类型

举个栗子:

```ts
type trimed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '
```

## 答案

```ts
type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
```

## 分析

想求解此题, 关键在于掌握[模板字面量类型](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#template-literal-types)
的用法.

```ts
/* example 1 */
type World = "world";
type Greeting = `hello ${World}`;
// type Greeting = "hello world"

/* example 2 */
type Color = "red" | "blue";
type Quantity = "one" | "two";
type SeussFish = `${Quantity | Color} fish`;
// type SeussFish = "one fish" | "two fish" | "red fish" | "blue fish"
```

此外, 模板字面量类型还有一个性质是在使用`extends`+`infer`进行类型推断时可以得到某个字符串类型的子串

然后我们可以递归地检查该串的开头是否是空格, 如果是就通过`infer`得到剩余部分, 递归地处理即可

答案如下

```ts
type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;
```
