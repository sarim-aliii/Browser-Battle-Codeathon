import { useState, useMemo, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { departmentsData } from "../data/departments";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { 
  ArrowLeft, BookOpen, Users, Lightbulb, 
  GraduationCap, Search, Bell, AlertCircle, 
  ChevronRight, Award, Target, Briefcase
} from "lucide-react";
import { ExamSchedule } from "../components/academics/ExamSchedule";
import { db } from "../lib/firebase";
import { collection, query, where, orderBy, onSnapshot, limit } from "firebase/firestore";
import { motion } from "motion/react";

// ... (Keep your ExamNotices component exactly as it is)
function ExamNotices({ departmentId }: { departmentId: string }) {
  // ... existing ExamNotices code ...
  return null; // Placeholder for brevity, keep your actual code here
}

export function DepartmentPage() {
  const { id } = useParams<{ id: string }>();
  const department = id ? (departmentsData as any)[id] : null;
  const [facultySearchQuery, setFacultySearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("about");

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
          <Link to="/" className="text-gold-500 hover:text-gold-600 dark:hover:text-gold-400 flex items-center bg-gold-500/10 px-6 py-3 rounded-full transition-all">
            <ArrowLeft className="w-4 h-4 mr-2" /> Return to Campus
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      <main className="flex-grow">
        {/* Cinematic Hero Section */}
        <div className="relative h-[60vh] min-h-[400px] bg-navy-900 overflow-hidden flex items-center">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img 
              src={department.image} 
              alt={department.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Gradient Overlay for better text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/60 to-transparent" />
          </motion.div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-12">
            <motion.nav 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center text-sm text-gray-300 mb-6 font-medium"
            >
              <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
              <Link to="/departments" className="hover:text-gold-400 transition-colors">Departments</Link>
              <ChevronRight className="w-4 h-4 mx-2 text-gray-500" />
              <span className="text-white">{department.name}</span>
            </motion.nav>

            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-3xl">
              <motion.span variants={fadeUp} className="inline-block py-1 px-3 rounded-full bg-gold-500/20 border border-gold-500/30 text-gold-400 text-sm font-bold tracking-wider uppercase mb-4 backdrop-blur-sm">
                Established {department.establishedYear || "1946"}
              </motion.span>
              <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-2xl">
                {department.name}
              </motion.h1>
              <motion.p variants={fadeUp} className="text-lg md:text-xl text-gray-200 line-clamp-2 max-w-2xl font-light">
                {department.description}
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Sticky In-Page Navigation & Floating Stats */}
        <div className="sticky top-0 z-40 bg-white/80 dark:bg-navy-900/80 backdrop-blur-xl border-b border-gray-200 dark:border-slate-800 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
              
              {/* Tabs */}
              <div className="flex space-x-1 md:space-x-4 overflow-x-auto hide-scrollbar">
                {['about', 'programs', 'research', 'exams'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => {
                      setActiveTab(tab);
                      document.getElementById(tab)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-bold capitalize whitespace-nowrap transition-all ${
                      activeTab === tab 
                        ? 'bg-navy-900 text-white dark:bg-gold-500 dark:text-navy-900 shadow-md' 
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Hackathon Flex: Department Quick Stats */}
              <div className="hidden lg:flex items-center gap-6 border-l border-gray-200 dark:border-slate-700 pl-6">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Placement</p>
                    <p className="text-sm font-bold text-navy-900 dark:text-white">94% Rate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-gold-500" />
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Partners</p>
                    <p className="text-sm font-bold text-navy-900 dark:text-white">50+ Industry</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">
            
            {/* Left Column: Information */}
            <div className="lg:col-span-2 space-y-16">
              
              {/* About */}
              <motion.section id="about" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <h2 className="text-3xl font-black text-navy-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                  <BookOpen className="w-8 h-8 mr-3 text-gold-500" /> Department Overview
                </h2>
                <div className="prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300 text-lg leading-relaxed bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800">
                  <p>{department.description}</p>
                </div>
              </motion.section>

              {/* Programs */}
              <motion.section id="programs" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <h2 className="text-3xl font-black text-navy-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                  <GraduationCap className="w-8 h-8 mr-3 text-gold-500" /> Academic Programs
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {department.courses.map((course: any, idx: number) => (
                    <motion.div 
                      whileHover={{ y: -5 }}
                      key={idx} 
                      className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 hover:shadow-xl hover:border-gold-300 dark:hover:border-gold-500/50 transition-all group relative overflow-hidden"
                    >
                      <div className="absolute top-0 left-0 w-2 h-full bg-gold-500 transform origin-left scale-y-0 group-hover:scale-y-100 transition-transform duration-300 ease-out" />
                      <div className="inline-block px-3 py-1 bg-navy-50 dark:bg-slate-800 rounded-lg text-xs font-black text-gold-600 dark:text-gold-400 uppercase tracking-wider mb-4">
                        {course.type}
                      </div>
                      <h3 className="text-xl font-bold text-navy-900 dark:text-white mb-2 group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                        {course.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium flex items-center mt-4 pt-4 border-t border-gray-50 dark:border-slate-800">
                        <Award className="w-4 h-4 mr-2" /> Duration: {course.duration}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Research */}
              <motion.section id="research" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
                <h2 className="text-3xl font-black text-navy-900 dark:text-white mb-6 flex items-center border-b border-gray-100 dark:border-slate-800 pb-4">
                  <Lightbulb className="w-8 h-8 mr-3 text-gold-500" /> Research & Innovation
                </h2>
                <div className="bg-gradient-to-br from-navy-900 to-navy-800 p-8 rounded-3xl shadow-lg border border-navy-700 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
                  <p className="text-gray-300 mb-6 font-medium z-10 relative">The department actively pioneers research in the following domains, equipped with state-of-the-art laboratories and industry funding:</p>
                  <div className="flex flex-wrap gap-3 z-10 relative">
                    {department.research.map((area: string, idx: number) => (
                      <span key={idx} className="bg-white/10 hover:bg-gold-500 hover:text-navy-900 text-white px-5 py-2.5 rounded-xl text-sm font-bold border border-white/10 backdrop-blur-md transition-all cursor-default shadow-sm hover:shadow-gold-500/20 hover:-translate-y-1">
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.section>

              {/* Exams */}
              <motion.section id="exams" initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="space-y-6">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-grow">
                    <ExamSchedule department={department.name} />
                  </div>
                  <div className="md:w-80 shrink-0 mt-8 md:mt-0">
                    <ExamNotices departmentId={department.id} />
                  </div>
                </div>
              </motion.section>
            </div>

            {/* Right Column Sidebar: Faculty */}
            <div className="lg:col-span-1">
              <motion.div 
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}
                className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-navy-900/5 border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-32"
              >
                <div className="bg-navy-900 text-white py-5 px-6 flex items-center justify-between border-b-4 border-gold-500">
                  <div className="flex items-center">
                    <Users className="w-5 h-5 mr-3 text-gold-400" />
                    <h3 className="text-lg font-black tracking-wide">Key Faculty</h3>
                  </div>
                  <span className="bg-white/20 px-2.5 py-1 rounded-lg text-xs font-bold">{department.faculty.length} Members</span>
                </div>
                
                <div className="p-4 bg-gray-50 dark:bg-slate-950/50">
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-4 w-4 text-gray-400 group-focus-within:text-gold-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      placeholder="Search faculty..."
                      value={facultySearchQuery}
                      onChange={(e) => setFacultySearchQuery(e.target.value)}
                      className="pl-11 w-full py-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-xl text-navy-900 dark:text-white text-sm focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="p-4 space-y-2 max-h-[500px] overflow-y-auto custom-scrollbar">
                  {filteredFaculty.length > 0 ? (
                    filteredFaculty.map((member: any, idx: number) => (
                      <Link 
                        key={idx} 
                        to={`/department/${department.id}/faculty/${member.id}`} 
                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-all group"
                      >
                        <div className="relative">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-14 h-14 rounded-2xl object-cover shadow-sm group-hover:shadow-md transition-shadow"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 rounded-2xl ring-2 ring-transparent group-hover:ring-gold-500 transition-all pointer-events-none" />
                        </div>
                        <div>
                          <h4 className="font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors text-sm">
                            {member.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">{member.role}</p>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400 text-sm">
                      <Search className="w-8 h-8 mx-auto mb-3 text-gray-300 dark:text-slate-700" />
                      No faculty members found matching<br/>"<span className="font-medium text-navy-900 dark:text-white">{facultySearchQuery}</span>"
                    </div>
                  )}
                </div>
                
                <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 text-center">
                  <Link to="/about/staff-details" className="inline-flex items-center text-navy-700 dark:text-gray-300 font-bold text-sm hover:text-gold-600 dark:hover:text-gold-400 transition-colors group">
                    View Complete Directory 
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
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