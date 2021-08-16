# 0610 CamelCase

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/610-medium-camelcase/README.md)

编写一个`CamelCase`类, 接受一个字符串作为参数, 返回其驼峰表示的形式

举个栗子

```ts
type C = CamelCase<"for-bar-baz">; // expected to be "forBarBaz"
```

## 答案

```ts
type CamelCase<S extends string> = S extends `${infer L}-${infer R}`
  ? `${Capitalize<L>}${CamelCase<R>}`
  : Capitalize<S>;
```

## 分析

我们可以根据`"-"`将字符串拆分开, 对第一个单词进行`Capitalize`, 再递归地对后续串做`CamelCase`, 再
将二者的结果合并即可

```ts
type CamelCase<S extends string> = S extends `${infer L}-${infer R}` // 根据`"-"`将字符串拆分开
  ? `${Capitalize<L>}${CamelCase<R>}` //对第一个单词进行`Capitalize`, 再递归地对后续串做`CamelCase`, 再将二者的结果合并即可
  : Capitalize<S>;  // 边界情况: 只有一个单词就返回其`Capitalize`形式
```
