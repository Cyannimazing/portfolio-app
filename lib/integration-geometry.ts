export type DiagramRect = { x: number; y: number; width: number; height: number };

function edgeToward(rect: DiagramRect, target: { x: number; y: number }) {
  const center = { x: rect.x + rect.width / 2, y: rect.y + rect.height / 2 };
  const dx = target.x - center.x;
  const dy = target.y - center.y;
  const scale = 1 / Math.max(Math.abs(dx) / (rect.width / 2), Math.abs(dy) / (rect.height / 2));
  return { x: center.x + dx * scale, y: center.y + dy * scale };
}

/** Connect the actual facing borders, in the diagram's own coordinate space. */
export function integrationConnection(from: DiagramRect, to: DiagramRect): string {
  if ([from, to].some(rect => rect.width <= 0 || rect.height <= 0
    || Object.values(rect).some(value => !Number.isFinite(value)))) return "";
  const fromCenter = { x: from.x + from.width / 2, y: from.y + from.height / 2 };
  const toCenter = { x: to.x + to.width / 2, y: to.y + to.height / 2 };
  if (fromCenter.x === toCenter.x && fromCenter.y === toCenter.y) return "";
  const start = edgeToward(from, toCenter);
  const end = edgeToward(to, fromCenter);
  if (Math.abs(end.x - start.x) >= Math.abs(end.y - start.y)) {
    const middle = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} C ${middle} ${start.y} ${middle} ${end.y} ${end.x} ${end.y}`;
  }
  const middle = (start.y + end.y) / 2;
  return `M ${start.x} ${start.y} C ${start.x} ${middle} ${end.x} ${middle} ${end.x} ${end.y}`;
}
