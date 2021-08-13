namespace T0009 {
  /* 前置定义 */
  type Debug<T> = { [K in keyof T]: T[K] };

  /* 答案 */
  type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends Record<string | number | symbol, any>
      ? DeepReadonly<T[K]>
      : T[K];
  };

  /* 测试 */
  type X = {
    x: {
      a: 1;
      b: "hi";
    };
    y: "hey";
  };

  type Expected = {
    readonly x: {
      readonly a: 1;
      readonly b: "hi";
    };
    readonly y: "hey";
  };

  type ReadonlyX = Debug<DeepReadonly<X>>;
}
