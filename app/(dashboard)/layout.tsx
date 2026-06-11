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
     <div className="min-h-screen md:flex">
  <Sidebar />

  <div className="flex-1">
    <Header />

    <main className="p-4 pb-20 md:pb-4">
      {children}
    </main>

    <BottomNav />
  </div>
</div>
  );
}