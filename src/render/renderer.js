import { drawAllSkeletons, drawAllSkeletons3d, drawSkeleton3d } from "./skeleton.js";
import { drawAllIndices } from "./indices.js";
import { feed, feedFilterString } from "./video_feed.js";

export function renderFrame(ctx, video, canvas, tasks) {
  const { width, height } = canvas;

  ctx.clearRect(0, 0, width, height);
  ctx.save();

  // whole-composite mirror: feed and landmarks stay coherent
  if (feed.flipH || feed.flipV) {
    ctx.translate(feed.flipH ? width : 0, feed.flipV ? height : 0);
    ctx.scale(feed.flipH ? -1 : 1, feed.flipV ? -1 : 1);
  }

  // feed: filter applies to video only, not the skeleton below
  ctx.filter = feedFilterString();
  ctx.drawImage(video, 0, 0, width, height);
  ctx.filter = "none";

  // landmarks
  for (const { result, connections, style } of tasks) {
    drawAllSkeletons(ctx, result, connections, style);
    if (style.indices) drawAllIndices(ctx, result, canvas, style.indices);
  }

  ctx.restore();
}

export function renderSkeletonView(ctx, canvas, results, connections, style, project) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (const result of results) {
    drawAllSkeletons3d(ctx, result, connections, style, project);
  }
}