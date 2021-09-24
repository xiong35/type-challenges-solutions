# 0949 Any Of

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/949-medium-anyof/README.md)

在类型系统中实现类似 Python 中`any`函数的功能.  
实现`AnyOf`, 接受一个数组作为参数, 其中任意一项是`truthy`则返回`true`, 否则返回`false`

举个栗子

```ts
type Sample1 = AnyOf<[1, "", false, []]>; // expected to be true.
type Sample2 = AnyOf<[0, "", false, []]>; // expected to be false.
```

## 答案

```ts
type Falsy = 0 | "" | false | [];
type AnyOf<T extends any[]> = T extends [infer F, ...(infer R)]
  ? F extends Falsy
    ? AnyOf<R>
    : true
  : false;
```

## 分析

遍历所传入数组, 若为空数组直接返回`false`, 若首项为`Falsy`, 递归地处理剩余部分, 否则返回`true`即可

```ts
type AnyOf<T extends any[]> = T extends [infer F, ...(infer R)] // 提取出首项和剩余部分
  ? F extends Falsy // 检查首项是否为 Falsy
    ? AnyOf<R> // 如果首项为 Falsy, 不能说明问题, 继续检查剩余部分
    : true // 如果首项不为 Falsy, 可以直接返回 true 了
  : false;
```
