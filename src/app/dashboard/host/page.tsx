"use client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { MockService } from '@/lib/mock';
import { Event } from '@/types';
import { EventCard } from '@/components/features/EventCard';
import { Plus, BarChart3, PieChart, Wallet } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

export default function HostDashboard() {
  const { user, isDemo } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [stats, setStats] = useState({ totalBudget: 0, attendees: 0, upcoming: 0 });

  useEffect(() => {
    // In real app, fetch based on user.societyId
    MockService.getEvents('gtbit').then(data => {
      setEvents(data);
      const budget = data.reduce((acc, e) => acc + (e.budget || 0), 0);
      const attendees = data.reduce((acc, e) => acc + e.registeredCount, 0);
      setStats({ totalBudget: budget, attendees, upcoming: data.filter(e => e.status === 'upcoming').length });
    });
  }, []);

  const chartData = {
    labels: events.map(e => e.title.substring(0, 10) + '...'),
    datasets: [{
      label: 'Registrations',
      data: events.map(e => e.registeredCount),
      backgroundColor: 'rgba(147, 51, 234, 0.6)',
      borderColor: 'rgba(147, 51, 234, 1)',
      borderWidth: 1
    }]
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.displayName || 'Host'}</h1>
          <p className="text-neutral-400">Managing {user?.societyId || 'Society'} @ {user?.collegeId?.toUpperCase()}</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-lg font-semibold flex items-center gap-2 hover:bg-neutral-200 transition-colors">
          <Plus size={18} /> Create Event
        </button>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-900/20 text-purple-400 flex items-center justify-center">
            <BarChart3 />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Total Attendees</p>
            <p className="text-2xl font-bold">{stats.attendees}</p>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-emerald-900/20 text-emerald-400 flex items-center justify-center">
            <Wallet />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Budget Utilized</p>
            <p className="text-2xl font-bold">{formatCurrency(stats.totalBudget)}</p>
          </div>
        </div>
        <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-xl flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-900/20 text-blue-400 flex items-center justify-center">
            <PieChart />
          </div>
          <div>
            <p className="text-sm text-neutral-500">Upcoming Events</p>
            <p className="text-2xl font-bold">{stats.upcoming}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Main Content: Events List */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold mb-4">Your Events</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {events.map(event => (
              <EventCard key={event.id} event={event} userRole="host" onRegister={() => { }} />
            ))}
          </div>
        </div>

        {/* Sidebar: Analytics */}
        <div className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl h-fit">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <SparklesIcon className="text-yellow-400" size={16} />
            AI Insights
          </h2>
          <div className="mb-6">
            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { display: false } } }} />
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-neutral-800/50 rounded-lg text-sm border border-neutral-700">
              <span className="text-green-400 font-bold block mb-1">↑ High Demand</span>
              "HackPlora 2024" is trending. Predicted to cross capacity in 2 hours.
            </div>
            <div className="p-3 bg-neutral-800/50 rounded-lg text-sm border border-neutral-700">
              <span className="text-purple-400 font-bold block mb-1">💡 Suggestion</span>
              Increase budget for "Cultural Fest" by 10% to accommodate waitlist.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SparklesIcon({ className, size }: { className?: string, size?: number }) {
  return <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
}
