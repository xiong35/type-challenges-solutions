# 0612 Kebab Case

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/612-medium-kebabcase/README.md)

实现`KebabCase`类, 接收一个字符串类型, 返回这个类型的 Kebab Case 表示(单词均为小写, 之间以`"-"`连接)

举个例子:

```ts
type K = KebabCase<"FooBarBaz">; // expected to be "for-bar-baz"
```

## 答案

```ts
type KebabCase<S extends string> = S extends `${infer L}${infer R}`
? R extends Uncapitalize<R>
  ? `${Uncapitalize<L>}${KebabCase<R>}`
  : `${Uncapitalize<L>}-${KebabCase<R>}`
: S;
```

## 分析

我们需要将首字母外的每个大写字母前都添加一个`"-"`, 我们可以用递归的方法遍历字符串的每一个字符.  
将字符串拆分成首字符`L`和剩余部分`R`, 先将`L`转化为小写, 再根据`R`是否为大写字母开头来添加或不添加`"-"`,
最后递归地分析`R`

```ts
type KebabCase<S extends string> = S extends `${infer L}${infer R}`
? R extends Uncapitalize<R> // 判断`R`是否以小写字母开头, `Uncapitalize`将`R`首字母转为小写
  ? `${Uncapitalize<L>}${KebabCase<R>}` // 若是小写开头, 继续分析后续部分
  : `${Uncapitalize<L>}-${KebabCase<R>}` // 若为大写开头, 添加`"-"`
: S; // 边界情况: S 的长度为 0 时直接返回之
```
