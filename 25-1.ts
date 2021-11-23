import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("25.txt").trimRight().split("\n").map(Number);

let i = 1;
for (let a = 1; a !== $[0]; i++) {
  a = (a * 7) % 20201227;
}
let b = 1;
for (let j = 1; j < i; j++) {
  b = (b * $[1]) % 20201227;
}
assertEquals(b, 6011069);
