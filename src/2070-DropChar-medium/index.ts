namespace T2070 {
  /* 答案 */
  type Split<S extends string, Arr extends string[] = []> = S extends `${infer F}${infer R}`
    ? Split<R, [...Arr, F]>
    : Arr
  type Length<S extends string> = Split<S>["length"]
  
  type DropChar<
    S extends string,
    C extends string,
    D extends string = ""
    > = Length<C> extends 1
          ? S extends `${infer F}${infer R}`
            ? F extends C
              ? DropChar<R, C, D>
              : DropChar<R, C, `${D}${F}`>
            : D
          : never;

  /* 测试 */
  type Butterfly = DropChar<" b u t t e r f l y ! ", " ">; // 'butterfly!'
}
