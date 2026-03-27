import { useState, useEffect, useRef } from 'react';
import { useParams, Link, Navigate, useLocation } from 'react-router-dom';
import { TopBar } from '../components/layout/TopBar';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ChevronRight, Share2, Printer, BookOpen, Clock } from 'lucide-react';
import { sectionsData } from '../data/sectionsData';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';

export function SectionPage() {
  const { category, section } = useParams<{ category: string; section: string }>();
  const location = useLocation();
  const contentRef = useRef<HTMLDivElement>(null);
  const [readTime, setReadTime] = useState(0);

  // Scroll Progress Hook
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start start", "end end"]
  });
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (!category || !(sectionsData as any)[category]) {
    return <Navigate to="/" replace />;
  }

  const categoryData = (sectionsData as any)[category];
  
  // Default to first section if none provided
  const currentSection = section 
    ? categoryData.items.find((s: any) => s.id === section) 
    : categoryData.items[0];

  if (!currentSection && section) {
    return <Navigate to={`/${category}/${categoryData.items[0].id}`} replace />;
  }

  // Calculate rough reading time when section changes
  useEffect(() => {
    // Scroll to top when section changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Simulate reading time calculation (assuming ~200 words per minute)
    // In a real app, you'd calculate this based on the actual text content of the ReactNode
    const estimatedWords = 400 + Math.random() * 600; 
    setReadTime(Math.ceil(estimatedWords / 200));
  }, [section]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${currentSection?.title} - ${categoryData.title} | BMSCE`,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50 dark:bg-slate-950 transition-colors">
      <TopBar />
      <Header />
      
      {/* Premium Page Header */}
      <div className="relative bg-navy-900 py-16 border-t border-navy-800 overflow-hidden">
        {/* Abstract shapes for premium feel */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-[80px] -ml-20 -mb-20 pointer-events-none" />
        
        <div className="relative max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <motion.nav 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} 
            className="flex flex-wrap items-center text-sm text-gray-400 mb-6 font-medium"
          >
            <Link to="/" className="hover:text-gold-400 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
            <span className="capitalize text-gray-300">{categoryData.title}</span>
            <ChevronRight className="w-4 h-4 mx-2 text-gray-600" />
            <span className="text-gold-400 font-bold">{currentSection?.title}</span>
          </motion.nav>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight font-display">
              {categoryData.title}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl font-light">
              Explore resources, guidelines, and information regarding {categoryData.title.toLowerCase()} at BMSCE.
            </p>
          </motion.div>
        </div>
      </div>

      <main ref={contentRef} className="flex-grow max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 relative">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Enhanced Sidebar Navigation */}
          <div className="lg:w-1/4 shrink-0">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-navy-900/5 border border-gray-100 dark:border-slate-800 overflow-hidden sticky top-32">
              <div className="p-6 bg-gray-50 dark:bg-slate-800/50 border-b border-gray-100 dark:border-slate-800 flex items-center">
                <BookOpen className="w-5 h-5 mr-3 text-gold-500" />
                <h3 className="font-bold text-navy-900 dark:text-white text-lg">In this section</h3>
              </div>
              <nav className="flex flex-col p-3 gap-1">
                {categoryData.items.map((item: any) => {
                  const Icon = item.icon;
                  const isActive = item.id === currentSection?.id;
                  return (
                    <Link
                      key={item.id}
                      to={`/${category}/${item.id}`}
                      className={`relative flex items-center px-4 py-3 text-sm rounded-xl transition-all duration-300 overflow-hidden group ${
                        isActive 
                          ? 'text-navy-900 dark:text-white font-bold shadow-sm' 
                          : 'text-gray-600 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-slate-800/50'
                      }`}
                    >
                      {/* Animated Active Background */}
                      {isActive && (
                        <motion.div 
                          layoutId="activeSectionBg"
                          className="absolute inset-0 bg-gold-50 dark:bg-gold-500/10 border-l-4 border-gold-500"
                          initial={false}
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <Icon className={`w-4 h-4 mr-3 relative z-10 transition-colors ${isActive ? 'text-gold-500' : 'text-gray-400 group-hover:text-gold-400'}`} />
                      <span className="relative z-10">{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:w-3/4 relative">
            
            {/* Scroll Progress Bar */}
            <div className="sticky top-20 z-50 h-1 bg-gray-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
              <motion.div 
                className="h-full bg-gold-500 origin-left"
                style={{ scaleX }}
              />
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800 overflow-hidden">
              
              {/* Content Header & Actions */}
              <div className="px-8 py-6 border-b border-gray-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4 bg-gray-50/50 dark:bg-slate-800/20">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 font-medium">
                  <Clock className="w-4 h-4 mr-2" />
                  {readTime} min read
                </div>
                
                <div className="flex items-center gap-2">
                  <button onClick={handleShare} className="flex items-center px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-gold-500 hover:text-gold-600 transition-colors shadow-sm">
                    <Share2 className="w-4 h-4 mr-2" /> Share
                  </button>
                  <button onClick={() => window.print()} className="flex items-center px-4 py-2 text-sm font-bold text-gray-600 dark:text-gray-300 bg-white dark:bg-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 hover:border-gold-500 hover:text-gold-600 transition-colors shadow-sm">
                    <Printer className="w-4 h-4 mr-2" /> Print
                  </button>
                </div>
              </div>

              {/* Animated Content Wrapper */}
              <div className="p-8 md:p-12 min-h-[600px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={location.pathname} // Re-animate when route changes
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-headings:font-display prose-headings:text-navy-900 dark:prose-headings:text-white prose-a:text-gold-600 hover:prose-a:text-gold-500 prose-img:rounded-2xl prose-img:shadow-lg"
                  >
                    {/* Inject a title if the content doesn't explicitly start with one */}
                    <h2 className="text-3xl font-bold mb-8 border-b border-gray-100 dark:border-slate-800 pb-4">{currentSection?.title}</h2>
                    
                    {currentSection?.content}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}