import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $: [string, number][] = Deno.readTextFileSync("12.txt").trimRight().split(
  "\n",
).map((e) => e.match(/(\w)(\d{1,3})/)!).map((e) => [e[1], Number(e[2])]);

let d = "E", x = 0, y = 0;
for (const l of $) {
  switch (l[0]) {
    case "N":
      y += l[1];
      break;
    case "S":
      y -= l[1];
      break;
    case "E":
      x += l[1];
      break;
    case "W":
      x -= l[1];
      break;
    case "L":
      switch (l[1]) {
        case 90:
          d = d === "N" ? "W" : (d === "S" ? "E" : (d === "E" ? "N" : "S"));
          break;
        case 180:
          d = d === "N" ? "S" : (d === "S" ? "N" : (d === "E" ? "W" : "E"));
          break;
        case 270:
          d = d === "N" ? "E" : (d === "S" ? "W" : (d === "E" ? "S" : "N"));
          break;
      }
      break;
    case "R":
      switch (l[1]) {
        case 90:
          d = d === "N" ? "E" : (d === "S" ? "W" : (d === "E" ? "S" : "N"));
          break;
        case 180:
          d = d === "N" ? "S" : (d === "S" ? "N" : (d === "E" ? "W" : "E"));
          break;
        case 270:
          d = d === "N" ? "W" : (d === "S" ? "E" : (d === "E" ? "N" : "S"));
          break;
      }
      break;
    case "F":
      switch (d) {
        case "N":
          y += l[1];
          break;
        case "S":
          y -= l[1];
          break;
        case "E":
          x += l[1];
          break;
        case "W":
          x -= l[1];
          break;
      }
      break;
  }
}
assertEquals(Math.abs(x) + Math.abs(y), 582);
