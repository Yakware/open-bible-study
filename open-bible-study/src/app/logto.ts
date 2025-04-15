import { UserScope, LogtoNextConfig } from "@logto/next";

export const logtoConfig: LogtoNextConfig = {
  endpoint: process.env.LOGTO_ENDPOINT as string,
  appId: process.env.LOGTO_APP_ID as string,
  appSecret: process.env.LOGTO_APP_SECRET as string,
  baseUrl: process.env.LOGTO_BASE_URL as string,
  cookieSecret: process.env.LOGTO_COOKIE_SECRET as string,
  cookieSecure: process.env.NODE_ENV === "production",
  scopes: [UserScope.Email, UserScope.Phone],
};
