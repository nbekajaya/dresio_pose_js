import { FilesetResolver } from "@mediapipe/tasks-vision";

let visionPromise;

export function getVision() {
  if (!visionPromise) {
    visionPromise = FilesetResolver.forVisionTasks(
      "/node_modules/@mediapipe/tasks-vision/wasm"
    );
  }
  return visionPromise;
}