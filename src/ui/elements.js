export const video = document.getElementById("video");
export const canvas = document.getElementById("canvas");
export const ctx = canvas.getContext("2d");
export const statusEl = document.getElementById("status");

export const pose = {
  landmarkColor: document.getElementById("pose-landmark-color"),
  connectorColor: document.getElementById("pose-connector-color"),
  lineWidth: document.getElementById("pose-line-width"),
  lineWidthOut: document.getElementById("pose-line-width-out"),
  radius: document.getElementById("pose-radius"),
  radiusOut: document.getElementById("pose-radius-out"),
  indices: document.getElementById("pose-indices"),
};

export const hand = {
  landmarkColor: document.getElementById("hand-landmark-color"),
  connectorColor: document.getElementById("hand-connector-color"),
  lineWidth: document.getElementById("hand-line-width"),
  lineWidthOut: document.getElementById("hand-line-width-out"),
  radius: document.getElementById("hand-radius"),
  radiusOut: document.getElementById("hand-radius-out"),
  indices: document.getElementById("hand-indices"),
};

export function setStatus(text) {
  statusEl.textContent = text;
}

export const feedEls = {
  brightness: document.getElementById("feed-brightness"),
  brightnessOut: document.getElementById("feed-brightness-out"),
  contrast: document.getElementById("feed-contrast"),
  contrastOut: document.getElementById("feed-contrast-out"),
  saturation: document.getElementById("feed-saturation"),
  saturationOut: document.getElementById("feed-saturation-out"),
  hue: document.getElementById("feed-hue"),
  hueOut: document.getElementById("feed-hue-out"),
  blur: document.getElementById("feed-blur"),
  blurOut: document.getElementById("feed-blur-out"),
  flipH: document.getElementById("feed-flip-h"),
  flipV: document.getElementById("feed-flip-v"),
};

export const status_bar = {
  latency: document.getElementById("sb-latency"),
  poseMs: document.getElementById("sb-pose-ms"),
  handMs: document.getElementById("sb-hand-ms"),
  points: document.getElementById("sb-points"),
  fps: document.getElementById("sb-fps"),
};