"use client";

import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Cpu, Gamepad2, HardDrive, Server, ShieldCheck, Sparkles, Terminal, Zap, Globe2, Layers3, Rocket } from "lucide-react";
import { useEffect, useState } from "react";
import { HomeNav } from "@/components/HomeNav";

const features = [
  { icon: Rocket, title: "Сервер за несколько минут", text: "Выбираешь игру, ресурсы и регион — без ручной настройки VPS и контейнеров." },
  { icon: Terminal, title: "Управление без лишних окон", text: "Консоль, файлы, настройки, бэкапы и мониторинг собраны в одной панели." },
  { icon: ShieldCheck, title: "Безопасная инфраструктура", text: "Изолированные окружения, защищённая авторизация и контроль доступа." },
  { icon: Globe2, title: "Регионы для игроков", text: "Выбирай локацию сервера с учётом географии своей команды." },
  { icon: Layers3, title: "Масштабирование", text: "Архитектура рассчитана на несколько нод и постепенное расширение платформы." },
  { icon: Zap, title: "Ресурсы под контролем", text: "RAM, CPU и NVMe отображаются в понятном интерфейсе и привязаны к тарифу." },
];

const games = ["Valheim", "Minecraft", "Terraria", "Rust", "CS2", "Palworld"];

const steps = [
  ["01", "Создай аккаунт", "Регистрация и вход занимают несколько секунд."],
  ["02", "Выбери игру", "Открой каталог и выбери нужный шаблон сервера."],
  ["03", "Настрой ресурсы", "Подбери RAM, CPU, диск и регион под свою команду."],
  ["04", "Запускай и играй", "Получай доступ к серверу и управляй им из кабинета."],
];

function CursorOrb({ x, y, color }: { x: any; y: any; color: string }) {
  return <motion.div style={{ x, y }} className="pointer-events-none absolute z-30 -translate-x-1/2 -translate-y-1/2">
    <div className={`relative flex h-20 w-20 items-center justify-center rounded-full border ${color} bg-black/20 backdrop-blur-md`}>
      <div className="absolute inset-[-13px] rounded-full border border-white/5" />
      <div className="absolute inset-[-25px] rounded-full border border-white/[.035]" />
      <div className="absolute h-3 w-3 rounded-full bg-white shadow-[0_0_22px_rgba(255,255,255,.8)]" />
    </div>
  </motion.div>;
}

export default function Home() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 130, damping: 20 });
  const y = useSpring(my, { stiffness: 130, damping: 20 });
  const glowX = useTransform(x, (v) => v * 0.22);
  const glowY = useTransform(y, (v) => v * 0.22);
  const [activeDemo, setActiveDemo] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActiveDemo(v => (v + 1) % 2), 2400);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="min-h-screen overflow-hidden bg-[#07060d] text-white selection:bg-indigo-400/30">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <motion.div style={{ x: glowX, y: glowY }} className="absolute left-[25%] top-[-20%] h-[700px] w-[700px] rounded-full bg-indigo-500/[.09] blur-[160px]" />
        <div className="home-orb home-orb-red absolute right-[-15%] top-[25%] h-[620px] w-[620px] rounded-full blur-[160px]" />
        <div className="home-orb home-orb-blue absolute bottom-[-18%] left-[-10%] h-[520px] w-[520px] rounded-full blur-[150px]" />
        <div className="grid-bg absolute inset-0 opacity-50" />
      </div>

      <HomeNav />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-16 lg:px-8 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <div className="relative">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65 }} className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.035] px-4 py-2 text-xs text-zinc-400 backdrop-blur-xl">
              <span className="status-online h-1.5 w-1.5 rounded-full bg-emerald-400" />
              GameHost · управление игровыми серверами
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .08 }} className="text-5xl font-semibold leading-[.98] tracking-[-.06em] sm:text-7xl lg:text-[76px]">
              Серверы,
              <br />
              которые <span className="text-gradient-live">работают.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7, delay: .18 }} className="mt-7 max-w-xl text-base leading-8 text-zinc-400 sm:text-lg">
              GameHost — единая платформа для создания и управления игровыми серверами. Выбирай игру, конфигурацию и регион, а рутину оставляй инфраструктуре.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .28 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="btn-shine group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_45px_rgba(255,255,255,.12)]">Создать сервер <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
              <Link href="/games" className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.025] px-7 py-3.5 text-sm text-zinc-300 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:text-white">Смотреть игры <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" /></Link>
            </motion.div>
            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-xs text-zinc-600">
              <span className="flex items-center gap-2"><Check size={14} /> PostgreSQL</span>
              <span className="flex items-center gap-2"><Check size={14} /> NVMe</span>
              <span className="flex items-center gap-2"><Check size={14} /> Docker-ready</span>
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: .94, y: 25 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .12 }} className="relative">
            <div className="demo-shell premium-border relative overflow-hidden rounded-[30px] p-3">
              <div className="demo-window relative overflow-hidden rounded-[23px] border border-white/10 bg-[#11101a] p-5 sm:p-7" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set(e.clientX-r.left); my.set(e.clientY-r.top); }} onMouseLeave={() => { mx.set(260); my.set(250); }}>
                <div className="absolute inset-0 opacity-70 [background:radial-gradient(circle_at_50%_35%,rgba(99,102,241,.12),transparent_48%)]" />
                <CursorOrb x={x} y={y} color={activeDemo === 0 ? "border-red-400/50 shadow-[0_0_55px_rgba(248,113,113,.2)]" : "border-cyan-300/50 shadow-[0_0_55px_rgba(103,232,249,.2)]"} />
                <div className="relative z-10 flex items-center justify-between border-b border-white/[.07] pb-5">
                  <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Server size={19} /></div><div><p className="text-sm font-medium">GameHost Control</p><p className="mt-1 text-[11px] text-zinc-600">node-eu-01 · production</p></div></div>
                  <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[.06] px-3 py-1.5 text-[11px] text-emerald-300">● Online</span>
                </div>
                <div className="relative z-10 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[[Cpu,"CPU","18%"],[Gamepad2,"RAM","2.1 GB"],[HardDrive,"NVMe","34 GB"],[Globe2,"EU","12 ms"]].map(([Icon,label,value],i)=>{const I=Icon as typeof Cpu; return <motion.div key={label as string} animate={{ y: activeDemo===i%2 ? -3 : 0 }} transition={{ duration:.6 }} className="demo-stat rounded-2xl border border-white/[.07] bg-black/25 p-4"><I size={16} className="text-zinc-500"/><p className="mt-3 text-[10px] uppercase tracking-widest text-zinc-600">{label as string}</p><p className="mt-1 text-lg font-medium">{value as string}</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5"><motion.div animate={{ width: ["32%","68%","45%"] }} transition={{ duration: 3, repeat: Infinity, ease:"easeInOut" }} className="h-full rounded-full bg-white/60"/></div></motion.div>})}
                </div>
                <div className="relative z-10 mt-3 rounded-2xl border border-white/[.07] bg-[#09090e] p-4 font-mono text-[11px] leading-6 text-zinc-600 console-scan">
                  <div><span className="text-zinc-800">01</span> &gt; node-eu-01 connected</div><div><span className="text-zinc-800">02</span> &gt; resources allocated</div><div><span className="text-zinc-800">03</span> &gt; world loaded</div><div className="text-zinc-300"><span className="text-zinc-800">04</span> &gt; server ready<span className="blink-cursor">_</span></div>
                </div>
                <div className="relative z-10 mt-3 flex items-center gap-3"><div className="h-10 flex-1 rounded-xl border border-white/[.06] bg-black/20"/><motion.div whileHover={{ scale:1.03 }} className="flex h-10 w-28 items-center justify-center rounded-xl bg-white text-xs font-medium text-black">Manage</motion.div></div>
              </div>
            </div>
            <div className="mt-3 flex justify-center gap-2 text-[10px] uppercase tracking-[.22em] text-zinc-700"><span>move</span><span>·</span><span>hover</span><span>·</span><span>interact</span></div>
          </motion.div>
        </div>
      </section>

      <section className="relative z-10 border-y border-white/[.06] bg-black/20 py-7"><div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-4 px-6 text-xs font-medium uppercase tracking-[.2em] text-zinc-700 lg:px-8">{games.map(g=><span key={g} className="transition-colors hover:text-zinc-300">{g}</span>)}</div></section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }} viewport={{ once:true, margin:"-80px" }} transition={{ duration:.65 }} className="max-w-3xl"><p className="section-kicker">Всё в одном месте</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">GameHost берёт на себя сложную часть.</h2><p className="mt-5 text-base leading-8 text-zinc-500 sm:text-lg">От первого запуска до ежедневного управления сервером. Интерфейс скрывает техническую рутину и оставляет тебе понятные действия.</p></motion.div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map(({icon:Icon,title,text},i)=><motion.div key={title} initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-60px"}} transition={{duration:.55,delay:i*.06}} whileHover={{y:-7}} className="interactive-card glass rounded-2xl p-6"><div className="feature-icon flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[.03] text-zinc-300"><Icon size={20}/></div><h3 className="mt-5 text-base font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-500">{text}</p></motion.div>)}</div>
      </section>

      <section className="relative z-10 border-y border-white/[.06] bg-black/20 py-28"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="grid gap-14 lg:grid-cols-[.75fr_1.25fr]"><div><p className="section-kicker">Как это работает</p><h2 className="mt-4 text-4xl font-semibold tracking-tight">Четыре шага вместо десятков настроек.</h2><p className="mt-5 leading-7 text-zinc-500">Создание сервера должно быть похоже на обычный продукт: выбрал, настроил, запустил, управляешь.</p></div><div className="grid gap-3 sm:grid-cols-2">{steps.map(([num,title,text],i)=><motion.div key={num} initial={{opacity:0,x:15}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:.5,delay:i*.08}} whileHover={{x:4}} className="interactive-card rounded-2xl border border-white/[.07] bg-white/[.015] p-6"><span className="text-xs font-mono text-zinc-700">{num}</span><h3 className="mt-5 text-base font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-500">{text}</p></motion.div>)}</div></div></div></section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8"><div className="premium-border overflow-hidden rounded-[30px] p-[1px]"><div className="relative overflow-hidden rounded-[29px] bg-[#0d0c14] p-8 sm:p-12"><div className="absolute right-[-10%] top-[-50%] h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-[120px]"/><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="section-kicker">Готов к запуску</p><h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Выбирай игру. Остальное — в панели.</h2><p className="mt-5 max-w-2xl leading-8 text-zinc-500">Посмотри каталог игр и тарифы, создай аккаунт и собери первый сервер. Архитектура GameHost будет расти вместе с проектом.</p></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Link href="/games" className="btn-shine rounded-xl bg-white px-7 py-3.5 text-center text-sm font-semibold text-black">Каталог игр</Link><Link href="/pricing" className="rounded-xl border border-white/10 bg-white/[.03] px-7 py-3.5 text-center text-sm text-zinc-300 transition hover:border-white/20 hover:text-white">Тарифы</Link></div></div></div></div></section>

      <footer className="relative z-10 border-t border-white/[.06] py-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-zinc-600 sm:flex-row sm:justify-between lg:px-8"><span>© 2026 GameHost</span><span>Игровой хостинг · управление серверами</span></div></footer>
    </main>
  );
}
