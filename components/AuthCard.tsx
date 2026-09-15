import Link from "next/link";
import { Server } from "lucide-react";

export function AuthCard({
  title,
  subtitle,
  children,
  footer
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4 py-10 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-200px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
      </div>
      <div className="relative w-full max-w-md">
        <Link href="/" className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Server size={21} /></div>
          <span className="text-xl font-semibold">GameHost</span>
        </Link>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-2xl backdrop-blur-xl">
          <div className="mb-7 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
            <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
          </div>
          {children}
          {footer}
        </div>
        <p className="mt-6 text-center text-xs text-zinc-700">© 2026 GameHost</p>
      </div>
    </main>
  );
}
