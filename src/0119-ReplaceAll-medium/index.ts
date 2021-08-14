namespace T0119 {
  /* 答案 */
  type Replace<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
    ? `${L}${T}${R}`
    : S;
  type ReplaceAll<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
    ? ReplaceAll<Replace<S, F, T>, F, T>
    : S

  /* 测试 */
  type replaced = ReplaceAll<'t y p e s', ' ', ''> // expected to be 'types'
}