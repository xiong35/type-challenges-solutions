namespace T0610 {
  /* 答案 */
  type CamelCase<S extends string> = S extends `${infer L}-${infer R}`
    ? `${Capitalize<L>}${CamelCase<R>}`
    : Capitalize<S>;

  /* 测试 */
  type C = CamelCase<"for-bar-baz">; // expected to be "forBarBaz"
}
