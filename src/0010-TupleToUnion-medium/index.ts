namespace T0010 {
  /* 答案 */
  type TupleToUnion<T extends readonly any[]> = T[number];

  /* 测试 */
  type Arr = ["1", "2", "3"];

  type A = TupleToUnion<Arr>; // expected to be '1' | '2' | '3'
}
