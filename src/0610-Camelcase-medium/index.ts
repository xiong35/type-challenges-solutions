namespace T0610 {
  /* 答案 */
  type Camelcase<S extends string> = S extends `${infer L}-${infer R}`
    ? `${Capitalize<L>}${Camelcase<R>}`
    : Capitalize<S>;

  /* 测试 */
  type C = Camelcase<"for-bar-baz">; // expected to be "forBarBaz"
}
