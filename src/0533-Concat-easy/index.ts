namespace T0533 {
  /* 答案 */
  type Concat<A extends any[], B extends any[]> = [...A, ...B];

  /* 测试 */
  type Result = Concat<[1], [2]>; // expected to be [1, 2]
}
