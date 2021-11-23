import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("03.txt").trimRight().split("\n");

const z = (x: number, y: number) => $[y][x % $[0].length];
let u = 1;
for (const [dx, dy] of [[1, 1], [3, 1], [5, 1], [7, 1], [1, 2]]) {
  let t = 0;
  for (let x = 0, y = 0; y < $.length; x += dx, y += dy) {
    if (z(x, y) === "#") {
      t++;
    }
  }
  u *= t;
}
assertEquals(u, 2698900776);
