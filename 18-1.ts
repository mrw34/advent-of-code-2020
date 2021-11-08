import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("18.txt").trimRight().split("\n");

let t = 0;
for (let l of $) {
  while (true) {
    const m = l.match(/\d+ [+*] \d+/);
    if (!m) {
      break;
    }
    l = l.replace(m[0], eval(m[0])).replace(/\((\d+)\)/, "$1");
  }
  t += Number(l);
}
assertEquals(t, 280014646144);
