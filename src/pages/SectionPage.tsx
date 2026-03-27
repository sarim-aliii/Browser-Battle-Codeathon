import { useParams, Link, Navigate } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ChevronRight } from 'lucide-react';
import { sectionsData } from '../data/sectionsData';

export function SectionPage() {
  const { category, section } = useParams<{ category: string; section: string }>();
  
  if (!category || !sectionsData[category]) {
    return <Navigate to="/" replace />;
  }

  const categoryData = sectionsData[category];
  
  // If no specific section is provided, default to the first one
  const currentSection = section 
    ? categoryData.items.find(s => s.id === section) 
    : categoryData.items[0];

  if (!currentSection && section) {
    return <Navigate to={`/${category}/${categoryData.items[0].id}`} replace />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      {/* Page Header */}
      <div className="bg-navy-900 py-12 border-t border-navy-800">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">{categoryData.title}</h1>
          <div className="flex items-center text-sm text-gray-300">
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="capitalize">{categoryData.title}</span>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-gold-400">{currentSection?.title}</span>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-32">
              <div className="p-4 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800">
                <h3 className="font-bold text-navy-900 dark:text-white">In this section</h3>
              </div>
              <nav className="flex flex-col py-2">
                {categoryData.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = item.id === currentSection?.id;
                  return (
                    <Link
                      key={item.id}
                      to={`/${category}/${item.id}`}
                      className={`flex items-center px-4 py-3 text-sm transition-colors ${
                        isActive 
                          ? 'bg-gold-50 dark:bg-gold-900/10 text-gold-700 dark:text-gold-400 border-l-4 border-gold-500 font-medium' 
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800 hover:text-navy-900 dark:hover:text-white border-l-4 border-transparent'
                      }`}
                    >
                      <Icon className={`w-4 h-4 mr-3 ${isActive ? 'text-gold-500' : 'text-gray-400'}`} />
                      {item.title}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:w-3/4">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 p-8 min-h-[600px] prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
              {currentSection?.content}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
