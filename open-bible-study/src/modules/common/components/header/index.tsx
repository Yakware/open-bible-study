"use client";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import { logout } from "@/modules/auth/actions";
import { Button, buttonVariants } from "../ui/button";
import { useIsAuthenticated } from "@/lib/context/auth-context";
import { OpenbibleStudyIcon } from "../../icons/open-bible-study-icon";

export function Header() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <header className="bg-white">
      <div className="container mx-auto py-4 flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-semibold flex gap-1 items-center"
        >
          <OpenbibleStudyIcon size={30} />
          {APP_NAME}
        </Link>

        <nav>
          <ul className="flex items-center gap-4">
            {isAuthenticated && (
              <>
                <li>
                  <Link href="/study" className={buttonVariants()}>
                    Go to App
                  </Link>
                </li>
                <li>
                  <Button variant="outline" onClick={logout}>
                    Logout
                  </Button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
