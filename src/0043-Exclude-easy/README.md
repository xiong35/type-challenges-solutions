# 43 Exclude

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/43-easy-exclude/README.zh-CN.md)

实现内置的`Exclude`类

例如

```ts
type T0 = MyExclude<"a" | "b" | "c", "a">; // expected "b" | "c"
type T1 = MyExclude<string | number | boolean, string | Function>; // expected number | boolean
```

## 答案

```ts
type MyExclude<T, E> = T extends E ? never : T;
```

## 分析

当使用条件类型时, TS 会进行["分配"](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
的操作, 举例:

```ts
// 不使用条件, 不分配
type NotActuallyToArray<Type> = Type[];
// 使用条件, 分配, `Type extends any`恒为true, 这里只是为了开启分配的功能
type ToArray<Type> = Type extends any ? Type[] : never;

type StrArr_Or_NumArr = ToArray<string | number>; // string[] | number[]
type StrOrNum_Arr = NotActuallyToArray<string | number>; // (string | number)[]
```

所以, 这里我们使用 `T` 的时候其实得到的不是传入的那个`union`类型, 而是其中的**每一项**.  
对于原本类型中的每一项, 如果`E`(待排除的`union`)中包含它则舍弃, 否则保留

```ts
type MyExclude<T, E> = T extends E ? never : T;
```

伪码如下

```js
function MyExclude(T, E) {

  const returnType = never
  for(let t of T) {
    if(t is subset of E) continue
    else returnType |= t
  }

  return returnType
}
```
