import { Header, NavigationMenu } from "@/components";
import { NavigationProvider } from "@/providers";
import ReduxProvider from "@/store/Provider";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Matrices - Training Environments for LLM Agents",
  description:
    "Training environments for multimodal LLM-based agents on realistic computer use tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="h-screen bg-Theme-Main pl-17 antialiased">
        <div className="flex h-full flex-col bg-Theme-Surface">
          <Header />
          <div className="flex min-h-0 flex-1">
            <ReduxProvider>
              <NavigationProvider>
                <aside className="max-w-[256px] flex-1">
                  <NavigationMenu />
                </aside>
                <main
                  className="min-w-0 flex-1 pr-14 pb-4"
                  tabIndex={-1}
                  id="main-content"
                >
                  {children}
                </main>
              </NavigationProvider>
            </ReduxProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
