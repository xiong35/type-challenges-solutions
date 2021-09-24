# 1097 Is Union

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/1097-medium-isunion/README.md)

实现`IsUnion`类, 当传入参数是联合类型时返回 true, 否则返回 false

举个例子

```ts
type case1 = IsUnion<string>; // false
type case2 = IsUnion<string | number>; // true
type case3 = IsUnion<[string | number]>; // false
```

## 答案

```ts
type IsUnion<T, C = T> = T extends any
  ? C[] extends T[]
    ? false
    : true
  : never;
```

## 分析

利用联合类型**分配**的性质, 我们可以提取联合类型中的每一项, 记作`t`.  
此后, 假如传入类型`T`不为联合类型, `T extends t`是成立的, 反之则不成立, 利用这一点我们可以判断`T`是否为联合类型

```ts
// 通过`C`类型保存下原始的 T
type IsUnion<T, C = T> = T extends any ? (C extends T ? false : true) : never;
// -------------------------------------------------^ 此处的T已经是原来 T 中的一项了
```

但是这样判断得不到要求的结果, 传入非联合类型会返回 false 没问题, 但是传入联合类型则返回`boolean`, 为什么呢?

原因是在`C extends T`的判断中, `C`也被**分配**了, 返回的结果是`T`中各项是否互相`extends`
的排列组合, 举例, 假如传入`string|number`:

```ts
// 化简一步
type IsUnion = string | number extends any
  ? string | number extends T
    ? false
    : true
  : never;

// 化简两步, 将 T 分配为两种情况
type IsUnion =
  | (string | number extends string ? false : true)
  | (string | number extends number ? false : true);

// 化简三步, 将 C 分配为两种情况
type IsUnion =
  | (string extends string ? false : true)
  | (number extends string ? false : true)
  | (string extends string ? false : true)
  | (number extends number ? false : true);
type IsUnion = true | false; // = boolean
```

所以, 我们要避免这里`C`被分配, 将其包装一层即可:

```ts
type IsUnion<T, C = T> = T extends any
  ? C[] extends T[] // 将 C 包装为数组类型, 就不会被分配了
    ? false
    : true
  : never;
```
