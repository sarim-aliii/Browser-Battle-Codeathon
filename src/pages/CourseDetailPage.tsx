import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { Loader2, ArrowLeft, BookOpen, CheckCircle2, AlertCircle } from "lucide-react";

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

  useEffect(() => {
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

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
        <TopBar />
        <Header />
        <main className="flex-grow flex justify-center items-center">
          <Loader2 className="h-12 w-12 animate-spin text-gold-500" />
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
          <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-6 rounded-2xl max-w-md text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Error</h2>
            <p>{error || "Course not found."}</p>
            <Link to="/courses" className="mt-6 inline-flex items-center text-red-600 dark:text-red-400 hover:underline">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Catalog
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
        {/* Header Section */}
        <div className="bg-navy-900 text-white py-12 md:py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to="/courses" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Course Catalog
            </Link>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-navy-800 text-gray-200 border border-navy-700">
                {course.code}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-gold-500/20 text-gold-400 border border-gold-500/30">
                {course.credits} Credits
              </span>
              {department && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {department.name}
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{course.title}</h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Course Description</h2>
                {course.description ? (
                  <div 
                    className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No description available for this course.</p>
                )}
              </section>

              {/* Learning Outcomes */}
              {course.learningOutcomes && (
                <section className="bg-white dark:bg-slate-900 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6">Learning Outcomes</h2>
                  <div className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-xl border border-indigo-100 dark:border-indigo-800/30">
                    <ul className="space-y-3">
                      {course.learningOutcomes.split('\n').filter(line => line.trim() !== '').map((outcome, index) => (
                        <li key={index} className="flex items-start text-gray-700 dark:text-gray-300">
                          <CheckCircle2 className="w-5 h-5 text-indigo-500 mr-3 shrink-0 mt-0.5" />
                          <span>{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Prerequisites Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 text-gold-500 mr-2" />
                  Prerequisites
                </h3>
                {course.prerequisites ? (
                  <p className="text-gray-600 dark:text-gray-300 font-medium">
                    {course.prerequisites}
                  </p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">None</p>
                )}
              </div>

              {/* Quick Info Card */}
              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                <h3 className="text-lg font-bold text-navy-900 dark:text-white mb-4">Quick Info</h3>
                <ul className="space-y-4">
                  <li>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Course Code</span>
                    <span className="font-semibold text-navy-900 dark:text-white">{course.code}</span>
                  </li>
                  <li>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Credits</span>
                    <span className="font-semibold text-navy-900 dark:text-white">{course.credits}</span>
                  </li>
                  <li>
                    <span className="block text-sm text-gray-500 dark:text-gray-400">Department</span>
                    <span className="font-semibold text-navy-900 dark:text-white">{department?.name || "N/A"}</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  );
}
