# 11 Tuple To Object

## [题目](https://github.com/type-challenges/type-challenges/blob/master/questions/11-easy-tuple-to-object/README.zh-CN.md)

给定数组，转换为对象类型，键/值必须在给定数组中

例如

```ts
const tuple = ["tesla", "model 3", "model X"] as const;

const result: TupleToObject<typeof tuple> = {
  tesla: "tesla",
  "model 3": "model 3",
  "model X": "model X",
};
```

## 答案

```ts
type TupleToObject<T extends readonly (number | string | symbol)[]> = {
  [V in T[number]]: V;
};
```

## 分析

`TupleToObject`接受一个泛型参数 `T`, 首先这个`T`要是一个数组, 那么我们可以先写下以下代码

```ts
type TupleToObject<T extends any[]> = {
  /* TODO */
};
```

其次依题意, 这个数组是被`as const`修饰过的, 其作用在于将一个变量的类型限制为他的**值**, 且让他不可变, 例如

```ts
let a = "foo"; // type of a is *string*
let b = "bar" as const; // type of a is *"bar"*

let arr = ["foo", "bar"]; // type of arr is ["string", "string"]
// type of arrAsConst is ["foo", "bar"]
let arrAsConst = ["foo", "bar"] as const;
```

关于`as const`, 详见[杀手级的 TypeScript 功能：const 断言](https://juejin.cn/post/6844903848939634696).
总之, 兼容这种类型, 必须修改代码为以下:

```ts
// `readonly` 与 `as const` 对应
type TupleToObject<T extends readonly any[]> = {
  /* TODO */
};
```

再次, 该数组中的 value 最后会变成一个对象的属性, 而我们知道对象的属性只能接受`string | number | symbol`
几种形式, 进一步约束泛型参数为

```ts
// 注意三种类型首字母均小写, 是 symbol 而不是 Symbol
// 二者区别详见 https://stackoverflow.com/questions/14727044/what-is-the-difference-between-types-string-and-string
type TupleToObject<T extends readonly (number | string | symbol)[]> = {
  /* TODO */
};
```

最后, 我们依次取出传入数组的每一项的值的**类型**, 我们知道对数组取值是使用下标进行访问得到的, 而下标
都是`number`类型. 在 TS 类型编程中, 我们可以使用`T[number]`的写法来获得所有值的**类型**, 完整代码如下

```ts
type TupleToObject<T extends readonly (number | string | symbol)[]> = {
  [V in T[number]]: V;
};
```

伪码形式为

```js
function TupleToObject(T) {
  if(!(T extends Array<(number | string | symbol)>)) throw new Error()
  if(T is not readonly) throw new Error()

  const returnType = {};
  T.forEach((value)=>{
    /*
     * 此处不是直接用 value 当作对象的键和值, 我们是在进行类型编程, 操作的都是类型
     * \`\`\`ts
     * var value = "foo"   // 此处"foo"是一个JS字符串
     * typeOf(value)       // 得到的结果是 "foo", 此处 "foo" 是TS类型
     * \`\`\`
     */
    returnType[typeOf(value)] = typeOf(value);
  })

  return returnType;
}
```
