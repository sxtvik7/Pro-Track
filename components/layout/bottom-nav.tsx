"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Settings, Users } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95 md:hidden">
      <div className="flex justify-around">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || pathname.startsWith(`${href}/`);

          return (
            <Link
              key={href}
              href={href}
              className="flex flex-1 flex-col items-center gap-1 py-2.5 text-xs font-medium transition"
              aria-current={isActive ? "page" : undefined}
            >
              <Icon
                className={`h-5 w-5 ${
                  isActive
                    ? "text-[#185FA5] dark:text-[#85B7EB]"
                    : "text-gray-400 dark:text-gray-500"
                }`}
                aria-hidden="true"
              />
              <span
                className={
                  isActive
                    ? "text-[#185FA5] dark:text-[#85B7EB]"
                    : "text-gray-500 dark:text-gray-400"
                }
              >
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}