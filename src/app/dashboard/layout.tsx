"use client";
import { NotificationBar } from '@/components/ui/NotificationBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <NotificationBar />
      <div className="max-w-7xl mx-auto p-6 md:p-8 pt-20">
        {children}
      </div>
    </div>
  );
}
