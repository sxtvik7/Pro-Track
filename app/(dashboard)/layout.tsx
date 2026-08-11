import BottomNav from "@/components/layout/bottom-nav";
import Header from "@/components/layout/header";
import Sidebar from "@/components/layout/sidebar";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 md:flex">
      <Sidebar />

      <div className="flex-1 md:min-w-0">
        <Header />

        <main className="mx-auto max-w-5xl p-4 pb-20 sm:p-6 md:pb-6">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}