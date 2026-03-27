import { useRef } from "react";
import { Calendar, ArrowRight, Bell, FileText, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EventCalendar } from "./EventCalendar";
import { Magnetic } from "../ui/Magnetic"; // Ensure the path is correct

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    date: "15",
    month: "OCT",
    title: "International Conference on AI & Robotics",
    description: "Join leading experts to discuss the future of artificial intelligence in robotics.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 2,
    date: "22",
    month: "NOV",
    title: "Annual Tech Symposium 2026",
    description: "A three-day event showcasing student projects, hackathons, and guest lectures.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2940&auto=format&fit=crop",
  },
  {
    id: 3,
    date: "05",
    month: "DEC",
    title: "Workshop on Sustainable Energy Solutions",
    description: "Hands-on workshop focusing on renewable energy technologies and implementation.",
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?q=80&w=2560&auto=format&fit=crop",
  },
];

const notifications = [
  { id: 1, title: "Revised Academic Calendar for Odd Semester 2026-27", date: "Oct 10, 2026", isNew: true },
  { id: 2, title: "Schedule for Mid-Term Examinations (B.Tech All Branches)", date: "Oct 08, 2026", isNew: true },
  { id: 3, title: "Call for Papers: Journal of Engineering Research", date: "Oct 05, 2026", isNew: false },
  { id: 4, title: "Campus Placement Drive: Top Tech Companies Visiting Next Week", date: "Oct 02, 2026", isNew: false },
  { id: 5, title: "Notice Regarding Hostel Fee Payment Deadline", date: "Sep 28, 2026", isNew: false },
  { id: 6, title: "Registration Open for Inter-College Sports Meet", date: "Sep 25, 2026", isNew: false },
  { id: 7, title: "Guidelines for Final Year Project Submissions", date: "Sep 20, 2026", isNew: false },
];

export function InfoHub() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.fromTo(".hub-header", 
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: containerRef.current, start: "top 80%" } }
    );

    // Staggered Event Cards
    gsap.fromTo(".event-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.15, 
        duration: 0.8, 
        ease: "back.out(1.2)", 
        scrollTrigger: { trigger: ".events-container", start: "top 85%" }
      }
    );

    // Staggered Notifications
    gsap.fromTo(".notice-item",
      { opacity: 0, x: 30 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.08, 
        duration: 0.6, 
        ease: "power2.out", 
        scrollTrigger: { trigger: ".notice-board", start: "top 80%" }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-40 dark:opacity-20 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-gold-500/20 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-navy-600/30 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '10s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: News & Events */}
          <div className="xl:col-span-8">
            <div className="hub-header flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-6">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-navy-900 dark:text-white tracking-tighter leading-none mb-3">
                  CAMPUS <span className="text-gold-500">PULSE</span>
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-1 bg-gold-500 rounded-full" />
                  <p className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">Latest News & Events</p>
                </div>
              </div>
              
              <Magnetic intensity={0.2}>
                <Link to="/about" className="group flex items-center space-x-3 text-navy-900 dark:text-white font-bold text-xs tracking-widest uppercase hover:text-gold-500 transition-colors">
                  <span>View Archive</span>
                  <div className="w-10 h-10 rounded-full border-2 border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-navy-900 transition-all shadow-sm">
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </Magnetic>
            </div>

            <div className="events-container grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              {events.map((event, idx) => (
                <div 
                  key={event.id} 
                  className={`event-card group relative bg-white dark:bg-slate-900/80 backdrop-blur-sm rounded-[2rem] overflow-hidden border border-gray-200 dark:border-white/10 hover:border-gold-500/30 shadow-lg hover:shadow-2xl hover:shadow-gold-500/10 transition-all duration-500 hover:-translate-y-2 ${idx === 0 ? 'md:col-span-2 md:flex' : 'flex flex-col'}`}
                >
                  <div className={`relative overflow-hidden ${idx === 0 ? 'md:w-1/2 h-72 md:h-auto' : 'h-64'}`}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
                    
                    {/* Glassmorphic Date Badge */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white flex flex-col items-center justify-center w-16 h-16 rounded-2xl shadow-xl border border-white/20 group-hover:border-gold-500/50 group-hover:bg-navy-900/50 transition-all duration-300">
                      <span className="text-2xl font-black leading-none group-hover:text-gold-500 transition-colors">{event.date}</span>
                      <span className="text-[9px] font-bold uppercase tracking-widest mt-1 text-gray-200">{event.month}</span>
                    </div>
                  </div>
                  
                  <div className={`p-8 flex flex-col justify-center ${idx === 0 ? 'md:w-1/2' : 'flex-grow'}`}>
                    <div className="flex items-center space-x-2 mb-4">
                      <FileText className="w-4 h-4 text-gold-500" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gold-500">Featured Event</span>
                    </div>
                    <h3 className="text-2xl font-black text-navy-900 dark:text-white mb-4 group-hover:text-gold-500 transition-colors line-clamp-2 leading-tight">{event.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-8 line-clamp-3 leading-relaxed font-medium">{event.description}</p>
                    
                    <Link to="/about" className="mt-auto inline-flex items-center text-navy-900 dark:text-white font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors">
                      <span className="relative overflow-hidden pb-1">
                        Explore Story
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Event Calendar Section */}
            <div>
              <div className="hub-header flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8 gap-4">
                <h2 className="text-3xl md:text-4xl font-black text-navy-900 dark:text-white tracking-tighter uppercase flex items-center">
                  Academic <span className="text-gold-500 ml-3">Timeline</span>
                </h2>
              </div>
              <div className="h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl">
                <EventCalendar />
              </div>
            </div>
          </div>

          {/* Right Column: Notice Board Widget */}
          <div className="xl:col-span-4 mt-12 xl:mt-0">
            <div className="sticky top-32">
              <div className="hub-header mb-8">
                <h2 className="text-4xl font-black text-navy-900 dark:text-white tracking-tighter leading-none mb-3">
                  NOTICE <span className="text-gold-500">BOARD</span>
                </h2>
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-1 bg-gold-500 rounded-full" />
                  <p className="text-gray-500 dark:text-gray-400 font-bold tracking-[0.2em] uppercase text-xs">Official Announcements</p>
                </div>
              </div>

              <div className="notice-board bg-white dark:bg-navy-900/60 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-gray-200 dark:border-white/10 overflow-hidden flex flex-col h-[800px] relative">
                
                {/* Notice Board Header */}
                <div className="p-8 border-b border-gray-100 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5 relative z-10">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    <span className="text-xs font-black tracking-[0.2em] uppercase text-navy-900 dark:text-white">Live Updates</span>
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/30 text-navy-900 transform hover:scale-105 transition-transform cursor-help">
                    <Bell className="w-6 h-6" />
                  </div>
                </div>
                
                {/* Scrollable Notices List */}
                <div className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar relative z-10">
                  {notifications.map((notice) => (
                    <div 
                      key={notice.id} 
                      className="notice-item p-6 rounded-3xl bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-white/10 transition-all duration-300 group cursor-pointer border border-transparent hover:border-gold-500/30 hover:shadow-xl hover:-translate-y-1"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0 mt-1.5">
                          <div className={`w-2.5 h-2.5 rounded-full transition-all duration-300 group-hover:scale-150 ${notice.isNew ? 'bg-gold-500 shadow-[0_0_12px_rgba(245,158,11,0.6)]' : 'bg-gray-300 dark:bg-gray-600 group-hover:bg-gold-500'}`} />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-relaxed mb-3">
                            {notice.title}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] text-gray-500 dark:text-gray-400 font-bold uppercase tracking-widest flex items-center">
                              <Calendar className="w-3 h-3 mr-1.5 text-gold-500" /> {notice.date}
                            </span>
                            {notice.isNew && (
                              <span className="px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-gold-500/10 text-gold-600 dark:text-gold-400 border border-gold-500/20">
                                New
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Notice Board Footer */}
                <div className="p-6 bg-gray-50/80 dark:bg-white/5 backdrop-blur-md border-t border-gray-100 dark:border-white/10 text-center relative z-10">
                  <Magnetic intensity={0.1}>
                    <Link to="/about" className="inline-flex items-center text-xs font-black text-navy-900 dark:text-white uppercase tracking-widest hover:text-gold-500 transition-colors group px-6 py-3 rounded-xl hover:bg-white dark:hover:bg-white/5">
                      <span>View All Circulars</span>
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Magnetic>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}