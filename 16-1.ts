import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("16.txt");

const valid = [];
const rules = $.split("your ticket:\n")[0].trimRight().split("\n");
for (const l of rules) {
  const m = l.match(/(?:(\d+)-(\d+) or (\d+)-(\d+))/)!;
  for (let i = Number(m[1]); i <= Number(m[2]); i++) {
    valid[i] = true;
  }
  for (let i = Number(m[3]); i <= Number(m[4]); i++) {
    valid[i] = true;
  }
}
let invalid = 0;
const nearbyTickets = $.split("nearby tickets:\n")[1].trimRight().split("\n")
  .map((e) => e.split(",").map(Number));
for (const l of nearbyTickets) {
  for (const v of l) {
    if (!valid[v]) {
      invalid += v;
    }
  }
}
assertEquals(invalid, 18227);
