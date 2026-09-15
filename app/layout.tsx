import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GameHost — игровой хостинг",
  description: "Платформа для создания и управления игровыми серверами."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ru"><body>{children}</body></html>;
}
