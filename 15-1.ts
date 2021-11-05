import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("15.txt").trimRight().split(",").map(Number);

let current, previous: number | undefined;
for (let i = 0, a = []; i < 2020; i++) {
  if (i < $.length) {
    current = $[i];
  } else {
    if (a[previous!] === undefined) {
      current = 0;
    } else {
      current = (i - 1) - a[previous!];
    }
  }
  if (previous !== undefined) {
    a[previous] = i - 1;
  }
  previous = current;
}
assertEquals(current, 492);
