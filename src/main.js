import "./style.css";
import { createPoseLandmarker, detectPoses, POSE_CONNECTIONS } from "./mediapipe/pose_landmarker.js";
import { startCamera, stopCamera } from "./utils/camera.js";
import { createDetectCanvas } from "./utils/detect_canvas.js";
import { renderFrame, renderSkeletonView } from "./render/renderer.js";
import { createProjector } from "./render/project3d.js";
import { attachOrbit } from "./render/orbit.js";
import { video, 
    videoCanvas, videoCtx,
    skeletonCanvas, skeletonCtx, 
    setStatus, stopBtn } from "./ui/elements.js";
import { initControls } from "./ui/controls.js";
import { updateStatus } from "./ui/status_bar.js";
import { styles } from "./render/styles.js";

let running = true;

const DETECT_W = 640;
const DETECT_H = 480;

skeletonCanvas.width = 800;
skeletonCanvas.height = 900;

let project = createProjector(skeletonCanvas)

attachOrbit(
    skeletonCanvas, 
    () => project,
    (next) => { project = next; }
)

async function main() {
  const pose_landmarker = await createPoseLandmarker();

  await startCamera(video);
  initControls();
  const detector = createDetectCanvas(DETECT_W, DETECT_H);

  videoCanvas.width = video.videoWidth;
  videoCanvas.height = video.videoHeight;

  setStatus("Landmarker Ready!");

  let lastTime = -1;

  function loop() {
    if (running && video.currentTime !== lastTime) {
      lastTime = video.currentTime;

      const t0 = performance.now();

      const frame = detector.draw(video);

      const pt0 = performance.now();
      const poses = detectPoses(pose_landmarker, frame);
      const pt1 = performance.now();

    //   const ht0 = performance.now();
    //   const hands = detectHands(handLandmarker, frame);
    //   const ht1 = performance.now();

      videoCtx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
      videoCtx.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);

      renderFrame(videoCtx, video, videoCanvas, [
        { result: poses, connections: POSE_CONNECTIONS, style: styles.pose }
      ]);

      renderSkeletonView(
        skeletonCtx, skeletonCanvas, [poses], POSE_CONNECTIONS, styles.pose, project);

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

stopBtn.addEventListener("click", () => {
  running = !running;
  stopBtn.textContent = running ? "Stop" : "Resume";
  stopBtn.dataset.state = running ? "running" : "stopped";

  if (!running) {
    stopCamera(video);
    setStatus("stopped");
  } else {
    // re-acquire camera; detectors are still alive, no re-init needed
    startCamera(video, { width: 1920, height: 1080 })
      .then(() => setStatus("ready"))
      .catch((e) => setStatus("error: " + e.message));
  }
});



main().catch((err) => {
  console.error(err);
  setStatus("error: " + err.message);
});