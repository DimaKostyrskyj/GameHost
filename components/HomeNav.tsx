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
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="GameHost — главная">
          <motion.span
            whileHover={{ scale: 1.04, rotate: -2 }}
            whileTap={{ scale: 0.97 }}
            className="brand-mark"
          >
            <Gamepad2 size={20} strokeWidth={2.1} />
          </motion.span>
          <span className="brand-name">GameHost</span>
        </Link>

        <nav
          className="site-nav"
          onMouseLeave={() => setHovered(null)}
          aria-label="Основная навигация"
        >
          {items.map(({ href, label, icon: Icon }) => {
            const active = isActive(href);
            const highlighted = hovered === href;
            return (
              <Link
                key={href}
                href={href}
                onMouseEnter={() => setHovered(href)}
                className={`site-nav-link ${active ? "is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {highlighted && (
                  <motion.span
                    layoutId="nav-hover"
                    className="nav-hover-bg"
                    transition={{ type: "spring", stiffness: 500, damping: 38, mass: 0.55 }}
                  />
                )}
                <span className="site-nav-content">
                  <Icon size={16} strokeWidth={1.9} />
                  <span>{label}</span>
                </span>
                {active && <motion.span layoutId="nav-active" className="nav-active-line" transition={{ type: "spring", stiffness: 520, damping: 38 }} />}
              </Link>
            );
          })}
        </nav>

        <div className="header-account">
          {loading ? (
            <div className="account-skeleton" />
          ) : user ? (
            <Link href="/dashboard" className="account-link">
              <span className="account-avatar">{initials}</span>
              <span className="account-copy">
                <span className="account-caption">Аккаунт</span>
                <span className="account-name">{user.username}</span>
              </span>
              <ArrowUpRight size={15} className="account-arrow" />
            </Link>
          ) : (
            <div className="auth-actions">
              <Link href="/login" className="header-login">Войти</Link>
              <Link href="/register" className="header-register">Создать аккаунт</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
