import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("17.txt").trimRight().split("\n");

const w: Record<string, boolean> = {};
for (let y = 0; y < $.length; y++) {
  for (let x = 0; x < $[0].length; x++) {
    if ($[y][x] === "#") {
      w[[x, y, 0, 0].join()] = true;
    }
  }
}

for (let i = 0; i < 6; i++) {
  const c = Object.entries(w).filter(([_, v]) => v).map(([k, _]) =>
    k.split(",").map(Number)
  );
  const xs = c.map((e) => e[0]),
    ys = c.map((e) => e[1]),
    zs = c.map((e) => e[2]),
    ws = c.map((e) => e[3]);
  const w_ = { ...w };
  for (let x = Math.min(...xs) - 1; x <= Math.max(...xs) + 1; x++) {
    for (let y = Math.min(...ys) - 1; y <= Math.max(...ys) + 1; y++) {
      for (let z = Math.min(...zs) - 1; z <= Math.max(...zs) + 1; z++) {
        for (let w__ = Math.min(...ws) - 1; w__ <= Math.max(...ws) + 1; w__++) {
          let n = 0;
          for (const dx of [-1, 0, 1]) {
            for (const dy of [-1, 0, 1]) {
              for (const dz of [-1, 0, 1]) {
                for (const dw of [-1, 0, 1]) {
                  if (!(dx === 0 && dy === 0 && dz === 0 && dw === 0)) {
                    if (w_[[x + dx, y + dy, z + dz, w__ + dw].join()]) {
                      n++;
                    }
                  }
                }
              }
            }
          }
          w[[x, y, z, w__].join()] = w_[[x, y, z, w__].join()]
            ? n === 2 || n === 3
            : n === 3;
        }
      }
    }
  }
}

assertEquals(Object.values(w).filter((v) => v).length, 2400);
