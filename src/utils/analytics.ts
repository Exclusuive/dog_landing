export const logEvent = (eventName: string, params?: Record<string, any>) => {
  const prefix = "GENE_DOG_";
  let finalEventName = eventName;

  if (!eventName.startsWith(prefix)) {
    finalEventName = `${prefix}${eventName}`;
  }

  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", finalEventName, params);
  } else {
    console.log(`[Analytics Dev] Event: ${finalEventName}`, params);
  }
};
