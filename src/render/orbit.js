import { createProjector } from "../render/project3d.js";

export function attachOrbit(canvas, getProject, setProject) {
  let dragging = false;
  let rotY = 0;
  let rotX = -0.15;

  const rebuild = () => {
    setProject(createProjector(canvas, { rotY, rotX }));
  };

  canvas.addEventListener("pointerdown", (e) => {
    dragging = true;
    canvas.setPointerCapture(e.pointerId);
    canvas.style.cursor = "grabbing";
  });

  canvas.addEventListener("pointerup", (e) => {
    dragging = false;
    canvas.releasePointerCapture(e.pointerId);
    canvas.style.cursor = "grab";
  });

  canvas.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    rotY += e.movementX * 0.01;
    rotX += e.movementY * 0.01;
    // clamp tilt so the figure doesn't flip upside down
    rotX = Math.max(-Math.PI / 2 + 0.05, Math.min(Math.PI / 2 - 0.05, rotX));
    rebuild();
  });

  canvas.style.cursor = "grab";
  rebuild();
}