import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("16.txt");

const valid: boolean[] = [];
for (const l of $.split("your ticket:\n")[0].trimRight().split("\n")) {
  const m = l.match(/(?:(\d+)-(\d+) or (\d+)-(\d+))/)!;
  for (let i = Number(m[1]); i <= Number(m[2]); i++) {
    valid[i] = true;
  }
  for (let i = Number(m[3]); i <= Number(m[4]); i++) {
    valid[i] = true;
  }
}

const rules: Record<string, (v: number) => boolean> = $.split(
  "your ticket:\n",
)[0].trimRight().split("\n").reduce(
  (a, e) => {
    const m = e.match(/^(.+): (\d+)-(\d+) or (\d+)-(\d+)$/)!;
    return {
      [m[1]]: (v: number) =>
        v >= Number(m[2]) && v <= Number(m[3]) ||
        v >= Number(m[4]) && v <= Number(m[5]),
      ...a,
    };
  },
  {},
);

const nearbyTickets = $.split("nearby tickets:\n")[1].trimRight().split("\n")
  .map((e) => e.split(",").map(Number)).filter((e) => e.every((e) => valid[e]));
const passed = [];
for (let i = 0; i < nearbyTickets[0].length; i++) {
  passed[i] = Object.entries(rules).reduce(
    (a: string[], [k, v]) =>
      nearbyTickets.every((e) => v(e[i])) ? a.concat(k) : a,
    [],
  );
}

for (let updated;;) {
  updated = false;
  for (const a of passed) {
    if (a.length === 1) {
      for (const b of passed) {
        if (b.includes(a[0]) && b.length > 1) {
          b.splice(b.indexOf(a[0]), 1);
          updated = true;
        }
      }
    }
  }
  if (!updated) {
    break;
  }
}

const t = $.split("your ticket:\n")[1].split("\n")[0].split(",").map(Number);
assertEquals(
  passed.reduce((a, e, i) => a *= e[0].startsWith("departure ") ? t[i] : 1, 1),
  2355350878831,
);
