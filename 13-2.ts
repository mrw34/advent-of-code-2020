import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("13.txt").trimRight().split("\n");

const bs = $[1].split(",").map(Number);
let t = 100000000000003;
for (; bs.some((e, i) => !isNaN(e) && (t - 48 + i) % e); t += 613);
assertEquals(t - 48, 247086664214628);
