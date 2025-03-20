import { APP_NAME } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="flex items-center justify-center">
      <p>
        &copy; {currentYear} {APP_NAME}. All rights reserved.
      </p>
    </footer>
  );
}
