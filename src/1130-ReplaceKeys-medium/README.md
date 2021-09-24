# 1130 Replace Keys

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/1130-medium-replacekeys/README.md)

Implement a type ReplaceKeys, that replace keys in union types, if some type has not this key, just skip replacing, A type takes three arguments.

实现`ReplaceKeys`类, 将联合类型中的某些属性换成指定类型. 该类接受三个参数:

1. 需要替换的联合类型
2. 需要替换的属性
3. 指明替换为什么类型的对象类型

若制指定了不存在与某个类型上的属性则直接跳过, 若指定了类型却没在第三个参数中给定需要替换为什么类型, 则
替换为 never

举个栗子

```ts
type NodeA = {
  type: "A";
  name: string;
  flag: number;
};

type NodeB = {
  type: "B";
  id: number;
  flag: number;
};

type NodeC = {
  type: "C";
  name: string;
  flag: number;
};

type Nodes = NodeA | NodeB | NodeC;

type ReplacedNodes = ReplaceKeys<
  Nodes,
  "name" | "flag",
  { name: number; flag: string }
>;
// {type: 'A', name: number, flag: string}
// | {type: 'B', id: number, flag: string}
// | {type: 'C', name: number, flag: string}
// would replace name from string to number, replace flag from number to string.

type ReplacedNotExistKeys = ReplaceKeys<Nodes, "name", { aa: number }>;
// {type: 'A', name: never, flag: number} | NodeB | {type: 'C', name: never, flag: number}
// would replace name to never
```

## 答案

```ts
type ReplaceKeys<T, K, O> = T extends any
  ? {
      [k in keyof T]: k extends K ? (k extends keyof O ? O[k] : never) : T[k];
    }
  : never;
```

## 分析

伪码:

```ts
function ReplaceKeys(T, K, O) {
  let returnType;

  for(let _T of T) { // `T extends any`, 利用分配的特性遍历T
    const replaced = {};
    for(let k in _T) {  // `k in keyof T`, 检查当前对象的所有属性
      if(k is subset of K) {  // `k extends K`, 如果需要替换这个属性
        if(k in O) {  // `k extends keyof O`, 如果给定了替换掉目标
          replaced[k] = O[k]; // 则按目标替换
        } else { // 若没给定则替换为 never
          replaced[k] = never;
        }
      } else { // 若不需要替换则直接沿用原对象的属性
        replaced[k] = _T[k];
      }
    }

    returnType |= replaced;
  }

  return returnType;
}
```
