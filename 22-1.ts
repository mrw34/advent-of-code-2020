import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("22.txt").trimRight().split("\n");

const a = $.slice(1, Math.ceil($.length / 2) - 1).map(Number);
const b = $.slice(Math.ceil($.length / 2) + 1).map(Number);
while (a.length && b.length) {
  if (a[0] > b[0]) {
    a.push(a.shift()!, b.shift()!);
  } else {
    b.push(b.shift()!, a.shift()!);
  }
}
assertEquals(
  (a.length ? a : b).reduce((a, e, i, o) => a + e * (o.length - i), 0),
  32413,
);
