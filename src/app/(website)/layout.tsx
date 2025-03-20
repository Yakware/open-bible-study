import { ReactNode } from "react";
import { geistMono, geistSans } from "../fonts";
import { Header } from "@/modules/common/components/header";
import { Footer } from "@/modules/common/components/footer";

type WebsiteLayoutProps = {
  children?: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} flex flex-col min-h-screen`}
    >
      <Header />
      {children}
      <Footer />
    </div>
  );
}
