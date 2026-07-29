export type Point = {
  x: number;
  y: number;
};

export type SelectionRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

function clamp(value: number, minimum: number, maximum: number): number {
  return Math.min(maximum, Math.max(minimum, value));
}

export function getRelativePoint(
  clientPoint: Point,
  bounds: { left: number; top: number; width: number; height: number },
): Point {
  if (bounds.width <= 0 || bounds.height <= 0) {
    return { x: 0, y: 0 };
  }

  return {
    x: clamp(((clientPoint.x - bounds.left) / bounds.width) * 100, 0, 100),
    y: clamp(((clientPoint.y - bounds.top) / bounds.height) * 100, 0, 100),
  };
}

export function createSelectionRect(
  start: Point,
  end: Point,
): SelectionRect {
  return {
    left: Math.min(start.x, end.x),
    top: Math.min(start.y, end.y),
    width: Math.abs(end.x - start.x),
    height: Math.abs(end.y - start.y),
  };
}
