"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Eye, EyeOff, Lock, Mail, Loader2 } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";

const input = "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/65 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-500 input-glow focus:ring-2 focus:ring-indigo-500/10";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [focused, setFocused] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then((res) => {
        if (res.ok) window.location.replace("/dashboard");
      })
      .catch(() => {});
  }, []);

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !password) return setError("Введите email и пароль.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Не удалось войти.");
      window.location.href = "/dashboard";
    } catch {
      setError("Не удалось связаться с сервером.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthCard title="С возвращением" subtitle="Войдите, чтобы управлять игровыми серверами">
      <motion.form
        onSubmit={submit}
        initial="hidden"
        animate="show"
        variants={{ hidden: {}, show: { transition: { staggerChildren: .065, delayChildren: .25 } } }}
        className="space-y-5"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
          <label className="mb-2 block text-sm text-zinc-400">Email</label>
          <div className="relative">
            <motion.div animate={{ color: focused === "email" ? "#818cf8" : "#52525b", scale: focused === "email" ? 1.08 : 1 }} className="absolute left-3 top-1/2 -translate-y-1/2">
              <Mail size={18} />
            </motion.div>
            <input className={`${input} pl-10 pr-4`} type="email" value={email} onChange={e => setEmail(e.target.value)} onFocus={() => setFocused("email")} onBlur={() => setFocused(null)} placeholder="you@example.com" autoComplete="email" />
            <AnimatePresence>
              {email && <motion.div initial={{ opacity: 0, scale: .7 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .7 }} className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400"><CheckCircle2 size={16} /></motion.div>}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}>
          <div className="mb-2 flex justify-between">
            <label className="text-sm text-zinc-400">Пароль</label>
            <span className="text-xs text-zinc-600">Восстановление скоро</span>
          </div>
          <div className="relative">
            <motion.div animate={{ color: focused === "password" ? "#818cf8" : "#52525b", scale: focused === "password" ? 1.08 : 1 }} className="absolute left-3 top-1/2 -translate-y-1/2">
              <Lock size={18} />
            </motion.div>
            <input className={`${input} pl-10 pr-12`} type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onFocus={() => setFocused("password")} onBlur={() => setFocused(null)} placeholder="••••••••" autoComplete="current-password" />
            <motion.button whileTap={{ scale: .85 }} type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 transition hover:text-zinc-300" aria-label={show ? "Скрыть пароль" : "Показать пароль"}>
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </motion.button>
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.div initial={{ opacity: 0, height: 0, y: -5 }} animate={{ opacity: 1, height: "auto", y: 0 }} exit={{ opacity: 0, height: 0, y: -5 }} className="overflow-hidden rounded-xl border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.button
          variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
          whileHover={{ y: -2, scale: 1.005 }}
          whileTap={{ scale: .985 }}
          disabled={loading}
          className="btn-shine group relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-white text-sm font-medium text-black transition disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? <><Loader2 size={17} className="animate-spin" /> Вход...</> : <>Войти <ArrowRight size={17} className="transition-transform duration-300 group-hover:translate-x-1" /></>}
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .65 }}
        className="mt-7 border-t border-zinc-800/80 pt-6 text-center text-sm text-zinc-500"
      >
        Нет аккаунта? <Link href="/register" className="font-medium text-zinc-300 transition-colors hover:text-indigo-400">Зарегистрироваться</Link>
      </motion.div>
    </AuthCard>
  );
}
