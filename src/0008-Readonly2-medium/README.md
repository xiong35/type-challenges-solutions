# 0008 Readonly2

## 题目

实现一个通用`MyReadonly2<T, K>`，它带有两种类型的参数`T`和`K`。

`K`指定应设置为`Readonly`的`T`的属性集。如果未提供`K`，则应使所有属性都变为只读，就像普通的`Readonly<T>`一样。

例如

```ts
interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

const todo: MyReadonly2<Todo, "title" | "description"> = {
  title: "Hey",
  description: "foobar",
  completed: false,
};

todo.title = "Hello"; // Error: cannot reassign a readonly property
todo.description = "barFoo"; // Error: cannot reassign a readonly property
todo.completed = true; // OK
```

## 答案

```ts
type MyReadonly2<T, Ks extends keyof T = keyof T> = T &
  Readonly<
    {
      [K in Ks]: T[K];
    }
  >;
```

## 分析

首先, `MyReadonly2`接受两个类型参数, 其中第二个为需要设置的 keys, 我们可以先写出以下约束:

```ts
type MyReadonly2<T, Ks extends keyof T> = /* TODO */;
```

题目还要求如果不提供`Ks`, 则默认设置所有属性, 我们可以设置`Ks`默认值为`T`的所有 key 来实现

```ts
type MyReadonly2<T, Ks extends keyof T = keyof T> = /* TODO */;
```

那么要怎么实现设置部分属性只读呢? 我们可以通过`&`运算来实现

### `&` 和 `|`

#### 对于属性类型

`&`取两个类型的交集, 对于二者都有的属性, 取其交集; 对于只有其一有的属性, 新类型沿用原类型的属性  
`|`取两个类型的并集, 对于二者都有的属性, 若能推断出此类型具体是哪一种就沿用, 否则取其并集;
对于只有其一有的属性, 能推断出此类型具体是哪一种就沿用, 否则**新类不能使用**

```ts
interface A {
  foo: string;
  a: Function;
}
interface B {
  foo: number;
  b: boolean;
}

type C = A & B;
/* 
type C = {
  foo: never;   // 因为 string & number 不存在交集, 所以这里的 foo 默认为 never
  a: Function;  // 沿用自 A
  b: boolean;   // 沿用自 B
};
*/
const c: C = {
  a: () => {},
  b: false,
  // foo: 1,  foo 是 never
};
c.a();
c.b = true;

type D = A | B;

const d: D = {
  a: () => {}, // 可以声明, 但不能使用或重写
  b: false, // 同上
  foo: "1", // 不能推断出是 A 还是 B, foo 为 string | number
  // baz: "",   // 不能声明不存在的属性
};
d.a(); // Error: 类型“D”上不存在属性“a”。
d.b = true; // Error: 类型“D”上不存在属性“b”。

const d2: D = {
  a: () => {}, // 如果只声明 a 而不声明 b, 则检查器会认为 d2 是 A 类型, 便可以使用 a 属性了
  foo: "1", // 能推断出是 A, foo 为 string 类型
};
d2.a(); // 不会报错。

// Error, 因为 d3 需为 A 或 B 之一, 不能两者的属性都没有
const d3: D = {
  foo: "1",
};
```

- 对于非共有属性, 以上述代码为例

  - `&`: 变量`c`是`A & B`类型, 意味着他是`A`和`B`类型的交集, 即是`A`类也是`B`类  
    你可以把它当`A`类型用也可以当`B`类型用, 所以它**既要有`A`的属性也要有`B`的属性**, 否则你就可能在使用它的时候访问到不存在的属性, 导致错误

  - `|`: 变量`d`是`A | B`类型, 它要么是`A`要么是`B`, 你不能自信的认为它身上有某些`A`独有的属性(因为它可能是`B`),
    但是你可以自信的使用**其中`A, B`共有的属性**, 因为不管他是`A`还是`B`都会有这个属性

  > 总结就是类型相交则属性相并, 类型相并则属性相交

- 对于共有属性
  - `&` 取其交集
  - `|` 若能推断出此类型具体是哪一种就沿用, 否则取其并集

#### 对于属性可访问性

```ts
type MyTodo = {
  readonly title: string;
  readonly description: string;
};
type Todo = {
  title: string;
  description: string;
  completed: boolean;
};

const todoAnd: Todo & MyTodo = {
  title: "Hey",
  description: "foobar",
  completed: false,
};
todoAnd.title = "Hi"; // Error, title is readonly

const todoOr: Todo | MyTodo = {
  title: "Hey",
  description: "foobar",
  completed: false,
};
todoOr.title = "Hi";
```

`todoAnd`报错了, 因为此时的`title`是`string & readonly string`, 二者的交集就是`readonly string`, 没毛病

但是`todoOr`没报错, 是因为`title`是`string | readonly string`类型的原因吗?  
并不是! 验证如下

```ts
/* 使 MyTodo 和 Todo 中属性名完全相同 */
type MyTodo = {
  readonly title: string;
  readonly description: string;
};
type Todo = {
  title: string;
  description: string;
  // completed: boolean;
};

const todoAnd: Todo & MyTodo = {
  title: "Hey",
  description: "foobar",
  // completed: false,
};
todoAnd.title = "Hi"; // Error, title is readonly

const todoOr: Todo | MyTodo = {
  title: "Hey",
  description: "foobar",
  // completed: false,
};
todoOr.title = "Hi"; // Error, title is readonly
```

可见`string | readonly string`类型还是`readonly`的, 那么为什么上个例子中它不是 readonly 呢?

原因是, 上个例子中, 由于`MyTodo`和`Todo`属性不完全向同, 检查器可以根据它包含了哪种类型的属性来
判断出他是`MyTodo`还是`Todo`(只有`Todo`类型有`completed`属性), 所以根本不会进入属性的复合环节, 而是直接被归为`Todo`类型, 不作只读限制了

#### 总结为一张表

| 合并的项 \ 运算 | `&`                        | `|`                                                          |
| --------------- | -------------------------- | ------------------------------------------------------------ |
| 公共属性        | 取其交集                   | 能推断出此类型是哪一种就沿用, 否则取其并集                   |
| 非公共属性      | 沿用原类型的属性           | 能推断出此类型是哪一种就沿用, 否则不能使用                   |
| 可访问性        | 二者中有`readonly`就是只读 | 能推断出此类型是哪一种就沿用, 否则二者中有`readonly`就是只读 |

---

那么, 这和我们的题目有什么关系呢!

事实上, 你再看一遍我的解答就会发现十分好理解了:

```ts
type MyReadonly2<T, Ks extends keyof T = keyof T> = T &
  Readonly<
    {
      [K in Ks]: T[K];
    }
  >;
```

根据需要设置只读的键构造一个只读的类, 将他和`T`取交集并返回即可
(不能取并集, 因为声明变量时设置的属性足以让检查器推断出其类型为`T`, 而绕过只读的限制)

伪码如下:

```js
function MyReadonly2(T, Ks = keyof T) {
  if(Ks is not subset of keyof T) throw new Error()

  const returnType = { ...T }
  for(let K of Ks) {
    setToReadonly(returnType[K])
  }

  return returnType
}
```
