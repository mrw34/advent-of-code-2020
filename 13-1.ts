import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("13.txt").trimRight().split("\n");

const t = Number($[0]);
const bs = $[1].split(",").filter((e) => e !== "x").map(Number);

const [b, w] =
  bs.map((b) => [b, (Math.ceil(t / b) * b) % t]).sort(([_b1, r1], [_b2, r2]) =>
    r1 - r2
  )[0];
assertEquals(w * b, 1835);
