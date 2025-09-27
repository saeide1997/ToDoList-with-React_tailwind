

import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import TodoModal from "./TodoModal";
import { AuthContext } from "../../context/AuthContext";

const items = [
    { id: "home", label: "خانه", path: "/", icon: HomeIcon },
    { id: "stats", label: "آمار", path: "/", icon: ChartIcon },
    { id: "new", label: "زمان", path: "/new", icon: NewItemIcon },
    { id: "setting", label: "اعلان", path: "/", icon: SettingIcon },
];

export default function Footer() {
    const [active, setActive] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);

    const handleAdd = () => {
        setSelectedTodo(null); // فرم خالی برای افزودن
        setModalOpen(true);
        setActive(0);
    };

    // محاسبهٔ موقعیت bubble به صورت درصد (برای 4 آیتم)
    const step = 100 / items.length;
    const bubbleLeft = `calc(${step * active + step / 2}%)`;

    return (
        // wrapper: فقط روی موبایل نمایش، روی دسکتاپ پنهان
        <nav className="fixed rounded-2xl  bottom-0 left-0 right-0 z-50 flex justify-center md:hidden">
            <div className="relative w-full rounded-2xl ">
                {/* نوار اصلی */}
                <div className="absolute w-full inset-x-0 rounded-2xl  bottom-0 pointer-events-none z-0 h-20">
                    {/* آیتم‌ها */}
                    <svg
                        viewBox="0 0 500 100"
                        // preserveAspectRatio="none"
                        width="100%"
                        height="100%"
                        aria-hidden
                        className="block"
                    >
                        {/* mask: سفید = نشان داده شد، سیاه = شفاف (بریدگی) */}
                        <mask id="notch-mask">
                            {/* تمام سفید */}
                            <rect x="0" y="0" width="500" height="100" fill="white" rx="10" ry="10" />
                            {/* دایرهٔ سیاه که بریدگی ایجاد می‌کند (cx به صورت درصد) */}
                            <defs>
                                <filter id="soft-edge" x="-20%" y="-20%" width="140%" height="140%">
                                    <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
                                </filter>
                            </defs>
                            <circle

                                cx={`${12.5 + active * 25}%`}
                                cy="15"
                                r="50"
                                fill="black"
                                filter="url(#soft-edge)"
                            />
                        </mask>

                        {/* پس‌زمینهٔ نوار که ماسک روش اعمال شده */}
                        <rect
                            x="0"
                            y="24"
                            width="500"
                            height="82"
                            rx="0"
                            ry="0"
                            fill="rgba(17,24,39,0.95)" // bg-neutral-900/95
                            mask="url(#notch-mask)"
                        />
                    </svg>
                </div>

                {/* محتوای نوار (آیکن‌ها) */}
                <div className="relative w-full rounded-2xl  z-20">
                    <div className="text-white w-full px-6 py-3 rounded-full  flex justify-between items-center shadow-xl overflow-visible flex-row-reverse">

                        {items.map((it, idx) => {
                            const Icon = it.icon; HomeIcon
                            const isActive = idx === active;
                            return (
                                <button
                                    key={it.id}
                                    onClick={() => {
                                        if (it.id !== 'new') {
                                            setActive(idx);
                                        } else {
                                            handleAdd();
                                            setActive(idx);
                                        }
                                    }}
                                    className="relative z-20 flex flex-col items-center gap-1 w-12 h-12 justify-center bg-transparent border-0"
                                    aria-current={isActive ? "page" : undefined}
                                    title={it.label}
                                >
                                    {it.id !== 'new' ? (
                                        <Link to={it.path}>
                                            {!isActive && <Icon active={isActive} />}
                                        </Link>
                                    ) : (
                                        !isActive && <Icon active={isActive} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* بالون وسطی (bubble) */}
                <div
                    className="pointer-events-none absolute -top-5 w-14 h-14 rounded-full flex items-center justify-center shadow-3xl transition-all duration-300 z-10"
                    style={{
                        left: bubbleLeft,
                        transform: "translateX(-50%)",
                    }}
                >
                    {/* لایه رنگی حباب */}
                    <div className=" w-14 h-14 rounded-full bg-amber-400 flex items-center justify-center text-neutral-900 shadow-3xl">
                        {/* آیکون فعال کوچک (نمایش همان آیکون فعال) */}
                        {items[active].icon({ active: true, small: true })}
                    </div>
                </div>
            </div>
            {/* Modal */}
            <TodoModal
                isOpen={modalOpen}
                onClose={() => { setModalOpen(false); setActive(0); }}
                existingTodo={selectedTodo}
            />
        </nav>
    );
}

/* ---------- آیکون‌ها (SVG) ---------- */
/* هر آیکون یک تابع است که props.active را می‌گیرد */
function HomeIcon({ active, small }) {
    const stroke = active ? "#232323 " : "rgba(255,255,255,0.6)";
    const size = small ? 25 : 20;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M3 11.5L12 4l9 7.5" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 11.5v7a1 1 0 0 0 1 1h3v-5h6v5h3a1 1 0 0 0 1-1v-7" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function ChartIcon({ active, small }) {
    const stroke = active ? "#232323 " : "rgba(255,255,255,0.6)";
    const size = small ? 25 : 20;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 20V10" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7 20V4" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M17 20v-6" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
}

function NewItemIcon({ active, small }) {
    const stroke = active ? "#232323 " : "rgba(255,255,255,0.6)";
    const size = small ? 25 : 20;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M12 5v14M5 12h14"
                stroke={stroke}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function SettingIcon({ active, small }) {
    const stroke = active ? "#232323 " : "rgba(255,255,255,0.6)";
    const size = small ? 25 : 20;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
            <path
                d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"
                stroke={stroke}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke={stroke}
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}