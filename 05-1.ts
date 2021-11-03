import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("05.txt").trimRight().split("\n");

let m = 0;
for (const l of $) {
  let r = 0;
  for (let i = 0; i <= 6; i++) {
    if (l[i] === "B") {
      r += 2 ** (6 - i);
    }
  }
  let c = 0;
  for (let i = 7; i <= 9; i++) {
    if (l[i] === "R") {
      c += 2 ** (9 - i);
    }
  }
  m = Math.max(m, r * 8 + c);
}
assertEquals(m, 965);
