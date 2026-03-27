import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { 
  Loader2, ArrowLeft, BookOpen, CheckCircle2, AlertCircle,
  Bookmark, Share2, Download, Clock, GraduationCap, ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

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

export function CourseDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [department, setDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Interactive State for Hackathon Polish
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    // Check if course is saved in local storage
    if (id) {
      const savedCourses = JSON.parse(localStorage.getItem("savedCourses") || "[]");
      setIsSaved(savedCourses.includes(id));
    }

    const fetchCourseDetails = async () => {
      if (!id) return;
      try {
        const courseDoc = await getDoc(doc(db, "courses", id));
        if (!courseDoc.exists()) {
          setError("Course not found.");
          setLoading(false);
          return;
        }
        
        const courseData = { id: courseDoc.id, ...courseDoc.data() } as Course;
        setCourse(courseData);

        if (courseData.departmentId) {
          const deptDoc = await getDoc(doc(db, "departments", courseData.departmentId));
          if (deptDoc.exists()) {
            setDepartment({ id: deptDoc.id, name: deptDoc.data().name } as Department);
          }
        }
      } catch (err) {
        console.error("Error fetching course details:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [id]);

  const toggleSaveCourse = () => {
    if (!id) return;
    const savedCourses = JSON.parse(localStorage.getItem("savedCourses") || "[]");
    if (isSaved) {
      const newSaved = savedCourses.filter((courseId: string) => courseId !== id);
      localStorage.setItem("savedCourses", JSON.stringify(newSaved));
    } else {
      localStorage.setItem("savedCourses", JSON.stringify([...savedCourses, id]));
    }
    setIsSaved(!isSaved);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
        <TopBar />
        <Header />
        {/* Hackathon UX Flex: Skeleton Loader instead of a spinner */}
        <main className="flex-grow animate-pulse">
          <div className="bg-navy-900 py-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="h-4 bg-navy-700 rounded w-32 mb-6"></div>
              <div className="flex gap-3 mb-4">
                <div className="h-6 bg-navy-700 rounded-full w-20"></div>
                <div className="h-6 bg-navy-700 rounded-full w-24"></div>
              </div>
              <div className="h-10 bg-navy-700 rounded w-3/4 mb-4"></div>
              <div className="h-10 bg-navy-700 rounded w-1/2"></div>
            </div>
          </div>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-8">
                <div className="h-64 bg-gray-200 dark:bg-slate-800 rounded-2xl"></div>
                <div className="h-48 bg-gray-200 dark:bg-slate-800 rounded-2xl"></div>
              </div>
              <div className="h-96 bg-gray-200 dark:bg-slate-800 rounded-2xl"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
        <TopBar />
        <Header />
        <main className="flex-grow flex flex-col justify-center items-center p-4">
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-8 rounded-3xl max-w-md text-center border border-red-100 dark:border-red-800/50 shadow-sm">
            <AlertCircle className="h-16 w-16 mx-auto mb-4 text-red-500" />
            <h2 className="text-2xl font-bold mb-2">Course Unavailable</h2>
            <p className="text-sm opacity-80">{error || "The course you are looking for does not exist or has been removed."}</p>
            <Link to="/courses" className="mt-8 inline-flex items-center px-6 py-3 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-full font-bold hover:bg-red-200 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Return to Catalog
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow">
        {/* EdTech Style Premium Header */}
        <div className="relative bg-navy-900 text-white pt-12 pb-20 overflow-hidden border-b-4 border-gold-500">
          {/* Abstract Background Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none"></div>
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumbs */}
            <nav className="flex items-center text-sm text-gray-400 mb-8">
              <Link to="/courses" className="hover:text-gold-400 transition-colors">Catalog</Link>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-gray-200">{department?.name || "Department"}</span>
              <ChevronRight className="w-4 h-4 mx-2" />
              <span className="text-white font-medium truncate">{course.code}</span>
            </nav>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-black bg-white text-navy-900 shadow-sm shadow-white/20">
                  {course.code}
                </span>
                <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30 backdrop-blur-sm">
                  <GraduationCap className="w-4 h-4 mr-2" />
                  {course.credits} Credits
                </span>
                {department && (
                  <span className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-gray-300 border border-white/10 backdrop-blur-sm">
                    <BookOpen className="w-4 h-4 mr-2 opacity-70" />
                    {department.name}
                  </span>
                )}
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight font-display text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {course.title}
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Two-Column Layout */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Column: Main Content */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Description Section */}
              <motion.section 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-navy-900/5 border border-gray-100 dark:border-slate-800"
              >
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6 border-b border-gray-100 dark:border-slate-800 pb-4">About this Course</h2>
                {course.description ? (
                  <div 
                    className="prose dark:prose-invert prose-lg max-w-none text-gray-600 dark:text-gray-300 leading-relaxed marker:text-gold-500"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic bg-gray-50 dark:bg-slate-800 p-4 rounded-xl border border-dashed border-gray-200 dark:border-slate-700">Detailed curriculum description is currently being updated for the upcoming semester.</p>
                )}
              </motion.section>

              {/* Learning Outcomes Section */}
              {course.learningOutcomes && (
                <motion.section 
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                  className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-xl shadow-navy-900/5 border border-gray-100 dark:border-slate-800"
                >
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">What You Will Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {course.learningOutcomes.split('\n').filter(line => line.trim() !== '').map((outcome, index) => (
                      <div key={index} className="flex items-start bg-gray-50 dark:bg-slate-800/50 p-4 rounded-xl border border-gray-100 dark:border-slate-800">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500 mr-3 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{outcome}</span>
                      </div>
                    ))}
                  </div>
                </motion.section>
              )}
            </div>

            {/* Right Column: Action Sidebar */}
            <div className="space-y-6">
              
              {/* Floating Action Card */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}
                className="bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl shadow-navy-900/10 border border-gray-100 dark:border-slate-800 sticky top-24"
              >
                {/* Action Buttons */}
                <div className="flex flex-col gap-3 mb-8">
                  <button 
                    onClick={toggleSaveCourse}
                    className={`w-full flex items-center justify-center py-3.5 rounded-xl font-bold transition-all ${
                      isSaved 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50' 
                        : 'bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 mr-2 ${isSaved ? 'fill-current' : ''}`} />
                    {isSaved ? 'Saved to Planner' : 'Save Course'}
                  </button>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700">
                      <Download className="w-4 h-4 mr-2" /> Syllabus
                    </button>
                    <button className="flex items-center justify-center py-2.5 bg-gray-50 dark:bg-slate-800 rounded-xl text-sm font-bold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors border border-gray-200 dark:border-slate-700">
                      <Share2 className="w-4 h-4 mr-2" /> Share
                    </button>
                  </div>
                </div>

                {/* Course Metadata */}
                <h3 className="text-sm font-black text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-4 border-b border-gray-100 dark:border-slate-800 pb-2">Course Details</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Clock className="w-5 h-5 text-gold-500 mr-3 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-gray-500 dark:text-gray-400">Duration</span>
                      <span className="text-sm font-semibold text-navy-900 dark:text-white">1 Full Semester</span>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BookOpen className="w-5 h-5 text-gold-500 mr-3 mt-0.5" />
                    <div>
                      <span className="block text-xs font-bold text-gray-500 dark:text-gray-400">Department</span>
                      <span className="text-sm font-semibold text-navy-900 dark:text-white">{department?.name || "N/A"}</span>
                    </div>
                  </li>
                </ul>

                {/* Prerequisites Box */}
                <div className="mt-8 p-4 bg-amber-50 dark:bg-amber-900/10 rounded-2xl border border-amber-100 dark:border-amber-900/30">
                  <h3 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-2 flex items-center">
                    <AlertCircle className="w-4 h-4 mr-1.5" /> Prerequisites
                  </h3>
                  {course.prerequisites ? (
                    <p className="text-sm text-amber-900/80 dark:text-amber-200/70 font-medium">
                      {course.prerequisites}
                    </p>
                  ) : (
                    <p className="text-sm text-amber-900/60 dark:text-amber-200/50 italic">No prior courses required.</p>
                  )}
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}