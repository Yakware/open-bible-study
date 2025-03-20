export const logtoConfig = {
  endpoint: process.env.LOGTO_ENDPOINT as string,
  appId: process.env.LOGTO_APP_ID as string,
  appSecret: process.env.LOGTO_APP_SECRET as string,
  baseUrl: process.env.LOGTO_BASE_URL as string, // Change to your own base URL
  cookieSecret: process.env.LOGTO_COOKIE_SECRET as string, // Auto-generated 32 digit secret
  cookieSecure: process.env.NODE_ENV === "production",
};
