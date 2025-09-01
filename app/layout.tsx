import { ThemeProvider } from "@/app/_contexts/ThemeContext";
import "@/app/_styles/globals.css";
import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import { ActivePageProvider } from "./_contexts/ActivePageContext";

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
          <ActivePageProvider>{children}</ActivePageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
