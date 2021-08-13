namespace T0016 {
  /* 答案 */
  type Pop<T extends any[]> = T extends [...(infer P), any] ? P : unknown;
  type Shift<T extends any[]> = T extends [any, ...(infer S)] ? S : unknown;
  type Push<T extends any[], E> = [...T, E];
  type Unshift<T extends any[], E> = [E, ...T];

  /* 测试 */
  type arr1 = ["a", "b", "c", "d"];
  type arr2 = [3, 2, 1];

  type pop1 = Pop<arr1>; // expected to be ['a', 'b', 'c']
  type pop2 = Pop<arr2>; // expected to be [3, 2]
  type shift1 = Shift<arr1>; // expected to be ['b', 'c', 'd']
  type shift2 = Shift<arr2>; // expected to be [2, 1]
  type push1 = Push<arr1, "e">; // expected to be ['a', 'b', 'c', 'd', 'e']
  type push2 = Push<arr2, 0>; // expected to be [3, 2, 1, 0]
  type unshift1 = Unshift<arr1, "foo">; // expected to be ['foo', 'a', 'b', 'c', 'd']
  type unshift2 = Unshift<arr2, 4>; // expected to be [4, 3, 2, 1]
}
