export const FEED_DEFAULTS = {
  brightness: 1,
  contrast: 1,
  saturation: 1,
  hue: 0,
  blur: 0,
  flipH: false,
  flipV: false,
};

export const feed = {
    ...FEED_DEFAULTS
};

export function resetFeed() {
  Object.assign(feed, FEED_DEFAULTS);
};

export function feedFilterString() {
  const parts = [];
  if (feed.brightness !== 1) parts.push(`brightness(${feed.brightness})`);
  if (feed.contrast !== 1) parts.push(`contrast(${feed.contrast})`);
  if (feed.saturation !== 1) parts.push(`saturate(${feed.saturation})`);
  if (feed.hue !== 0) parts.push(`hue-rotate(${feed.hue}deg)`);
  if (feed.blur !== 0) parts.push(`blur(${feed.blur}px)`);
  return parts.length ? parts.join(" ") : "none";
};