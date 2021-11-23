import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("01.txt").trimRight().split("\n").map(Number);

const f = () => {
  for (const a of $) {
    for (const b of $) {
      for (const c of $) {
        if (a + b + c === 2020) {
          return a * b * c;
        }
      }
    }
  }
};
assertEquals(f(), 116724144);
