namespace T0531 {
  /* 答案 */
  type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
    ? Split<R, [...Arr, F]>
    : Arr
  type StringToUnion<S extends string> = Split<S>[number];

  /* 测试 */
  type Test = "123";
  type Result = StringToUnion<Test>; // expected to be "1" | "2" | "3"
}
