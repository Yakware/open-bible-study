import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex flex-col items-center justify-center gap-1 py-2">
      <p>
        &copy; {currentYear} {APP_NAME}. All rights reserved.
      </p>
      <Link href="/privacy-policy">Privacy Policy</Link>
    </footer>
  );
}
