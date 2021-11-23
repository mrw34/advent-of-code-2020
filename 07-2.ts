import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("07.txt").trimRight().split("\n");

const b = new Map();
for (const l of $) {
  const o = l.match(/^(\w+ \w+)/)?.[0];
  for (const [_, c, i] of l.matchAll(/(\d+) (\w+ \w+)/g)) {
    b.set(o, (b.get(o) ?? []).concat([[Number(c), i]]));
  }
}
const n = (o: string): number =>
  1 +
  (b.has(o)
    ? b.get(o).reduce((a: number, e: [number, string]) => a + e[0] * n(e[1]), 0)
    : 0);
assertEquals(n("shiny gold") - 1, 3765);
