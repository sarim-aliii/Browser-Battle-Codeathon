import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../lib/AuthContext";
import { Loader2, ShieldCheck } from "lucide-react";

export default function AdminRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative flex flex-col items-center z-10">
          <div className="relative flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-gold-500/20 blur-xl rounded-full animate-pulse" />
            <div className="w-20 h-20 rounded-3xl bg-white dark:bg-slate-900 border border-gray-200 dark:border-white/10 shadow-2xl flex items-center justify-center relative z-10">
              <Loader2 className="h-10 w-10 animate-spin text-gold-500" />
            </div>
            {/* Inner Shield Icon that stays static while the ring spins */}
            <ShieldCheck className="absolute h-4 w-4 text-navy-900 dark:text-white z-20" />
          </div>
          
          <h3 className="text-xl font-black text-navy-900 dark:text-white tracking-tight mb-2">
            Authenticating
          </h3>
          <p className="text-xs font-bold tracking-[0.2em] text-gray-500 dark:text-gray-400 uppercase animate-pulse">
            Verifying Admin Privileges...
          </p>
        </div>
      </div>
    );
  }

  // If not logged in or not an admin, boot them back to the landing page
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  // If verified, render the protected child routes
  return <Outlet />;
}