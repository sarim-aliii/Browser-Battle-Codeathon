import { useState, useEffect, useMemo, useRef } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, BookOpen, Plus, Edit2, Trash2, X, Check, Search, AlertCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { motion, AnimatePresence } from "motion/react";
import { Magnetic } from "../ui/Magnetic"; // Make sure this path is correct

interface Course {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  credits: number;
  description?: string;
  prerequisites?: string;
  learningOutcomes?: string;
}

interface Department {
  id: string;
  name: string;
}

export function CourseManagement() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({ 
    code: "", 
    title: "", 
    departmentId: "", 
    credits: 3, 
    description: "",
    prerequisites: "",
    learningOutcomes: ""
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesSnap, depsSnap] = await Promise.all([
        getDocs(collection(db, "courses")),
        getDocs(collection(db, "departments"))
      ]);
      
      const coursesData: Course[] = [];
      coursesSnap.forEach((doc) => {
        coursesData.push({ id: doc.id, ...doc.data() } as Course);
      });
      setCourses(coursesData);

      const depsData: Department[] = [];
      depsSnap.forEach((doc) => {
        depsData.push({ id: doc.id, name: doc.data().name } as Department);
      });
      setDepartments(depsData);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load courses.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!formData.code || !formData.title || !formData.departmentId) return;
    try {
      if (editingId) {
        const courseRef = doc(db, "courses", editingId);
        await updateDoc(courseRef, formData);
        setCourses(courses.map(c => c.id === editingId ? { ...c, ...formData } : c));
        setEditingId(null);
      } else {
        const docRef = await addDoc(collection(db, "courses"), formData);
        setCourses([...courses, { id: docRef.id, ...formData }]);
        setIsAdding(false);
      }
      setFormData({ code: "", title: "", departmentId: "", credits: 3, description: "", prerequisites: "", learningOutcomes: "" });
    } catch (err) {
      console.error("Error saving course:", err);
      alert("Failed to save course.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteDoc(doc(db, "courses", id));
      setCourses(courses.filter(c => c.id !== id));
    } catch (err) {
      console.error("Error deleting course:", err);
      alert("Failed to delete course.");
    }
  };

  const startEdit = (course: Course) => {
    setEditingId(course.id);
    setFormData({ 
      code: course.code, 
      title: course.title, 
      departmentId: course.departmentId, 
      credits: course.credits,
      description: course.description || "",
      prerequisites: course.prerequisites || "",
      learningOutcomes: course.learningOutcomes || ""
    });
    setIsAdding(false);
  };

  const cancelEdit = () => {
    setIsAdding(false);
    setEditingId(null);
    setFormData({ code: "", title: "", departmentId: "", credits: 3, description: "", prerequisites: "", learningOutcomes: "" });
  };

  const getDepartmentName = (id: string) => {
    return departments.find(d => d.id === id)?.name || "Unknown Department";
  };

  const filteredCourses = useMemo(() => {
    if (!searchQuery.trim()) return courses;
    const query = searchQuery.toLowerCase();
    return courses.filter(course => {
      const codeMatch = course.code.toLowerCase().includes(query);
      const titleMatch = course.title.toLowerCase().includes(query);
      const deptMatch = getDepartmentName(course.departmentId).toLowerCase().includes(query);
      return codeMatch || titleMatch || deptMatch;
    });
  }, [courses, searchQuery, departments]);

  // GSAP Animation for Table Rows
  useGSAP(() => {
    gsap.fromTo('.course-row',
      { opacity: 0, y: 15 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.05, 
        duration: 0.4, 
        ease: "power2.out",
        overwrite: true 
      }
    );
  }, { dependencies: [filteredCourses, loading], scope: containerRef });

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-gold-500 mb-4" />
        <p className="text-gray-500 dark:text-gray-400 font-medium animate-pulse">Loading curriculum data...</p>
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />

      {/* Header Section */}
      <div className="p-6 md:p-8 border-b border-gray-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
        <div>
          <h2 className="text-2xl font-black text-navy-900 dark:text-white flex items-center group">
            <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mr-3 transition-transform group-hover:scale-110">
              <BookOpen className="h-5 w-5 text-gold-500" />
            </div>
            Course Management
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 font-medium">
            Manage course catalog and department assignments securely.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
          {/* Enhanced Search Input */}
          <div className="relative group/search w-full sm:w-72">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within/search:text-gold-500" />
            <input
              type="text"
              placeholder="Search by code, title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 pr-4 py-2.5 w-full border border-gray-200 dark:border-white/10 rounded-xl bg-gray-50 dark:bg-slate-800 text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all shadow-sm"
            />
          </div>
          
          {/* Add Course Button with Magnetic Pull */}
          <Magnetic intensity={0.2}>
            <button
              onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ code: "", title: "", departmentId: "", credits: 3, description: "", prerequisites: "", learningOutcomes: "" }); }}
              className="flex items-center justify-center px-6 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-900 rounded-xl transition-all shadow-lg hover:shadow-gold-500/30 text-sm font-bold whitespace-nowrap group"
            >
              <Plus className="w-4 h-4 mr-2 transition-transform group-hover:rotate-90" />
              Add Course
            </button>
          </Magnetic>
        </div>
      </div>

      <div className="p-6 md:p-8 relative z-10">
        {/* Animated Form Expansion using Framer Motion */}
        <AnimatePresence>
          {(isAdding || editingId) && (
            <motion.div 
              initial={{ height: 0, opacity: 0, y: -20 }}
              animate={{ height: "auto", opacity: 1, y: 0 }}
              exit={{ height: 0, opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="mb-8 p-6 md:p-8 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-200 dark:border-white/10 shadow-inner">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white flex items-center">
                    {editingId ? <Edit2 className="w-5 h-5 mr-2 text-gold-500" /> : <Plus className="w-5 h-5 mr-2 text-gold-500" />}
                    {editingId ? "Edit Course Details" : "Create New Course"}
                  </h3>
                  <button onClick={cancelEdit} className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Course Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                      placeholder="e.g. CS101"
                    />
                  </div>
                  <div className="lg:col-span-2">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Course Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                      placeholder="e.g. Intro to Computer Science"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Credits</label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={formData.credits}
                      onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Department</label>
                    <select
                      value={formData.departmentId}
                      onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow appearance-none"
                    >
                      <option value="">Select a department...</option>
                      {departments.map(d => (
                        <option key={d.id} value={d.id}>{d.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Prerequisites</label>
                    <input
                      type="text"
                      value={formData.prerequisites}
                      onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow"
                      placeholder="e.g. CS100 or equivalent"
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Learning Outcomes</label>
                    <textarea
                      value={formData.learningOutcomes}
                      onChange={(e) => setFormData({ ...formData, learningOutcomes: e.target.value })}
                      className="w-full p-3 border border-gray-200 dark:border-white/10 rounded-xl bg-white dark:bg-slate-900 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-shadow min-h-[100px]"
                      placeholder="List the learning outcomes..."
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-4">
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">Course Description & Syllabus</label>
                    <div className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 focus-within:ring-2 focus-within:ring-gold-500 transition-shadow">
                      <ReactQuill 
                        theme="snow" 
                        value={formData.description} 
                        onChange={(val) => setFormData({ ...formData, description: val })}
                        className="h-48 mb-12 text-navy-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-white/10">
                  <button 
                    onClick={cancelEdit} 
                    className="px-6 py-2.5 text-gray-600 dark:text-gray-300 font-bold hover:bg-gray-200 dark:hover:bg-white/10 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <Magnetic intensity={0.1}>
                    <button 
                      onClick={handleSave} 
                      disabled={!formData.code || !formData.title || !formData.departmentId} 
                      className="px-8 py-2.5 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center shadow-lg hover:shadow-gold-500/30"
                    >
                      <Check className="w-5 h-5 mr-2" /> Save Changes
                    </button>
                  </Magnetic>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Data Table */}
        <div className="overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 shadow-sm">
          <table className="w-full text-left border-collapse bg-white dark:bg-slate-900/40">
            <thead>
              <tr className="bg-gray-50/80 dark:bg-slate-800/80 border-b border-gray-200 dark:border-white/10">
                <th className="px-6 py-4 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Title</th>
                <th className="px-6 py-4 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Credits</th>
                <th className="px-6 py-4 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredCourses.map((course) => (
                <tr key={course.id} className="course-row group hover:bg-gold-50/30 dark:hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-200 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                      {course.code}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {course.title}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {getDepartmentName(course.departmentId)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-medium">
                    {course.credits}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end space-x-2">
                      <button 
                        onClick={() => startEdit(course)} 
                        className="p-2 text-gray-400 hover:text-gold-500 hover:bg-gold-50 dark:hover:bg-gold-500/10 rounded-lg transition-all group/btn"
                        title="Edit Course"
                      >
                        <Edit2 className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
                      </button>
                      <button 
                        onClick={() => handleDelete(course.id)} 
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-all group/btn"
                        title="Delete Course"
                      >
                        <Trash2 className="w-4 h-4 transition-transform group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {/* Empty State */}
              {filteredCourses.length === 0 && !isAdding && !editingId && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center space-y-3">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-2">
                        <BookOpen className="w-8 h-8 text-gray-400" />
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 font-medium text-lg">
                        {searchQuery ? "No courses match your search." : "Your course catalog is empty."}
                      </p>
                      {searchQuery ? (
                        <button onClick={() => setSearchQuery("")} className="text-gold-500 font-bold hover:underline">Clear Search</button>
                      ) : (
                        <button onClick={() => setIsAdding(true)} className="text-gold-500 font-bold hover:underline">Add your first course</button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}