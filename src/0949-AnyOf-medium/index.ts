namespace T0949 {
  /* 答案 */
  type Falsy = 0 | "" | false | [];
  type AnyOf<T extends any[]> = T extends [infer F, ...(infer R)]
    ? F extends Falsy
      ? AnyOf<R>
      : true
    : false;

  /* 测试 */

  type Sample1 = AnyOf<[1, "", false, []]>; // expected to be true.
  type Sample2 = AnyOf<[0, "", false, []]>; // expected to be false.
}
