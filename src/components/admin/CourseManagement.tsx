import { useState, useEffect, useMemo } from "react";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { Loader2, BookOpen, Plus, Edit2, Trash2, X, Check, Search } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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

  if (loading) {
    return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-indigo-500" /></div>;
  }

  if (error) {
    return <div className="p-4 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-lg">{error}</div>;
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center">
            <BookOpen className="mr-2 h-5 w-5 text-indigo-500" />
            Course Management
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage course catalog and department assignments.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            onClick={() => { setIsAdding(true); setEditingId(null); setFormData({ code: "", title: "", departmentId: "", credits: 3, description: "", prerequisites: "", learningOutcomes: "" }); }}
            className="flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors text-sm font-medium whitespace-nowrap"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Course
          </button>
        </div>
      </div>

      <div className="p-6">
        {(isAdding || editingId) && (
          <div className="mb-6 p-4 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              {editingId ? "Edit Course" : "Add New Course"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. CS101"
                />
              </div>
              <div className="lg:col-span-2">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. Intro to Computer Science"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Credits</label>
                <input
                  type="number"
                  min="1"
                  max="6"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Department</label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="">Select a department...</option>
                  {departments.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Prerequisites</label>
                <input
                  type="text"
                  value={formData.prerequisites}
                  onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  placeholder="e.g. CS100 or equivalent"
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Learning Outcomes</label>
                <textarea
                  value={formData.learningOutcomes}
                  onChange={(e) => setFormData({ ...formData, learningOutcomes: e.target.value })}
                  className="w-full p-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white h-24"
                  placeholder="List the learning outcomes..."
                />
              </div>
              <div className="md:col-span-2 lg:col-span-4">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Course Description & Syllabus</label>
                <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-600">
                  <ReactQuill 
                    theme="snow" 
                    value={formData.description} 
                    onChange={(val) => setFormData({ ...formData, description: val })}
                    className="h-48 mb-12 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-2 mt-4">
              <button onClick={cancelEdit} className="px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">Cancel</button>
              <button onClick={handleSave} disabled={!formData.code || !formData.title || !formData.departmentId} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center">
                <Check className="w-4 h-4 mr-2" /> Save
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Code</th>
                <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Title</th>
                <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Department</th>
                <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">Credits</th>
                <th className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id} className="border-b border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="p-4 text-sm font-medium text-indigo-600 dark:text-indigo-400">{course.code}</td>
                  <td className="p-4 text-sm font-semibold text-slate-900 dark:text-slate-200">{course.title}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{getDepartmentName(course.departmentId)}</td>
                  <td className="p-4 text-sm text-slate-600 dark:text-slate-400">{course.credits}</td>
                  <td className="p-4 text-sm text-right">
                    <div className="flex justify-end space-x-2">
                      <button onClick={() => startEdit(course)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors"><Edit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(course.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCourses.length === 0 && !isAdding && !editingId && (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 dark:text-slate-400">
                    {searchQuery ? "No courses match your search." : "No courses found. Click \"Add Course\" to create one."}
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
