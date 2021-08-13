namespace T0015 {
  /* 答案 */
  type Last<T extends any[]> = T extends [...any, infer R] ? R : unknown;

  /* 测试 */
  type arr1 = ["a", "b", "c"];
  type arr2 = [3, 2, 1];

  type tail1 = Last<arr1>; // expected to be 'c'
  type tail2 = Last<arr2>; // expected to be 1
}
