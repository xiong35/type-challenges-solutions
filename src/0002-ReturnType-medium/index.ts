namespace T0002 {
  /* 答案 */
  type MyReturnType<T extends Function> = T extends (...args: any[]) => infer R
    ? R
    : unknown;

  /* 测试 */
  const fn = (v: boolean) => {
    if (v) return 1;
    else return 2;
  };

  type a = MyReturnType<typeof fn>; // should be "1 | 2"
}
