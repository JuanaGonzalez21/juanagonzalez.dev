import { test } from "node:test";
import assert from "node:assert/strict";
import { getSceneProgress } from "../src/components/scene-progress.ts";

test("the hero is visible and interactive without scrolling", () => {
  const hero = getSceneProgress(0, 0, 960, 0, 800, true, false);
  assert.equal(hero.enter, 1);
  assert.equal(hero.exit, 0);
  assert.equal(hero.interactive, true);
  assert.equal(hero.offset, 0);
});

test("adjacent scenes overlap without a blank frame, forwards and backwards", () => {
  const positions = Array.from({ length: 1401 }, (_, index) => index);
  for (const y of [...positions, ...positions.toReversed()]) {
    const previous = getSceneProgress(y, 0, 960, 0, 800, true, false);
    const next = getSceneProgress(y, 960, 2400, 1440, 800, false, false);
    assert.ok(previous.visible || next.visible, `blank frame at ${y}`);
    assert.ok(!(previous.interactive && next.interactive), `two interactive scenes at ${y}`);
  }
});

test("long sections finish exposing their content before transitioning out", () => {
  const start = 960, overflow = 2200, viewport = 800;
  const duration = overflow + viewport * 1.2;
  const bottom = getSceneProgress(start + viewport * .2 + overflow, start, duration, overflow, viewport, false, false);
  assert.equal(bottom.offset, overflow);
  assert.equal(bottom.exit, 0);
  assert.equal(bottom.interactive, true);
});

test("scrolling to a section anchor shows its beginning", () => {
  const scene = getSceneProgress(4200, 4200, 1800, 840, 800, false, false);
  assert.equal(scene.enter, 1);
  assert.equal(scene.interactive, true);
  assert.equal(scene.offset, 0);
});

test("the last scene yields space to the footer instead of covering it", () => {
  const viewport = 800, start = 5000, overflow = 400;
  const duration = overflow + viewport * 1.2;
  const y = start + duration - viewport + 150;
  const scene = getSceneProgress(y, start, duration, overflow, viewport, false, true);
  const contentBottom = viewport + overflow - scene.offset;
  const footerTop = start + duration - y;
  assert.equal(contentBottom, footerTop);
  assert.equal(scene.exit, 0);
});
