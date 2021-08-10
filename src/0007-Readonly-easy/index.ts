/* 答案 */
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

/* 测试 */
interface Todo {
  title: string;
  description: string;
}

const todo: MyReadonly<Todo> = {
  title: "Hey",
  description: "foobar",
};

// todo.title = "Hello"; // 无法分配到 "description" ，因为它是只读属性。
// todo.description = "barFoo"; // 无法分配到 "description" ，因为它是只读属性。
