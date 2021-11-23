import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $: [string, number][] = Deno.readTextFileSync("08.txt").trimRight().split(
  "\n",
).map((e) => e.split(" ")).map(([op, arg]) => [op, Number(arg)]);

const $$ = $.reduce(
  (a: number[], e, i) => a.concat(["jmp", "nop"].includes(e[0]) ? i : []),
  [],
).map((i) =>
  $.slice(0, i).concat([[$[i][0] === "jmp" ? "nop" : "jmp", $[i][1]]]).concat(
    $.slice(i + 1),
  )
);
const f = ($: [string, number][]) => {
  let acc = 0;
  for (let i = 0, x = 0; i < $.length; x++) {
    switch ($[i][0]) {
      case "acc":
        acc += $[i][1];
        i++;
        break;
      case "jmp":
        i += $[i][1];
        break;
      case "nop":
        i++;
        break;
    }
    if (x >= 1_000_000) {
      return;
    }
  }
  return acc;
};
let acc;
for (const $ of $$) {
  if ((acc = f($)) !== undefined) {
    break;
  }
}
assertEquals(acc, 1643);
