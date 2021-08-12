namespace T0008 {
  /* 答案 */
  type MyReadonly2<T, Ks extends keyof T = keyof T> = T &
    Readonly<
      {
        [K in Ks]: T[K];
      }
    >;

  /* 测试 */
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  const todo: MyReadonly2<Todo, "title" | "description"> = {
    title: "Hey",
    description: "foobar",
    completed: false,
  };

  // todo.title = "Hello"; // Error: cannot reassign a readonly property
  // todo.description = "barFoo"; // Error: cannot reassign a readonly property
  todo.completed = true; // OK
}
