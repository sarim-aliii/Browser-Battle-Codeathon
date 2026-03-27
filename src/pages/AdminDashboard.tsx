import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Building2, Megaphone, Settings, Activity, ShieldAlert, Loader2, BookOpen } from "lucide-react";
import { collection, getDocs } from "firebase/firestore";
import { db, auth } from "../lib/firebase";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { UserManagement } from "../components/admin/UserManagement";
import { DepartmentManagement } from "../components/admin/DepartmentManagement";
import { CourseManagement } from "../components/admin/CourseManagement";

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
  authInfo: {
    userId?: string;
    email?: string | null;
    emailVerified?: boolean;
    isAnonymous?: boolean;
    tenantId?: string | null;
    providerInfo: {
      providerId: string;
      displayName: string | null;
      email: string | null;
      photoUrl: string | null;
    }[];
  }
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData.map(provider => ({
        providerId: provider.providerId,
        displayName: provider.displayName,
        email: provider.email,
        photoUrl: provider.photoURL
      })) || []
    },
    operationType,
    path
  }
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    users: 0,
    departments: 0,
    courses: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'departments' | 'courses'>('overview');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersSnap, depsSnap, coursesSnap] = await Promise.all([
          getDocs(collection(db, "users")),
          getDocs(collection(db, "departments")),
          getDocs(collection(db, "courses"))
        ]);
        
        setStats({
          users: usersSnap.size,
          departments: depsSnap.size,
          courses: coursesSnap.size,
        });
      } catch (err) {
        setError("Failed to load dashboard data. You might not have sufficient permissions.");
        try {
          handleFirestoreError(err, OperationType.LIST, "users");
        } catch (e) {
          // Error is already logged by handleFirestoreError
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Users", value: stats.users, icon: <Users className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />, bgColor: "bg-indigo-100 dark:bg-indigo-900/30" },
    { title: "Departments", value: stats.departments, icon: <Building2 className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />, bgColor: "bg-emerald-100 dark:bg-emerald-900/30" },
    { title: "Courses", value: stats.courses, icon: <BookOpen className="h-6 w-6 text-amber-600 dark:text-amber-400" />, bgColor: "bg-amber-100 dark:bg-amber-900/30" },
  ];

  const quickLinks = [
    { title: "Manage Users", description: "Add, remove, or change user roles.", icon: <Users className="h-5 w-5" />, onClick: () => setActiveTab('users') },
    { title: "Manage Departments", description: "Update department info and faculty.", icon: <Building2 className="h-5 w-5" />, onClick: () => setActiveTab('departments') },
    { title: "Manage Courses", description: "Update course catalog and details.", icon: <BookOpen className="h-5 w-5" />, onClick: () => setActiveTab('courses') },
    { title: "Announcements", description: "Post new notices and alerts.", icon: <Megaphone className="h-5 w-5" />, onClick: () => {} },
    { title: "System Settings", description: "Configure global portal settings.", icon: <Settings className="h-5 w-5" />, onClick: () => {} },
    { title: "Security", description: "Manage access controls and policies.", icon: <ShieldAlert className="h-5 w-5" />, onClick: () => {} },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Admin Dashboard</h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Overview and management of the institution portal.</p>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-slate-200/50 dark:bg-slate-800/50 p-1 rounded-xl mb-8 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'overview' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'users' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
            >
              User Roles
            </button>
            <button
              onClick={() => setActiveTab('departments')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'departments' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
            >
              Departments
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`flex-1 py-2.5 px-4 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${activeTab === 'courses' ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-slate-700/50'}`}
            >
              Courses
            </button>
          </div>

          {error && (
            <div className="mb-8 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400">
              {error}
            </div>
          )}

          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                {statCards.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 flex items-center"
                  >
                    <div className={`p-4 rounded-lg ${stat.bgColor} mr-4`}>
                      {stat.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                        {loading ? <Loader2 className="h-6 w-6 animate-spin text-slate-400 mt-1" /> : stat.value}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Links Grid */}
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Quick Actions</h2>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-indigo-500" />
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {quickLinks.map((link, index) => (
                    <div
                      key={index}
                      onClick={link.onClick}
                      className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:border-indigo-500 dark:hover:border-indigo-400 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center mb-4">
                        <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 group-hover:bg-indigo-100 group-hover:text-indigo-600 dark:group-hover:bg-indigo-900/50 dark:group-hover:text-indigo-400 transition-colors">
                          {link.icon}
                        </div>
                        <h3 className="ml-3 text-lg font-semibold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {link.title}
                        </h3>
                      </div>
                      <p className="text-slate-600 dark:text-slate-400 text-sm">
                        {link.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <UserManagement />
            </motion.div>
          )}

          {activeTab === 'departments' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <DepartmentManagement />
            </motion.div>
          )}

          {activeTab === 'courses' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <CourseManagement />
            </motion.div>
          )}

        </div>
      </main>
      
      <Footer />
    </div>
  );
}
