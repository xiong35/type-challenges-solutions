# 2070 Drop Char

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/2070-medium-drop-char/README.md)

去除给定字符串中的指定字符

举个栗子

```ts
type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'
```

## 答案

```ts
type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
  ? Split<R, [...Arr, F]>
  : Arr
type Length<S extends string> = Split<S>["length"]

type DropChar<
  S extends string,
  C extends string,
  D extends string = ""
  > = Length<C> extends 1
        ? S extends `${infer F}${infer R}`
          ? F extends C
            ? DropChar<R, C, D>
            : DropChar<R, C, `${D}${F}`>
          : D
        : never;
```

## 分析

首先考虑一下异常情况, 判断给定需要去除的字符是否真的是字符, 即长度是否为 1

然后我们需要一个变量存储去除后的字符串, 我们在参数中声明一个默认值为空串的`D`来存

遍历每一个字符, 若他是要被去除的字符, 无视他, 继续处理剩余部分, 否则将他添加到`D`中并继续

```ts
type DropChar<
  S extends string,
  C extends string,
  D extends string = ""
  > = Length<C> extends 1 // 处理异常情况
        ? S extends `${infer F}${infer R}` // 获得第一个字符`F`和剩余部分`R`
          ? F extends C
            ? DropChar<R, C, D> // 若是要去除的字符, 继续处理剩余部分
            : DropChar<R, C, `${D}${F}`> // 否则将当前字符加入已处理的串中并继续
          : D // 若遍历完了原串, 返回处理后的字符串
        : never;
```
