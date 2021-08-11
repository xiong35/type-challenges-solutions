# 0002 ReturnType

## 题目

实现内置的`ReturnType<T>`类, 该类接受一个函数类型作为类型参数, 返回该函数的返回值类型

举个栗子

```ts
const fn = (v: boolean) => {
  if (v) return 1;
  else return 2;
};

type a = MyReturnType<typeof fn>; // should be "1 | 2"
```

## 答案

```ts
type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : unknown;
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
// 得到的 `R` 类型就是函数返回值的类型了
type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
  ? R
  : unknown;
```

伪码如下

```js
function MyReturnType(T) {
  if(T is subset of ((...args: any[]) => let R)) return R
  else return unknown
}
```
