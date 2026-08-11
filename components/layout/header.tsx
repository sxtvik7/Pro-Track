// components/layout/header.tsx
export default function Header() {
  return (
    <header className="sticky top-0 z-10 border-b border-gray-200 bg-white/80 px-4 py-4 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/80 sm:px-6">
      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-50 sm:text-xl">
        Dashboard
      </h1>
    </header>
  );
}