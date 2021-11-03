import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("04.txt").trimRight();

let v = 0;
for (const p of $.split(/\n\n/)) {
  const ps = p.split(/\s/).map((e) => e.split(":")[0]).filter((e) =>
    e !== "cid"
  );
  if (ps.length === 7) {
    v++;
  }
}
assertEquals(v, 216);
