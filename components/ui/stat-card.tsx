import { type LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  tone?: "primary" | "secondary";
}

const toneStyles = {
  primary: "bg-[#E6F1FB] text-[#0C447C] dark:bg-[#0C447C]/30 dark:text-[#85B7EB]",
  secondary: "bg-[#EAF3DE] text-[#27500A] dark:bg-[#27500A]/30 dark:text-[#97C459]",
} as const;

export function StatCard({ title, value, icon: Icon, tone = "primary" }: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${toneStyles[tone]}`}>
        <Icon className="h-5 w-5" aria-hidden="true" />
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-gray-50">
        {value.toLocaleString()}
      </p>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {title}
      </p>
    </div>
  );
}