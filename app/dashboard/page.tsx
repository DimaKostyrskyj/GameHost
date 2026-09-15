"use client";

import { useEffect, useState } from "react";
import { Gamepad2, LogOut, Server, UserRound } from "lucide-react";

type User = { id: string; username: string; email: string; created_at: string };

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async r => {
        if (!r.ok) throw new Error();
        const data = await r.json();
        setUser(data.user);
      })
      .catch(() => { window.location.href = "/login"; })
      .finally(() => setLoading(false));
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  if (loading) return <main className="min-h-screen bg-[#050507] flex items-center justify-center text-zinc-500">Загрузка...</main>;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <header className="border-b border-zinc-900 bg-zinc-950/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href="/" className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black"><Gamepad2 size={19}/></span><span className="font-semibold">GameHost</span></a>
          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block"><p className="text-sm">{user.username}</p><p className="text-xs text-zinc-600">{user.email}</p></div>
            <button onClick={logout} className="rounded-xl border border-zinc-800 p-2.5 text-zinc-400 hover:text-white" title="Выйти"><LogOut size={18}/></button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div>
          <p className="text-sm text-zinc-600">Панель управления</p>
          <h1 className="mt-2 text-3xl font-semibold">Добро пожаловать, {user.username}</h1>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><Server className="text-zinc-500" size={22}/><p className="mt-5 text-sm text-zinc-500">Серверы</p><p className="mt-1 text-2xl font-semibold">0</p></div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><UserRound className="text-zinc-500" size={22}/><p className="mt-5 text-sm text-zinc-500">Аккаунт</p><p className="mt-1 text-sm text-zinc-300">Активен</p></div>
          <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><Gamepad2 className="text-zinc-500" size={22}/><p className="mt-5 text-sm text-zinc-500">Игровые серверы</p><p className="mt-1 text-sm text-zinc-300">Скоро</p></div>
        </div>

        <div className="mt-4 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-10 text-center">
          <Server className="mx-auto text-zinc-700" size={32}/>
          <h2 className="mt-4 font-medium">Серверов пока нет</h2>
          <p className="mt-2 text-sm text-zinc-600">На следующем этапе сюда добавим создание и управление серверами.</p>
        </div>
      </div>
    </main>
  );
}
