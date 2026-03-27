import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { 
  Search, BookOpen, Filter, Loader2, ArrowRight, 
  LayoutGrid, List as ListIcon, SlidersHorizontal, BookMarked
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

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
  
  // View & Pagination State
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [visibleCount, setVisibleCount] = useState(12);
  const [showFilters, setShowFilters] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState(() => localStorage.getItem("courseCatalogSearch") || "");
  const [selectedDept, setSelectedDept] = useState<string>(() => localStorage.getItem("courseCatalogDept") || "all");
  const [selectedCredits, setSelectedCredits] = useState<string>("all");

  useEffect(() => localStorage.setItem("courseCatalogSearch", searchQuery), [searchQuery]);
  useEffect(() => localStorage.setItem("courseCatalogDept", selectedDept), [selectedDept]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [coursesSnap, depsSnap] = await Promise.all([
          getDocs(collection(db, "courses")),
          getDocs(collection(db, "departments"))
        ]);
        
        const coursesData: Course[] = [];
        coursesSnap.forEach((doc) => coursesData.push({ id: doc.id, ...doc.data() } as Course));
        setCourses(coursesData);

        const depsData: Department[] = [];
        depsSnap.forEach((doc) => depsData.push({ id: doc.id, name: doc.data().name } as Department));
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
      
      let matchesCredits = true;
      if (selectedCredits === "1-2") matchesCredits = course.credits >= 1 && course.credits <= 2;
      if (selectedCredits === "3-4") matchesCredits = course.credits >= 3 && course.credits <= 4;
      if (selectedCredits === "5+") matchesCredits = course.credits >= 5;

      return matchesSearch && matchesDept && matchesCredits;
    });
  }, [courses, searchQuery, selectedDept, selectedCredits]);

  // Reset pagination when filters change
  useEffect(() => setVisibleCount(12), [searchQuery, selectedDept, selectedCredits]);

  const displayedCourses = filteredCourses.slice(0, visibleCount);

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-slate-50 dark:bg-navy-900 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow">
        {/* Premium Hero Section */}
        <div className="relative bg-navy-900 text-white py-20 overflow-hidden">
          {/* Abstract Background Shapes */}
          <div className="absolute top-[-20%] left-[-10%] w-[40%] h-[140%] bg-gold-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[140%] bg-emerald-500/10 blur-[100px] rounded-full mix-blend-screen pointer-events-none" />
          
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-gold-400 text-sm font-semibold mb-4 backdrop-blur-md border border-white/10">
                <BookMarked className="w-4 h-4" /> Academic Year 2025-26
              </span>
              <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight font-display">
                Course <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Catalog</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
                Discover your academic path. Search, filter, and explore our comprehensive curriculum designed for the innovators of tomorrow.
              </p>
            </motion.div>
          </div>
        </div>

        {/* Control Bar */}
        <div className="sticky top-0 z-30 bg-white/80 dark:bg-navy-800/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              
              {/* Search */}
              <div className="relative w-full lg:w-96 flex-shrink-0">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search code or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-navy-900 dark:text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all shadow-inner"
                />
              </div>
              
              {/* Desktop Filters */}
              <div className="hidden lg:flex items-center gap-4 flex-grow justify-end">
                <div className="flex items-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm">
                  <Filter className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={selectedDept}
                    onChange={(e) => setSelectedDept(e.target.value)}
                    className="bg-transparent text-sm font-medium text-navy-900 dark:text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                  </select>
                </div>

                <div className="flex items-center bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl px-3 py-2 shadow-sm">
                  <BookOpen className="h-4 w-4 text-gray-400 mr-2" />
                  <select
                    value={selectedCredits}
                    onChange={(e) => setSelectedCredits(e.target.value)}
                    className="bg-transparent text-sm font-medium text-navy-900 dark:text-white focus:outline-none appearance-none cursor-pointer"
                  >
                    <option value="all">All Credits</option>
                    <option value="1-2">1 - 2 Credits</option>
                    <option value="3-4">3 - 4 Credits</option>
                    <option value="5+">5+ Credits</option>
                  </select>
                </div>

                {/* View Toggle */}
                <div className="flex items-center bg-gray-100 dark:bg-slate-800 p-1 rounded-lg border border-gray-200 dark:border-slate-700">
                  <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow-sm text-navy-900 dark:text-white' : 'text-gray-500 hover:text-navy-900 dark:hover:text-white'}`}>
                    <LayoutGrid className="w-5 h-5" />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white dark:bg-slate-600 shadow-sm text-navy-900 dark:text-white' : 'text-gray-500 hover:text-navy-900 dark:hover:text-white'}`}>
                    <ListIcon className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Mobile Filter Toggle */}
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden w-full flex items-center justify-center gap-2 py-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-navy-900 dark:text-white font-medium"
              >
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </button>
            </div>

            {/* Mobile Filters Dropdown */}
            <AnimatePresence>
              {showFilters && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="lg:hidden overflow-hidden mt-4 space-y-3"
                >
                  <select value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <option value="all">All Departments</option>
                    {departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)}
                  </select>
                  <select value={selectedCredits} onChange={(e) => setSelectedCredits(e.target.value)} className="w-full p-3 bg-gray-50 dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl">
                    <option value="all">All Credits</option>
                    <option value="1-2">1 - 2 Credits</option>
                    <option value="3-4">3 - 4 Credits</option>
                    <option value="5+">5+ Credits</option>
                  </select>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          
          {/* Results Info */}
          {!loading && !error && (
            <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-6">
              Showing <span className="text-navy-900 dark:text-white font-bold">{filteredCourses.length}</span> courses
            </p>
          )}

          {loading ? (
            <div className="flex flex-col justify-center items-center py-32">
              <Loader2 className="h-12 w-12 animate-spin text-gold-500 mb-4" />
              <p className="text-gray-500 font-medium">Loading catalog...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-800/50">
              <p className="font-bold text-lg">{error}</p>
            </div>
          ) : filteredCourses.length === 0 ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-32 bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm">
              <div className="w-20 h-20 bg-gray-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-6">
                <BookOpen className="h-10 w-10 text-gray-400 dark:text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search terms or clearing your filters.</p>
              <button 
                onClick={() => { setSearchQuery(""); setSelectedDept("all"); setSelectedCredits("all"); }}
                className="mt-6 px-6 py-2 bg-gold-500 text-navy-900 font-bold rounded-full hover:bg-gold-400 transition-colors"
              >
                Clear All Filters
              </button>
            </motion.div>
          ) : (
            <>
              <motion.div 
                variants={containerVariants} 
                initial="hidden" 
                animate="show"
                className={viewMode === 'grid' 
                  ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" 
                  : "flex flex-col gap-4"
                }
              >
                {displayedCourses.map(course => (
                  <motion.div variants={itemVariants} key={course.id}>
                    <Link 
                      to={`/courses/${course.id}`}
                      className={`block bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] hover:shadow-xl hover:-translate-y-1 hover:border-gold-300 dark:hover:border-gold-500/50 transition-all duration-300 group overflow-hidden ${viewMode === 'list' ? 'p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6' : 'p-6 h-full flex flex-col relative'}`}
                    >
                      {/* Decorative Gradient Line for Grid */}
                      {viewMode === 'grid' && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-navy-400 to-gold-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      )}

                      <div className={viewMode === 'list' ? 'flex-grow' : ''}>
                        <div className="flex flex-wrap items-center gap-2 mb-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-navy-50 dark:bg-slate-800 text-navy-900 dark:text-gray-200 border border-navy-100 dark:border-slate-700">
                            {course.code}
                          </span>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold bg-gold-50 dark:bg-gold-900/20 text-gold-700 dark:text-gold-400 border border-gold-200 dark:border-gold-900/30">
                            {course.credits} Credits
                          </span>
                        </div>
                        
                        <h3 className={`font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors ${viewMode === 'list' ? 'text-2xl mb-2' : 'text-xl mb-4 line-clamp-2'}`}>
                          {course.title}
                        </h3>
                      </div>

                      <div className={`${viewMode === 'grid' ? 'mt-auto pt-4 border-t border-gray-50 dark:border-slate-800' : 'sm:text-right'} flex items-center justify-between sm:block`}>
                        <p className={`text-sm text-gray-500 dark:text-gray-400 flex items-center ${viewMode === 'list' ? 'sm:justify-end mb-2' : ''}`}>
                          <BookOpen className="w-4 h-4 mr-1.5 opacity-70" />
                          <span className="truncate">{getDepartmentName(course.departmentId)}</span>
                        </p>
                        
                        {viewMode === 'list' && (
                          <span className="inline-flex items-center text-sm font-bold text-gold-600 dark:text-gold-400 group-hover:translate-x-1 transition-transform">
                            View Details <ArrowRight className="w-4 h-4 ml-1" />
                          </span>
                        )}
                        
                        {viewMode === 'grid' && (
                          <ArrowRight className="w-5 h-5 text-gray-300 dark:text-slate-600 group-hover:text-gold-500 group-hover:translate-x-1 transition-all" />
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Load More Button */}
              {visibleCount < filteredCourses.length && (
                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={() => setVisibleCount(prev => prev + 12)}
                    className="px-8 py-3 bg-white dark:bg-slate-900 text-navy-900 dark:text-white font-bold rounded-full border-2 border-gray-200 dark:border-slate-700 hover:border-gold-500 dark:hover:border-gold-500 hover:text-gold-600 transition-colors shadow-sm"
                  >
                    Load More Courses
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}