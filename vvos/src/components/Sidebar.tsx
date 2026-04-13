"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Suppliers", href: "/suppliers", icon: "🏪" },
  { label: "Experiences", href: "#", icon: "🍷", disabled: true },
  { label: "Quotes", href: "#", icon: "📄", disabled: true },
  { label: "Bookings", href: "#", icon: "📅", disabled: true },
  { label: "Analytics", href: "#", icon: "📊", disabled: true },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-60 bg-zinc-900 text-white flex flex-col min-h-screen">
      <div className="p-5 border-b border-zinc-700">
        <h1 className="text-lg font-bold tracking-tight">VVOS</h1>
        <p className="text-xs text-zinc-400 mt-0.5">Via Vinho Operating System</p>
      </div>
      <nav className="flex-1 p-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname.startsWith(item.href) && item.href !== "#";
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-1 transition-colors ${
                item.disabled
                  ? "text-zinc-600 cursor-not-allowed"
                  : active
                  ? "bg-zinc-700/60 text-white"
                  : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
              }`}
              onClick={(e) => item.disabled && e.preventDefault()}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.disabled && (
                <span className="ml-auto text-[10px] bg-zinc-700 text-zinc-400 px-1.5 py-0.5 rounded">
                  Soon
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
