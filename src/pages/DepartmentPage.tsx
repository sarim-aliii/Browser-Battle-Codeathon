import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { departmentsData } from "../data/departments";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { ArrowLeft, BookOpen, Users, Lightbulb, GraduationCap, Search, Bell, AlertCircle } from "lucide-react";
import { ExamSchedule } from "../components/academics/ExamSchedule";
import { db } from "../lib/firebase";
import { collection, query, where, orderBy, onSnapshot, limit } from "firebase/firestore";

function ExamNotices({ departmentId }: { departmentId: string }) {
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Query for notices belonging to this department OR 'all'
    const q = query(
      collection(db, 'exam-notices'),
      where('department', 'in', [departmentId, 'all']),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const noticesData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotices(noticesData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching exam notices:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [departmentId]);

  if (loading) return <div className="animate-pulse h-20 bg-gray-100 dark:bg-slate-800 rounded-xl"></div>;
  if (notices.length === 0) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-100 dark:border-slate-800 overflow-hidden shadow-sm">
      <div className="bg-gold-500/10 dark:bg-gold-500/5 px-4 py-3 border-b border-gold-500/20 flex items-center">
        <Bell className="w-5 h-5 text-gold-600 dark:text-gold-400 mr-2" />
        <h3 className="font-bold text-navy-900 dark:text-white text-sm uppercase tracking-wider">Latest Exam Notices</h3>
      </div>
      <div className="divide-y divide-gray-100 dark:divide-slate-800">
        {notices.map((notice) => (
          <div key={notice.id} className="p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
            <div className="flex items-start gap-3">
              {notice.isUrgent && <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />}
              <div>
                <h4 className={`font-bold text-sm ${notice.isUrgent ? 'text-red-600 dark:text-red-400' : 'text-navy-900 dark:text-white'}`}>
                  {notice.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{notice.content}</p>
                <p className="text-[10px] text-gray-400 mt-2">
                  {notice.createdAt?.toDate ? new Date(notice.createdAt.toDate()).toLocaleDateString() : 'Recently'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const department = id ? departmentsData[id] : null;
  const [facultySearchQuery, setFacultySearchQuery] = useState("");

  const filteredFaculty = useMemo(() => {
    if (!department) return [];
    if (!facultySearchQuery.trim()) return department.faculty;
    
    const query = facultySearchQuery.toLowerCase();
    return department.faculty.filter((member: any) => {
      const nameMatch = member.name.toLowerCase().includes(query);
      const researchMatch = member.researchInterests?.some((interest: string) => 
        interest.toLowerCase().includes(query)
      );
      return nameMatch || researchMatch;
    });
  }, [department, facultySearchQuery]);

    if (!department) {
      return (
        <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
          <TopBar />
          <Header />
          <main className="flex-grow flex items-center justify-center flex-col">
            <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Department Not Found</h1>
            <Link to="/" className="text-gold-500 hover:text-gold-600 dark:hover:text-gold-400 flex items-center">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
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
        {/* Department Hero */}
        <div className="relative h-80 bg-navy-900">
          <div className="absolute inset-0">
            <img 
              src={department.image} 
              alt={department.name} 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
              {department.name}
            </h1>
            <div className="w-24 h-1 bg-gold-500 rounded"></div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* About */}
              <section>
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6 flex items-center">
                  <BookOpen className="w-8 h-8 mr-3 text-gold-500 dark:text-gold-400" />
                  About the Department
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {department.description}
                </p>
              </section>

              {/* Courses */}
              <section>
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6 flex items-center">
                  <GraduationCap className="w-8 h-8 mr-3 text-gold-500 dark:text-gold-400" />
                  Academic Programs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {department.courses.map((course: any, idx: number) => (
                    <div key={idx} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-md transition-shadow">
                      <div className="text-xs font-bold text-gold-600 dark:text-gold-400 uppercase tracking-wider mb-2">{course.type}</div>
                      <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2">{course.name}</h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">Duration: {course.duration}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Research */}
              <section>
                <h2 className="text-3xl font-bold text-navy-900 dark:text-white mb-6 flex items-center">
                  <Lightbulb className="w-8 h-8 mr-3 text-gold-500 dark:text-gold-400" />
                  Research Areas
                </h2>
                <div className="flex flex-wrap gap-3">
                  {department.research.map((area: string, idx: number) => (
                    <span key={idx} className="bg-navy-50 dark:bg-slate-800 text-navy-900 dark:text-gray-200 px-4 py-2 rounded-full text-sm font-medium border border-navy-100 dark:border-slate-700">
                      {area}
                    </span>
                  ))}
                </div>
              </section>

              {/* Exam Schedule */}
              <section id="exam-schedule" className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-grow">
                    <ExamSchedule department={department.name} />
                  </div>
                  <div className="md:w-80 shrink-0">
                    <ExamNotices departmentId={department.id} />
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar: Faculty */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-24">
                <div className="bg-navy-900 dark:bg-slate-800 text-white py-4 px-6 flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="w-6 h-6 mr-3 text-gold-500 dark:text-gold-400" />
                    <h3 className="text-xl font-bold">Key Faculty</h3>
                  </div>
                </div>
                
                <div className="p-4 border-b border-gray-100 dark:border-slate-800 bg-gray-50 dark:bg-slate-950/50">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search by name or research..."
                      value={facultySearchQuery}
                      onChange={(e) => setFacultySearchQuery(e.target.value)}
                      className="pl-9 w-full p-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900 text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="p-6 space-y-6 max-h-[600px] overflow-y-auto">
                  {filteredFaculty.length > 0 ? (
                    filteredFaculty.map((member: any, idx: number) => (
                      <Link key={idx} to={`/department/${department.id}/faculty/${member.id}`} className="flex items-center gap-4 group cursor-pointer">
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-100 dark:border-slate-700 group-hover:border-gold-500 transition-colors"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">{member.name}</h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">{member.role}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-4 text-gray-500 dark:text-gray-400 text-sm">
                      No faculty members found matching "{facultySearchQuery}".
                    </div>
                  )}
                </div>
                <div className="bg-gray-50 dark:bg-slate-950 p-4 border-t border-gray-100 dark:border-slate-800 text-center">
                  <Link to="/about/staff-details" className="text-navy-700 dark:text-gray-300 font-semibold text-sm hover:text-gold-600 dark:hover:text-gold-400 transition-colors">
                    View All Faculty
                  </Link>
                </div>
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
