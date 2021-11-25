import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("18.txt").trimRight().split("\n");

const f = (l: string) => {
  while (true) {
    let m = l.match(/\d+ [+] \d+/);
    if (!m) {
      m = l.match(/\d+ [*] \d+/);
      if (!m) {
        break;
      }
    }
    l = l.replace(m[0], eval(m[0]));
  }
  return l;
};

let t = 0;
for (let l of $) {
  while (true) {
    const m = l.match(/[(]([^())]+)[)]/);
    if (!m) {
      l = f(l);
      break;
    }
    l = l.replace(m[0], f(m[1]));
  }
  t += Number(l);
}
assertEquals(t, 9966990988262);
