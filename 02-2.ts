import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("02.txt").trimRight().split("\n");

let valid = 0;
for (const l of $) {
  const [_, position1, position2, letter, password] = l.match(
    /(\d+)-(\d+) (\w): (\w+)/,
  )!;
  if (
    Number(password[Number(position1) - 1] === letter) ^
    Number(password[Number(position2) - 1] === letter)
  ) {
    valid++;
  }
}
assertEquals(valid, 360);
