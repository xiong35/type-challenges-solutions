namespace T0108 {
  /* 答案 */
  type W = " " | "\t" | "\n";
  type Trim<T extends string> = T extends `${W}${infer R}`
    ? Trim<R>
    : T extends `${infer L}${W}`
      ? Trim<L>
      : T;

  /* 测试 */
  type trimed = Trim<"  Hello World  ">; // expected to be 'Hello World  '
}
