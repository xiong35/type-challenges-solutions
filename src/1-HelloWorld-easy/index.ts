/* 前置定义 */
type Expect<T extends true> = T;
type Equal<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y
  ? 1
  : 2
  ? true
  : false;

/* 题干 */
// 期望是一个 string 类型
// type HelloWorld = any;

// 你需要使得如下这行不会抛出异常
type test = Expect<Equal<HelloWorld, string>>;

/* 解答 */
type HelloWorld = string;

/* 测试 */
var a: HelloWorld = "foo"; // √
// var a: HelloWorld = 42; // ×
