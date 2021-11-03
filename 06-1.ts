import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("06.txt").trimRight();

let v = 0;
for (const p of $.split(/\n\n/)) {
  v += new Set(p.replaceAll("\n", "").split("")).size;
}
assertEquals(v, 6161);
