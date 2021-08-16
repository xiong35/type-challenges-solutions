# 0298 Length Of String

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/298-medium-length-of-string/README.md)

像 JS 中的`String.length`一样, 计算一个字符串类型字面量的长度

举个栗子

```ts
type L = Length<"hello">; // expected to be 5
```

## 答案

```ts
type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
  ? Split<R, [...Arr, F]>
  : Arr
type Length<S extends string> = Split<S>["length"]
```

## 分析

我的第一反应是直接返回`S["length"]`, 但是这个结果是`number`而不是某个确切的数字

所以, 字符串是没法获得其长度的, 但是数组可以, 我们现在要做的就是把字符串变成数组即可, 关键就是实现这个工具类`Split`

我们可以用一个数组来保存已经拆分好了的结果, 每次拆出第一个字母放入其中, 再递归地拆分剩余部分, 直到将字符串
拆分完返回所保存的数组即可. 代码如下:

```ts
type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
  ? Split<R, [...Arr, F]>
  : Arr
```

而`Length`类的实现就简单了:

```ts
type Length<S extends string> = Split<S>["length"];
```
