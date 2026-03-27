import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, Building2, Plus, Edit2, Trash2, X, Check } from "lucide-react";

interface Department {
  id: string;
  name: string;
  facultyLead: string;
  description: string;
}

export function DepartmentManagement() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({ name: "", facultyLead: "", description: "" });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "departments"));
      const depsData: Department[] = [];
      querySnapshot.forEach((doc) => {
        depsData.push({ id: doc.id, ...doc.data() } as Department);
      });
      setDepartments(depsData);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to load departments.");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    if (!formData.name) return;
    try {
      const docRef = await addDoc(collection(db, "departments"), formData);
      setDepartments([...departments, { id: docRef.id, ...formData }]);
      setIsAdding(false);
      setFormData({ name: "", facultyLead: "", description: "" });
    } catch (err) {
      console.error("Error adding department:", err);
      alert("Failed to add department.");
    }
  };

  const handleUpdate = async (id: string) => {
    try {
      const depRef = doc(db, "departments", id);
      await updateDoc(depRef, formData);
      setDepartments(departments.map(d => d.id === id ? { ...d, ...formData } : d));
      setEditingId(null);
      setFormData({ name: "", facultyLead: "", description: "" });
    } catch (err) {
      console.error("Error updating department:", err);
      alert("Failed to update department.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this department?")) return;
    try {
      await deleteDoc(doc(db, "departments", id));
      setDepartments(departments.filter(d => d.id !== id));
    } catch (err) {
      console.error("Error deleting department:", err);
      alert("Failed to delete department.");
    }
  };

  const startEdit = (dep: Department) => {
    setEditingId(dep.id);
    setFormData({ name: dep.name, facultyLead: dep.facultyLead || "", description: dep.description || "" });
    setIsAdding(false);
  };

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-emerald-500" /></div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <Building2 className="mr-2 h-5 w-5 text-emerald-500" />
            Academic Departments
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage university departments and assign faculty leads.
          </p>
        </div>
        <button
          onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: "", facultyLead: "", description: "" }); }}
          className="flex items-center px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm font-medium"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </button>
      </div>

      <div className="p-6">
        {isAdding && (
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">Add New Department</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Faculty Lead</label>
                <input
                  type="text"
                  value={formData.facultyLead}
                  onChange={(e) => setFormData({ ...formData, facultyLead: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. Dr. Alan Turing"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="Brief description of the department..."
                  rows={2}
                />
              </div>
            </div>
            <div className="flex justify-end space-x-2">
              <button onClick={() => setIsAdding(false)} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleAdd} disabled={!formData.name} className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center">
                <Check className="w-4 h-4 mr-2" /> Save
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {departments.map((dep) => (
            <div key={dep.id} className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
              {editingId === dep.id ? (
                <div className="space-y-3">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                    placeholder="Department Name"
                  />
                  <input
                    type="text"
                    value={formData.facultyLead}
                    onChange={(e) => setFormData({ ...formData, facultyLead: e.target.value })}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                    placeholder="Faculty Lead"
                  />
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
                    placeholder="Description"
                    rows={2}
                  />
                  <div className="flex justify-end space-x-2 pt-2">
                    <button onClick={() => setEditingId(null)} className="p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-md"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleUpdate(dep.id)} className="p-1.5 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 rounded-md"><Check className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{dep.name}</h3>
                    <div className="flex space-x-1">
                      <button onClick={() => startEdit(dep)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(dep.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Faculty Lead</span>
                    <p className="text-sm text-slate-700 dark:text-slate-300">{dep.facultyLead || "Not assigned"}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Description</span>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">{dep.description || "No description provided."}</p>
                  </div>
                </>
              )}
            </div>
          ))}
          {departments.length === 0 && !isAdding && (
            <div className="col-span-full p-8 text-center text-slate-500 dark:text-slate-400 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl">
              No departments found. Click "Add Department" to create one.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
