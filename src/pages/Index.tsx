import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const PANEL_URL = "http://64.188.64.134/";
const TELEGRAM_URL = "https://t.me/TreexHost_manager_bot?text=Привет!%20Хочу%20получить%20аккаунт%20в%20панели%20Treex%20Hosting";

const heroFeatures: { icon: string; text: string }[] = [
  { icon: "Cpu", text: "Высокопроизводительные AMD Ryzen 9 и Intel i9" },
  { icon: "Shield", text: "Продвинутая защита от DDoS атак" },
  { icon: "Users", text: "Управление игроками прямо из панели" },
  { icon: "Zap", text: "Установка любых ядер в два клика" },
];

const whyUs: { icon: string; title: string; text: string }[] = [
  { icon: "Cpu", title: "Производительность", text: "Мы очень серьезно относимся к производительности серверов. Постоянно добавляем новые узлы на AMD Ryzen 9 7950X/9950X и Intel Core i9-13900K со сверхбыстрой DDR5 памятью." },
  { icon: "Shield", title: "DDoS Защита", text: "Особое внимание уделено DDoS защите. Используем инновационные решения и передовые технологии для надёжной защиты от атак любого объёма." },
  { icon: "Handshake", title: "Сотрудничество", text: "Мы открыты для людей, которые хотят сотрудничать с нами! Готовы индивидуально обсудить условия партнёрства. У каждого есть шанс проявить себя." },
  { icon: "MapPin", title: "Удобное расположение", text: "Наши серверы расположены в надёжных дата-центрах России и Германии. Стабильное соединение с минимальными задержками для игроков из Европы и СНГ." },
  { icon: "Clock", title: "Круглосуточная поддержка", text: "Команда поддержки доступна 24/7 и готова оперативно решить любые вопросы. Ценим каждого клиента и стремимся дать максимально быстрый ответ." },
  { icon: "CircleDollarSign", title: "Лучшее соотношение цены", text: "Предлагаем оптимальное соотношение цены и качества на рынке. Все необходимые характеристики для стабильной работы игровых проектов любого масштаба." },
];

const plans = [
  {
    name: "GAMING-ZERO",
    price: "72",
    specs: [
      { icon: "Cpu", label: "Процессор", val: "50% AMD Ryzen 9 7950X3D" },
      { icon: "MemoryStick", label: "Оперативная память", val: "1.5 GB DDR4" },
      { icon: "HardDrive", label: "Хранилище", val: "8 GB NVMe SSD" },
      { icon: "Network", label: "Сеть", val: "1 портов" },
      { icon: "RefreshCw", label: "Резервные копии", val: "0 бекапов" },
      { icon: "Database", label: "Базы данных", val: "1 баз данных" },
    ],
  },
  {
    name: "GAMING-1",
    price: "141",
    specs: [
      { icon: "Cpu", label: "Процессор", val: "100% AMD Ryzen 9 7950X3D" },
      { icon: "MemoryStick", label: "Оперативная память", val: "3 GB DDR4" },
      { icon: "HardDrive", label: "Хранилище", val: "15 GB NVMe SSD" },
      { icon: "Network", label: "Сеть", val: "2 портов" },
      { icon: "RefreshCw", label: "Резервные копии", val: "1 бекапов" },
      { icon: "Database", label: "Базы данных", val: "1 баз данных" },
    ],
  },
  {
    name: "GAMING-2",
    price: "263",
    specs: [
      { icon: "Cpu", label: "Процессор", val: "175% AMD Ryzen 9 7950X3D" },
      { icon: "MemoryStick", label: "Оперативная память", val: "6 GB DDR4" },
      { icon: "HardDrive", label: "Хранилище", val: "25 GB NVMe SSD" },
      { icon: "Network", label: "Сеть", val: "3 портов" },
      { icon: "RefreshCw", label: "Резервные копии", val: "1 бекапов" },
      { icon: "Database", label: "Базы данных", val: "2 баз данных" },
    ],
  },
  {
    name: "GAMING-3",
    price: "389",
    specs: [
      { icon: "Cpu", label: "Процессор", val: "250% AMD Ryzen 9 7950X3D" },
      { icon: "MemoryStick", label: "Оперативная память", val: "9 GB DDR4" },
      { icon: "HardDrive", label: "Хранилище", val: "40 GB NVMe SSD" },
      { icon: "Network", label: "Сеть", val: "4 портов" },
      { icon: "RefreshCw", label: "Резервные копии", val: "1 бекапов" },
      { icon: "Database", label: "Базы данных", val: "3 баз данных" },
    ],
  },
  {
    name: "GAMING-4",
    price: "520",
    specs: [
      { icon: "Cpu", label: "Процессор", val: "300% AMD Ryzen 9 7950X3D" },
      { icon: "MemoryStick", label: "Оперативная память", val: "12 GB DDR4" },
      { icon: "HardDrive", label: "Хранилище", val: "60 GB NVMe SSD" },
      { icon: "Network", label: "Сеть", val: "6 портов" },
      { icon: "RefreshCw", label: "Резервные копии", val: "1 бекапов" },
      { icon: "Database", label: "Базы данных", val: "4 баз данных" },
    ],
  },
  {
    name: "GAMING-5",
    price: "750",
    specs: [
      { icon: "Cpu", label: "Процессор", val: "400% AMD Ryzen 9 7950X3D" },
      { icon: "MemoryStick", label: "Оперативная память", val: "16 GB DDR4" },
      { icon: "HardDrive", label: "Хранилище", val: "80 GB NVMe SSD" },
      { icon: "Network", label: "Сеть", val: "8 портов" },
      { icon: "RefreshCw", label: "Резервные копии", val: "2 бекапов" },
      { icon: "Database", label: "Базы данных", val: "5 баз данных" },
    ],
  },
];

// Генерируем кружочки один раз
const BUBBLES = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.floor(Math.random() * 60 + 20),
  left: Math.random() * 95,
  duration: Math.random() * 14 + 10,
  delay: Math.random() * 10,
  opacity: Math.random() * 0.18 + 0.06,
  color: i % 3 === 0 ? "rgba(139,92,246," : i % 3 === 1 ? "rgba(99,55,210," : "rgba(180,130,255,",
}));

function Bubbles() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {BUBBLES.map((b) => (
        <div
          key={b.id}
          className="absolute rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left + "%",
            bottom: "-80px",
            background: `radial-gradient(circle at 35% 35%, ${b.color}0.4), transparent 70%), ${b.color}${b.opacity})`,
            border: `1px solid ${b.color}0.35)`,
            animation: `bubble-rise ${b.duration}s ${b.delay}s linear infinite`,
          }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ telegram: "", email: "", comment: "" });
  const [bubblesOn, setBubblesOn] = useState(true);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = () => {
    window.open(TELEGRAM_URL, "_blank");
  };

  return (
    <div className="min-h-screen font-['Montserrat'] relative" style={{ background: "#0d0a1a" }}>

      {/* ЛЕТАЮЩИЕ КРУЖОЧКИ */}
      {bubblesOn && <Bubbles />}

      {/* NAVBAR */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(13,10,26,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,92,246,0.15)" }}
      >
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded flex items-center justify-center" style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)" }}>
            <Icon name="Server" size={16} className="text-white" />
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-tight">TREEX HOSTING</div>
            <div className="text-xs" style={{ color: "#8b5cf6" }}>Надёжный игровой хостинг</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            <Icon name="Home" size={14} /> Главная
          </button>
          <button onClick={() => scrollTo("features")} className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            <Icon name="Info" size={14} /> Информация
          </button>
          <button onClick={() => scrollTo("contacts")} className="flex items-center gap-1.5 text-sm text-gray-300 hover:text-white transition-colors">
            <Icon name="Mail" size={14} /> Контакты
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-white rounded transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(139,92,246,0.5)" }}
          >
            Регистрация
          </button>
          <a
            href={PANEL_URL}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded transition-all hover:bg-white/10"
            style={{ border: "1px solid rgba(139,92,246,0.5)" }}
          >
            <Icon name="LayoutDashboard" size={14} /> Панель
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden pt-20"
        style={{ background: "linear-gradient(160deg,#06030f 0%,#0d0820 40%,#130a2a 70%,#1a0a30 100%)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-1/2 h-full" style={{ background: "radial-gradient(ellipse at 75% 50%, rgba(124,58,237,0.18) 0%, transparent 65%)" }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-8">
          <div className="max-w-xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-2">
              Защищённый хостинг<br />
              Майнкрафт серверов
            </h1>
            <h2 className="text-5xl md:text-6xl font-bold mb-2" style={{ color: "#8b5cf6" }}>
              С низкими ценами
            </h2>
            <div className="w-10 h-0.5 mb-10" style={{ background: "#8b5cf6" }} />

            <div className="grid grid-cols-4 gap-6 mb-12">
              {heroFeatures.map((item, i) => (
                <div key={i} className="flex flex-col items-center gap-2 text-center">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(124,58,237,0.3)", border: "1px solid rgba(139,92,246,0.5)" }}
                  >
                    <Icon name={item.icon} size={20} style={{ color: "#a78bfa" }} />
                  </div>
                  <span className="text-xs text-gray-400 leading-tight">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={PANEL_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded transition-all hover:opacity-90 active:scale-95"
                style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)" }}
              >
                <Icon name="ArrowRight" size={16} /> Создать сервер
              </a>
              <button
                onClick={() => scrollTo("pricing")}
                className="flex items-center gap-2 px-6 py-3 text-white font-semibold rounded transition-all hover:bg-white/10"
                style={{ border: "1px solid rgba(255,255,255,0.4)" }}
              >
                <Icon name="List" size={16} /> Посмотреть тарифы
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section id="features" className="relative z-10 py-20 px-8" style={{ background: "#100d20" }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white">Почему стоит выбрать нас?</h2>
            <div className="w-10 h-0.5 mx-auto mt-3" style={{ background: "#8b5cf6" }} />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {whyUs.map((item, i) => (
              <div key={i} className="flex gap-4 p-5 rounded-xl" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.2)" }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: "rgba(124,58,237,0.25)" }}>
                  <Icon name={item.icon} size={18} style={{ color: "#a78bfa" }} />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 py-20 px-8" style={{ background: "#0d0a1a" }}>
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white">Тарифы (Германия DE)</h2>
            <div className="w-10 h-0.5 mt-3" style={{ background: "#8b5cf6" }} />
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className="rounded-xl p-6 flex flex-col" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(139,92,246,0.25)" }}>
                <div className="flex items-center gap-2 mb-4">
                  <Icon name="Server" size={14} style={{ color: "#a78bfa" }} />
                  <span className="text-sm font-semibold" style={{ color: "#a78bfa" }}>{plan.name}</span>
                </div>
                <div className="mb-5">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400">₽ / мес.</span>
                </div>
                <div className="flex flex-col gap-3 flex-1 mb-6">
                  {plan.specs.map((row, j) => (
                    <div key={j} className="flex items-start gap-2">
                      <Icon name={row.icon} size={14} className="mt-0.5 flex-shrink-0" style={{ color: "#8b5cf6" }} />
                      <div>
                        <div className="text-xs text-gray-400">{row.label}</div>
                        <div className="text-sm text-gray-200">{row.val}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <a
                  href={PANEL_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 py-2.5 text-sm font-medium text-white rounded transition-all hover:bg-white/10"
                  style={{ border: "1px solid rgba(139,92,246,0.5)" }}
                >
                  <Icon name="ShoppingCart" size={14} /> Перейти к покупке
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="relative z-10 py-20 px-8" style={{ background: "#100d20", borderTop: "1px solid rgba(139,92,246,0.15)" }}>
        <div className="max-w-5xl mx-auto">
          <div className="mb-10">
            <h2 className="text-3xl font-bold text-white">Контакты</h2>
            <div className="w-10 h-0.5 mt-3" style={{ background: "#8b5cf6" }} />
          </div>
          <a
            href="https://t.me/TreexHost_manager_bot"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-5 py-4 rounded-xl transition-all hover:opacity-80"
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.25)", minWidth: 280 }}
          >
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "linear-gradient(135deg,#2196f3,#1976d2)" }}>
              <Icon name="Send" size={18} className="text-white" />
            </div>
            <div>
              <div className="text-sm text-gray-400">Telegram</div>
              <div className="text-white font-medium">t.me/TreexHost_manager_bot</div>
            </div>
            <Icon name="ArrowRight" size={16} className="ml-auto text-gray-500" />
          </a>
        </div>
      </section>

      {/* КНОПКА ОТКЛЮЧЕНИЯ КРУЖОЧКОВ */}
      <div className="relative z-10 py-10 px-8 flex justify-center" style={{ background: "#100d20" }}>
        <button
          onClick={() => setBubblesOn(v => !v)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-80"
          style={{
            background: bubblesOn ? "rgba(139,92,246,0.15)" : "rgba(255,255,255,0.05)",
            border: `1px solid ${bubblesOn ? "rgba(139,92,246,0.5)" : "rgba(255,255,255,0.2)"}`,
            color: bubblesOn ? "#a78bfa" : "#6b7280",
          }}
        >
          <Icon name={bubblesOn ? "CircleOff" : "Circle"} size={16} />
          {bubblesOn ? "Отключить анимацию кружочков" : "Включить анимацию кружочков"}
        </button>
      </div>

      {/* REGISTRATION MODAL */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(4px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}
        >
          <div className="relative w-full max-w-md rounded-2xl p-8 overflow-y-auto max-h-[90vh]" style={{ background: "#0f0c1e", border: "1px solid rgba(139,92,246,0.35)" }}>
            <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <Icon name="X" size={20} />
            </button>

            <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-5" style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)" }}>
              <Icon name="LayoutGrid" size={24} className="text-white" />
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">Доступ к панели</h2>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">
              Для входа в панель управления необходимо создать аккаунт.
              Напишите разработчику{" "}
              <a href="https://t.me/TreexHost_manager_bot" target="_blank" rel="noreferrer" className="font-semibold" style={{ color: "#8b5cf6" }}>
                @TreexHost_manager_bot
              </a>{" "}
              в Telegram — он создает ваш аккаунт.
            </p>

            <a
              href="https://t.me/TreexHost_manager_bot"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white mb-6 transition-all hover:opacity-90"
              style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)", border: "1px solid rgba(139,92,246,0.5)" }}
            >
              <Icon name="Send" size={16} /> Написать @TreexHost_manager_bot в Telegram
            </a>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ background: "rgba(139,92,246,0.3)" }} />
              <span className="text-xs tracking-widest text-gray-500">ИЛИ ЗАПОЛНИТЕ ФОРМУ</span>
              <div className="flex-1 h-px" style={{ background: "rgba(139,92,246,0.3)" }} />
            </div>

            <div className="flex flex-col gap-4 mb-6">
              <div>
                <label className="text-xs font-semibold tracking-wider text-gray-400 mb-1.5 block">TELEGRAM *</label>
                <input
                  type="text"
                  placeholder="@username"
                  value={form.telegram}
                  onChange={e => setForm({ ...form, telegram: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)" }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider text-gray-400 mb-1.5 block">EMAIL *</label>
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)" }}
                />
              </div>
              <div>
                <label className="text-xs font-semibold tracking-wider text-gray-400 mb-1.5 block">КОММЕНТАРИЙ</label>
                <textarea
                  placeholder="Какой тариф вас интересует, ваши пожелания..."
                  value={form.comment}
                  onChange={e => setForm({ ...form, comment: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none resize-none"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(139,92,246,0.3)" }}
                />
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90 active:scale-95"
              style={{ background: "linear-gradient(135deg,#7c3aed,#9333ea)" }}
            >
              <Icon name="Send" size={16} /> Отправить заявку
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
