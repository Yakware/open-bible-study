import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type HeaderConfig = {
  title: string;
  slot?: ReactNode;
};

const headerConfig: Record<string, HeaderConfig> = {
  "/study": {
    title: "Bible Study",
  },
  "/study-groups": {
    title: "Study Groups",
  },
  "/study-plans": {
    title: "Study Plans",
  },
  "/notes": {
    title: "Notes",
  },
  "/community": {
    title: "Community",
  },
};

export function useAppHeaderConfig(): HeaderConfig {
  const pathname = usePathname();
  const config = headerConfig[pathname];
  return config;
}
