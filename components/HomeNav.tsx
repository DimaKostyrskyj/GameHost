"use client";

import Link from "next/link";
import { Gamepad2, Home, CreditCard, Sparkles, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

type User = { username: string; email: string };

const items = [
  { href: "/", label: "Главная", icon: Home },
  { href: "/games", label: "Игры", icon: Gamepad2 },
  { href: "/pricing", label: "Тарифы", icon: CreditCard },
  { href: "/#features", label: "Возможности", icon: Sparkles },
];

export function HomeNav() {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (r) => (r.ok ? (await r.json()).user : null))
      .then((u) => { if (active) setUser(u); })
      .catch(() => {})
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const initials = user?.username.slice(0, 2).toUpperCase() ?? "GH";
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="relative z-50 px-4 pt-5 sm:px-6 lg:px-8">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <motion.div
            whileHover={{ rotate: -5, scale: 1.05 }}
            whileTap={{ scale: .96 }}
            className="logo-mark green-logo flex h-10 w-10 items-center justify-center rounded-xl"
          >
            <Gamepad2 size={20} />
          </motion.div>
          <span className="hidden text-lg font-semibold tracking-[-.03em] sm:block">GameHost</span>
        </Link>

        <div
          className="magic-nav"
          onMouseLeave={() => setHovered(null)}
        >
          {items.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            const focused = hovered === href || (!hovered && active);

            return (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setHovered(href)}
                className={`magic-nav-item ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {focused && (
                  <motion.span
                    layoutId="magic-nav-indicator"
                    className="magic-nav-indicator"
                    transition={{ type: "spring", stiffness: 520, damping: 38, mass: .65 }}
                  />
                )}
                <motion.span
                  animate={{ y: hovered === href ? -1 : 0, scale: hovered === href ? 1.03 : 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 32, mass: .55 }}
                  className="magic-nav-content"
                >
                  <Icon size={17} strokeWidth={1.9} />
                  <span className="magic-nav-label">{label}</span>
                </motion.span>
              </Link>
            );
          })}
        </div>

        <div className="flex min-w-[40px] items-center justify-end gap-2">
          {loading ? (
            <div className="h-10 w-10 animate-pulse rounded-xl bg-zinc-900" />
          ) : user ? (
            <Link href="/dashboard" className="user-nav-pill">
              <span className="user-avatar">{initials}</span>
              <span className="hidden max-w-28 truncate text-sm font-medium sm:block">{user.username}</span>
              <ArrowUpRight size={15} className="text-emerald-300" />
            </Link>
          ) : (
            <>
              <Link href="/login" className="nav-login">Войти</Link>
              <Link href="/register" className="nav-register">Регистрация</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
