import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $: [string, number][] = Deno.readTextFileSync("08.txt").trimRight().split(
  "\n",
).map((e) => e.split(" ")).map(([op, arg]) => [op, Number(arg)]);

let acc = 0;
for (let seen: number[] = [], i = 0; !seen.includes(i);) {
  seen.push(i);
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
}
assertEquals(acc, 1262);
