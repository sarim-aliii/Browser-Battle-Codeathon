import { useState, useEffect, useMemo, useRef } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, UserCog, Shield, GraduationCap, BookOpen, Search, AlertCircle, CheckCircle2 } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersData: User[] = [];
      querySnapshot.forEach((doc) => {
        usersData.push({ id: doc.id, ...doc.data() } as User);
      });
      setUsers(usersData);
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    setUpdatingId(userId);
    try {
      const userRef = doc(db, "users", userId);
      await updateDoc(userRef, { role: newRole });
      setUsers(users.map(u => u.id === userId ? { ...u, role: newRole } : u));
      
      // Show temporary success message
      setSuccessMessage(`User role updated successfully.`);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase();
    return users.filter(user => 
      (user.name?.toLowerCase().includes(query)) ||
      (user.email?.toLowerCase().includes(query)) ||
      (user.role?.toLowerCase().includes(query))
    );
  }, [users, searchQuery]);

  // GSAP Animation for Staggered Rows
  useGSAP(() => {
    if (!loading) {
      gsap.fromTo('.user-row',
        { opacity: 0, x: -20 },
        { 
          opacity: 1, 
          x: 0, 
          stagger: 0.04, 
          duration: 0.4, 
          ease: "power2.out",
          overwrite: true
        }
      );
    }
  }, { dependencies: [filteredUsers, loading], scope: containerRef });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gold-500 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading user directory...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center border border-red-500/20">
        <AlertCircle className="w-6 h-6 mr-3" />
        <span className="font-semibold">{error}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden relative">
      
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header & Search */}
      <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h2 className="text-2xl font-black text-navy-900 dark:text-white flex items-center group">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mr-3 transition-transform group-hover:scale-110">
                <UserCog className="h-5 w-5 text-gold-500" />
              </div>
              User Role Management
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
              Manage system access and assign administrative privileges securely.
            </p>
          </div>

          <div className="relative group/search w-full md:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within/search:text-gold-500" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 w-full border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-slate-800 text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all shadow-sm"
            />
          </div>
        </div>

        {/* Success Toast */}
        <div className={`mt-4 flex items-center p-3 rounded-lg bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-bold border border-emerald-500/20 transition-all duration-300 ${successMessage ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none absolute'}`}>
          <CheckCircle2 className="w-4 h-4 mr-2" />
          {successMessage}
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto relative z-10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-slate-800/80 border-b border-gray-200 dark:border-white/10">
              <th className="px-6 py-5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">User Details</th>
              <th className="px-6 py-5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Current Role</th>
              <th className="px-6 py-5 text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider">Modify Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {filteredUsers.map((user) => (
              <tr key={user.id} className="user-row group hover:bg-gold-50/30 dark:hover:bg-white/5 transition-colors duration-300">
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {user.name || "Unknown User"}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                      {user.email}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[11px] font-black tracking-widest uppercase border
                    ${user.role === 'admin' 
                      ? 'bg-gold-500/10 text-gold-600 dark:text-gold-400 border-gold-500/20' 
                      : user.role === 'faculty' 
                      ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20' 
                      : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'}`}
                  >
                    {user.role === 'admin' && <Shield className="w-3 h-3 mr-1.5" />}
                    {user.role === 'faculty' && <BookOpen className="w-3 h-3 mr-1.5" />}
                    {user.role === 'student' && <GraduationCap className="w-3 h-3 mr-1.5" />}
                    {user.role || 'student'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="relative w-40">
                    <select
                      value={user.role || 'student'}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      disabled={updatingId === user.id}
                      className="w-full pl-3 pr-8 py-2 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-white/10 text-navy-900 dark:text-white text-sm font-semibold rounded-xl focus:ring-2 focus:ring-gold-500 focus:border-transparent outline-none transition-all disabled:opacity-50 appearance-none cursor-pointer hover:border-gold-500/50"
                    >
                      <option value="student">Student</option>
                      <option value="faculty">Faculty</option>
                      <option value="admin">Administrator</option>
                    </select>
                    {updatingId === user.id ? (
                      <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold-500 animate-spin" />
                    ) : (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none border-t-2 border-r-2 border-gray-400 w-2 h-2 rotate-135 transition-transform" style={{ transform: 'translateY(-60%) rotate(135deg)' }} />
                    )}
                  </div>
                </td>
              </tr>
            ))}
            
            {/* Empty State */}
            {filteredUsers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-2">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                      {searchQuery ? "No users found matching your search." : "No users exist in the database."}
                    </p>
                    {searchQuery && (
                      <button onClick={() => setSearchQuery("")} className="text-gold-500 font-bold hover:underline">
                        Clear Search
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}