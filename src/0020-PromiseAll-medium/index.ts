namespace T0020 {
  /* 答案 */
  declare function PromiseAll<T extends readonly any[]>(
    promises: T
  ): Promise<
    {
      -readonly [K in keyof T]: T[K] extends Promise<infer P> ? P : T[K];
    }
  >;

  /* 测试 */
  const promise1 = Promise.resolve(3);
  const promise2 = 42;
  const promise3 = new Promise<string>((resolve, reject) => {
    setTimeout(resolve, 100, "foo");
  });

  // expected to be `Promise<[number, number, string]>`
  const p = PromiseAll([promise1, promise2, promise3] as const);
}
