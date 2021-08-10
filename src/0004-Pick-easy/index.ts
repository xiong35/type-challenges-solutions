namespace T0004 {
  /* 答案 */
  type MyPick<From, Keys extends keyof From> = {
    [K in Keys]: From[K];
  };

  /* 测试 */
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = MyPick<Todo, "title" | "completed">;

  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
  };
}
