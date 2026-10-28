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