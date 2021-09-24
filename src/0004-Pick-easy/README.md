# 4 Pick

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/4-easy-pick/README.zh-CN.md)

不使用内置的`Pick<T, K>`泛型, 通过从 T 中选择属性 K 来构造类型

例如

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

type TodoPreview = MyPick<Todo, "title" | "completed">;

const todo: TodoPreview = {
  title: "Clean room",
  completed: false,
};
```

> 注: 截至 2021/8/9, 原题中的中文描述有误, 本人已依题意进行修改

## 答案

```ts
type MyPick<T, Ks extends keyof T> = {
  [K in Ks]: T[K];
};
```

## 分析

从`T`中选择属性`K`, 那么`K`一定要是`K`的键.  
所以需要对泛型参数进行约束, 即限制`Ks extends keyof T`, `Ks`(Keys) 一定要是 `T` 的 key 的子集.

之后, 我们返回一个类型, 这个类型的 Key 来自于`K`, `K`是怎么来的呢,  
我们遍历给定的 Keys(`[K in Ks]`), 将得到的 Ks 这个 union 类型的每一项记作 `K`.  
对于每个`K`, 在我们返回的对象上追加一条属性, 该属性的名称为`K`, 值的类型为`T[K]`
(从原始对象上得到这个 Key(`K`)对应的类型, 此操作与在 JS 对象上根据键获得值类型, 只不过是根据键获得值的**类型**)

最后得到的这个类型即为从原类型上挑选出需要的 keys 的类型了

来点伪代码可能好理解一些

```js
function MyPick(T, Ks) { // Ks 是联合类型, 可看作js中的 Set 来遍历
  if(Ks is not subset of (keyof T)) throw new Error() // Ks extends keyof T

  const returnType = {};
  for (let K of Ks) { // [K in Ks]
    typeOf(returnType[K]) = typeOf(T[K]); //[K in Ks]: T[K];
  }

  return returnType
}
```
