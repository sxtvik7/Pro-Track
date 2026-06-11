import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white md:hidden">
      <div className="flex justify-around py-3">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/clients">Clients</Link>
        <Link href="/settings">Settings</Link>
      </div>
    </nav>
  );
}