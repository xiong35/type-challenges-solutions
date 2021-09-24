# 1 Hello World

> 关键词: TypeScript, TypeChallenge

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/13-warm-hello-world/README.zh-CN.md)

Hello, World!

这个简单的提问希望让你可以快速上手 Type Challenges。在这里，我们使用了一些神奇的技巧(见下方注)让 TypeScript 通过自身的类型系统来实现自动判题。

在这个挑战中，你需要修改下方的代码使得测试通过（使其没有类型错误）。

```ts
// 期望是一个 string 类型
type HelloWorld = any;
// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>;
```

> 注: ts 中不自带 Expect 和 Equal 两个类, 此类是 type-challenge 项目中定义的工具类, 具体如下:
>
> ```ts
> export type Expect<T extends true> = T;
> export type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <
>   T
> >() => T extends Y ? 1 : 2
>   ? true
>   : false;
> ```
>
> 其功能仅在于检查两个类是否完全一样
>
> 完整工具类定义参考: [https://github.com/type-challenges/type-challenges/blob/master/utils/index.d.ts](https://github.com/type-challenges/type-challenges/blob/master/utils/index.d.ts)

## 答案

```ts
type HelloWorld = string;
```

## 分析

假如先不关心工具类的具体实现, 只关心其作用, 那么见名知意, 其作用在于判断(`Expect`)传入的两个类是否相同(`Equal`), 我们需要让 `HelloWorld` 类和 `string` 类相同, 声明 `HelloWorld` 为 `string` 类型即可

```ts
type HelloWorld = string;
```

这题理解题意之后会觉得相当简单, 那么我就多说两句他使用到的工具类吧

`Expect` 类接受一个泛型参数 `T`, _如果 `T` 是 `true` 的子类, 返回类型为 `true`._ 任何一个类都是他自己的子类, 所以斜体的这句话的意思是: 如果 `T` 就是 `true`, 此类型为 `true`, 而如果 `T` 是任意一个其他的类型, 都会产生编译错误(就算是`false`也不行)

Equal 类就复杂了, 我看了半天终于看懂了一点门道. 其定义如下:

```ts
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;
```

阿巴阿巴, 我反正一眼看不出来他是在干啥, 但是我在 github 上找到了一个[关于 ts 中实现`Equal`类的 issue](https://github.com/microsoft/TypeScript/issues/27024).

总结一下, TS 中判断两个条件类是否`related`的逻辑是

> Two conditional types `'T1 extends U1 ? X1 : Y1'` and `'T2 extends U2 ? X2 : Y2'` are related if
>
> - one of `T1` and `T2` is _related_ to the other
> - `U1` and `U2` are identical types
> - `X1` is related to `X2` and `Y1` is _related_ to `Y2`

即如果 `A` related to `B` , 那么`A`可以 extend `B`(见[此 issue](https://github.com/microsoft/TypeScript/issues/27024#issuecomment-853640431))

```ts
type Foo<X> = <T>() => T extends X ? 1 : 2;
type Bar<Y> = <T>() => T extends Y ? number : number;
type Related = Foo<number> extends Bar<number> ? true : false; // true
type UnRelated = Bar<number> extends Foo<number> ? true : false; // false
```

回到题目定义的`Equal`类, 如果 `X`(对应上述英文描述中的`U1`) 和 `Y`(对应`U2`) 是同一个类  
那么`` - `U1` and `U2` are identical types ``就成立  
那么`<T>() => T extends X ? 1 : 2`就 related to `<T>() => T extends Y ? 1 : 2`  
那么`<T>() => T extends X ? 1 : 2`**`extent`**`<T>() => T extends Y ? 1 : 2`就成立  
整个`Equal`类得到的结果为`true`

反之`X`, `Y`不相同就返回`false`

深入来说, `type Foo<X> = <T>() => T extends X ? 1 : 2`究竟是个什么样的类呢, 其实我也没搞清楚...在 stack overflow 上[问了一下](https://stackoverflow.com/questions/68707108/how-does-this-way-to-check-two-types-are-of-same-type-work), 等搞懂了再来填坑
