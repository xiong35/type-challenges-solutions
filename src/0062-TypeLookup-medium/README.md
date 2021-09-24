# 0062 Type Lookup

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/62-medium-type-lookup/README.zh-CN.md)

有时，您可能希望根据其属性在并集中查找类型。

在此挑战中，我们想通过在联合类型`Cat | Dog`中搜索公共`type`字段来获取相应的类型。
换句话说，在以下示例中，我们期望`LookUp<Dog | Cat, 'dog'>`获得`Dog`，`LookUp<Dog | Cat, 'cat'>`获得`Cat`。

```ts
interface Cat {
  type: "cat";
  breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
}

interface Dog {
  type: "dog";
  breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
  color: "brown" | "white" | "black";
}

type MyDog = LookUp<Cat | Dog, "dog">; // expected to be `Dog`
```

## 答案

```ts
type LookUp<
  T extends { type: string },
  N extends T extends { type: infer K } ? K : never
> = T extends { type: N } ? T : never;
```

## 分析

首先约束待查找的类都有`type`字段: `T extends { type: string }`  
其次约束查找的名字在几种类型的 type 名字之中: `N extends T extends { type: infer K } ? K : never`

对于返回类型, 使用`extends`对`T`做["分配"](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types)
的操作, 对于`T`这个联合类型中的每一项, 检查其`type`字段是否和传入参数相同, 是就返回此项, 否则检查下一个

最终代码如下

```ts
type LookUp<
  T extends { type: string },
  N extends T extends { type: infer K } ? K : never
> = T extends { type: N } ? T : never;
```
