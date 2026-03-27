import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { Search, BookOpen, Filter, Loader2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  code: string;
  title: string;
  departmentId: string;
  credits: number;
}

interface Department {
  id: string;
  name: string;
}

export function CourseCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem("courseCatalogSearch") || "";
  });
  const [selectedDept, setSelectedDept] = useState<string>(() => {
    return localStorage.getItem("courseCatalogDept") || "all";
  });

  useEffect(() => {
    localStorage.setItem("courseCatalogSearch", searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("courseCatalogDept", selectedDept);
  }, [selectedDept]);

  useEffect(() => {
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
        setError("Failed to load course catalog.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getDepartmentName = (id: string) => {
    return departments.find(d => d.id === id)?.name || "Unknown Department";
  };

  const filteredCourses = useMemo(() => {
    return courses.filter(course => {
      const matchesSearch = 
        course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.title.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesDept = selectedDept === "all" || course.departmentId === selectedDept;
      
      return matchesSearch && matchesDept;
    });
  }, [courses, searchQuery, selectedDept]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-navy-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Course Catalog</h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Explore our comprehensive range of academic courses across all departments.
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Filters */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search by course code or title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-full p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
              />
            </div>
            
            <div className="flex items-center w-full md:w-auto gap-3">
              <Filter className="h-5 w-5 text-gray-400" />
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="w-full md:w-64 p-3 border border-gray-200 dark:border-slate-700 rounded-xl bg-gray-50 dark:bg-slate-800 text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="all">All Departments</option>
                {departments.map(dept => (
                  <option key={dept.id} value={dept.id}>{dept.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-gold-500" />
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-2xl">
              {error}
            </div>
          ) : filteredCourses.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800">
              <BookOpen className="h-16 w-16 text-gray-300 dark:text-slate-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filter criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map(course => (
                <Link 
                  key={course.id} 
                  to={`/courses/${course.id}`}
                  className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md hover:border-gold-500/50 dark:hover:border-gold-500/50 transition-all group flex flex-col h-full"
                >
                  <div className="flex justify-between items-start mb-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-navy-50 dark:bg-slate-800 text-navy-900 dark:text-gray-200 border border-navy-100 dark:border-slate-700">
                      {course.code}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 border border-gold-200 dark:border-gold-900/30">
                      {course.credits} Credits
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                    {course.title}
                  </h3>
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      {getDepartmentName(course.departmentId)}
                    </p>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-gold-500 transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
