"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AuthCard } from "@/components/AuthCard";

const input = "h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirm) return setError("Заполните все поля.");
    if (!/^[a-zA-Z0-9_-]{3,32}$/.test(username)) return setError("Имя пользователя: 3–32 символа, только латинские буквы, цифры, _ и -.");
    if (password.length < 8) return setError("Пароль должен содержать минимум 8 символов.");
    if (password !== confirm) return setError("Пароли не совпадают.");

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (!res.ok) return setError(data.error || "Не удалось создать аккаунт.");
      window.location.href = "/dashboard";
    } catch {
      setError("Не удалось связаться с сервером.");
    } finally {
      setLoading(false);
    }
  }

  const field = (label: string, icon: React.ReactNode, value: string, setter: (v: string) => void, placeholder: string, type = "text") => (
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">{icon}</span>
        <input className={`${input} pl-10 pr-4`} type={type} value={value} onChange={e => setter(e.target.value)} placeholder={placeholder} />
      </div>
    </div>
  );

  return (
    <AuthCard title="Создайте аккаунт" subtitle="Начните управлять игровыми серверами">
      <form onSubmit={submit} className="space-y-4">
        {field("Имя пользователя", <User size={18} />, username, setUsername, "Например: Dmytro")}
        {field("Email", <Mail size={18} />, email, setEmail, "you@example.com", "email")}

        <div>
          <label className="mb-2 block text-sm text-zinc-400">Пароль</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
            <input className={`${input} pl-10 pr-12`} type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Минимум 8 символов" />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">
              {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {field("Повторите пароль", <Lock size={18} />, confirm, setConfirm, "Повторите пароль", "password")}

        {error && <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</div>}

        <button disabled={loading} className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50">
          {loading ? "Создание аккаунта..." : <>Создать аккаунт <ArrowRight size={17} /></>}
        </button>
      </form>

      <div className="mt-7 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
        Уже есть аккаунт? <Link href="/login" className="text-white hover:text-indigo-400">Войти</Link>
      </div>
    </AuthCard>
  );
}
