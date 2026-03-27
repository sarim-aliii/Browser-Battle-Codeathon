import { useState, useEffect, useRef } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, Building2, Plus, Edit2, Trash2, X, Check, Users, AlignLeft, AlertCircle } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import { Magnetic } from "../ui/Magnetic"; // Ensure this path is correct

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
  const containerRef = useRef<HTMLDivElement>(null);
  
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

  // GSAP Animation for staggered card entrance
  useGSAP(() => {
    if (!loading && departments.length > 0) {
      gsap.fromTo('.dept-card',
        { opacity: 0, scale: 0.95, y: 20 },
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          stagger: 0.08, 
          duration: 0.5, 
          ease: "back.out(1.2)",
          overwrite: true
        }
      );
    }
  }, { dependencies: [departments, loading], scope: containerRef });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gold-500 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading departments...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center">
        <AlertCircle className="w-6 h-6 mr-3" />
        <span className="font-semibold">{error}</span>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-900/50 backdrop-blur-xl rounded-3xl shadow-xl border border-gray-200 dark:border-white/10 overflow-hidden relative">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div>
          <h2 className="text-2xl font-black text-navy-900 dark:text-white flex items-center group">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mr-3 transition-transform group-hover:scale-110 group-hover:rotate-6">
              <Building2 className="h-5 w-5 text-gold-500" />
            </div>
            Academic Departments
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Manage university departments and assign faculty leadership.
          </p>
        </div>
        
        <Magnetic intensity={0.2}>
          <button
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ name: "", facultyLead: "", description: "" }); }}
            className="flex items-center justify-center px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-xl transition-all shadow-lg hover:shadow-gold-500/30 text-sm font-bold whitespace-nowrap group w-full md:w-auto"
          >
            <Plus className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" />
            Add Department
          </button>
        </Magnetic>
      </div>

      <div className="p-6 md:p-8 relative z-10">
        
        {/* Animated Form Expansion using Framer Motion */}
        <AnimatePresence>
          {isAdding && (
            <motion.div 
              initial={{ height: 0, opacity: 0, y: -10 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mb-8 p-6 md:p-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-white/10 shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white flex items-center">
                    <Building2 className="w-5 h-5 mr-2 text-gold-500" />
                    Create New Department
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Department Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                      placeholder="e.g. Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Faculty Lead</label>
                    <input
                      type="text"
                      value={formData.facultyLead}
                      onChange={(e) => setFormData({ ...formData, facultyLead: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                      placeholder="e.g. Dr. Alan Turing"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                      placeholder="Brief description of the department's focus and goals..."
                      rows={3}
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-white/10">
                  <button onClick={() => setIsAdding(false)} className="px-6 py-2.5 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-colors">
                    Cancel
                  </button>
                  <Magnetic intensity={0.1}>
                    <button onClick={handleAdd} disabled={!formData.name} className="px-8 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all disabled:opacity-50 flex items-center shadow-lg hover:shadow-gold-500/30">
                      <Check className="w-5 h-5 mr-2" /> Save Department
                    </button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Department Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {departments.map((dep) => (
            <div key={dep.id} className="dept-card bg-white dark:bg-slate-800/80 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-gold-500/30 transition-all duration-300 group flex flex-col">
              
              {/* Inline Edit Mode */}
              {editingId === dep.id ? (
                <div className="space-y-4 flex-grow flex flex-col">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-slate-900 text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500 outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Lead</label>
                    <input
                      type="text"
                      value={formData.facultyLead}
                      onChange={(e) => setFormData({ ...formData, facultyLead: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-slate-900 text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500 outline-none"
                    />
                  </div>
                  <div className="flex-grow">
                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full p-2.5 border border-gray-200 dark:border-white/10 rounded-lg bg-gray-50 dark:bg-slate-900 text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500 outline-none resize-none"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end space-x-2 pt-3 border-t border-gray-100 dark:border-white/10 mt-auto">
                    <button onClick={() => setEditingId(null)} className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"><X className="w-4 h-4" /></button>
                    <button onClick={() => handleUpdate(dep.id)} className="p-2 text-navy-900 bg-gold-500 hover:bg-gold-400 rounded-lg transition-colors shadow-lg"><Check className="w-4 h-4" /></button>
                  </div>
                </div>
              ) : (
                /* Standard Display Mode */
                <div className="flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center mr-3 group-hover:bg-gold-500/10 transition-colors">
                        <Building2 className="w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gold-500 transition-colors" />
                      </div>
                      <h3 className="text-lg font-black tracking-tight text-navy-900 dark:text-white line-clamp-2">{dep.name}</h3>
                    </div>
                    
                    {/* Actions (fade in on hover) */}
                    <div className="flex space-x-1 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                      <button onClick={() => startEdit(dep)} className="p-2 text-gray-400 hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-500/10 rounded-lg transition-all" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(dep.id)} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4 flex-grow">
                    <div className="bg-gray-50 dark:bg-slate-900/50 rounded-xl p-3 border border-gray-100 dark:border-white/5">
                      <div className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        <Users className="w-3 h-3 mr-1.5 text-gold-500" /> Faculty Lead
                      </div>
                      <p className="text-sm font-semibold text-navy-900 dark:text-gray-200">{dep.facultyLead || "Not assigned"}</p>
                    </div>

                    <div>
                      <div className="flex items-center text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        <AlignLeft className="w-3 h-3 mr-1.5 text-gold-500" /> Description
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 leading-relaxed">
                        {dep.description || "No description provided."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {/* Empty State */}
          {departments.length === 0 && !isAdding && (
            <div className="col-span-full py-16 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-white/10 rounded-3xl bg-gray-50/50 dark:bg-slate-800/30">
              <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center mb-4">
                <Building2 className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-2">No Departments Yet</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-sm">Start building your academic structure by adding your first department.</p>
              <button onClick={() => setIsAdding(true)} className="text-gold-500 font-bold hover:underline flex items-center">
                <Plus className="w-4 h-4 mr-1" /> Add First Department
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}