"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MockService } from '@/lib/mock';
import { Event, Registration } from '@/types';
import { EventCard } from '@/components/features/EventCard';
import confetti from 'canvas-confetti';

export default function ParticipantDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [myRegistrations, setMyRegistrations] = useState<Registration[]>([]);
  const [filter, setFilter] = useState<'all' | 'tech' | 'cultural' | 'workshop'>('all');

  useEffect(() => {
    // Only fetch for my college by default
    MockService.getEvents(user?.collegeId).then(setEvents);
    if (user) {
      MockService.getRegistrations(user.uid).then(setMyRegistrations);
    }
  }, [user]);

  const handleRegister = async (eventId: string) => {
    if (!user) return;
    const res = await MockService.registerEvent(user.uid, eventId);
    if (res.success) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      const newRegs = await MockService.getRegistrations(user.uid);
      setMyRegistrations(newRegs);
      // Refresh events to show updated count
      MockService.getEvents(user.collegeId).then(setEvents);
    } else {
      alert(res.message);
    }
  };

  const filteredEvents = filter === 'all'
    ? events
    : events.filter(e => e.category === filter);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Events @ {user?.collegeId?.toUpperCase()}</h1>
        <p className="text-neutral-400">Your personalized feed. Only showing events from your college.</p>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {['all', 'tech', 'cultural', 'workshop'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === f
                ? 'bg-white text-black'
                : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700'
              }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => {
          const reg = myRegistrations.find(r => r.eventId === event.id);
          return (
            <EventCard
              key={event.id}
              event={event}
              userRole="participant"
              onRegister={handleRegister}
              registrationStatus={reg ? reg.status : null}
            />
          );
        })}
      </div>

      {myRegistrations.length > 0 && (
        <div className="mt-12 border-t border-neutral-800 pt-8">
          <h2 className="text-2xl font-bold mb-6">My Passes</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {myRegistrations.map(reg => (
              <div key={reg.id} className="bg-white text-black p-4 rounded-xl flex flex-col items-center text-center">
                <div className="w-full aspect-square bg-neutral-100 mb-4 rounded-lg flex items-center justify-center p-2">
                  {/* Placeholder QR */}
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${reg.qrCodeData}`} alt="QR" className="w-full h-full" />
                </div>
                <p className="font-bold text-lg mb-1">{events.find(e => e.id === reg.eventId)?.title}</p>
                <p className="text-xs text-neutral-500 font-mono break-all">{reg.qrCodeData}</p>
                <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-100 px-2 py-1 rounded">
                  {reg.status.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
