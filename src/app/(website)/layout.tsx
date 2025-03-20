import { ReactNode } from "react";
import { geistMono, geistSans } from "../fonts";
import { Header } from "@/modules/common/components/header";

type WebsiteLayoutProps = {
  children?: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <Header />
      {children}
    </div>
  );
}
