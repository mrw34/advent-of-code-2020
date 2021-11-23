import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";

const $ = Deno.readTextFileSync("04.txt").trimRight();

let v = 0;
for (const p of $.split(/\n\n/)) {
  const ps = p.split(/\s/).map((e) => e.split(":")).filter((e) =>
    e[0] !== "cid"
  );
  if (
    ps.length === 7 &&
    ps.every((e) =>
      e[0] === "byr" && Number(e[1]) >= 1920 && Number(e[1]) <= 2002 ||
      e[0] === "iyr" && Number(e[1]) >= 2010 && Number(e[1]) <= 2020 ||
      e[0] === "eyr" && Number(e[1]) >= 2020 && Number(e[1]) <= 2030 ||
      e[0] === "hgt" &&
        (e[1].endsWith("cm") &&
            Number(e[1].split("cm")[0]) >= 150 &&
            Number(e[1].split("cm")[0]) <= 193 ||
          e[1].endsWith("in") &&
            (Number(e[1].split("in")[0]) >= 59 &&
              Number(e[1].split("in")[0]) <= 76)) ||
      e[0] === "hcl" && e[1].startsWith("#") &&
        e[1].split("#")[1].match(/^[0-9a-f]{6}$/) ||
      e[0] === "ecl" &&
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(e[1]) ||
      e[0] === "pid" && e[1].match(/^[0-9]{9}$/)
    )
  ) {
    v++;
  }
}
assertEquals(v, 150);
