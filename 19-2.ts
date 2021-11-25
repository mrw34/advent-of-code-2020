import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("19.txt").trimRight().replace(
  "8: 42",
  "8: 42 | 42 8",
).replace("11: 42 31", "11: 42 31 | 42 11 31");

const a: Record<string, string[][]> = {};
for (const [_, l, r] of $.matchAll(/^(\d+): (.*)$/gm)) {
  a[l] = r.replaceAll('"', "").split(" | ").map((e) => e.split(" "));
}
const p = Array.from($.matchAll(/^\w+$/gm), (e) => e[0]);
let t = 0;
for (const c = [a["0"][0]]; c.length;) {
  const d: string[] = c.shift()!;
  const i = d.findIndex((e) => Number(e));
  if (i === -1) {
    if (p.includes(d.join(""))) {
      t++;
    }
    continue;
  }
  for (const f of a[d[i]]) {
    const g = [...d];
    g.splice(i, 1, ...f);
    const prefix = g.filter((e) => !Number(e)).join("");
    if (p.some((e) => e.startsWith(prefix))) {
      c.push(g);
    }
  }
}
assertEquals(t, 346);
