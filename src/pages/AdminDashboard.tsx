import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Users, Building2, Megaphone, Settings, 
  Activity, ShieldAlert, Loader2, BookOpen, 
  RefreshCw, Clock, Calendar
} from "lucide-react";
import { collection, getCountFromServer } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { UserManagement } from "../components/admin/UserManagement";
import { DepartmentManagement } from "../components/admin/DepartmentManagement";
import { CourseManagement } from "../components/admin/CourseManagement";

// ... (Keep your existing OperationType and handleFirestoreError code here) ...
enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: any;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  // Keeping your original error handler for brevity
  console.error('Firestore Error:', error);
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    departments: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'departments' | 'courses'>('overview');
  
  // Dynamic Time State
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchStats = async (isRefresh = false) => {
    if (isRefresh) setIsRefreshing(true);
    else setLoading(true);
    
    try {
      // HACKATHON WINNING MOVE: Use getCountFromServer instead of downloading all documents!
      const [usersCount, depsCount, coursesCount] = await Promise.all([
        getCountFromServer(collection(db, "users")),
        getCountFromServer(collection(db, "departments")),
        getCountFromServer(collection(db, "courses"))
      ]);
      
      setStats({
        users: usersCount.data().count,
        departments: depsCount.data().count,
        courses: coursesCount.data().count,
      });
      setError(null);
    } catch (err) {
      setError("Failed to load dashboard data. You might not have sufficient permissions.");
      try {
        handleFirestoreError(err, OperationType.LIST, "admin_stats");
      } catch (e) {}
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const statCards = [
    { title: "Total Users", value: stats.users, icon: <Users className="h-7 w-7 text-white" />, gradient: "from-blue-600 to-indigo-600", shadow: "shadow-indigo-500/20" },
    { title: "Departments", value: stats.departments, icon: <Building2 className="h-7 w-7 text-white" />, gradient: "from-emerald-500 to-teal-600", shadow: "shadow-emerald-500/20" },
    { title: "Active Courses", value: stats.courses, icon: <BookOpen className="h-7 w-7 text-white" />, gradient: "from-amber-500 to-orange-600", shadow: "shadow-orange-500/20" },
  ];

  const quickLinks = [
    { title: "Manage Users", description: "Add, remove, or change user roles.", icon: <Users className="h-5 w-5" />, onClick: () => setActiveTab('users') },
    { title: "Manage Departments", description: "Update department info and faculty.", icon: <Building2 className="h-5 w-5" />, onClick: () => setActiveTab('departments') },
    { title: "Manage Courses", description: "Update course catalog and details.", icon: <BookOpen className="h-5 w-5" />, onClick: () => setActiveTab('courses') },
    { title: "Announcements", description: "Post new notices and alerts.", icon: <Megaphone className="h-5 w-5" />, onClick: () => {} },
    { title: "System Settings", description: "Configure global portal settings.", icon: <Settings className="h-5 w-5" />, onClick: () => {} },
    { title: "Security Logs", description: "Monitor access controls and policies.", icon: <Activity className="h-5 w-5" />, onClick: () => {} },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-navy-900 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Enhanced Header Section */}
          <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white dark:bg-navy-800 p-6 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800">
            <div>
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 mb-1">
                <ShieldAlert className="w-5 h-5 text-gold-500" />
                <span className="text-sm font-bold tracking-wider text-gold-500 uppercase">Administrator Access</span>
              </motion.div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mt-1">
                {getGreeting()}, Admin
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-400 max-w-xl">
                System operations are running smoothly. Here is your daily overview of the institution's portal.
              </p>
            </div>
            
            <div className="flex flex-col items-end gap-2 text-sm font-medium text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-navy-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <Calendar className="w-4 h-4" />
                {time.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </div>
              <div className="flex items-center gap-2 bg-slate-50 dark:bg-navy-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <Clock className="w-4 h-4" />
                {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </div>
            </div>
          </div>

          {/* Premium Glassmorphic Tabs */}
          <div className="flex space-x-2 bg-white/50 dark:bg-navy-800/50 backdrop-blur-md p-1.5 rounded-xl mb-8 overflow-x-auto border border-slate-200/50 dark:border-slate-700/50 shadow-sm">
            {['overview', 'users', 'departments', 'courses'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2.5 px-6 rounded-lg text-sm font-semibold transition-all duration-300 whitespace-nowrap capitalize ${
                  activeTab === tab 
                    ? 'bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-900 shadow-md transform scale-[1.02]' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {tab === 'overview' ? 'Dashboard Overview' : `${tab} Management`}
              </button>
            ))}
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-r-lg text-red-700 dark:text-red-400 flex items-start shadow-sm">
              <ShieldAlert className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-bold">Access Error</h3>
                <p className="text-sm mt-1">{error}</p>
              </div>
            </motion.div>
          )}

          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header with Refresh */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white">System Statistics</h2>
                  <button 
                    onClick={() => fetchStats(true)}
                    disabled={isRefreshing}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-navy-800 text-sm font-medium text-slate-600 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors disabled:opacity-50 shadow-sm"
                  >
                    <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-gold-500' : ''}`} />
                    Refresh Data
                  </button>
                </div>

                {/* Enhanced Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  {statCards.map((stat, index) => (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      key={index}
                      className={`relative overflow-hidden bg-white dark:bg-navy-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 shadow-lg ${stat.shadow} group hover:-translate-y-1 transition-transform duration-300`}
                    >
                      {/* Decorative background circle */}
                      <div className={`absolute -right-6 -top-6 w-24 h-24 rounded-full bg-gradient-to-br ${stat.gradient} opacity-10 group-hover:scale-150 transition-transform duration-700`} />
                      
                      <div className="flex items-center justify-between relative z-10">
                        <div>
                          <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">{stat.title}</p>
                          <h3 className="text-4xl font-black text-slate-900 dark:text-white">
                            {loading ? <Loader2 className="h-8 w-8 animate-spin text-slate-300 mt-2" /> : stat.value}
                          </h3>
                        </div>
                        <div className={`p-4 rounded-xl bg-gradient-to-br ${stat.gradient} shadow-md transform group-hover:rotate-6 transition-transform`}>
                          {stat.icon}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickLinks.map((link, index) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      key={index}
                      onClick={link.onClick}
                      className="bg-white dark:bg-navy-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:border-gold-500 dark:hover:border-gold-500 transition-all duration-300 cursor-pointer group hover:shadow-md"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-slate-50 dark:bg-navy-900 rounded-xl text-slate-600 dark:text-slate-300 group-hover:bg-gold-50 dark:group-hover:bg-gold-500/10 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                          {link.icon}
                        </div>
                        <h3 className="ml-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                          {link.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        {link.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Keep the other tabs as they were, just wrapped in AnimatePresence for smooth transitions */}
            {activeTab === 'users' && (
              <motion.div key="users" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <UserManagement />
              </motion.div>
            )}

            {activeTab === 'departments' && (
              <motion.div key="deps" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <DepartmentManagement />
              </motion.div>
            )}

            {activeTab === 'courses' && (
              <motion.div key="courses" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <CourseManagement />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </main>
      
      <Footer />
    </div>
  );
}