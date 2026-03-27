import { useParams, Link } from "react-router-dom";
import { departmentsData } from "../data/departments";
import { TopBar } from "../components/layout/TopBar";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { AIChatbot } from "../components/chat/AIChatbot";
import { ArrowLeft, BookOpen, FileText, User } from "lucide-react";

export function FacultyPage() {
  const { deptId, facultyId } = useParams<{ deptId: string; facultyId: string }>();
  
  const department = deptId ? departmentsData[deptId] : null;
  const faculty = department?.faculty.find((f: any) => f.id === facultyId);

  if (!department || !faculty) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
        <TopBar />
        <Header />
        <main className="flex-grow flex items-center justify-center flex-col">
          <h1 className="text-4xl font-bold text-navy-900 dark:text-white mb-4">Faculty Not Found</h1>
          <Link to={department ? `/department/${deptId}` : "/"} className="text-gold-500 hover:text-gold-600 dark:hover:text-gold-400 flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to {department ? department.name : "Home"}
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
        {/* Faculty Hero */}
        <div className="bg-navy-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Link to={`/department/${deptId}`} className="inline-flex items-center text-gold-500 hover:text-gold-400 mb-8 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to {department.name}
            </Link>
            
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
              <img 
                src={faculty.image} 
                alt={faculty.name} 
                className="w-48 h-48 rounded-full object-cover border-4 border-gold-500 shadow-xl"
                referrerPolicy="no-referrer"
              />
              <div className="text-center md:text-left">
                <h1 className="text-4xl md:text-5xl font-bold mb-2">{faculty.name}</h1>
                <p className="text-xl text-gray-300 mb-4">{faculty.role}</p>
                <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
                  <User className="w-4 h-4 mr-2 text-gold-500" />
                  {department.name}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              
              {/* Bio */}
              <section>
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6 flex items-center border-b border-gray-200 dark:border-slate-800 pb-4">
                  <User className="w-6 h-6 mr-3 text-gold-500 dark:text-gold-400" />
                  Biography
                </h2>
                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                  {faculty.bio || "Biography information is currently unavailable."}
                </p>
              </section>

              {/* Publications */}
              <section>
                <h2 className="text-2xl font-bold text-navy-900 dark:text-white mb-6 flex items-center border-b border-gray-200 dark:border-slate-800 pb-4">
                  <FileText className="w-6 h-6 mr-3 text-gold-500 dark:text-gold-400" />
                  Selected Publications
                </h2>
                {faculty.publications && faculty.publications.length > 0 ? (
                  <ul className="space-y-4">
                    {faculty.publications.map((pub: string, idx: number) => (
                      <li key={idx} className="flex items-start">
                        <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-gold-500 mr-4"></div>
                        <p className="text-gray-700 dark:text-gray-300">{pub}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 italic">No publications listed.</p>
                )}
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-24">
                <div className="bg-gray-50 dark:bg-slate-950 py-4 px-6 border-b border-gray-100 dark:border-slate-800">
                  <h3 className="text-lg font-bold text-navy-900 dark:text-white flex items-center">
                    <BookOpen className="w-5 h-5 mr-2 text-gold-500" />
                    Research Interests
                  </h3>
                </div>
                <div className="p-6">
                  {faculty.researchInterests && faculty.researchInterests.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {faculty.researchInterests.map((interest: string, idx: number) => (
                        <span key={idx} className="bg-navy-50 dark:bg-slate-800 text-navy-900 dark:text-gray-200 px-3 py-1.5 rounded-lg text-sm font-medium border border-navy-100 dark:border-slate-700">
                          {interest}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400 italic">No research interests listed.</p>
                  )}
                </div>
                
                <div className="bg-gray-50 dark:bg-slate-950 py-4 px-6 border-t border-gray-100 dark:border-slate-800">
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Contact</h3>
                  <a href={`mailto:${faculty.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@university.edu`} className="text-navy-600 dark:text-blue-400 hover:underline">
                    {faculty.name.toLowerCase().replace(/[^a-z0-9]/g, '')}@university.edu
                  </a>
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
