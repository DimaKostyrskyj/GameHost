import Link from "next/link";
import { HomeNav } from "@/components/HomeNav";
import { ArrowRight, Check, ChevronRight, Cloud, Cpu, Database, Gamepad2, Globe2, HardDrive, LockKeyhole, MonitorCog, Rocket, Server, ShieldCheck, Sparkles, TerminalSquare, Zap } from "lucide-react";

const highlights = [
  { icon: Rocket, title: "Запуск за минуты", text: "Выбираешь игру, тариф и локацию — дальше GameHost подготавливает сервер и показывает его в личном кабинете." },
  { icon: MonitorCog, title: "Управление из одной панели", text: "Консоль, файлы, бэкапы, мониторинг, настройки и управление сервером находятся в одном интерфейсе." },
  { icon: ShieldCheck, title: "Изоляция и безопасность", text: "Игровые серверы работают отдельно друг от друга, а доступ к управлению защищён аккаунтом." },
  { icon: Globe2, title: "Локации для игроков", text: "Выбирай подходящий регион, чтобы уменьшить задержку и получить стабильное подключение." },
  { icon: Zap, title: "Ресурсы без лишнего", text: "CPU, RAM и NVMe-диск выделяются под выбранный тариф, чтобы ты понимал, за что платишь." },
  { icon: TerminalSquare, title: "Полный контроль", text: "Когда проект вырастет, можно будет перейти от простого запуска к продвинутому управлению сервером." },
];

const steps = [
  ["01", "Создай аккаунт", "Регистрация занимает несколько секунд. После входа ты сразу попадаешь в личный кабинет."],
  ["02", "Выбери игру", "Открой каталог игр, выбери нужную игру и подходящую конфигурацию сервера."],
  ["03", "Запусти сервер", "GameHost создаёт окружение, назначает ресурсы и готовит сервер к подключению игроков."],
  ["04", "Управляй проектом", "Следи за ресурсами, открывай консоль, работай с файлами и меняй настройки без лишних действий."],
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="hero-orb absolute left-[38%] top-[-280px] h-[680px] w-[680px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="hero-orb-reverse absolute right-[-240px] top-[35%] h-[560px] w-[560px] rounded-full bg-purple-600/10 blur-[170px]" />
        <div className="hero-orb absolute bottom-[-280px] left-[-180px] h-[520px] w-[520px] rounded-full bg-blue-600/5 blur-[160px]" />
        <div className="grid-bg absolute inset-0 opacity-70" />
      </div>

      <HomeNav />

      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-28 pt-20 lg:px-8 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[1.08fr_.92fr]">
          <div>
            <div className="animate-fade-up mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/75 px-4 py-2 text-xs text-zinc-400 backdrop-blur-xl">
              <span className="status-online h-1.5 w-1.5 rounded-full bg-emerald-400" />
              GameHost · игровой хостинг нового поколения
            </div>
            <h1 className="animate-fade-up stagger-1 text-5xl font-semibold leading-[1.02] tracking-[-0.055em] sm:text-7xl lg:text-[82px]">
              Игровые серверы
              <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-600 bg-clip-text text-transparent">без лишней сложности.</span>
            </h1>
            <p className="animate-fade-up stagger-2 mt-7 max-w-2xl text-base leading-8 text-zinc-400 sm:text-lg">
              GameHost — платформа, которая объединяет создание, запуск и управление игровыми серверами в одном личном кабинете. Выбери игру, ресурсы и локацию, а дальше управляй своим сервером так же просто, как обычным приложением.
            </p>
            <div className="animate-fade-up stagger-3 mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/register" className="btn-shine inline-flex h-13 items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:-translate-y-1 hover:bg-zinc-200">
                Создать сервер <ArrowRight size={17} />
              </Link>
              <Link href="/games" className="inline-flex h-13 items-center justify-center gap-2 rounded-xl border border-zinc-800 bg-zinc-950/70 px-7 py-3.5 text-sm text-zinc-300 transition hover:-translate-y-1 hover:border-zinc-700 hover:text-white">
                Каталог игр <ChevronRight size={16} />
              </Link>
            </div>
            <div className="animate-fade-up stagger-4 mt-10 flex flex-wrap gap-x-7 gap-y-3 text-xs text-zinc-600">
              <span className="flex items-center gap-2"><Check size={14} /> PostgreSQL + защищённая авторизация</span>
              <span className="flex items-center gap-2"><Check size={14} /> NVMe-хранилище</span>
              <span className="flex items-center gap-2"><Check size={14} /> Панель управления 24/7</span>
            </div>
          </div>

          <div className="animate-scale-in premium-border glass relative rounded-[28px] p-3 shadow-[0_30px_100px_rgba(0,0,0,.45)]">
            <div className="rounded-[22px] border border-zinc-900 bg-[#07070a] p-5 sm:p-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Server size={19} /></div>
                  <div><p className="text-sm font-medium">GameHost Control</p><p className="mt-1 text-xs text-zinc-600">Панель управления сервером</p></div>
                </div>
                <span className="rounded-full border border-emerald-900/50 bg-emerald-950/30 px-2.5 py-1 text-[11px] text-emerald-400">● Online</span>
              </div>
              <div className="grid grid-cols-2 gap-3 py-5 sm:grid-cols-4">
                {[[Cpu, "CPU", "18%"], [Cloud, "RAM", "2.1 GB"], [HardDrive, "NVMe", "34 GB"], [Gamepad2, "Игроки", "4"]].map(([Icon, label, value]) => {
                  const I = Icon as typeof Cpu;
                  return <div key={label as string} className="hover-lift rounded-xl border border-zinc-900 bg-zinc-950/80 p-4"><I size={16} className="text-zinc-500" /><p className="mt-3 text-[11px] text-zinc-600">{label as string}</p><p className="mt-1 text-lg font-medium">{value as string}</p></div>;
                })}
              </div>
              <div className="rounded-xl border border-zinc-900 bg-black p-4 font-mono text-xs leading-7 text-zinc-600">
                <div>&gt; Подключение к node-eu-01...</div>
                <div>&gt; Ресурсы выделены</div>
                <div>&gt; Загрузка игрового мира...</div>
                <div className="text-zinc-300">&gt; Сервер готов к подключению игроков_</div>
              </div>
              <div className="mt-3 flex gap-3">
                <div className="h-10 flex-1 rounded-xl border border-zinc-900 bg-zinc-950" />
                <div className="h-10 w-28 rounded-xl bg-white" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-y border-zinc-900 bg-zinc-950/35 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-12 gap-y-4 px-6 text-xs uppercase tracking-[.16em] text-zinc-700 lg:px-8">
          <span>VALHEIM</span><span>MINECRAFT</span><span>TERRARIA</span><span>RUST</span><span>CS2</span><span>PALWORLD</span>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-[.22em] text-indigo-300/70">Что такое GameHost</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Одна платформа для всего, что связано с игровым сервером.</h2>
          <p className="mt-5 text-base leading-8 text-zinc-500 sm:text-lg">Мы строим GameHost как единый центр управления: от первого создания сервера до ежедневной работы с ним. Тебе не нужно разбираться в Docker, VPS и сложной инфраструктуре, чтобы начать играть с друзьями.</p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map(({ icon: Icon, title, text }, i) => (
            <div key={title} className={`glass hover-lift animate-fade-up rounded-2xl p-6 ${i < 3 ? `stagger-${i + 1}` : "stagger-4"}`}>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-zinc-300"><Icon size={20} /></div>
              <h3 className="mt-5 text-base font-medium">{title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-500">{text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 border-y border-zinc-900 bg-zinc-950/35 py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <p className="text-xs uppercase tracking-[.22em] text-indigo-300/70">Как это работает</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">От идеи до работающего сервера — четыре шага.</h2>
              <p className="mt-5 leading-7 text-zinc-500">Платформа постепенно будет автоматизировать всё больше процессов, чтобы тебе оставалось заниматься самой игрой и своим проектом.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {steps.map(([number, title, text]) => <div key={number} className="hover-lift rounded-2xl border border-zinc-900 bg-black/30 p-6"><span className="text-xs font-mono text-zinc-700">{number}</span><h3 className="mt-5 text-base font-medium">{title}</h3><p className="mt-2 text-sm leading-7 text-zinc-500">{text}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-8">
        <div className="glass premium-border overflow-hidden rounded-[30px] p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="text-xs uppercase tracking-[.22em] text-indigo-300/70">Инфраструктура</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight">Технологии работают в фоне. Ты видишь только результат.</h2>
              <p className="mt-5 max-w-2xl leading-8 text-zinc-500">GameHost строится вокруг современной серверной архитектуры: контейнеризация, PostgreSQL, безопасные сессии, мониторинг и подготовка к масштабированию на несколько игровых нод.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-2">
              {["Docker", "PostgreSQL", "Node.js", "Next.js"].map(x => <div key={x} className="rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-4 text-center text-xs text-zinc-400">{x}</div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 border-t border-zinc-900 py-28">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <Sparkles className="mx-auto text-zinc-500" size={24} />
          <h2 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl">Выбирай игру. Мы займёмся инфраструктурой.</h2>
          <p className="mx-auto mt-5 max-w-2xl leading-7 text-zinc-500">Посмотри каталог поддерживаемых игр и тарифы, а затем создай аккаунт и начни собирать свой игровой сервер.</p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/games" className="btn-shine rounded-xl bg-white px-7 py-3.5 text-sm font-medium text-black transition hover:-translate-y-1">Смотреть игры</Link>
            <Link href="/pricing" className="rounded-xl border border-zinc-800 bg-zinc-950 px-7 py-3.5 text-sm text-zinc-300 transition hover:-translate-y-1 hover:border-zinc-700 hover:text-white">Посмотреть тарифы</Link>
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-900 py-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 text-xs text-zinc-600 sm:flex-row sm:justify-between lg:px-8"><span>© 2026 GameHost</span><span>Игровой хостинг · Управление серверами</span></div>
      </footer>
    </main>
  );
}
