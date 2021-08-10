namespace T0014 {
  /* 答案 */
  type First<T extends any[]> = T["length"] extends 0 ? unknown : T[0];

  /* 测试 */
  type arr1 = ["a", "b", "c"];
  type arr2 = [3, 2, 1];

  type head1 = First<arr1>; // expected to be 'a'
  type head2 = First<arr2>; // expected to be 3
}
