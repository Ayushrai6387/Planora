"use client";
import React from 'react';
import { Event } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { Calendar, MapPin, Users, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface EventCardProps {
  event: Event;
  onRegister: (eventId: string) => void;
  userRole: 'host' | 'participant' | 'guest';
  registrationStatus?: 'confirmed' | 'waitlisted' | 'cancelled' | 'attended' | null;
}

export function EventCard({ event, onRegister, userRole, registrationStatus }: EventCardProps) {
  const percentFull = Math.round((event.registeredCount / event.capacity) * 100);
  const isFull = event.registeredCount >= event.capacity;

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden hover:shadow-2xl hover:shadow-purple-900/10 transition-all group"
    >
      <div className="h-40 bg-neutral-800 relative overflow-hidden">
        {event.imageUrl ? (
          <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-tr from-purple-900 to-indigo-900 text-purple-300">
            <Calendar size={40} />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs text-white font-medium border border-white/10">
          {event.category.toUpperCase()}
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-lg font-bold text-white mb-1">{event.title}</h3>
            <p className="text-xs text-neutral-400 font-medium">By {event.collegeId.toUpperCase()} • {event.societyId}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-neutral-400 mb-4">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            <span>{new Date(event.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin size={12} />
            <span>{event.venue}</span>
          </div>
        </div>

        {/* Capacity Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-neutral-400 mb-1">
            <span>Capacity</span>
            <span className={percentFull > 90 ? "text-red-400" : "text-emerald-400"}>
              {event.registeredCount}/{event.capacity} ({percentFull}%)
            </span>
          </div>
          <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full ${percentFull > 90 ? 'bg-red-500' : 'bg-emerald-500'}`}
              style={{ width: `${percentFull}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <div className="text-white font-bold">
            {event.budget && userRole === 'host' ? (
              <span className="text-green-400">{formatCurrency(event.budget)} Budget</span>
            ) : (
              <span>Free</span>
            )}
          </div>

          {userRole === 'participant' && (
            <button
              onClick={() => onRegister(event.id)}
              disabled={registrationStatus === 'confirmed' || (isFull && registrationStatus !== 'waitlisted')}
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors ${registrationStatus === 'confirmed'
                ? 'bg-emerald-900/30 text-emerald-400 cursor-default'
                : isFull
                  ? 'bg-orange-900/30 text-orange-400'
                  : 'bg-white text-black hover:bg-neutral-200'
                }`}
            >
              {registrationStatus === 'confirmed' ? 'Registered' : isFull ? 'Join Waitlist' : 'Register Now'}
              {!registrationStatus && <ArrowRight size={12} />}
            </button>
          )}
          {userRole === 'guest' && (
            <button className="px-4 py-2 bg-neutral-800 text-neutral-400 rounded-lg text-xs cursor-default">
              Login to Register
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
