"use client";
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Shield, Sparkles, Users, Lock } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const { login, loading } = useAuth();

  const handleGuestLogin = () => {
    login('guest');
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(120,40,200,0.1),transparent_70%)] pointer-events-none" />

      <div className="z-10 text-center max-w-4xl w-full">
        <div className="mb-6 flex justify-center">
          <div className="bg-purple-900/30 border border-purple-500/20 px-4 py-1 rounded-full text-purple-300 text-sm font-medium flex items-center gap-2">
            <Sparkles size={14} />
            <span>Planora v1.0 Live</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-neutral-400 bg-clip-text text-transparent">
          Planora.
        </h1>
        <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
          The unified event management platform for colleges.
          Secure, real-time, and role-specific experiences for Hosts and Participants.
        </p>

        {/* Access Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Guest Demo */}
          <div className="group bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-purple-500/50 transition-all cursor-pointer flex flex-col items-center text-center"
            onClick={handleGuestLogin}>
            <div className="w-12 h-12 bg-purple-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Sparkles className="text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Guest Demo</h3>
            <p className="text-sm text-neutral-500">
              Instant 5s access. Read-only view for judges. No signup required.
            </p>
            <div className="mt-6 w-full py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-medium transition-colors">
              Try Demo &rarr;
            </div>
          </div>

          {/* Host Login */}
          <Link href="/login/host" className="group bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-blue-500/50 transition-all flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-blue-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Shield className="text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Host Access</h3>
            <p className="text-sm text-neutral-500">
              For Societies & Admins. Manage events, budgets, and analytics.
            </p>
            <div className="mt-6 w-full py-2 bg-neutral-800 group-hover:bg-blue-600/20 text-blue-400 group-hover:text-blue-300 rounded-lg font-medium transition-colors border border-neutral-700 group-hover:border-blue-500/30">
              Host Login
            </div>
          </Link>

          {/* Participant Login */}
          <Link href="/login/participant" className="group bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl hover:border-emerald-500/50 transition-all flex flex-col items-center text-center">
            <div className="w-12 h-12 bg-emerald-900/20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Users className="text-emerald-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Student Access</h3>
            <p className="text-sm text-neutral-500">
              Register for events, track attendance, and earn badges.
            </p>
            <div className="mt-6 w-full py-2 bg-neutral-800 group-hover:bg-emerald-600/20 text-emerald-400 group-hover:text-emerald-300 rounded-lg font-medium transition-colors border border-neutral-700 group-hover:border-emerald-500/30">
              Student Login
            </div>
          </Link>
        </div>

        <div className="mt-12 text-neutral-600 text-sm">
          <p>Powered by Next.js 14 • Firebase • Google Cloud Storage</p>
        </div>
      </div>
    </main>
  );
}
