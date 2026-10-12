import { test } from "node:test";
import assert from "node:assert/strict";
import { shopStatus, filterMenu } from "../src/logic.mjs";
test("Houston hours handle opening, Friday closing, and midnight", () => {
  assert.equal(shopStatus(new Date("2026-10-12T12:29:00Z")).open, false);
  assert.equal(shopStatus(new Date("2026-10-12T12:30:00Z")).open, true);
  assert.equal(shopStatus(new Date("2026-10-16T21:59:00Z")).open, true);
  assert.equal(shopStatus(new Date("2026-10-16T22:00:00Z")).open, false);
  assert.equal(shopStatus(new Date("2026-10-13T05:00:00Z")).open, false);
});
test("Hours use Houston timezone through daylight saving time", () => {
  assert.equal(shopStatus(new Date("2026-12-07T13:30:00Z")).open, true);
  assert.equal(shopStatus(new Date("2026-12-07T13:29:00Z")).open, false);
});
test("The Instagram Fall 2026 schedule closes Sunday at 10 pm", () => {
  assert.equal(shopStatus(new Date("2026-10-12T02:59:00Z")).open, true);
  assert.equal(shopStatus(new Date("2026-10-12T03:00:00Z")).open, false);
  assert.match(shopStatus(new Date("2026-10-12T03:00:00Z")).label, /Monday/);
});
test("Menu filters combine search, category, preference, and saved drinks", () => {
  const items = [
    {
      id: "a",
      name: "Latte",
      description: "Honey",
      category: "Coffee",
      iced: true,
    },
    {
      id: "b",
      name: "Lemonade",
      description: "Lemon",
      category: "Tea",
      iced: true,
      caffeineFree: true,
    },
  ];
  assert.deepEqual(filterMenu(items, "Coffee", " honey ", "Iced"), [items[0]]);
  assert.deepEqual(filterMenu(items, "All", "", "Caffeine-free"), [items[1]]);
  assert.deepEqual(filterMenu(items, "All", "", "Saved", ["a"]), [items[0]]);
  assert.deepEqual(filterMenu(items, "Tea", "latte", "All"), []);
});
