namespace T0645 {
  /* 答案 */
  type Diff<A, B> = {
    [K in keyof A | keyof B as Exclude<K, keyof A & keyof B>]:
      K extends keyof A
        ? A[K]
        : K extends keyof B
          ? B[K]
          : never;
  };

  /* 测试 */
  type A = {
    foo: string;
    bar: number;
    a: Function;
  };
  type B = {
    foo: string;
    bar: boolean;
    b: symbol;
  };

  type D = Diff<A, B>;
}
