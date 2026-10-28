export function drawIndices(ctx, landmarks, canvas, style) {
  if (!style) return;
  ctx.save();
  ctx.font = style.font;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = 3;
  ctx.strokeStyle = style.halo;
  ctx.fillStyle = style.color;

  landmarks.forEach((p, i) => {
    const x = p.x * canvas.width;
    const y = p.y * canvas.height;
    const text = String(i);
    ctx.strokeText(text, x + style.dx, y + style.dy);
    ctx.fillText(text, x + style.dx, y + style.dy);
  });

  ctx.restore();
}

export function drawAllIndices(ctx, result, canvas, style) {
  if (!style) return;
  for (const landmarks of result.landmarks) {
    drawIndices(ctx, landmarks, canvas, style);
  }
}