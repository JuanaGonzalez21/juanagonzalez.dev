export const smoothProgress = (value: number) => {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
};

export function getSceneProgress(y: number, start: number, duration: number, overflow: number, viewport: number, first: boolean, last: boolean) {
  const blend = viewport * .65;
  const enter = first ? 1 : smoothProgress((y - start + blend) / blend);
  const exit = last ? 0 : smoothProgress((y - start - duration + blend) / blend);
  return {
    enter,
    exit,
    visible: enter > 0 && exit < 1,
    interactive: enter > .5 && exit < .5,
    offset: Math.max(0, Math.min(last ? Infinity : overflow, y - start - viewport * .2)),
  };
}
