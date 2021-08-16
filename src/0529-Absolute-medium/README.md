# 0529 Absolute

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/529-medium-absolute/README.md)

实现一个`Absolute`类, 接受一个数字类型作为参数, 返回其绝对值的`string`表示对应的类型

举个栗子

```ts
type Test = -100;
type Result = Absolute<Test>; // expected to be "100"(a string)
```

## 答案

```ts
type Absolute<T extends number> = `${T}` extends `-${infer N}` ? N : `${T}`;
```

## 分析

我们只需要将数字转化成字符串, 负数前面有一个负号, 去除之即为答案:

```ts
type Absolute<T extends number> = `${T}` extends `-${infer N}` ? N : `${T}`;
```
