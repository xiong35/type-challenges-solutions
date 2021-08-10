type MyExclude<T, E> = T extends E ? never : T;

type T0 = MyExclude<"a" | "b" | "c", "a">; // expected "b" | "c"
type T1 = MyExclude<string | number | boolean, string | Function>; // expected number | boolean
