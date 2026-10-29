export function createProjector(canvas, opts = {}) {
  const {
    metersPerHalfHeight = 1.1,   
    rotY = 0,                    
    rotX = -0.15,                
  } = opts;

  const scale = (canvas.height / 2) / metersPerHalfHeight;
  const cy = Math.cos(rotY), sy = Math.sin(rotY);
  const cx = Math.cos(rotX), sx = Math.sin(rotX);

  return function project(p) {
    // rotate around Y
    let x = p.x * cy + p.z * sy;
    let z = -p.x * sy + p.z * cy;
    // rotate around X (tilt)
    let y = p.y * cx - z * sx;
    z = p.y * sx + z * cx;

    // mild perspective: divide by (distance + offset)
    const camDist = 3.0;
    const persp = camDist / (camDist + z);

    return {
      x: canvas.width  / 2 + x * scale * persp,
      y: canvas.height / 2 + y * scale * persp,  // canvas y is down
    };
  };
}