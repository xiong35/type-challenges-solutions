namespace T0298 {
  /* 答案 */
  type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
    ? Split<R, [...Arr, F]>
    : Arr
  type Length<S extends string> = Split<S>["length"]

  /* 测试 */
  type L = Length<"hello">; // expected to be 5
}
