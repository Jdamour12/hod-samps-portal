import type React from "react";
import { cookies } from "next/headers";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { HeaderContent } from "@/components/header-content";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = true;

  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider defaultOpen={defaultOpen}>
          <AppSidebar />
          <HeaderContent>{children}</HeaderContent>
        </SidebarProvider>
      </body>
    </html>
  );
}

export const metadata = {
  title: "SAMPS UR - HOD Portal",
  description: "HOD Dashboard for SAMPS UR",
};
