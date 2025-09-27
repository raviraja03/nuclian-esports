export function formatDate12Hour(isoString) {
  const date = new Date(isoString);

  // Check if time is exactly 12:00:00 AM
  if (date.getHours() === 0 && date.getMinutes() === 0 && date.getSeconds() === 0) {
    const dateOptions = {
      month: "short",   // "Sep"
      day: "2-digit",   // "28"
      year: "numeric",  // "2025"
    };
    return date.toLocaleString("en-US", dateOptions);
  }

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

