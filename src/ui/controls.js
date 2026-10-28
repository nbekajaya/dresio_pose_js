import { feedEls, pose, hand } from "./elements.js";
import { feed } from "../render/video_feed.js";
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

function wireFeed() {
  const range = (el, out, apply, fmt) => {
    el.addEventListener("input", (e) => {
      const v = parseFloat(e.target.value);
      apply(v);
      out.textContent = fmt(v);
    });
    apply(parseFloat(el.value));
    out.textContent = fmt(parseFloat(el.value));
  };

  range(feedEls.brightness, feedEls.brightnessOut, (v) => (feed.brightness = v), (v) => v.toFixed(2));
  range(feedEls.contrast, feedEls.contrastOut, (v) => (feed.contrast = v), (v) => v.toFixed(2));
  range(feedEls.saturation, feedEls.saturationOut, (v) => (feed.saturation = v), (v) => v.toFixed(2));
  range(feedEls.hue, feedEls.hueOut, (v) => (feed.hue = v), (v) => `${v}°`);
  range(feedEls.blur, feedEls.blurOut, (v) => (feed.blur = v), (v) => `${v}px`);

  feedEls.flipH.addEventListener("change", (e) => (feed.flipH = e.target.checked));
  feedEls.flipV.addEventListener("change", (e) => (feed.flipV = e.target.checked));
  feedEls.flipH.checked = feed.flipH;
  feedEls.flipV.checked = feed.flipV;
}

export function initControls() {
  wireFeed();
  wireTask(styles.pose, pose);
  wireTask(styles.hand, hand);
}