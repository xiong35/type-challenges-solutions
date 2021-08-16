namespace T0599 {
  /* 答案 */
  type Merge<A, B> = {
    [K in keyof A | keyof B]: K extends keyof B
      ? B[K]
      : K extends keyof A
      ? A[K]
      : never;
  };

  /* 测试 */
  type A = {
    foo: number;
    bar: string;
  };
  type B = {
    foo: boolean;
    baz: Function;
  };

  type M = Merge<A, B>;
}
