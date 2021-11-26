import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("23.txt").trimRight().split("").map(Number)
  .concat(Array.from(new Array(1_000_000 - 9), (_, i) => i + 10));

const minCupLabel = 1, maxCupLabel = 1_000_000;
for (let i = 0, currentCupLabel = $[0]; i < 10_000_000; i++) {
  $.push(...$.splice(0, $.indexOf(currentCupLabel)));
  const pickedUp = $.splice(1, 3);
  let destinationCupLabel = currentCupLabel - 1;
  if (destinationCupLabel < minCupLabel) {
    destinationCupLabel = maxCupLabel;
  }
  while (pickedUp.includes(destinationCupLabel)) {
    destinationCupLabel--;
    if (destinationCupLabel < minCupLabel) {
      destinationCupLabel = maxCupLabel;
    }
  }
  const destinationCupIndex = $.indexOf(destinationCupLabel);
  $.splice(destinationCupIndex + 1, 0, ...pickedUp);
  currentCupLabel = $[$.indexOf(currentCupLabel) + 1];
}
assertEquals($[$.indexOf(1) + 1] * $[$.indexOf(1) + 2], 286194102744);
