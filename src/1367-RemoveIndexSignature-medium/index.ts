namespace T1367 {
  /* 答案 */
  type RemoveIndexSignature<T> = {
    [K in keyof T as string extends K ? never : number extends K ? never : K]: T[K]
  };

  /* 测试 */
  type Foo = {
    [key: number]: any;
    foo(): void;
  };
  
  type A = RemoveIndexSignature<Foo>; // expected { foo(): void }
}
