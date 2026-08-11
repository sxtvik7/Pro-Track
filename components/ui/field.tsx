export const inputStyles =
  "w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 transition placeholder:text-gray-400 focus:border-[#378ADD] focus:outline-none focus:ring-2 focus:ring-[#85B7EB]/50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-50 dark:placeholder:text-gray-500";

export function Field({
  label,
  htmlFor,
  required,
  suffix,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  suffix?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {required && <span className="ml-0.5 text-[#A32D2D] dark:text-[#F09595]">*</span>}
        {suffix && <span className="ml-1 font-normal text-gray-400 dark:text-gray-500">({suffix})</span>}
      </label>
      {children}
    </div>
  );
}