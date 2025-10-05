export function parseQueryField(value, useRegex = true) {
  if (!value) return null;

  let parsed = value;

  // If comma separated
  if (typeof value === "string" && value.includes(",")) {
    parsed = value.split(",").map(v => v.trim());
  }

  if (Array.isArray(parsed)) {
    return { $in: parsed };
  } else if (useRegex) {
    return { $regex: new RegExp(parsed.trim(), "i") };
  } else {
    return parsed;
  }
}