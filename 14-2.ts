import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("14.txt").trimRight().split("\n");

const mem = new Map();
let mask = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
for (const l of $) {
  const m = l.match(/^(mask = ([01X]+))|(mem\[(\d+)\] = (\d+))$/)!;
  if (m[2]) {
    mask = m[2];
  } else {
    let address = Number(m[4]).toString(2).padStart(36, "0").split("").map((
      e,
      i,
    ) => mask[i] === "0" ? e : mask[i]).join("");
    for (
      const addresses = [address];
      addresses.length;
      address = addresses.shift()!
    ) {
      const p = address.indexOf("X");
      if (p === -1) {
        mem.set(address, Number(m[5]));
      } else {
        addresses.push(
          address.substring(0, p) + "0" + address.substring(p + 1),
          address.substring(0, p) + "1" + address.substring(p + 1),
        );
      }
    }
  }
}
assertEquals([...mem.values()].reduce((a, e) => a + e, 0), 3705162613854);
