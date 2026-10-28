import "./style.css";
import { createPoseLandmarker, detectPoses, POSE_CONNECTIONS } from "./mediapipe/pose_landmarker.js";
import { startCamera } from "./utils/camera.js";
import { createDetectCanvas } from "./utils/detect_canvas.js";
import { renderFrame } from "./render/renderer.js";
import { video, canvas, ctx, setStatus } from "./ui/elements.js";
import { initControls } from "./ui/controls.js";
import { updateStatus } from "./ui/status_bar.js";
import { styles } from "./render/styles.js";

const DETECT_W = 640;
const DETECT_H = 480;

async function main() {
  const pose_landmarker = await createPoseLandmarker();

  await startCamera(video);
  initControls();
  const detector = createDetectCanvas(DETECT_W, DETECT_H);

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  setStatus("Landmarker Ready!");

  let lastTime = -1;

  function loop() {
    if (video.currentTime !== lastTime) {
      lastTime = video.currentTime;

      const t0 = performance.now();

      const frame = detector.draw(video);

      const pt0 = performance.now();
      const poses = detectPoses(pose_landmarker, frame);
      const pt1 = performance.now();

    //   const ht0 = performance.now();
    //   const hands = detectHands(handLandmarker, frame);
    //   const ht1 = performance.now();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      renderFrame(ctx, video, canvas, [
        { result: poses, connections: POSE_CONNECTIONS, style: styles.pose }
      ]);

      const t1 = performance.now();
      updateStatus({
        latencyMs: t1 - t0,
        poseMs: pt1 - pt0,
        // handMs: ht1 - ht0,
        poseCount: poses.landmarks.length,
        // handCount: hands.landmarks.length,
      });

    //   setStatus(
    //     result.landmarks.length
    //       ? `hands: ${result.landmarks.length}`
    //       : "no hands"
    //   );
    }
    requestAnimationFrame(loop);
  }

  loop();
}

main().catch((err) => {
  console.error(err);
  setStatus("error: " + err.message);
});