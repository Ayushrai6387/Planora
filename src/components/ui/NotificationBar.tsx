"use client";
import React, { useEffect, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { Howl } from 'howler';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

// Mock Notification Sound function
const playNotificationSound = () => {
  // In a real app, point to /sounds/alert.mp3
  // const sound = new Howl({ src: ['/sounds/alert.mp3'] });
  // sound.play();
  console.log("♫ Notification Sound Playing ♫");
};

interface NotificationBarProps {
  className?: string;
}

export function NotificationBar({ className }: NotificationBarProps) {
  const [notifications, setNotifications] = useState<{ id: string, message: string, type: 'urgent' | 'info' }[]>([]);

  useEffect(() => {
    // Simulation: Add a fake notification after 3 seconds
    const timer = setTimeout(() => {
      setNotifications(prev => [...prev, {
        id: 'notif_1',
        message: '⚠️ Only 3 seats left for "HackPlora 2024"!',
        type: 'urgent'
      }]);
      playNotificationSound();
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (notifications.length === 0) return null;

  return (
    <div className={cn("fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none", className)}>
      <AnimatePresence>
        {notifications.map(n => (
          <motion.div
            key={n.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className={cn(
              "pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl backdrop-blur-md border w-80",
              n.type === 'urgent'
                ? "bg-red-500/10 border-red-500/50 text-red-200"
                : "bg-blue-500/10 border-blue-500/50 text-blue-200"
            )}
          >
            <Bell size={18} className={n.type === 'urgent' ? "animate-pulse" : ""} />
            <span className="text-sm font-medium flex-1">{n.message}</span>
            <button onClick={() => removeNotification(n.id)} className="hover:text-white transition-colors">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
