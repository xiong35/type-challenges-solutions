# 7 Readonly

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/7-easy-readonly/README.zh-CN.md)

实现内置的`Readonly<T>`泛型.  
构造一个类型，并将 T 的所有属性设置为只读，这意味着无法重新对所构造类型的属性进行赋值

例如

```ts
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
```

## 答案

```ts
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};
```

## 分析

遍历`T`的每一个 key, 对每一个`K`添加
[`readonly`描述符](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes-func.html#readonly-and-const)
, 而`K`对应的值的类型即为对象上原本的类型`T[K]`

伪码:

```ts
function MyReadonly(T) {
  const returnType = {};

  // 获得 T 上所有的 key
  for (let K in T) {
    returnType[K] = readonly(T[K]);
  }

  return returnType;
}
```
