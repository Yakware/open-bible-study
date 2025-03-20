"use client";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { logout } from "@/modules/auth/actions";
import { Button } from "../ui/button";
import { useIsAuthenticated } from "@/lib/context/auth-context";

export function Header() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="bg-white">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <h1 className="text-2xl font-semibold">
          <Link href="/">{APP_NAME}</Link>
        </h1>

        <nav>
          <ul>
            <li>
              {isAuthenticated && <Button onClick={logout}>Logout</Button>}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
