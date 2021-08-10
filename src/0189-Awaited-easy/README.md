# 189 Awaited

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/189-easy-awaited/README.md)

如果我们有一个被包装的类型, 例如`Promise`, 我们如何获得这个包装类型内部的类型呢?  
编写一个`Awaited`类, 以获得`Promise` resolve 的类型

例如

```ts
type T0 = Awaited<Promise<string>>; // expected string
type T1 = Awaited<Promise<boolean>>; // expected boolean
```

## 答案

```ts
type Awaited<P> = P extends Promise<infer Inner> ? Inner : unknown;
```

## 分析

这里最关键的就是`infer`关键字, 关于它的详细解释可以参考
[理解 TypeScript 中的 infer 关键字](https://juejin.cn/post/6844904170353328135).
简单来说`infer`可以在`extends`的条件语句中推断待推断的类型.  
举个栗子简要说明:

```ts
type Flatten<T> = T extends Array<infer Item> ? Item : T;

const arr1 = [1, 2, 3];
const arr2 = [1, "2", false];
type A = Flatten<typeof arr1>; // type A = number
type B = Flatten<typeof arr2>; // type B = string | number | boolean
```

此处`Item`的类型是被自动推断出来的

同理, 我们可以在`Awaited`中使用这个技巧

```ts
// 得到的 `R` 类型就是 Promise 内包装的类型了
type Awaited<P> = P extends Promise<infer Inner> ? Inner : unknown;
```

伪码如下

```js
function Awaited(P) {
  if(P is subset of Promise<let Inner>) return Inner
  else return unknown
}
```
