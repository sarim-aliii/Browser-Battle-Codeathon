import { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, UserCog, Shield, GraduationCap, BookOpen } from "lucide-react";

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
    } catch (err) {
      console.error("Error updating user role:", err);
      alert("Failed to update user role.");
    } finally {
      setUpdatingId(null);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
          <UserCog className="mr-2 h-5 w-5 text-indigo-500" />
          User Role Management
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Manage user permissions and roles across the platform.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
              <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Name</th>
              <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Email</th>
              <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Current Role</th>
              <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                <td className="p-4 text-sm text-slate-700 dark:text-slate-300 font-medium">{user.name || "Unknown"}</td>
                <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{user.email}</td>
                <td className="p-4 text-sm">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${user.role === 'admin' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300' : 
                      user.role === 'faculty' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' : 
                      'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'}`}>
                    {user.role === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                    {user.role === 'faculty' && <BookOpen className="w-3 h-3 mr-1" />}
                    {user.role === 'student' && <GraduationCap className="w-3 h-3 mr-1" />}
                    {user.role || 'student'}
                  </span>
                </td>
                <td className="p-4 text-sm">
                  <select
                    value={user.role || 'student'}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                    disabled={updatingId === user.id}
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-slate-700 dark:border-slate-600 dark:placeholder-slate-400 dark:text-white dark:focus:ring-indigo-500 dark:focus:border-indigo-500 disabled:opacity-50"
                  >
                    <option value="student">Student</option>
                    <option value="faculty">Faculty</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-slate-500 dark:text-slate-400">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
