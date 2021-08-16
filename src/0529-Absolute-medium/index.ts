namespace T0529 {
  /* 答案 */
  type Absolute<T extends number> = `${T}` extends `-${infer N}` ? N : `${T}`;
  
  /* 测试 */
  type Test = -100;
  type Result = Absolute<Test>; // expected to be "100"
}