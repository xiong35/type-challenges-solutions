namespace T0062 {
  /* 答案 */
  // N for Name
  type LookUp<
    T extends { type: string },
    N extends T extends { type: infer K } ? K : never
  > = T extends { type: N } ? T : never;

  /* 测试 */
  interface Cat {
    type: "cat";
    breeds: "Abyssinian" | "Shorthair" | "Curl" | "Bengal";
  }

  interface Dog {
    type: "dog";
    breeds: "Hound" | "Brittany" | "Bulldog" | "Boxer";
    color: "brown" | "white" | "black";
  }

  type MyDog = LookUp<Cat | Dog, "dog">; // expected to be `Dog`
  type MyCat = LookUp<Cat | Dog, "cat">; // expected to be `Cat`
  // type MyDot = LookUp<Cat | Dog, "dot">; // Error: 类型“"dot"”不满足约束“"cat" | "dog"”
}
