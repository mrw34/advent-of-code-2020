import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("24.txt").trimRight().split("\n");

const a: Record<string, true> = {};
for (const l of $) {
  let x = 0, y = 0;
  for (let b = l; b.length;) {
    if (b.startsWith("e")) {
      x += 1;
      b = b.substr(1);
    } else if (b.startsWith("se")) {
      x += 0.5;
      y -= 0.5;
      b = b.substr(2);
    } else if (b.startsWith("sw")) {
      x -= 0.5;
      y -= 0.5;
      b = b.substr(2);
    } else if (b.startsWith("w")) {
      x -= 1;
      b = b.substr(1);
    } else if (b.startsWith("nw")) {
      x -= 0.5;
      y += 0.5;
      b = b.substr(2);
    } else if (b.startsWith("ne")) {
      x += 0.5;
      y += 0.5;
      b = b.substr(2);
    }
  }
  if (a[[x, y].join()]) {
    delete (a[[x, y].join()]);
  } else {
    a[[x, y].join()] = true;
  }
}
assertEquals(Object.values(a).length, 277);
