import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("23.txt").trimRight().split("").map(Number);

const minCupLabel = Math.min(...$), maxCupLabel = Math.max(...$);
for (let i = 0, currentCupLabel = $[0]; i < 100; i++) {
  // console.log("cups:", $);
  $.push(...$.splice(0, $.indexOf(currentCupLabel)));
  const pickedUp = $.splice(1, 3);
  // console.log("pick up:", pickedUp);
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
  // console.log("destination:", destinationCupLabel);
  const destinationCupIndex = $.indexOf(destinationCupLabel);
  $.splice(destinationCupIndex + 1, 0, ...pickedUp);
  currentCupLabel = $[$.indexOf(currentCupLabel) + 1];
}
const order = [];
for (let i = 1; i < $.length; i++) {
  order.push($[($.indexOf(1) + i) % $.length]);
}
assertEquals(order.join(""), "74698532");
