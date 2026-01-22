"use client";
import { useAuth } from "@/context/AuthContext";
import { Shield } from "lucide-react";

export default function HostLogin() {
  const { login, loading } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-2xl p-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-900/20 rounded-full flex items-center justify-center">
            <Shield className="text-blue-400" size={32} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white text-center mb-2">Host Portal</h1>
        <p className="text-neutral-500 text-center mb-8">Login to manage your society and events.</p>

        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); login('host'); }}>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Email</label>
            <input type="email" placeholder="host@college.edu" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <div>
            <label className="block text-sm text-neutral-400 mb-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500" />
          </div>
          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg transition-colors">
            {loading ? 'Authenticating...' : 'Secure Login'}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-neutral-800 text-center">
          <p className="text-xs text-neutral-500 mb-2">FOR JUDGES / DEMO</p>
          <button onClick={() => login('host')} className="text-blue-400 text-sm hover:underline">
            Skip Authorization (Demo Host)
          </button>
        </div>
      </div>
    </div>
  );
}
