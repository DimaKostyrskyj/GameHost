"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Check, ChevronRight, Cpu, Gamepad2, HardDrive, Server, ShieldCheck, Terminal, Zap, Globe2, Layers3, Rocket, Activity, Boxes, Database, LockKeyhole } from "lucide-react";
import { HomeNav } from "@/components/HomeNav";

const features = [
  { icon: Rocket, title: "Запуск за несколько минут", text: "Выбираешь игру и конфигурацию — GameHost берёт на себя развёртывание и базовую настройку." },
  { icon: Terminal, title: "Одна панель управления", text: "Консоль, файлы, настройки, логи, бэкапы и мониторинг собраны в одном месте." },
  { icon: ShieldCheck, title: "Изоляция и безопасность", text: "Серверы работают в изолированных окружениях, а доступ защищён современной авторизацией." },
  { icon: Globe2, title: "Европейские регионы", text: "Выбирай регион ближе к игрокам, чтобы уменьшить задержку и сделать игру комфортнее." },
  { icon: Layers3, title: "Масштабирование", text: "Архитектура рассчитана на несколько нод, разные игры и постепенное расширение платформы." },
  { icon: Zap, title: "Ресурсы под контролем", text: "RAM, CPU, NVMe и сетевые показатели отображаются прямо в личном кабинете." },
];

const steps = [
  ["01", "Создай аккаунт", "Одна регистрация — доступ ко всей платформе."],
  ["02", "Выбери игру", "Открой каталог и выбери нужный шаблон."],
  ["03", "Настрой сервер", "Подбери ресурсы, регион и параметры запуска."],
  ["04", "Запускай", "Управляй сервером из единой панели."],
];

const games = ["Valheim", "Minecraft", "Terraria", "Rust", "CS2", "Palworld"];

export default function Home() {
  return (
    <main className="home-page min-h-screen overflow-hidden text-white">
      <div className="home-bg pointer-events-none fixed inset-0 z-0">
        <div className="green-blob green-blob-one" />
        <div className="green-blob green-blob-two" />
        <div className="green-grid" />
      </div>

      <HomeNav />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-20 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-14 lg:grid-cols-[1.02fr_.98fr]">
          <div>
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="green-badge">
              <span className="green-dot" /> GameHost · игровой cloud hosting
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .08, duration: .65 }} className="mt-7 max-w-4xl text-5xl font-semibold leading-[.96] tracking-[-.065em] sm:text-7xl lg:text-[82px]">
              Игровые серверы.
              <br />
              <span className="green-gradient">Просто. Быстро. Надёжно.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .16, duration: .65 }} className="mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              GameHost — платформа, которая превращает сложную настройку игрового сервера в несколько понятных действий. Выбирай игру, ресурсы и регион, а затем управляй всем из одной панели.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .24, duration: .6 }} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="green-button group">Создать сервер <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
              <Link href="/games" className="dark-button group">Посмотреть игры <ChevronRight size={17} className="transition-transform group-hover:translate-x-1" /></Link>
            </motion.div>
            <div className="mt-8 flex flex-wrap gap-5 text-xs text-zinc-600">
              {['NVMe storage', 'Docker ready', 'PostgreSQL', '24/7 monitoring'].map((x) => <span key={x} className="flex items-center gap-2"><Check size={14} className="text-zinc-300/70" />{x}</span>)}
            </div>
          </div>

          <motion.div initial={{ opacity: 0, scale: .96, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: .15, duration: .8 }} className="relative">
            <div className="server-card-wrap">
              <div className="server-card">
                <div className="flex items-center justify-between border-b border-white/[.07] pb-5">
                  <div className="flex items-center gap-3"><div className="server-logo"><Server size={20} /></div><div><p className="text-sm font-medium">GameHost Control</p><p className="mt-1 text-[11px] text-zinc-600">node-eu-01 · production</p></div></div>
                  <span className="online-pill"><span className="green-dot" /> Online</span>
                </div>
                <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {[[Cpu,"CPU","18%"],[Gamepad2,"RAM","2.1 GB"],[HardDrive,"NVMe","34 GB"],[Globe2,"PING","12 ms"]].map(([Icon,label,value]) => { const I = Icon as typeof Cpu; return <motion.div key={label as string} whileHover={{ y: -5, scale: 1.02 }} className="metric-card"><I size={16} className="text-zinc-300/70"/><p className="mt-4 text-[10px] uppercase tracking-[.2em] text-zinc-600">{label as string}</p><p className="mt-1 text-lg font-medium">{value as string}</p><div className="mt-3 h-1 overflow-hidden rounded-full bg-white/5"><motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ duration: 1.2, delay: .5 }} className="h-full rounded-full bg-zinc-300/70"/></div></motion.div> })}
                </div>
                <div className="mt-3 rounded-2xl border border-white/[.07] bg-[#070a08] p-4 font-mono text-[11px] leading-6 text-zinc-600">
                  <p><span className="text-zinc-300">[online]</span> server started successfully</p>
                  <p><span className="text-zinc-700">[node]</span> resources allocated: 4 vCPU / 8 GB</p>
                  <p><span className="text-zinc-700">[game]</span> Valheim world loaded in 2.4s</p>
                  <p><span className="text-zinc-300">[ready]</span> accepting connections<span className="blink-cursor">_</span></p>
                </div>
                <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.03] p-4">
                  <div><p className="text-xs text-zinc-500">Состояние инфраструктуры</p><p className="mt-1 text-sm font-medium text-zinc-300">Все системы работают</p></div><Activity size={20} className="text-zinc-300" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="features" className="relative z-10 border-y border-white/[.08] bg-[#050805]/80 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl"><p className="section-kicker green-kicker">Почему GameHost</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Всё необходимое для игрового сервера — в одном месте.</h2><p className="mt-5 text-base leading-8 text-zinc-500 sm:text-lg">Мы убираем рутину между «хочу сервер» и «мы уже играем».</p></div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.map(({ icon: Icon, title, text }, i) => <motion.div key={title} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: .5, delay: i * .05 }} whileHover={{ y: -7 }} className="green-card"><div className="feature-icon-green"><Icon size={20}/></div><h3 className="mt-5 text-base font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-500">{text}</p></motion.div>)}</div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr] lg:items-start"><div><p className="section-kicker green-kicker">Как работает</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Четыре шага.<br/>Никакой магии.</h2><p className="mt-5 max-w-md leading-8 text-zinc-500">GameHost автоматизирует техническую часть, чтобы ты мог сосредоточиться на самой игре.</p></div><div className="grid gap-3 sm:grid-cols-2">{steps.map(([num,title,text], i) => <motion.div key={num} initial={{ opacity: 0, x: 15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * .07 }} whileHover={{ x: 5 }} className="step-card"><span className="step-number">{num}</span><h3 className="mt-6 text-base font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-500">{text}</p></motion.div>)}</div></div>
      </section>

      <section className="relative z-10 border-y border-white/[.06] bg-black/20 py-24"><div className="mx-auto max-w-7xl px-6 lg:px-8"><div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between"><div><p className="section-kicker green-kicker">Игры</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em]">Выбери свою игру.</h2></div><Link href="/games" className="group inline-flex items-center gap-2 text-sm text-zinc-300">Весь каталог <ArrowRight size={16} className="transition-transform group-hover:translate-x-1"/></Link></div><div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3">{games.map((game,i) => <Link href="/games" key={game} className="game-mini-card"><span className="game-index">0{i+1}</span><Gamepad2 size={18} className="text-zinc-300/70"/><span className="mt-5 block font-medium">{game}</span><span className="mt-1 block text-xs text-zinc-600">Сервер готов к запуску</span></Link>)}</div></div></section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8"><div className="cta-green"><div className="relative z-10 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center"><div><p className="section-kicker green-kicker">Начни сейчас</p><h2 className="mt-4 text-4xl font-semibold tracking-[-.04em] sm:text-5xl">Твой сервер. Твои правила.</h2><p className="mt-5 max-w-2xl leading-8 text-zinc-500">Создай аккаунт, выбери игру и собери сервер под свою команду.</p></div><div className="flex flex-col gap-3 sm:flex-row"><Link href="/register" className="green-button">Создать аккаунт <ArrowRight size={16}/></Link><Link href="/pricing" className="dark-button">Посмотреть тарифы</Link></div></div></div></section>

      <footer className="relative z-10 border-t border-white/[.06] py-8"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-zinc-600 sm:flex-row sm:justify-between lg:px-8"><span>© 2026 GameHost</span><span>Игровой cloud hosting · управление серверами</span></div></footer>
    </main>
  );
}
