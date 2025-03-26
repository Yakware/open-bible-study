import { ReactNode } from "react";
import { Header } from "@/modules/common/components/header";
import { Footer } from "@/modules/common/components/footer";

type WebsiteLayoutProps = {
  children?: ReactNode;
};

export default function WebsiteLayout({ children }: WebsiteLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
