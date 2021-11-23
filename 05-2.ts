import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("05.txt").trimRight().split("\n");

const m = [];
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
  m.push(r * 8 + c);
}
let s;
for (let n = Math.min(...m); n <= Math.max(...m); n++) {
  if (m.includes(n - 1) && m.includes(n + 1) && !m.includes(n)) {
    s = n;
    break;
  }
}
assertEquals(s, 524);
