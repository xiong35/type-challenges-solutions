namespace T0106 {
  /* 答案 */
  type TrimLeft<T extends string> = T extends ` ${infer R}` ? TrimLeft<R> : T;

  /* 测试 */
  type trimed = TrimLeft<"  Hello World  ">; // expected to be 'Hello World  '
}
