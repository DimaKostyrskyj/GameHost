"use client";

import Link from "next/link";
import { Server, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function AuthCard({
  title,
  subtitle,
  children,
  footer
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4 py-8 text-white sm:py-10">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="auth-grid absolute inset-0 opacity-40" />
        <motion.div
          className="absolute left-1/2 top-[-280px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-600/14 blur-[150px]"
          animate={{ x: [0, 35, -20, 0], y: [0, 25, -10, 0], scale: [1, 1.08, .96, 1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[-250px] right-[-180px] h-[500px] w-[500px] rounded-full bg-violet-600/12 blur-[150px]"
          animate={{ x: [0, -25, 20, 0], y: [0, -20, 15, 0], scale: [1, .94, 1.06, 1] }}
          transition={{ duration: 17, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-[8%] top-[35%] h-1 w-1 rounded-full bg-indigo-300 shadow-[0_0_18px_4px_rgba(129,140,248,.45)]"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.5, .6], y: [0, -40, -80] }}
          transition={{ duration: 4.5, repeat: Infinity, delay: .4 }}
        />
        <motion.div
          className="absolute right-[12%] top-[25%] h-1 w-1 rounded-full bg-violet-300 shadow-[0_0_18px_4px_rgba(167,139,250,.4)]"
          animate={{ opacity: [0, 1, 0], scale: [0.6, 1.5, .6], y: [0, 45, 90] }}
          transition={{ duration: 5.5, repeat: Infinity, delay: 1.2 }}
        />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .6, ease: [.22, 1, .36, 1] }}
        >
          <Link href="/" className="group mb-7 flex items-center justify-center gap-3">
            <motion.div
              whileHover={{ rotate: -6, scale: 1.06 }}
              whileTap={{ scale: .94 }}
              className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,.08),0_12px_35px_rgba(0,0,0,.3)]"
            >
              <Server size={21} />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full border border-[#050507] bg-indigo-500 text-white">
                <Sparkles size={9} />
              </span>
            </motion.div>
            <span className="text-xl font-semibold tracking-tight">GameHost</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, scale: .97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: .7, delay: .08, ease: [.22, 1, .36, 1] }}
          className="auth-card relative overflow-hidden rounded-[26px] border border-white/[.09] bg-zinc-950/75 p-6 shadow-[0_35px_120px_rgba(0,0,0,.55)] backdrop-blur-2xl sm:p-8"
        >
          <motion.div
            className="pointer-events-none absolute -left-20 -top-20 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl"
            animate={{ opacity: [0.35, .7, .35], scale: [1, 1.25, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: .22, duration: .45 }}
              className="mb-7 text-center"
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 opacity-80" />
              <h1 className="text-[27px] font-semibold tracking-[-.025em]">{title}</h1>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{subtitle}</p>
            </motion.div>
            {children}
            {footer}
          </div>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: .55 }}
          className="mt-5 text-center text-[11px] text-zinc-700"
        >
          © 2026 GameHost · Безопасная авторизация
        </motion.p>
      </div>
    </main>
  );
}
