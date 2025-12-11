export const logEvent = (eventName: string, params?: Record<string, any>) => {
  // Ensure the event name starts with the required prefix if not already present
  // The user requested "Aged_Dog" prefix.
  // usage: logEvent("Photo_Upload") -> logs "Aged_Dog_Photo_Upload"
  // usage: logEvent("Aged_Dog_Hero") -> logs "Aged_Dog_Hero"

  const prefix = "Aged_Dog_";
  let finalEventName = eventName;

  if (!eventName.startsWith(prefix)) {
    finalEventName = `${prefix}${eventName}`;
  }

  // Check if GA4 is available
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", finalEventName, params);
  } else {
    console.log(`[Analytics Dev] Event: ${finalEventName}`, params);
  }
};
