"use client";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { CookieConsent } from "react-cookie-consent";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center gap-1 py-2">
      <p>
        &copy; {currentYear} {APP_NAME}. All rights reserved.
      </p>
      <Link href="/privacy-policy">Privacy Policy</Link>
      <CookieConsent
        location="bottom"
        buttonText="I understand"
        cookieName="cookie-consent"
        buttonStyle={{ borderRadius: "16px" }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </footer>
  );
}
