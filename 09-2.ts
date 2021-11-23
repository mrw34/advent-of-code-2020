import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("09.txt").trimRight().split("\n").map(Number);

const d = 25;
let i = d;
l:
for (;; i++) {
  for (let j = i - d; j < i - 1; j++) {
    for (let k = j + 1; k < i; k++) {
      if ($[j] + $[k] === $[i] /*&& $[j] !== $[k]*/) {
        continue l;
      }
    }
  }
  break l;
}
let j, k: number;
l:
for (j = 0; j < $.length; j++) {
  let t = 0;
  for (k = j; k < $.length; k++) {
    t += $[k];
    if (t === $[i]) {
      break l;
    } else if (t > $[i]) {
      break;
    }
  }
}
assertEquals(
  Math.min(...$.slice(j, k!)) + Math.max(...$.slice(j, k!)),
  219202240,
);
