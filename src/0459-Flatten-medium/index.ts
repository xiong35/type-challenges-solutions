namespace T0459 {
  /* 答案 */
  type Flatten<T> = T extends []
    ? []
    : T extends [infer F, ...(infer R)]
    ? [...Flatten<F>, ...Flatten<R>]
    : [T];

  /* 测试 */
  type F = Flatten<[1, 2, [3, 4], [[[5]]]]>; // [1, 2, 3, 4, 5]
}
