"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowRight, Eye, EyeOff, Lock, Mail, Server, User } from "lucide-react";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function submit(e: FormEvent) {
    e.preventDefault();
    setError("");

    if (!username || !email || !password || !confirm) return setError("Please fill in all fields.");
    if (password.length < 8) return setError("Password must contain at least 8 characters.");
    if (password !== confirm) return setError("Passwords do not match.");

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("Demo mode: database and backend registration are not connected yet.");
    }, 700);
  }

  const field = (label: string, icon: React.ReactNode, value: string, set: (v: string) => void, placeholder: string, type = "text") =>
    <div>
      <label className="mb-2 block text-sm text-zinc-400">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600">{icon}</span>
        <input type={type} value={value} onChange={e => set(e.target.value)} placeholder={placeholder} className={`h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 pl-10 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10`} />
      </div>
    </div>;

  return <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050507] px-4 py-10 text-white">
    <div className="pointer-events-none absolute inset-0">
      <div className="absolute left-1/2 top-[-200px] h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
      <div className="absolute bottom-[-250px] left-[-150px] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
    </div>

    <div className="relative w-full max-w-md">
      <Link href="/" className="mb-8 flex items-center justify-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Server size={21} /></div>
        <span className="text-xl font-semibold">GameHost</span>
      </Link>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/80 p-7 shadow-2xl backdrop-blur-xl">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-semibold">Create your account</h1>
          <p className="mt-2 text-sm text-zinc-500">Start hosting your game servers</p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {field("Username", <User size={18} />, username, setUsername, "Your username")}
          {field("Email", <Mail size={18} />, email, setEmail, "you@example.com", "email")}

          <div>
            <label className="mb-2 block text-sm text-zinc-400">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
              <input type={show ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder="Minimum 8 characters" className="h-12 w-full rounded-xl border border-zinc-800 bg-zinc-900/70 pl-10 pr-12 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10" />
              <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {field("Confirm password", <Lock size={18} />, confirm, setConfirm, "Repeat your password", "password")}

          {error && <div className="rounded-lg border border-red-900/50 bg-red-950/30 px-4 py-3 text-sm text-red-400">{error}</div>}

          <button disabled={loading} className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white text-sm font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50">
            {loading ? "Creating account..." : <>Create account <ArrowRight size={17} /></>}
          </button>
        </form>

        <div className="mt-7 border-t border-zinc-800 pt-6 text-center text-sm text-zinc-500">
          Already have an account?{" "}
          <Link href="/login" className="text-white hover:text-indigo-400">Sign in</Link>
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-zinc-700">© 2026 GameHost</p>
    </div>
  </main>;
}
