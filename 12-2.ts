import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $: [string, number][] = Deno.readTextFileSync("12.txt").trimRight().split(
  "\n",
).map((e) => e.match(/(\w)(\d{1,3})/)!).map((e) => [e[1], Number(e[2])]);

let x = 0, y = 0, wx = 10, wy = 1;
for (const l of $) {
  switch (l[0]) {
    case "N":
      wy += l[1];
      break;
    case "S":
      wy -= l[1];
      break;
    case "E":
      wx += l[1];
      break;
    case "W":
      wx -= l[1];
      break;
    case "L":
      switch (l[1]) {
        case 90:
          [wx, wy] = [-wy, wx];
          break;
        case 180:
          [wx, wy] = [-wx, -wy];
          break;
        case 270:
          [wx, wy] = [wy, -wx];
          break;
      }
      break;
    case "R":
      switch (l[1]) {
        case 90:
          [wx, wy] = [wy, -wx];
          break;
        case 180:
          [wx, wy] = [-wx, -wy];
          break;
        case 270:
          [wx, wy] = [-wy, wx];
          break;
      }
      break;
    case "F":
      x += wx * l[1];
      y += wy * l[1];
      break;
  }
}
assertEquals(Math.abs(x) + Math.abs(y), 52069);
