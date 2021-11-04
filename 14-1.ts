import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("14.txt").trimRight().split("\n");

const mem = [];
let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
for (const l of $) {
  const m = l.match(/(mask = ([01X]+))|(mem\[(\d+)\] = (\d+))/)!;
  if (m[2]) {
    mask = m[2];
  } else {
    const value = Number(m[5]).toString(2).padStart(36, "0").split("").map((
      e,
      i,
    ) => mask[i] === "X" ? e : mask[i]).join("");
    mem[Number(m[4])] = parseInt(value, 2);
  }
}
assertEquals(mem.reduce((a, e) => a + e, 0), 7611244640053);
