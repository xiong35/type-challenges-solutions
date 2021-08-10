/* 答案 */
type TupleToObject<T extends readonly (number | string | symbol)[]> = {
  [V in T[number]]: V;
};

/* 测试 */
const tuple = ["tesla", "model 3", "model X"] as const;

const result: TupleToObject<typeof tuple> = {
  tesla: "tesla",
  "model 3": "model 3",
  "model X": "model X",
};
