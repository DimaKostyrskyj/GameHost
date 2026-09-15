"use client";

import Link from "next/link";
import { Gamepad2, UserRound } from "lucide-react";
import { useEffect, useState } from "react";

type User = {
  username: string;
  email: string;
};

export function HomeNav() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) return null;
        const data = await response.json();
        return data.user ?? null;
      })
      .then((currentUser) => {
        if (active) setUser(currentUser);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  const initials = user?.username.slice(0, 2).toUpperCase() ?? "GH";

  return (
    <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
          <Gamepad2 size={21} />
        </div>
        <span className="text-xl font-semibold">GameHost</span>
      </Link>

      <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
        <a href="#features" className="hover:text-white">Возможности</a>
        <a href="#games" className="hover:text-white">Игры</a>
        <a href="#pricing" className="hover:text-white">Тарифы</a>
      </div>

      <div className="flex items-center gap-3">
        {loading ? (
          <div className="h-10 w-32 animate-pulse rounded-xl bg-zinc-900" />
        ) : user ? (
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-xl border border-zinc-800 bg-zinc-950/70 px-3 py-2 hover:border-zinc-700 hover:bg-zinc-900"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/15 text-[11px] font-semibold text-indigo-300">
              {initials}
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-sm font-medium text-white">{user.username}</span>
              <span className="block text-[11px] text-zinc-600">Личный кабинет</span>
            </span>
            <UserRound size={16} className="text-zinc-500" />
          </Link>
        ) : (
          <>
            <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">
              Войти
            </Link>
            <Link href="/register" className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-zinc-200">
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
