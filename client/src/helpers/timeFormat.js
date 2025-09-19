export function formatDate12Hour(isoString) {
  const date = new Date(isoString);

  const options = {
    month: "short",   // "Sep"
    day: "2-digit",   // "28"
    year: "numeric",  // "2025"
    hour: "2-digit",  // "10"
    minute: "2-digit",// "30"
    second: "2-digit",// "00"
    hour12: true,     // 12-hour format with AM/PM
  };

  return date.toLocaleString("en-US", options).replace(",", "");
}

