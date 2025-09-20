import { useState } from "react";
import { Link } from "react-router-dom";

const items = [
  { id: "home", label: "خانه", path: "/", icon: HomeIcon },
  { id: "stats", label: "آمار", path: "/stats", icon: ChartIcon },
  { id: "timer", label: "زمان", path: "/timer", icon: ClockIcon },
  { id: "notif", label: "اعلان", path: "/notif", icon: BellIcon },
];

export default function Footer() {
  const [active, setActive] = useState(0);

  // موقعیت به صورت درصد برای استفاده در CSS و در SVG mask (0.125 = 12.5%)
  const pct = 0.125 + active * 0.25;
  const bubbleLeft = `calc(${12.5 + active * 25}% )`;

  return (
    <nav className="fixed bottom-4 left-0 right-0 z-50 flex justify-center md:hidden">
      <div className="relative w-[min(560px,92%)]">
        {/* SVG پس‌زمینهٔ نوار با notch (mask) */}
        <div className="absolute inset-x-0 bottom-0 pointer-events-none z-0 h-20">
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            width="100%"
            height="100%"
            aria-hidden
            className="block"
          >
            {/* mask: سفید = نشان داده شد، سیاه = شفاف (بریدگی) */}
            <mask id="notch-mask">
              {/* تمام سفید */}
              <rect x="0" y="0" width="100" height="100" fill="white" rx="10" ry="10" />
              {/* دایرهٔ سیاه که بریدگی ایجاد می‌کند (cx به صورت درصد) */}
              <circle
                cx={pct * 100}
                cy="20"
                r="14"
                fill="black"
              />
            </mask>

            {/* پس‌زمینهٔ نوار که ماسک روش اعمال شده */}
            <rect
              x="3"
              y="14"
              width="94"
              height="72"
              rx="10"
              ry="10"
              fill="rgba(17,24,39,0.95)" // bg-neutral-900/95
              mask="url(#notch-mask)"
            />
          </svg>
        </div>

        {/* محتوای نوار (آیکن‌ها) */}
        <div className="relative z-20">
          <div className="text-white px-6 py-3 flex justify-between items-center shadow-xl overflow-visible flex-row-reverse">
            {items.map((it, idx) => {
              const Icon = it.icon;
              const isActive = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className="relative z-20 flex flex-col items-center gap-1 w-12 h-12 justify-center bg-transparent border-0"
                  aria-current={isActive ? "page" : undefined}
                  title={it.label}
                >
                  <Icon active={isActive} />
                </button>
              );
            })}
          </div>
        </div>

        {/* بالون وسطی (bubble) */}
        <div
          className="pointer-events-none absolute -top-7 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 z-30"
          style={{
            left: bubbleLeft,
            transform: "translateX(-50%)",
          }}
        >
          <div className="w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center text-neutral-900 shadow-md">
            {items[active].icon({ active: true, small: true })}
          </div>
        </div>
      </div>
    </nav>
  );
}

/* ---------- آیکون‌ها (SVG) ---------- */
function HomeIcon({ active, small }) {
  const stroke = active ? "transparent" : "rgba(255,255,255,0.6)";
  const size = small ? 25 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M3 11.5L12 4l9 7.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 11.5v7a1 1 0 0 0 1 1h3v-5h6v5h3a1 1 0 0 0 1-1v-7" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ChartIcon({ active, small }) {
  const stroke = active ? "transparent" : "rgba(255,255,255,0.6)";
  const size = small ? 25 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M12 20V10" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 20V4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M17 20v-6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function ClockIcon({ active, small }) {
  const stroke = active ? "transparent" : "rgba(255,255,255,0.6)";
  const size = small ? 25 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8" stroke={stroke} strokeWidth="1.6" />
      <path d="M12 8v5l3 2" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function BellIcon({ active, small }) {
  const stroke = active ? "transparent" : "rgba(255,255,255,0.6)";
  const size = small ? 25 : 20;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M15 17H9a3 3 0 0 1-3-3V11a6 6 0 0 1 12 0v3a3 3 0 0 1-3 3z" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M12 20a2 2 0 0 0 2-2H10a2 2 0 0 0 2 2z" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
