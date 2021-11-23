import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("10.txt").trimRight().split("\n").map(Number)
  .sort((a, b) => b - a).concat(0);

const m = { [$[0] + 3]: 1 };
for (const n of $) {
  m[n] = [n + 3, n + 2, n + 1].reduce((a, e) => a + (m[e] ?? 0), 0);
}
assertEquals(m[0], 56693912375296);
