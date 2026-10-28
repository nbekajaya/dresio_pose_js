import { status_bar } from "./elements.js";

let frames = 0;
let windowStart = performance.now();

export function updateStatus({ latencyMs, poseMs, handMs, poseCount, handCount }) {
  status_bar.latency.textContent = `${latencyMs.toFixed(1)}ms`;
  status_bar.poseMs.textContent = `${poseMs.toFixed(1)}ms`;
//   status_bar.handMs.textContent = `${handMs.toFixed(1)}ms`;
  status_bar.points.textContent = `${poseCount} / ${handCount}`;

  frames += 1;
  const now = performance.now();
  if (now - windowStart >= 500) {
    status_bar.fps.textContent = `${(frames * 1000 / (now - windowStart)).toFixed(0)}`;
    frames = 0;
    windowStart = now;
  }
}