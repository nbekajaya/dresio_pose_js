import { DrawingUtils } from "@mediapipe/tasks-vision";

export function drawSkeleton(ctx, landmarks, connections, style) {
  const drawing = new DrawingUtils(ctx);
  drawing.drawLandmarks(landmarks, style.landmark);
  drawing.drawConnectors(landmarks, connections, style.connector);
}

export function drawAllSkeletons(ctx, result, connections, style) {
  for (const landmarks of result.landmarks) {
    drawSkeleton(ctx, landmarks, connections, style);
  }
}

export function drawSkeleton3d(ctx, landmarks, connections, style, project) {
  const projection = landmarks.map(project).map((p) => ({
      x: p.x / ctx.canvas.width,
      y: p.y / ctx.canvas.height
    })
  );  
  const drawing = new DrawingUtils(ctx);
  drawing.drawLandmarks(projection, style.landmark);
  drawing.drawConnectors(projection, connections, style.connector);
}

export function drawAllSkeletons3d(ctx, result, connections, style, project) {
  for (const landmarks of result.worldLandmarks) {
    drawSkeleton3d(ctx, landmarks, connections, style, project);
  }
}