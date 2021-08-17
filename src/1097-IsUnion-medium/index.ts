namespace T1097 {
  /* 答案 */
  type IsUnion<T, C = T> = T extends any ? (C extends T ? false : true) : never;

  /* 测试 */
  type case1 = IsUnion<string>; // false
  type case2 = IsUnion<string | number>; // true
  type case3 = IsUnion<[string | number]>; // false
}
