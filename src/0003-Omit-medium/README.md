# 0003 Omit

## 题目

实现内置的`Omit<T, K>`类, `Omit`会创建一个省略`K`中字段的`T`对象类型。

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyOmit<Todo, "description" | "title">;

const todo: TodoPreview = {
  completed: false,
};
```

## 答案

```ts
type MyOmit<T, K extends keyof T> = {
  [Tk in keyof T as Tk extends K ? never : Tk]: T[Tk];
};
```

## 分析

我们需要排除`K`包含的键, 遍历`T`的键, 如果此键在`K`中就忽略它, 否则保留

借助`as`语法我们可以很轻松地实现这一点

```ts
type MyOmit<T, K extends keyof T> = {
  [Tk in keyof T as Tk extends K ? never : Tk]: T[Tk];
};
```

[官方文档](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-1.html#key-remapping-in-mapped-types)
中描述为:

> and you can even filter out keys by producing never.
> That means you don’t have to use an extra Omit helper type in some cases.

正对应我们此处的需求!

伪码如下

```js
function MyOmit(T, K) {
  const returnType = {}
  for(let Tk in T) {
    if(Tk is subset of K) continue
    else returnType[Tk] = typeOf(T[Tk])
  }

  return returnType
}
```
