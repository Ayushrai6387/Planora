"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MockService } from '@/lib/mock';
import { Event } from '@/types';
import { EventCard } from '@/components/features/EventCard';
import { Lock } from 'lucide-react';

export default function GuestDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    MockService.getEvents().then(setEvents);
  }, []);

  return (
    <div>
      <div className="bg-purple-900/20 border border-purple-500/30 p-4 rounded-xl mb-8 flex items-center gap-4">
        <div className="bg-purple-500/20 p-2 rounded-full">
          <Lock className="text-purple-400" size={20} />
        </div>
        <div>
          <h3 className="font-bold text-purple-200">Guest Mode Active</h3>
          <p className="text-sm text-purple-300/70">You are viewing a read-only demo. Some features like Registration and Event Creation are disabled.</p>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-6">Explore Events (All Colleges)</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
        {events.map(event => (
          <EventCard
            key={event.id}
            event={event}
            userRole="guest"
            onRegister={() => { }}
          />
        ))}
      </div>
    </div>
  );
}
