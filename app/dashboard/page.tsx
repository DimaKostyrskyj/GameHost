"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Bell,
  CheckCircle2,
  Cpu,
  CreditCard,
  Gamepad2,
  HardDrive,
  LayoutDashboard,
  LogOut,
  Plus,
  Save,
  Server,
  Settings,
  ShieldCheck,
  UserRound,
  Wallet,
  X,
  Zap,
} from "lucide-react";

type User = {
  id: string;
  username: string;
  email: string;
  created_at: string;
  updated_at?: string;
};

type Tab = "overview" | "servers" | "profile" | "billing" | "settings";

type TabItem = {
  id: Tab;
  label: string;
  icon: typeof LayoutDashboard;
};

const tabs: TabItem[] = [
  { id: "overview", label: "Обзор", icon: LayoutDashboard },
  { id: "servers", label: "Мои серверы", icon: Server },
  { id: "profile", label: "Профиль", icon: UserRound },
  { id: "billing", label: "Оплата", icon: CreditCard },
  { id: "settings", label: "Настройки", icon: Settings },
];

const enter = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0 },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({ username: "", email: "" });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/auth/me", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error();
        const data = await response.json();
        setUser(data.user);
        setProfileForm({ username: data.user.username, email: data.user.email });
      })
      .catch(() => {
        window.location.href = "/login";
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const value = new URLSearchParams(window.location.search).get("tab") as Tab | null;
    if (value && tabs.some((item) => item.id === value)) setTab(value);
  }, []);

  const initials = useMemo(
    () => user?.username.slice(0, 2).toUpperCase() ?? "GH",
    [user]
  );

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  function openTab(value: Tab) {
    setTab(value);
    setMobileOpen(false);
    setMessage(null);
    window.history.replaceState(null, "", `/dashboard?tab=${value}`);
  }

  async function saveProfile(event: FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profileForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Не удалось сохранить изменения");

      setUser(data.user);
      setProfileForm({ username: data.user.username, email: data.user.email });
      setMessage({ type: "success", text: "Профиль успешно обновлён" });
    } catch (error) {
      setMessage({
        type: "error",
        text: error instanceof Error ? error.message : "Ошибка сохранения",
      });
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050507] text-zinc-500">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />
          Загрузка панели...
        </div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="hero-orb absolute -left-48 top-10 h-[480px] w-[480px] rounded-full bg-indigo-600/[.055] blur-[140px]" />
        <div className="hero-orb-reverse absolute -right-48 top-[45%] h-[520px] w-[520px] rounded-full bg-purple-600/[.045] blur-[150px]" />
        <div className="grid-bg absolute inset-0 opacity-40" />
      </div>

      <header className="sticky top-0 z-40 border-b border-zinc-900/90 bg-[#050507]/80 backdrop-blur-2xl">
        <div className="mx-auto flex h-[68px] max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <a href="/" className="group flex items-center gap-3">
            <span className="logo-mark flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
              <Gamepad2 size={19} />
            </span>
            <span className="font-semibold tracking-tight">GameHost</span>
            <span className="hidden rounded-full border border-zinc-800 px-2 py-0.5 text-[9px] uppercase tracking-widest text-zinc-600 sm:inline">
              Panel
            </span>
          </a>

          <div className="flex items-center gap-2">
            <button className="hidden rounded-xl border border-zinc-800/80 bg-zinc-950/50 p-2.5 text-zinc-500 transition hover:border-zinc-700 hover:text-white sm:block">
              <Bell size={17} />
            </button>
            <div className="mx-1 hidden h-7 w-px bg-zinc-900 sm:block" />
            <button
              onClick={() => openTab("profile")}
              className="group flex items-center gap-2 rounded-xl px-2 py-1.5 transition hover:bg-white/[.04]"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/15 text-xs font-semibold text-indigo-300 ring-1 ring-indigo-500/10">
                {initials}
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-medium">{user.username}</span>
                <span className="block max-w-44 truncate text-[11px] text-zinc-600">
                  {user.email}
                </span>
              </span>
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={logout}
              className="rounded-xl border border-zinc-800/80 p-2.5 text-zinc-500 transition hover:border-red-900/40 hover:bg-red-950/20 hover:text-red-300"
              title="Выйти"
            >
              <LogOut size={17} />
            </motion.button>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto flex max-w-[1500px]">
        <aside className="hidden min-h-[calc(100vh-68px)] w-64 shrink-0 border-r border-zinc-900/90 px-4 py-7 md:block">
          <p className="px-3 text-[10px] font-semibold uppercase tracking-[.2em] text-zinc-700">
            Рабочее пространство
          </p>
          <nav className="mt-4 space-y-1">
            {tabs.map((item) => {
              const Icon = item.icon;
              const active = tab === item.id;
              return (
                <motion.button
                  key={item.id}
                  whileHover={{ x: active ? 0 : 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => openTab(item.id)}
                  className={`relative flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
                    active
                      ? "bg-white/[.07] text-white"
                      : "text-zinc-500 hover:bg-white/[.025] hover:text-zinc-200"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="active-tab"
                      className="absolute left-0 h-6 w-0.5 rounded-full bg-indigo-400"
                    />
                  )}
                  <Icon size={18} />
                  {item.label}
                  {item.id === "servers" && (
                    <span className="ml-auto rounded-md bg-zinc-900 px-1.5 py-0.5 text-[9px] text-zinc-600">
                      0
                    </span>
                  )}
                </motion.button>
              );
            })}
          </nav>

          <div className="premium-border relative mt-8 rounded-2xl border border-zinc-800/80 bg-zinc-950/70 p-5">
            <div className="flex items-center gap-2 text-xs font-medium">
              <span className="status-online h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Система работает
            </div>
            <p className="mt-2 text-xs leading-5 text-zinc-600">
              Инфраструктура GameHost готова к запуску серверов.
            </p>
          </div>
        </aside>

        <section className="min-w-0 flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-9">
          <div className="mb-6 md:hidden">
            <button
              onClick={() => setMobileOpen((value) => !value)}
              className="flex w-full items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 py-3 text-sm"
            >
              <span className="flex items-center gap-2">
                <Settings size={16} />
                {tabs.find((item) => item.id === tab)?.label}
              </span>
              <span className="text-zinc-600">⌄</span>
            </button>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 rounded-2xl border border-zinc-800 bg-zinc-950 p-2"
              >
                {tabs.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => openTab(item.id)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-zinc-400 hover:bg-zinc-900 hover:text-white"
                    >
                      <Icon size={17} />
                      {item.label}
                    </button>
                  );
                })}
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2 }}
            >
              {tab === "overview" && (
                <Overview
                  user={user}
                  onProfile={() => openTab("profile")}
                  onServers={() => openTab("servers")}
                />
              )}
              {tab === "servers" && <Servers />}
              {tab === "billing" && <Billing />}
              {tab === "settings" && <SettingsSection user={user} />}
              {tab === "profile" && (
                <ProfileSection
                  user={user}
                  form={profileForm}
                  setForm={setProfileForm}
                  saving={saving}
                  message={message}
                  onSave={saveProfile}
                />
              )}
            </motion.div>
          </AnimatePresence>
        </section>
      </div>
    </main>
  );
}

function Overview({
  user,
  onProfile,
  onServers,
}: {
  user: User;
  onProfile: () => void;
  onServers: () => void;
}) {
  const stats = [
    { icon: Server, label: "Серверы", value: "0", hint: "активных серверов" },
    { icon: Wallet, label: "Баланс", value: "0.00 zł", hint: "доступно сейчас" },
    {
      icon: ShieldCheck,
      label: "Аккаунт",
      value: "Активен",
      hint: `с ${formatDate(user.created_at)}`,
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.07 } } }}
    >
      <motion.div
        variants={enter}
        className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end"
      >
        <div>
          <p className="text-xs uppercase tracking-[.2em] text-zinc-600">Обзор аккаунта</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Добро пожаловать, {user.username}
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-600">
            Управляйте серверами, ресурсами и аккаунтом из одного рабочего пространства.
          </p>
        </div>
        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          onClick={onServers}
          className="btn-shine flex w-fit items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black"
        >
          <Plus size={16} />
          Создать сервер
        </motion.button>
      </motion.div>

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {stats.map(({ icon: Icon, label, value, hint }) => (
          <motion.div
            variants={enter}
            key={label}
            className="premium-border hover-lift relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/[.04] text-zinc-400">
                <Icon size={18} />
              </span>
              <ArrowUpRight size={15} className="text-zinc-800" />
            </div>
            <p className="mt-6 text-sm text-zinc-500">{label}</p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
            <p className="mt-1 text-xs text-zinc-700">{hint}</p>
          </motion.div>
        ))}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
        <motion.div
          variants={enter}
          className="premium-border relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8"
        >
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/[.04] blur-3xl" />
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wider text-zinc-600">Инфраструктура</p>
              <h2 className="mt-2 text-lg font-medium">Серверов пока нет</h2>
            </div>
            <Server className="text-zinc-800" size={28} />
          </div>
          <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-600">
            Создайте первый сервер, когда будете готовы. Здесь появятся консоль, файлы,
            резервные копии, мониторинг и управление ресурсами.
          </p>
          <motion.button
            whileHover={{ x: 3 }}
            onClick={onServers}
            className="mt-6 flex items-center gap-2 text-sm text-indigo-300"
          >
            Открыть серверы <ArrowUpRight size={15} />
          </motion.button>
        </motion.div>

        <motion.div
          variants={enter}
          className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6 sm:p-8"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-300">
            <UserRound size={19} />
          </div>
          <p className="mt-5 text-xs uppercase tracking-wider text-zinc-600">Ваш профиль</p>
          <p className="mt-2 text-lg font-medium">{user.username}</p>
          <p className="mt-1 truncate text-sm text-zinc-600">{user.email}</p>
          <button
            onClick={onProfile}
            className="mt-6 text-sm text-zinc-400 transition hover:text-white"
          >
            Редактировать →
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Servers() {
  return (
    <div>
      <Header
        title="Мои серверы"
        subtitle="Управляйте игровыми серверами и их ресурсами."
        action={
          <button className="flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black">
            <Plus size={16} />
            Создать сервер
          </button>
        }
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <ServerPreview
          game="Valheim"
          status="Доступно"
          icon={<Gamepad2 size={22} />}
          specs="2 GB RAM · 1 CPU · 20 GB NVMe"
        />
        <ServerPreview
          game="Minecraft"
          status="Доступно"
          icon={<span className="text-xl">◈</span>}
          specs="4 GB RAM · 2 CPU · 50 GB NVMe"
        />
      </div>
      <div className="mt-5 rounded-2xl border border-dashed border-zinc-800 bg-zinc-950/50 p-10 text-center">
        <Server className="mx-auto text-zinc-700" size={30} />
        <p className="mt-4 text-sm font-medium">Ваши реальные серверы появятся здесь</p>
        <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-zinc-600">
          Следующий этап подключит Docker-ноды и API управления серверами.
        </p>
      </div>
    </div>
  );
}

function ServerPreview({
  game,
  status,
  icon,
  specs,
}: {
  game: string;
  status: string;
  icon: React.ReactNode;
  specs: string;
}) {
  const resources = [
    { icon: Cpu, label: "CPU" },
    { icon: Activity, label: "RAM" },
    { icon: HardDrive, label: "Диск" },
  ];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="premium-border relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950/80 p-6"
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/[.04] text-zinc-300">
            {icon}
          </span>
          <div>
            <p className="font-medium">{game}</p>
            <p className="mt-1 text-xs text-zinc-600">Шаблон GameHost</p>
          </div>
        </div>
        <span className="rounded-full border border-emerald-500/10 bg-emerald-500/5 px-2.5 py-1 text-[11px] text-emerald-300">
          {status}
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        {resources.map(({ icon: Icon, label }) => (
          <div key={label} className="rounded-xl border border-zinc-900 bg-black/30 p-3">
            <Icon size={14} className="text-zinc-600" />
            <p className="mt-2 text-[10px] text-zinc-700">{label}</p>
            <p className="mt-1 text-sm">—</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-zinc-700">{specs}</p>
    </motion.div>
  );
}

function Billing() {
  return (
    <div>
      <Header title="Оплата и баланс" subtitle="Баланс, тарифы и история платежей." />
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="premium-border rounded-2xl border border-zinc-800 bg-zinc-950 p-6 md:col-span-2">
          <p className="text-xs text-zinc-600">Текущий баланс</p>
          <p className="mt-3 text-4xl font-semibold">
            0.00 <span className="text-base text-zinc-600">PLN</span>
          </p>
          <button className="mt-6 rounded-xl bg-white px-4 py-3 text-sm font-medium text-black">
            Пополнить баланс
          </button>
        </div>
        <div className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <Wallet className="text-zinc-600" size={20} />
          <p className="mt-5 text-sm font-medium">Тариф не выбран</p>
          <p className="mt-1 text-xs leading-5 text-zinc-600">
            Выберите серверный план после подключения нод.
          </p>
        </div>
      </div>
    </div>
  );
}

function Header({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-xs uppercase tracking-[.2em] text-zinc-600">GameHost</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-2 text-sm text-zinc-600">{subtitle}</p>
      </div>
      {action}
    </div>
  );
}

function ProfileSection({
  user,
  form,
  setForm,
  saving,
  message,
  onSave,
}: {
  user: User;
  form: { username: string; email: string };
  setForm: (value: { username: string; email: string }) => void;
  saving: boolean;
  message: { type: "success" | "error"; text: string } | null;
  onSave: (event: FormEvent) => void;
}) {
  return (
    <div className="max-w-5xl">
      <Header title="Личный профиль" subtitle="Управляйте основными данными аккаунта." />
      <div className="mt-8 grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
        <motion.div
          whileHover={{ y: -3 }}
          className="premium-border rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8"
        >
          <div className="flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/15 text-xl font-semibold text-indigo-300 ring-1 ring-indigo-500/10">
              {user.username.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <p className="text-lg font-medium">{user.username}</p>
              <p className="text-sm text-zinc-600">Участник GameHost</p>
            </div>
          </div>
          <div className="mt-8 space-y-5 border-t border-zinc-900 pt-6">
            <Info label="ID аккаунта" value={user.id} mono />
            <Info label="Дата регистрации" value={formatDate(user.created_at)} />
            <Info label="Статус" value="Активен" />
          </div>
        </motion.div>

        <form onSubmit={onSave} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-medium">Основные данные</h2>
              <p className="mt-1 text-xs text-zinc-600">Изменения сохраняются в PostgreSQL.</p>
            </div>
            <ShieldCheck className="text-zinc-700" size={21} />
          </div>

          <div className="mt-7 space-y-5">
            <Field
              label="Имя пользователя"
              value={form.username}
              onChange={(value) => setForm({ ...form, username: value })}
              placeholder="Например, Kai"
            />
            <Field
              label="Email"
              type="email"
              value={form.email}
              onChange={(value) => setForm({ ...form, email: value })}
              placeholder="you@example.com"
            />
          </div>

          <AnimatePresence>
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={`mt-5 flex items-center gap-2 overflow-hidden rounded-xl border px-4 py-3 text-sm ${
                  message.type === "success"
                    ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-300"
                    : "border-red-500/20 bg-red-500/5 text-red-300"
                }`}
              >
                {message.type === "success" ? <CheckCircle2 size={16} /> : <X size={16} />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            disabled={saving}
            className="btn-shine mt-6 flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-medium text-black disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? "Сохранение..." : "Сохранить изменения"}
          </motion.button>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-zinc-400">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="input-glow w-full rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-indigo-500"
      />
    </label>
  );
}

function Info({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <p className="text-xs text-zinc-600">{label}</p>
      <p className={`mt-1 break-all text-sm text-zinc-300 ${mono ? "font-mono text-xs" : ""}`}>
        {value}
      </p>
    </div>
  );
}

function SettingsSection({ user }: { user: User }) {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="max-w-3xl">
      <Header title="Настройки" subtitle="Управление уведомлениями и безопасностью." />
      <div className="mt-8 space-y-4">
        <div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex items-start justify-between gap-5">
            <div className="flex gap-4">
              <Bell className="mt-0.5 text-zinc-500" size={20} />
              <div>
                <p className="font-medium">Уведомления</p>
                <p className="mt-1 text-sm leading-6 text-zinc-600">
                  Получать уведомления о состоянии серверов и важных событиях.
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications((value) => !value)}
              className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                notifications ? "bg-indigo-500" : "bg-zinc-800"
              }`}
            >
              <motion.span
                animate={{ x: notifications ? 20 : 0 }}
                className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white"
              />
            </button>
          </div>
        </div>

        <div className="hover-lift rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
          <div className="flex gap-4">
            <ShieldCheck className="text-zinc-500" size={20} />
            <div>
              <p className="font-medium">Безопасность</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Сессия защищена HttpOnly cookie. Смена пароля будет добавлена следующим этапом.
              </p>
              <p className="mt-4 text-xs text-zinc-700">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-500/10 bg-indigo-500/[.025] p-6">
          <div className="flex gap-3">
            <Zap className="text-indigo-300" size={19} />
            <div>
              <p className="font-medium">GameHost Beta</p>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Следующим этапом подключим реальные игровые ноды и автоматическое создание серверов.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
