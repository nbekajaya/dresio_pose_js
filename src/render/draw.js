export function mergeStyle(base, override = {}) {
  return {
    landmark: { ...base.landmark, ...override.landmark },
    connector: { ...base.connector, ...override.connector },
  };
}