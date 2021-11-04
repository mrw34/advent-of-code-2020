import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("07.txt").trimRight().split("\n");

const b = new Map();
for (const l of $) {
  const o = l.match(/^(\w+ \w+)/)?.[0];
  for (const [_, _c, i] of l.matchAll(/(\d+) (\w+ \w+)/g)) {
    b.set(i, (b.get(i) ?? []).concat(o));
  }
}
const d = ["shiny gold"];
for (const i of d) {
  if (b.has(i)) {
    for (const j of b.get(i)) {
      if (!d.includes(j)) {
        d.push(j);
      }
    }
  }
}
assertEquals(d.length - 1, 261);
