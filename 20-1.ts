import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("20.txt").trimRight().split("\n");

const u: number[][] = [];
for (let i = 0; i < $.length; i++) {
  const m = $[i].match(/Tile (\d+):/);
  if (m) {
    const t = Number(m[1]);
    u[t] = [];
    i++;
    // top forward
    let s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i][j] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    // top backwards
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i][$[i].length - j - 1] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    // left forwards
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i + j][0] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    // left backwards
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i + $[i].length - j - 1][0] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    // right forwards
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i + j][$[i].length - 1] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    // left backwards
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i + $[i].length - j - 1][$[i].length - 1] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    i += $[i].length - 1;
    // bottom forward
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i][j] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
    // bottom backwards
    s = 0;
    for (let j = 0; j < $[i].length; j++) {
      if ($[i][$[i].length - j - 1] === "#") {
        s += 2 ** j;
      }
    }
    u[t].push(s);
  }
}
let c = 1;
for (let i = 0; i < u.length; i++) {
  if (u[i]) {
    let v = 0;
    for (const j of u[i]) {
      for (let k = 0; k < u.length; k++) {
        if (u[k] && i !== k && u[k].includes(j)) {
          v++;
        }
      }
    }
    if (v === 4) {
      c *= i;
    }
  }
}
assertEquals(c, 51214443014783);
