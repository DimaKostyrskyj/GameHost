"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Bell,
  CreditCard,
  Gamepad2,
  LayoutDashboard,
  LogOut,
  Save,
  Server,
  Settings,
  ShieldCheck,
  UserRound,
  Wallet,
  X,
  CheckCircle2
} from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at?: string;
};

type Tab = "overview" | "servers" | "profile" | "billing" | "settings";

const tabs: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "servers", label: "Мои серверы", icon: Server },
  { id: "profile", label: "Профиль", icon: UserRound },
  { id: "billing", label: "Оплата", icon: CreditCard },
  { id: "settings", label: "Настройки", icon: Settings }
];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ username: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(async r => {
        if (!r.ok) throw new Error();
        const data = await r.json();
        setUser(data.user);
        setProfileForm({ username: data.user.username, email: data.user.email });
      })
      .catch(() => { window.location.href = "/login"; })
      .finally(() => setLoading(false));
  }, []);

  const initials = useMemo(() => user?.username.slice(0, 2).toUpperCase() ?? "GH", [user]);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  function openTab(next: Tab) {
    setTab(next);
    setMobileOpen(false);
    setMessage(null);
    window.history.replaceState(null, "", `/dashboard?tab=${next}`);
  }

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("tab") as Tab | null;
    if (value && tabs.some(t => t.id === value)) setTab(value);
  }, []);

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось сохранить изменения");
      setUser(data.user);
      setProfileForm({ username: data.user.username, email: data.user.email });
      setMessage({ type: "success", text: "Профиль успешно обновлён" });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Ошибка сохранения" });
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <main className="min-h-screen bg-[#050507] flex items-center justify-center text-zinc-500">Загрузка...</main>;
  if (!user) return null;

  return (
    <main className="min-h-screen bg-[#050507] text-white">
      <header className="sticky top-0 z-30 border-b border-zinc-900 bg-[#050507]/90 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,.15)]">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-3">
            <span className="logo-mark flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black"><Gamepad2 size={19}/></span>
            <span className="font-semibold tracking-tight">GameHost</span>
          </a>
          <div className="flex items-center gap-3">
            <button className="hidden rounded-xl border border-zinc-800 p-2.5 text-zinc-500 hover:bg-zinc-900 hover:text-white sm:block"><Bell size={18}/></button>
            <div className="hidden h-8 w-px bg-zinc-900 sm:block" />
            <button onClick={() => openTab("profile")} className="flex items-center gap-2.5 rounded-xl px-2 py-1.5 hover:bg-zinc-900">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-xs font-semibold text-indigo-300">{initials}</span>
              <span className="hidden text-left sm:block"><span className="block text-sm font-medium">{user.username}</span><span className="block max-w-40 truncate text-[11px] text-zinc-600">{user.email}</span></span>
            </button>
            <button onClick={logout} className="rounded-xl border border-zinc-800 p-2.5 text-zinc-500 hover:bg-zinc-900 hover:text-white" title="Выйти"><LogOut size={18}/></button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1500px]">
        <aside className="hidden min-h-[calc(100vh-64px)] w-64 shrink-0 border-r border-zinc-900 px-4 py-6 md:block">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-700">Управление</p>
          <nav className="mt-3 space-y-1">
            {tabs.map(item => {
              const Icon = item.icon;
              const active = tab === item.id;
              return <button key={item.id} onClick={() => openTab(item.id)} className={`hover-lift flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active ? "bg-white/[0.07] text-white" : "text-zinc-500 hover:bg-white/[0.03] hover:text-zinc-200"}`}><Icon size={18}/>{item.label}</button>;
            })}
          </nav>
          <div className="animate-fade-up mt-8 rounded-2xl border border-indigo-500/10 bg-indigo-500/[0.04] p-4 shadow-[0_15px_50px_rgba(99,102,241,.05)]">
            <p className="text-sm font-medium">GameHost Beta</p>
            <p className="mt-1 text-xs leading-5 text-zinc-600">Скоро здесь появятся игровые серверы, тарифы и управление нодами.</p>
          </div>
        </aside>

        <div className="min-w-0 flex-1 px-4 py-6 animate-fade-in sm:px-6 lg:px-10 lg:py-10">
          <div className="mb-6 flex items-center justify-between md:hidden">
            <button onClick={() => setMobileOpen(v => !v)} className="flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2.5 text-sm"><Settings size={16}/> Раздел: {tabs.find(t => t.id === tab)?.label}</button>
            {mobileOpen && <div className="fixed inset-x-4 top-24 z-40 rounded-2xl border border-zinc-800 bg-zinc-950 p-2 shadow-2xl">{tabs.map(item => <button key={item.id} onClick={() => openTab(item.id)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"><item.icon size={17}/>{item.label}</button>)}</div>}
          </div>

          {tab === "overview" && <Overview user={user} onProfile={() => openTab("profile")} onServers={() => openTab("servers")} />}
          {tab === "servers" && <EmptySection icon={Server} title="Мои серверы" text="У вас пока нет игровых серверов. Здесь появится список серверов, их статус, IP, ресурсы и управление." action="Создать сервер" />}
          {tab === "billing" && <EmptySection icon={Wallet} title="Оплата и баланс" text="Здесь будут баланс, история платежей, подписки и счета GameHost." action="Пополнить баланс" />}
          {tab === "settings" && <SettingsSection user={user} />}
          {tab === "profile" && <ProfileSection user={user} form={profileForm} setForm={setProfileForm} saving={saving} message={message} onSave={saveProfile} />}
        </div>
      </div>
    </main>
  );
}

function Overview({ user, onProfile, onServers }: { user: User; onProfile: () => void; onServers: () => void }) {
  return <div>
    <p className="text-sm text-zinc-600">Панель управления</p>
    <div className="mt-2 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
      <div><h1 className="text-3xl font-semibold tracking-tight">Добро пожаловать, {user.username}</h1><p className="mt-2 text-sm text-zinc-600">Управляйте аккаунтом и игровыми серверами из одного места.</p></div>
      <button onClick={onServers} className="w-fit rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-zinc-200">Создать сервер</button>
    </div>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      <Stat icon={Server} label="Серверы" value="0" hint="активных серверов" />
      <Stat icon={Wallet} label="Баланс" value="0.00 zł" hint="доступно сейчас" />
      <Stat icon={ShieldCheck} label="Аккаунт" value="Активен" hint={`с ${formatDate(user.created_at)}`} />
    </div>
    <div className="mt-4 grid gap-4 lg:grid-cols-[1.4fr_.8fr]">
      <div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"><Server className="text-zinc-700" size={30}/><h2 className="mt-5 font-medium">Серверов пока нет</h2><p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">Создайте первый сервер, когда мы подключим игровую инфраструктуру. Здесь будет управление запуском, остановкой, консолью, файлами, бэкапами и ресурсами.</p><button onClick={onServers} className="mt-6 rounded-xl border border-zinc-800 px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">Открыть серверы</button></div>
      <div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"><UserRound className="text-zinc-700" size={25}/><p className="mt-5 text-xs uppercase tracking-wider text-zinc-600">Ваш профиль</p><p className="mt-2 text-lg font-medium">{user.username}</p><p className="mt-1 truncate text-sm text-zinc-600">{user.email}</p><button onClick={onProfile} className="mt-6 text-sm text-indigo-300 hover:text-indigo-200">Редактировать профиль →</button></div>
    </div>
  </div>;
}

function Stat({ icon: Icon, label, value, hint }: { icon: typeof Server; label: string; value: string; hint: string }) {
  return <div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><Icon className="text-zinc-500" size={21}/><p className="mt-5 text-sm text-zinc-500">{label}</p><p className="mt-1 text-2xl font-semibold">{value}</p><p className="mt-1 text-xs text-zinc-700">{hint}</p></div>;
}

function ProfileSection({ user, form, setForm, saving, message, onSave }: { user: User; form: { username: string; email: string }; setForm: (v: { username: string; email: string }) => void; saving: boolean; message: { type: "success" | "error"; text: string } | null; onSave: (e: FormEvent) => void }) {
  return <div className="max-w-4xl"><p className="text-sm text-zinc-600">Аккаунт</p><h1 className="mt-2 text-3xl font-semibold">Личный профиль</h1><p className="mt-2 text-sm text-zinc-600">Изменяйте данные, которые используются в вашем аккаунте GameHost.</p>
    <div className="mt-8 grid gap-5 lg:grid-cols-[.75fr_1.25fr]">
      <div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><div className="flex items-center gap-4"><span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-xl font-semibold text-indigo-300">{user.username.slice(0, 2).toUpperCase()}</span><div><p className="text-lg font-medium">{user.username}</p><p className="text-sm text-zinc-600">Участник GameHost</p></div></div><div className="mt-7 space-y-4 border-t border-zinc-900 pt-5"><Info label="ID аккаунта" value={user.id} mono /><Info label="Дата регистрации" value={formatDate(user.created_at)} /><Info label="Статус" value="Активен" /></div></div>
      <form onSubmit={onSave} className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"><h2 className="font-medium">Основные данные</h2><div className="mt-6 space-y-5"><Field label="Имя пользователя" value={form.username} onChange={v => setForm({ ...form, username: v })} placeholder="Например, Kai" /><Field label="Email" type="email" value={form.email} onChange={v => setForm({ ...form, email: v })} placeholder="you@example.com" /></div>{message && <div className={`mt-5 flex items-center gap-2 rounded-xl border px-4 py-3 text-sm ${message.type === "success" ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300" : "border-red-500/20 bg-red-500/5 text-red-300"}`}>{message.type === "success" ? <CheckCircle2 size={16}/> : <X size={16}/>} {message.text}</div>}<button disabled={saving} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"><Save size={16}/>{saving ? "Сохранение..." : "Сохранить изменения"}</button></form>
    </div>
  </div>;
}

function Field({ label, value, onChange, placeholder, type = "text" }: { label: string; value: string; onChange: (v: string) => void; placeholder: string; type?: string }) {
  return <label className="block"><span className="mb-2 block text-sm text-zinc-400">{label}</span><input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} className="w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-zinc-600 focus:ring-2 focus:ring-indigo-500/10" /></label>;
}

function Info({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return <div><p className="text-xs text-zinc-600">{label}</p><p className={`mt-1 break-all text-sm text-zinc-300 ${mono ? "font-mono text-xs" : ""}`}>{value}</p></div>;
}

function EmptySection({ icon: Icon, title, text, action }: { icon: typeof Server; title: string; text: string; action: string }) {
  return <div><p className="text-sm text-zinc-600">GameHost</p><h1 className="mt-2 text-3xl font-semibold">{title}</h1><div className="mt-8 flex min-h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/60 px-6 text-center"><Icon className="text-zinc-700" size={34}/><h2 className="mt-5 font-medium">Пока пусто</h2><p className="mt-2 max-w-lg text-sm leading-6 text-zinc-600">{text}</p><button className="mt-6 rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-zinc-200">{action}</button></div></div>;
}

function SettingsSection({ user }: { user: User }) {
  const [notifications, setNotifications] = useState(true);
  return <div className="max-w-3xl"><p className="text-sm text-zinc-600">Аккаунт</p><h1 className="mt-2 text-3xl font-semibold">Настройки</h1><p className="mt-2 text-sm text-zinc-600">Управление уведомлениями и безопасностью аккаунта.</p><div className="mt-8 space-y-4"><div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><div className="flex items-start justify-between gap-5"><div className="flex gap-4"><Bell className="mt-0.5 text-zinc-500" size={20}/><div><p className="font-medium">Уведомления</p><p className="mt-1 text-sm text-zinc-600">Получать уведомления о состоянии игровых серверов и важных событиях.</p></div></div><button onClick={() => setNotifications(v => !v)} className={`relative h-6 w-11 shrink-0 rounded-full transition ${notifications ? "bg-indigo-500" : "bg-zinc-800"}`}><span className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${notifications ? "left-6" : "left-1"}`} /></button></div></div><div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6"><div className="flex gap-4"><ShieldCheck className="text-zinc-500" size={20}/><div><p className="font-medium">Безопасность</p><p className="mt-1 text-sm text-zinc-600">Аккаунт защищён сессией HttpOnly. Смена пароля будет добавлена следующим этапом.</p><p className="mt-4 text-xs text-zinc-700">Текущий аккаунт: {user.email}</p></div></div></div></div></div>;
}
