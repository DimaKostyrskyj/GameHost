import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameHost — Game Server Hosting",
  description: "Simple, fast and reliable game server hosting."
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
