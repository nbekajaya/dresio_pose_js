const LABEL_STYLE = {
  font: "600 11px ui-monospace, monospace",
  color: "#fff",
  halo: "#000",
  dx: 8,
  dy: -8,
};

export const styles = {
  pose: {
    landmark: { radius: 4, color: "#00ffff", fillColor: "#00ffff" },
    connector: { color: "#00ffff88", lineWidth: 2 },
    indices: null,
  },
  hand: {
    landmark: { radius: 4, color: "#00ff00", fillColor: "#00ff00" },
    connector: { color: "#00ff0088", lineWidth: 2 },
    indices: null,
  },
};

export { LABEL_STYLE };

export function setPoseColor(color) {
  styles.pose.landmark.color = color;
  styles.pose.landmark.fillColor = color;
  // keep alpha on connectors: hex6 + "8"
  styles.pose.connector.color = color + "8";
}

export function setHandColor(color) {
  styles.hand.landmark.color = color;
  styles.hand.landmark.fillColor = color;
  styles.hand.connector.color = color + "8";
}