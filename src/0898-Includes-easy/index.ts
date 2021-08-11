namespace T0898 {
  /* 答案 */
  type Includes<A extends any[], T> = T extends A[number] ? true : false;

  /* 测试 */
  type isPillarMen = Includes<["Kars", "Esidisi", "Wamuu", "Santana"], "Dio">; // expected to be `false`
}
