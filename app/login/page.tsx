"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";

const input = "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
      <form onSubmit={submit} className="space-y-5">
        <div>
          <label className="mb-2 block text-sm text-zinc-400">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input className={`${input} pl-10 pr-4`} type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" />
          </div>
        </div>

        <div>
          <div className="mb-2 flex justify-between">
            <label className="text-sm text-zinc-400">Пароль</label>
            <span className="text-xs text-zinc-600">Восстановление скоро</span>
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input className={`${input} pl-10 pr-12`} type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</div>}

        <button disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50">
          {loading ? "Вход..." : <>Войти <ArrowRight size={17} /></>}
        </button>
      </form>

      <div className="mt-7 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
        Нет аккаунта? <Link href="/register" className="text-white hover:text-indigo-400">Зарегистрироваться</Link>
      </div>
    </AuthCard>
  );
}
