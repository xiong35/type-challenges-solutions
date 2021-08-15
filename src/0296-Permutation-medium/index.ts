namespace T0296 {
  /* 答案 */
  type Permutation<T, K = T> = [T] extends [never]
    ? []
    : T extends any
    ? [T, ...Permutation<Exclude<K, T>>]
    : never;

  /* 测试 */
  type perm = Permutation<"A" | "B" | "C">; // ['A', 'B', 'C'] | ['A', 'C', 'B'] | ['B', 'A', 'C'] | ['B', 'C', 'A'] | ['C', 'A', 'B'] | ['C', 'B', 'A']
}
