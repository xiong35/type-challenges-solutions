# 0268 If

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/268-easy-if/README.md)

实现一个工具类`If`, 它接受三个泛型参数:

- 条件`C`, condition, 应该是`true`或者`false`中的一个
- 条件为真的返回类型`T`, 可以为任意类型
- 条件为假的返回类型`F`, 可以为任意类型

举个栗子:

```ts
type A = If<true, "a", "b">; // expected to be 'a'
type B = If<false, "a", "b">; // expected to be 'b'
```

## 答案

```ts
type If<C extends boolean, T, F> = C extends true ? T : F;
```

## 分析

首先限制 `C` 为 `true, false` 之一, 即为 `boolean` 类型

如果`C`为 `true`, 则`C`是`true`的子集, 则`C extends true`成立, 返回`T`, 反之返回`F`

伪码如下

```js
function If(C, T, F) {
  if(C is not subset of boolean) throw new Error()

  if(C is subset of true) return T
  else return F
}
```
