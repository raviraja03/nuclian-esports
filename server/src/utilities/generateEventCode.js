
export function generateEventCode(game) {
const prefix = { "Free Fire": "FF", BGMI: "BG", Valorant: "VAL", COD: "COD" };
const year=new Date().getFullYear().toString().slice(-2)
const suffix = Math.random().toString(36).substring(2, 6).toUpperCase(); // e.g., "BB34"
return `${prefix[game]}${year}-${suffix}`;
}
