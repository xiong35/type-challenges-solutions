namespace T0612 {
  /* 答案 */
  type KebabCase<S extends string> = S extends `${infer L}${infer R}`
  ? R extends Uncapitalize<R>
    ? `${Uncapitalize<L>}${KebabCase<R>}`
    : `${Uncapitalize<L>}-${KebabCase<R>}`
  : S;

  /* 测试 */
  type K = KebabCase<"FooBarBaz">; // expected to be "for-bar-baz"
}
