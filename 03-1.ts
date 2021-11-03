import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("03.txt").trimRight().split("\n");

const z = (x: number, y: number) => $[y][x % $[0].length];
let t = 0;
for (let x = 0, y = 0; y < $.length; x += 3, y += 1) {
  if (z(x, y) === "#") {
    t++;
  }
}
assertEquals(t, 262);
