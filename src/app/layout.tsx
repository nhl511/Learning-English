import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "@uploadthing/react/styles.css";

import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Learning English Homepage",
    template: "%s | Learning English",
  },
  description: "Learning english",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  interactiveWidget: "resizes-content",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <div className="container">{children}</div>
        <ToastContainer />
      </body>
    </html>
  );
}
