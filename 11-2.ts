import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("11.txt").trimRight().split("\n");

let after: string[];
for (let before = [...$];;) {
  after = [];
  for (let y = 0; y < before.length; y++) {
    after[y] = "";
    for (let x = 0; x < before[0].length; x++) {
      let occupiedNeighbours = 0;
      for (
        const [dx, dy] of [
          [-1, -1],
          [-1, 0],
          [-1, 1],
          [0, -1],
          [0, 1],
          [1, -1],
          [1, 0],
          [1, 1],
        ]
      ) {
        for (let x_ = x, y_ = y;;) {
          x_ = x_ + dx;
          y_ = y_ + dy;
          if (
            x_ < 0 || x_ >= before[0].length || y_ < 0 || y_ >= before.length ||
            before[y_][x_] === "L"
          ) {
            break;
          }
          if (before[y_][x_] === "#") {
            occupiedNeighbours++;
            break;
          }
        }
      }
      if (before[y][x] === "L" && occupiedNeighbours === 0) {
        after[y] += "#";
      } else if (before[y][x] === "#" && occupiedNeighbours >= 5) {
        after[y] += "L";
      } else {
        after[y] += before[y][x];
      }
    }
  }
  if (after.join("") === before.join("")) {
    break;
  }
  before = after;
}
assertEquals(after.join("").match(/#/g)?.length, 2074);
