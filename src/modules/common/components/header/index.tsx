import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export function Header() {
  return (
    <header>
      <div>
        <Link href="/">{APP_NAME}</Link>
      </div>
      <nav></nav>
    </header>
  );
}
