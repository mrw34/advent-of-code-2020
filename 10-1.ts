import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("10.txt").trimRight().split("\n").map(Number)
  .sort((a, b) => a - b);

$.unshift(0);
let one = 0, three = 1;
for (let i = 1; i < $.length; i++) {
  switch ($[i] - $[i - 1]) {
    case 1:
      one++;
      break;
    case 3:
      three++;
      break;
  }
}
assertEquals(one * three, 1656);
