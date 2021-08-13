namespace T0012 {
  /* 答案 */
  type Chainable<R = {}> = {
    option<K extends number | string | symbol, V>(
      key: K,
      value: V
    ): Chainable<R & { [k in K]: V }>;
    get(): R;
  };

  /* 测试 */
  declare const config: Chainable;

  const result: Result = config
    .option("foo", 123)
    .option("name", "type-challenges")
    .option("bar", { value: "Hello World" })
    .get();

  // 期望 result 的类型是：
  interface Result {
    foo: number;
    name: string;
    bar: {
      value: string;
    };
  }
}

type Chainable<R = {}> = {
  option(key: string | number | symbol, value: any): Chainable;
  get(): R;
};
