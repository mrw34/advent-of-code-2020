import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("06.txt").trimRight();

let v = 0;
for (const p of $.split(/\n\n/)) {
  let s: Set<string> | undefined;
  for (const l of p.split("\n")) {
    s = new Set(
      s ? [...s].filter((e) => l.split("").includes(e)) : l.split(""),
    );
  }
  v += s!.size;
}
assertEquals(v, 2971);
