import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("20.txt").trimRight().split("\n");

const ts = [];
for (let i = 0; i < $.length; i++) {
  const m = $[i].match(/Tile (\d+):/);
  if (m) {
    i++;
    const u = [];
    for (let j = $[i].length - 1; j >= 0; j--) {
      u.push($[i].split(""));
      i++;
    }
    ts.push(u);
  }
}

const flip = (tile: string[][]) =>
  JSON.parse(JSON.stringify(tile)).map((e: string[]) => e.reverse());
const rotate = (tile: string[][]): string[][] => {
  const o = JSON.parse(JSON.stringify(tile));
  for (let x = 0; x < tile[0].length; x++) {
    for (let y = 0; y < tile.length; y++) {
      o[x][tile[0].length - 1 - y] = tile[y][x];
    }
  }
  return o;
};
const top = (tile: string[][]) =>
  tile[0].reduce((a, e, i) => a + (e === "#" ? 2 ** i : 0), 0);
const left = (tile: string[][]) => top(flip(rotate(tile)));
const bottom = (tile: string[][]) => top(flip(rotate(rotate(tile))));
const right = (tile: string[][]) => top(rotate(rotate(rotate(tile))));
const crop = (tile: string[][]) => tile.slice(1, -1).map((e) => e.slice(1, -1));

const tl = ts.length;
const gs: Record<string, string[][]> = {};
gs[ts.length - 1] = ts.shift()!;
l:
while (ts.length) {
  const t: string[][] = ts.shift()!;
  for (const g of Object.entries(gs)) {
    const vs = [];
    vs.push(t);
    vs.push(rotate(t));
    vs.push(rotate(rotate(t)));
    vs.push(rotate(rotate(rotate(t))));
    vs.push(flip(t));
    vs.push(rotate(flip(t)));
    vs.push(rotate(rotate(flip(t))));
    vs.push(rotate(rotate(rotate(flip(t)))));
    for (const v of vs) {
      if (top(g[1]) === bottom(v)) {
        gs[Number(g[0]) - Math.sqrt(tl)] = v;
        continue l;
      } else if (right(g[1]) === left(v)) {
        gs[Number(g[0]) + 1] = v;
        continue l;
      } else if (bottom(g[1]) === top(v)) {
        gs[Number(g[0]) + Math.sqrt(tl)] = v;
        continue l;
      } else if (left(g[1]) === right(v)) {
        gs[Number(g[0]) - 1] = v;
        continue l;
      }
    }
  }
  ts.push(t);
}
const z = Object.values(gs).map((e) => crop(e));
const w: string[][] = [];
for (let i = 0; i < z.length; i++) {
  for (let j = 0; j < z[0].length; j++) {
    const index = Math.floor(i / Math.sqrt(z.length)) * z[0].length + j;
    w[index] = (w[index] || []).concat(z[i][j]);
  }
}

const monster = (w: string[][], x: number, y: number) => {
  const ds = [
    [0, 1],
    [1, 2],
    [4, 2],
    [5, 1],
    [6, 1],
    [7, 2],
    [10, 2],
    [11, 1],
    [12, 1],
    [13, 2],
    [16, 2],
    [17, 1],
    [18, 0],
    [18, 1],
    [19, 1],
  ].map(([dx, dy]) => [x + dx, y + dy]);
  return ds.every(([x, y]) => w[y]?.[x] === "#") ? ds : [];
};
let ds: number[][] = [];
for (let y = 0, w_ = rotate(flip(w)); y < w.length; y++) {
  for (let x = 0; x < w[0].length; x++) {
    ds = ds.concat(monster(w_, x, y));
  }
}
let c = 0;
for (let y = 0, w_ = rotate(flip(w)); y < w.length; y++) {
  for (let x = 0; x < w[0].length; x++) {
    if (w_[y][x] === "#" && !ds.map((e) => e.join()).includes([x, y].join())) {
      c++;
    }
  }
}
assertEquals(c, 2065);
