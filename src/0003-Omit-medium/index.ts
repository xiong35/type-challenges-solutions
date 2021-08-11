namespace T0003 {
  /* 答案 */
  type MyOmit<T, K extends keyof T> = {
    [Tk in keyof T as Tk extends K ? never : Tk]: T[Tk];
  };

  /* 测试 */
  interface Todo {
    title: string;
    description: string;
    completed: boolean;
  }

  type TodoPreview = MyOmit<Todo, "description" | "title">;

  const todo: TodoPreview = {
    completed: false,
  };
}
