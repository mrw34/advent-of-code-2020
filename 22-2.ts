import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("22.txt").trimRight().split("\n");

const a = $.slice(1, Math.ceil($.length / 2) - 1).map(Number);
const b = $.slice(Math.ceil($.length / 2) + 1).map(Number);
const f = (a: number[], b: number[]): number => {
  let winner: number;
  const seen: Record<string, boolean> = {};
  while (a.length && b.length) {
    if (seen[a.concat(-1).concat(b).join()]) {
      winner = 1;
    } else if (a.length > a[0] && b.length > b[0]) {
      winner = f([...a].slice(1, a[0] + 1), [...b].slice(1, b[0] + 1));
    } else if (a[0] > b[0]) {
      winner = 1;
    } else {
      winner = 2;
    }
    seen[a.concat(-1).concat(b).join()] = true;
    if (winner === 1) {
      a.push(a.shift()!, b.shift()!);
    } else {
      b.push(b.shift()!, a.shift()!);
    }
  }
  return winner!;
};
f(a, b);
assertEquals(
  (a.length ? a : b).reduce((a, e, i, o) => a + e * (o.length - i), 0),
  31596,
);
