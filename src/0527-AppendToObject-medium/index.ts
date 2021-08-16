namespace T0527 {
  /* 答案 */
  type Key = string | number | symbol;
  type AppendToObject<O extends Record<Key, any>, K extends Key, V> = {
    [k in keyof O | K]: k extends K ? V : O[k];
  };

  /* 测试 */
  type Test = { id: "1" };
  type Result = AppendToObject<Test, "value", 4>; // expected to be { id: '1', value: 4 }
}
