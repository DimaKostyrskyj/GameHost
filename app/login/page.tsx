"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Server } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Demo mode: backend authentication is not connected yet.");
    }, 700);
  }

  return <AuthShell title="Welcome back" subtitle="Login to manage your game servers">
    <form onSubmit={handleSubmit} className="space-y-5">
      <Field label="Email" icon={<Mail size={18} />} type="email" value={email} onChange={setEmail} placeholder="you@example.com" />
      <div>
        <div className="mb-2 flex justify-between">
          <label className="text-sm text-zinc-400">Password</label>
          <span className="text-xs text-zinc-600">Forgot password?</span>
        </div>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
          <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={inputClass("pl-10 pr-12")} />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>
      {error && <ErrorBox>{error}</ErrorBox>}
      <Submit loading={loading}>Sign in</Submit>
    </form>

    <AuthFooter>
      Don't have an account? <Link href="/register" className="text-white hover:text-indigo-400">Create account</Link>
    </AuthFooter>
  </AuthShell>;
}

function AuthShell({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4 text-white">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-200px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="absolute bottom-[-250px] right-[-150px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
    </div>
    <div className="relative w-full max-w-md">
      <Link href="/" className="mb-8 flex justify-center items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Server size={21} /></div>
        <span className="text-xl font-semibold">GameHost</span>
      </Link>
      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-2xl backdrop-blur-xl">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>
        </div>
        {children}
      </div>
      <p className="mt-6 text-center text-xs text-zinc-700">© 2026 GameHost</p>
    </div>
  </main>;
}

function Field({ label, icon, type, value, onChange, placeholder }: { label: string; icon: React.ReactNode; type: string; value: string; onChange: (v: string) => void; placeholder: string }) {
  return <div>
    <label className="mb-2 block text-sm text-zinc-400">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">{icon}</span>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className={inputClass("pl-10")} />
    </div>
  </div>;
}

const inputClass = (extra = "") => `h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 ${extra}`;

function ErrorBox({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">{children}</div>;
}

function Submit({ loading, children }: { loading: boolean; children: React.ReactNode }) {
  return <button type="submit" disabled={loading} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50">
    {loading ? "Signing in..." : <>{children}<ArrowRight size={17} /></>}
  </button>;
}

function AuthFooter({ children }: { children: React.ReactNode }) {
  return <div className="mt-7 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">{children}</div>;
}
