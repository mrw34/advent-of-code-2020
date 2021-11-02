import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("01.txt").trimRight().split("\n").map(Number);

const f = () => {
  for (const a of $) {
    for (const b of $) {
      if (a + b === 2020) {
        return a * b;
      }
    }
  }
};
assertEquals(f(), 910539);
