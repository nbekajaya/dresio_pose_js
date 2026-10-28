import { feedEls, pose, hand } from "./elements.js";
import { feed, resetFeed } from "../render/video_feed.js";
import { styles, LABEL_STYLE } from "../render/styles.js";

function hexWithAlpha(hex6, alpha = "88") {
  return hex6 + alpha;
}

function wireTask(taskStyles, els) {
  els.landmarkColor.addEventListener("input", (e) => {
    taskStyles.landmark.color = e.target.value;
    taskStyles.landmark.fillColor = e.target.value;
  });

  els.connectorColor.addEventListener("input", (e) => {
    taskStyles.connector.color = hexWithAlpha(e.target.value);
  });

  els.lineWidth.addEventListener("input", (e) => {
    const v = parseFloat(e.target.value);
    taskStyles.connector.lineWidth = v;
    els.lineWidthOut.textContent = v;
  });

  els.radius.addEventListener("input", (e) => {
    const v = parseFloat(e.target.value);
    taskStyles.landmark.radius = v;
    els.radiusOut.textContent = v;
  });

  els.indices.addEventListener("change", (e) => {
    taskStyles.indices = e.target.checked ? { ...LABEL_STYLE } : null;
  });

  // seed UI from style defaults
  els.landmarkColor.value = taskStyles.landmark.color;
  els.connectorColor.value = taskStyles.connector.color.slice(0, 7);
  els.lineWidth.value = taskStyles.connector.lineWidth;
  els.lineWidthOut.textContent = taskStyles.connector.lineWidth;
  els.radius.value = taskStyles.landmark.radius;
  els.radiusOut.textContent = taskStyles.landmark.radius;
  els.indices.checked = Boolean(taskStyles.indices);
}

const feedSetters = {
  brightness(v) { feed.brightness = v; feedEls.brightness.value = v; feedEls.brightnessOut.textContent = v.toFixed(2); },
  contrast(v)   { feed.contrast = v;   feedEls.contrast.value = v;   feedEls.contrastOut.textContent = v.toFixed(2); },
  saturation(v) { feed.saturation = v; feedEls.saturation.value = v; feedEls.saturationOut.textContent = v.toFixed(2); },
  hue(v)        { feed.hue = v;        feedEls.hue.value = v;        feedEls.hueOut.textContent = `${v}°`; },
  blur(v)       { feed.blur = v;       feedEls.blur.value = v;       feedEls.blurOut.textContent = `${v}px`; },
  flipH(v)      { feed.flipH = v;      feedEls.flipH.checked = v; },
  flipV(v)      { feed.flipV = v;      feedEls.flipV.checked = v; },
};

function wireFeed() {
    for (const [key, set] of Object.entries(feedSetters)) {
    const el = feedEls[key];
    const isCheckbox = el.type === "checkbox";
    el.addEventListener(isCheckbox ? "change" : "input", (e) => {
      set(isCheckbox ? e.target.checked : parseFloat(e.target.value));
    });
  }

  // seed UI from current model state (in case defaults ever diverge from HTML)
  for (const [key, set] of Object.entries(feedSetters)) {
    set(feed[key]);
  }

  feedEls.reset.addEventListener("click", () => {
    resetFeed();
    for (const [key, set] of Object.entries(feedSetters)) {
      set(FEED_DEFAULTS[key]);
    }
  });
}

export function initControls() {
  wireFeed();
  wireTask(styles.pose, pose);
  wireTask(styles.hand, hand);
}