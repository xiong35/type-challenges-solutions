namespace T0191 {
  /* 答案 */
  type AppendArgument<Fn extends Function, A> = Fn extends (
    ...args: infer Args
  ) => infer R
    ? (...args: [...Args, A]) => R
    : never;

  /* 测试 */
  type Fn = (a: number, b: string) => number;

  type Result = AppendArgument<Fn, boolean>;
  // 期望是 (a: number, b: string, x: boolean) => number
}
