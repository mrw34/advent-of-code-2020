import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("24.txt").trimRight().split("\n");

let a: Record<string, true> = {};
for (const l of $) {
  let x = 0, y = 0;
  for (let b = l; b.length;) {
    if (b.startsWith("e")) {
      x += 1;
      b = b.substr(1);
    } else if (b.startsWith("se")) {
      x += 0.5;
      y -= 0.5;
      b = b.substr(2);
    } else if (b.startsWith("sw")) {
      x -= 0.5;
      y -= 0.5;
      b = b.substr(2);
    } else if (b.startsWith("w")) {
      x -= 1;
      b = b.substr(1);
    } else if (b.startsWith("nw")) {
      x -= 0.5;
      y += 0.5;
      b = b.substr(2);
    } else if (b.startsWith("ne")) {
      x += 0.5;
      y += 0.5;
      b = b.substr(2);
    }
  }
  if (a[[x, y].join()]) {
    delete (a[[x, y].join()]);
  } else {
    a[[x, y].join()] = true;
  }
}
assertEquals(Object.values(a).length, 277);

const n = (x: number, y: number) => {
  let d = 0;
  for (
    const [dx, dy] of [[1, 0], [0.5, -0.5], [-0.5, -0.5], [-1, 0], [
      -0.5,
      0.5,
    ], [0.5, 0.5]]
  ) {
    if (a[[x + dx, y + dy].join()]) {
      d++;
    }
  }
  return d;
};

for (let i = 0; i < 100; i++) {
  const c: Record<string, true> = {};
  Object.keys(a).forEach((e) => {
    const [x, y] = e.split(",").map(Number);
    const d = n(x, y);
    if (d === 1 || d === 2) {
      c[[x, y].join()] = true;
    }
    for (
      const [dx, dy] of [[1, 0], [0.5, -0.5], [-0.5, -0.5], [-1, 0], [
        -0.5,
        0.5,
      ], [0.5, 0.5]]
    ) {
      if (!a[[x + dx, y + dy].join()]) {
        if (n(x + dx, y + dy) === 2) {
          c[[x + dx, y + dy].join()] = true;
        }
      }
    }
  });
  a = c;
}
assertEquals(Object.values(a).length, 3531);
