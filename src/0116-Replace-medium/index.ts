namespace T0116 {
  /* 答案 */
  type Replace<S, F extends string, T extends string> = S extends `${infer L}${F}${infer R}`
    ? `${L}${T}${R}`
    : S;

  /* 测试 */
  type replaced = Replace<'types are fun!', 'fun', 'awesome'> // expected to be 'types are awesome!'

}