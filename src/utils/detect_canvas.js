export function createDetectCanvas(width, height) {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d", { willReadFrequently: false });
  return {
    canvas: c,
    ctx,
    draw(videoEl) {
      ctx.drawImage(videoEl, 0, 0, width, height);
      return c;
    },
  };
}