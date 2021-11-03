import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("02.txt").trimRight().split("\n");

let valid = 0;
for (const l of $) {
  const [_, min, max, letter, password] = l.match(/(\d+)-(\d+) (\w): (\w+)/)!;
  const c = password.match(RegExp(letter, "g"))?.length ?? 0;
  if (c >= Number(min) && c <= Number(max)) {
    valid++;
  }
}
assertEquals(valid, 542);
