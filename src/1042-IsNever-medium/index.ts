namespace T1042 {
  /* 答案 */
  // type IsNever<T> = [T] extends [never] ? true : false;
  // type IsNever<T> = T[] extends never[] ? true : false;
  type IsNever<T> = { foo: T } extends { foo: never } ? true : false;

  /* 测试 */
  type A = IsNever<never>; // expected to be true
  type B = IsNever<undefined>; // expected to be false
  type C = IsNever<null>; // expected to be false
  type D = IsNever<[]>; // expected to be false
  type E = IsNever<number>; // expected to be false
}
