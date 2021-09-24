# 0531 String To Union

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/531-medium-string-to-union/README.md)

实现`StringToUnion`类, 该类接受一个字符串作为类型参数, 返回此串中字符的联合

举个栗子

```ts
type Test = "123";
type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
```

## 答案

```ts
type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
  ? Split<R, [...Arr, F]>
  : Arr
type StringToUnion<S extends string> = Split<S>[number];
```

## 分析

这题就是先 string to array, 再 array to union 就行, 参考前面做过的题就好

- [string to array](../0298-LengthOfString-medium/)
- [array to union](../0011-TupleToObject-easy/)
