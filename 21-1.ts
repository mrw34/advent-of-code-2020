import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("21.txt").trimRight().split("\n");

const b: Record<string, string[]> = {};
for (const l of $) {
  const m = l.match(/(.+) \(contains (.+)\)/)!;
  const is = m[1].split(" ");
  const as = m[2].split(", ");
  for (const a of as) {
    if (b[a]) {
      b[a] = b[a].filter((e) => is.includes(e));
      if (b[a].length === 1) {
        Object.entries(b).forEach(([k, v]) => {
          if (k !== a) {
            b[k] = v.filter((e) => e !== b[a][0]);
          }
        });
      }
    } else {
      b[a] = is;
    }
  }
}
let c = 0;
for (const l of $) {
  const m = l.match(/(.+) \(contains (.+)\)/)!;
  for (const i of m[1].split(" ")) {
    if (!Object.values(b).flat().includes(i)) {
      c++;
    }
  }
}
assertEquals(c, 2302);
