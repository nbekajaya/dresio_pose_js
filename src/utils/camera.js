export async function startCamera(videoEl, { width = 1920, height = 1080 } = {}) {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: { ideal: width }, height: { ideal: height } },
    audio: false,
  });
  videoEl.srcObject = stream;
  await videoEl.play();
  return stream;
}

export function stopCamera(videoEl) {
  const stream = videoEl.srcObject;
  if (!stream) return;
  for (const track of stream.getTracks()) track.stop();
  videoEl.srcObject = null;
}