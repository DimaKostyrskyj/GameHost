import Link from "next/link";
import { ArrowRight, Check, Gamepad2, Globe2, ShieldCheck, Zap } from "lucide-react";

const games = ["Valheim", "Minecraft", "Terraria", "Rust", "CS2", "Palworld"];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050507] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-260px] h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="absolute right-[-220px] top-[35%] h-[520px] w-[520px] rounded-full bg-purple-600/10 blur-[160px]" />
        <div className="grid-bg absolute inset-0 opacity-70" />
      </div>

      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black"><Gamepad2 size={21} /></div>
          <span className="text-xl font-semibold">GameHost</span>
        </Link>
        <div className="hidden items-center gap-8 text-sm text-zinc-400 md:flex">
          <a href="#features" className="hover:text-white">Возможности</a>
          <a href="#games" className="hover:text-white">Игры</a>
          <a href="#pricing" className="hover:text-white">Тарифы</a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="rounded-xl px-4 py-2.5 text-sm text-zinc-300 hover:bg-zinc-900 hover:text-white">Войти</Link>
          <Link href="/register" className="rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-black hover:bg-zinc-200">Регистрация</Link>
        </div>
      </nav>

      <section className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-24 text-center lg:pt-32">
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-950/70 px-4 py-2 text-xs text-zinc-400">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Игровой хостинг нового поколения
        </div>
        <h1 className="text-5xl font-semibold leading-[1.05] tracking-[-0.04em] sm:text-7xl">
          Твой сервер.
          <br />
          <span className="text-zinc-500">Твой мир.</span>
        </h1>
        <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-zinc-400 sm:text-lg">
          Создавай и управляй игровыми серверами из одной панели. Быстрый запуск,
          удобное управление и инфраструктура, которая растёт вместе с твоим проектом.
        </p>
        <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/register" className="group inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 text-sm font-medium text-black hover:bg-zinc-200">
            Создать аккаунт <ArrowRight size={17} />
          </Link>
          <a href="#features" className="inline-flex h-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950/60 px-6 text-sm text-zinc-300 hover:border-zinc-700 hover:text-white">
            Возможности
          </a>
        </div>
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-1 gap-3 text-left sm:grid-cols-3">
          {[
            ["Быстрый запуск", "Готовый сервер без сложной настройки.", Zap],
            ["Разные локации", "Выбирай ближайшую локацию для игроков.", Globe2],
            ["Безопасность", "Изолированные ресурсы и контролируемый доступ.", ShieldCheck]
          ].map(([title, text, Icon]) => {
            const I = Icon as typeof Zap;
            return <div key={title as string} className="glass rounded-2xl p-5 shadow-glow">
              <I size={20} className="text-zinc-300" />
              <h3 className="mt-4 text-sm font-medium">{title as string}</h3>
              <p className="mt-1.5 text-sm leading-6 text-zinc-500">{text as string}</p>
            </div>;
          })}
        </div>
      </section>

      <section id="games" className="relative z-10 border-y border-zinc-900 bg-zinc-950/40 py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-xs uppercase tracking-[.2em] text-zinc-600">Поддерживаемые игры</p>
          <h2 className="mt-3 text-3xl font-semibold">Играй во что хочешь</h2>
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {games.map(game => <div key={game} className="rounded-2xl border border-zinc-800 bg-zinc-950 p-5 text-center text-sm text-zinc-300 hover:border-zinc-700 hover:text-white">{game}</div>)}
          </div>
        </div>
      </section>

      <section id="features" className="relative z-10 mx-auto max-w-6xl px-6 py-24 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs uppercase tracking-[.2em] text-zinc-600">Панель управления</p>
            <h2 className="mt-3 text-4xl font-semibold">Всё в одном месте.</h2>
            <p className="mt-5 max-w-xl leading-7 text-zinc-500">Консоль, файлы, резервные копии, мониторинг и управление сервером — в одной панели.</p>
            <div className="mt-8 space-y-4">
              {["Живая консоль", "Файловый менеджер", "Автоматические бэкапы", "Мониторинг CPU и RAM", "Планировщик задач"].map(item =>
                <div key={item} className="flex items-center gap-3 text-sm text-zinc-300"><span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-900"><Check size={14} /></span>{item}</div>
              )}
            </div>
          </div>
          <div className="glass rounded-3xl p-4 shadow-glow">
            <div className="rounded-2xl border border-zinc-800 bg-[#07070a] p-5">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <div><p className="text-sm font-medium">Мой Valheim сервер</p><p className="mt-1 text-xs text-zinc-600">45.83.120.10:2456</p></div>
                <span className="rounded-full border border-emerald-900/50 bg-emerald-950/30 px-2.5 py-1 text-xs text-emerald-400">● Онлайн</span>
              </div>
              <div className="grid grid-cols-3 gap-3 py-5">
                {[["CPU","18%"],["RAM","2.1 GB"],["Игроки","4"]].map(([a,b]) => <div key={a} className="rounded-xl border border-zinc-900 bg-zinc-950 p-4"><p className="text-xs text-zinc-600">{a}</p><p className="mt-2 text-lg font-medium">{b}</p></div>)}
              </div>
              <div className="rounded-xl border border-zinc-900 bg-black p-4 font-mono text-xs leading-6 text-zinc-500">
                <div>&gt; Загрузка мира...</div><div>&gt; Мир загружен</div><div className="text-zinc-300">&gt; Сервер готов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="relative z-10 border-t border-zinc-900 py-24">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="text-center"><p className="text-xs uppercase tracking-[.2em] text-zinc-600">Тарифы</p><h2 className="mt-3 text-4xl font-semibold">Простые планы</h2></div>
          <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-3">
            {[["Starter","€3.99","2 GB RAM","1 CPU","20 GB NVMe"],["Standard","€7.99","4 GB RAM","2 CPU","50 GB NVMe"],["Premium","€14.99","8 GB RAM","4 CPU","100 GB NVMe"]].map(([name,price,ram,cpu,disk],i) =>
              <div key={name} className={`rounded-2xl border p-6 ${i===1 ? "border-zinc-600 bg-zinc-900/60" : "border-zinc-800 bg-zinc-950/70"}`}>
                <p className="text-sm font-medium">{name}</p><p className="mt-5 text-3xl font-semibold">{price}<span className="text-sm font-normal text-zinc-600">/мес.</span></p>
                <div className="mt-6 space-y-3 text-sm text-zinc-400">{[ram,cpu,disk].map(x=><div key={x} className="flex gap-2"><Check size={16}/>{x}</div>)}</div>
                <Link href="/register" className="mt-7 block rounded-xl bg-white py-3 text-center text-sm font-medium text-black hover:bg-zinc-200">Выбрать</Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-zinc-900 py-8">
        <div className="mx-auto flex max-w-7xl justify-between px-6 text-xs text-zinc-600 lg:px-8"><span>© 2026 GameHost</span><span>Игровой хостинг</span></div>
      </footer>
    </main>
  );
}
