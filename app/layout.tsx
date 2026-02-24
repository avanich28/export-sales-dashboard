import { ActivePageProvider } from "@/app/_contexts/ActivePageContext";
import { InformationProvider } from "@/app/_contexts/InformationContext";
import { ThemeProvider } from "@/app/_contexts/ThemeContext";
import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    template: "%s | Chao Rai",
    default: "Chao Rai",
  },
  description: "An export sales dashboard for marketing department",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-bgContrast text-textContrast">
        <Toaster position="top-center" />

        <ThemeProvider>
          <ActivePageProvider>
            <InformationProvider>{children}</InformationProvider>
          </ActivePageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
