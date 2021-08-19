namespace T1978 {
  /* 答案 */
  type _Stage = 0 | 1 ; // 0 阶段匹配符号, 1匹配数值和单位
  type _Sign = "+" | "-";
  type _Unit = "%";
  type PercentageParser<
    P extends string,
    S extends _Stage = 0,
    R extends string[] = []
  > = S extends 0
      ? P extends `${infer F}${infer L}`
        ? F extends _Sign
          ? PercentageParser<L, 1, [F]>
          : PercentageParser<P, 1, [""]>
        : ["", P, ""]
      : P extends `${infer D}${_Unit}`
        ? [...R, D, "%"]
        : [...R, P, ""]

  /* 测试 */
  type PString1 = "";
  type PString2 = "+85%";
  type PString3 = "-85%";
  type PString4 = "85%";
  type PString5 = "85";

  type R1 = PercentageParser<PString1>; // expected ['', '', '']
  type R2 = PercentageParser<PString2>; // expected ["+", "85", "%"]
  type R3 = PercentageParser<PString3>; // expected ["-", "85", "%"]
  type R4 = PercentageParser<PString4>; // expected ["", "85", "%"]
  type R5 = PercentageParser<PString5>; // expected ["", "85", ""]
}
