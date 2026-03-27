import { Calendar, ArrowRight, FileText, Bell } from "lucide-react";
import { EventCalendar } from "./EventCalendar";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

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
  return (
    <section className="py-24 bg-white dark:bg-navy-900 transition-colors relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20 dark:opacity-10">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-gold-500/20 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-navy-600/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column: News & Events */}
          <div className="lg:col-span-8">
            <div className="flex items-end justify-between mb-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-5xl font-black text-navy-900 dark:text-white tracking-tighter leading-none mb-4">
                  CAMPUS <span className="text-gold-500">PULSE</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase text-xs">Latest News, Events & Highlights</p>
              </motion.div>
              <Link to="/about/about-bmsce" className="group flex items-center space-x-2 text-navy-900 dark:text-white font-bold text-sm tracking-widest uppercase hover:text-gold-500 transition-colors">
                <span>View Archive</span>
                <div className="w-8 h-8 rounded-full border border-navy-900/10 dark:border-white/10 flex items-center justify-center group-hover:bg-gold-500 group-hover:border-gold-500 transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {events.map((event, idx) => (
                <motion.div 
                  key={event.id} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className={`group relative bg-white dark:bg-white/5 rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 ${idx === 0 ? 'md:col-span-2 md:flex' : ''}`}
                >
                  <div className={`relative overflow-hidden ${idx === 0 ? 'md:w-1/2 h-64 md:h-auto' : 'h-64'}`}>
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-6 left-6 glass-dark text-white flex flex-col items-center justify-center w-16 h-16 rounded-2xl shadow-xl border border-white/20">
                      <span className="text-2xl font-black leading-none">{event.date}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest mt-1">{event.month}</span>
                    </div>
                  </div>
                  <div className={`p-8 flex flex-col justify-center ${idx === 0 ? 'md:w-1/2' : ''}`}>
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-4 group-hover:text-gold-500 transition-colors line-clamp-2 leading-tight">{event.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">{event.description}</p>
                    <Link to="/about/about-bmsce" className="mt-auto inline-flex items-center text-navy-900 dark:text-white font-black text-xs uppercase tracking-widest hover:text-gold-500 transition-colors">
                      Explore Story <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Event Calendar Section */}
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black text-navy-900 dark:text-white tracking-tighter uppercase">
                  Academic <span className="text-gold-500">Timeline</span>
                </h2>
              </div>
              <div className="h-[550px] rounded-[2.5rem] overflow-hidden border border-gray-100 dark:border-white/5 shadow-xl bg-gray-50 dark:bg-white/5 p-4">
              <EventCalendar />
            </div>
          </div>
          </div>

          {/* Right Column: Notifications / Circulars */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4"
          >
            <div className="sticky top-32">
              <div className="mb-12">
                <h2 className="text-4xl font-black text-navy-900 dark:text-white tracking-tighter leading-none mb-4">
                  NOTICE <span className="text-gold-500">BOARD</span>
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium tracking-widest uppercase text-xs">Official Announcements</p>
              </div>

              <div className="glass-dark dark:bg-navy-900/40 rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col h-[750px]">
                <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
                  <span className="text-xs font-black tracking-[0.3em] uppercase text-gold-500">Latest Updates</span>
                  <div className="w-10 h-10 rounded-2xl bg-gold-500 flex items-center justify-center shadow-lg shadow-gold-500/20">
                    <Bell className="w-5 h-5 text-navy-900" />
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                  <div className="space-y-4">
                    {notifications.map((notice) => (
                      <div key={notice.id} className="p-6 rounded-3xl hover:bg-white/5 transition-all group cursor-pointer border border-transparent hover:border-white/10">
                        <div className="flex items-start space-x-4">
                          <div className="flex-shrink-0 mt-1">
                            <div className="w-2 h-2 rounded-full bg-gold-500 group-hover:scale-150 shadow-[0_0_10px_rgba(234,179,8,0.5)] transition-all" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-bold text-white group-hover:text-gold-500 transition-colors leading-snug mb-2">
                              {notice.title}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest flex items-center">
                                <Calendar className="w-3 h-3 mr-1.5 text-gold-500" /> {notice.date}
                              </span>
                              {notice.isNew && (
                                <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest bg-gold-500 text-navy-900 animate-pulse">
                                  New
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 bg-white/5 border-t border-white/10 text-center">
                  <Link to="/about/about-bmsce" className="inline-flex items-center text-xs font-black text-gold-500 uppercase tracking-widest hover:text-white transition-colors group">
                    <span>View All Notices</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
