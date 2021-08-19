# 1978 Percentage Parser

## 1978-medium-percentage-parser

Implement PercentageParser. According to the /^(\+|\-)?(\d\*)?(\%)?\$/ regularity to match T and get three matches.

The structure should be: [plus or minus, number, unit] If it is not captured, the default is an empty string.

实现`PercentageParser`类, 根据此正则: `/^(\+|\-)?(\d*)?(\%)?$/`, 匹配给定字符串并返回匹配的分组结果  
返回的结构应是: `[${正负号}, ${数值}, ${单位}]`  
若某一项没匹配到则返回空串

举个栗子

```ts
type PString1 = "";
type PString2 = "+85%";
type PString3 = "-85%";
type PString4 = "85%";
type PString5 = "85";

type R1 = PercentageParser<PString1>; // expected ['', '', '']
type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
type R5 = PercentageParser<PString5>; // expected ["", "85", ""]
```

## 答案

```ts
type _Stage = 0 | 1 ; // 0 阶段匹配符号, 1匹配数值和单位
type _Sign = "+" | "-";
type _Unit = "%";
type PercentageParser<
  P extends string,
  S extends _Stage = 0,
  R extends string[] = []
> = S extends 0
    ? P extends `${infer F}${infer L}`
      ? F extends _Sign
        ? PercentageParser<L, 1, [F]>
        : PercentageParser<P, 1, [""]>
      : ["", P, ""]
    : P extends `${infer D}${_Unit}`
      ? [...R, D, "%"]
      : [...R, P, ""]
```

## 分析

本题有多种解法, 且如果有能力可以考虑相当多种边界情况, 我仅对合法的温度做了处理.

思路为:

1. 先检查有无开头的符号
2. 无论有无符号, 处理原串, 去除符号位
3. 检查末尾有无单位, 若有单位, 去除末尾, 剩下的即为数值, 若无单位, 此时整串就是数值

```ts
type PercentageParser<
  P extends string,
  S extends _Stage = 0,
  R extends string[] = []
> = S extends 0 // 第一步, 检查符号位
    ? P extends `${infer F}${infer L}` // 取出字符串首字母记作 F
      ? F extends _Sign
        ? PercentageParser<L, 1, [F]> // 若 F 是正负号, 继续检查剩余位数, 将第一步得到的结果传入第二步
        : PercentageParser<P, 1, [""]> // 若 F 不是正负号, 继续检查整个串, 将空串传入第二步
      : ["", P, ""]
    : P extends `${infer D}${_Unit}` // 第二步, 检查单位位
      ? [...R, D, "%"]  // 若有符号位, 将第一步的结果, 匹配到的数字, "%" 合并并返回
      : [...R, P, ""] // 若无符号位, 将第一步的结果, 整个串, "" 合并并返回
```
