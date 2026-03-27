import { useRef } from "react";
import { Quote, ArrowRight, Landmark, Award } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "../ui/Magnetic"; // Make sure path is correct

gsap.registerPlugin(ScrollTrigger);

export function Leadership() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Header Reveal
    gsap.fromTo(".lead-header",
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out", 
        scrollTrigger: { trigger: containerRef.current, start: "top 80%" } 
      }
    );

    // Staggered Cards Reveal
    gsap.fromTo(".lead-card",
      { opacity: 0, y: 50, scale: 0.98 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.2, 
        duration: 0.8, 
        ease: "back.out(1.2)", 
        scrollTrigger: { trigger: ".lead-grid", start: "top 75%" } 
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-gray-50 dark:bg-slate-950 transition-colors relative overflow-hidden">
      
      {/* Ambient Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-gold-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-navy-900/10 dark:bg-navy-500/10 blur-[150px] rounded-full" />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="lead-header text-center mb-20">
          <div className="inline-flex items-center justify-center p-3 bg-gold-500/10 rounded-2xl mb-6 border border-gold-500/20">
            <Landmark className="w-8 h-8 text-gold-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-navy-900 dark:text-white mb-6 tracking-tighter">
            Leadership & <span className="text-gold-500">Vision</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto font-medium">
            Guided by history, driven by innovation. Meet the visionaries shaping the future of engineering education.
          </p>
        </div>

        <div className="lead-grid grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Principal's Message (Spans 7 columns on Desktop) */}
          <div className="lead-card lg:col-span-7 bg-white dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 relative shadow-2xl border border-gray-200 dark:border-white/10 group hover:border-gold-500/30 transition-colors duration-500">
            
            {/* Decorative Quote Mark */}
            <div className="absolute top-8 right-10 opacity-10 dark:opacity-5 group-hover:scale-110 group-hover:opacity-20 transition-all duration-700 pointer-events-none">
              <Quote className="w-32 h-32 text-navy-900 dark:text-white rotate-180" />
            </div>

            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-8">
                
                {/* Avatar with Animated Ring */}
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-[-4px] rounded-full border-2 border-dashed border-gold-500/50 animate-[spin_10s_linear_infinite] group-hover:border-gold-500 transition-colors" />
                  <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl relative z-10">
                    <img 
                      src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
                      alt="Principal" 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
                
                <div className="text-center sm:text-left mt-2">
                  <div className="inline-flex items-center space-x-2 bg-gold-500/10 px-3 py-1 rounded-full mb-3 border border-gold-500/20">
                    <Award className="w-3 h-3 text-gold-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-gold-600 dark:text-gold-400">Head of Institution</span>
                  </div>
                  <h3 className="text-3xl font-black text-navy-900 dark:text-white tracking-tight">Dr. Bheemsha Arya</h3>
                  <p className="text-gray-500 dark:text-gray-400 font-medium mt-1 text-lg">Principal, BMSCE</p>
                </div>
              </div>

              <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-xl md:text-2xl font-light italic relative mb-10">
                <span className="text-gold-500 font-serif text-4xl leading-none absolute -left-4 -top-2">"</span>
                Our mission is to cultivate a dynamic learning environment that empowers students to become innovative thinkers, ethical leaders, and global citizens. We bridge the gap between theoretical knowledge and practical application.
                <span className="text-gold-500 font-serif text-4xl leading-none absolute -bottom-4 ml-2">"</span>
              </blockquote>
              
              <div className="flex justify-start">
                <Magnetic intensity={0.1}>
                  <Link to="/about/administration" className="inline-flex items-center px-6 py-3 bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold rounded-xl hover:bg-gold-500 dark:hover:bg-gold-500 hover:text-navy-900 transition-all shadow-lg hover:shadow-gold-500/25 group/btn">
                    Read Full Message 
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>

          {/* Founders & Legacy (Spans 5 columns on Desktop) */}
          <div className="lg:col-span-5 space-y-8 flex flex-col h-full">
            
            {/* Founder Card */}
            <div className="lead-card bg-white dark:bg-slate-900/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[2rem] p-8 shadow-xl group hover:border-gold-500/30 transition-colors duration-500">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 mb-8 flex items-center">
                <span className="w-8 h-[2px] bg-gold-500 mr-3" />
                Our Heritage
              </h3>
              
              <div className="flex items-center gap-6 cursor-pointer">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border border-gray-200 dark:border-white/10 group-hover:border-gold-500 transition-colors flex-shrink-0 shadow-lg relative">
                  <div className="absolute inset-0 bg-gold-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 mix-blend-overlay" />
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop" 
                    alt="Founder" 
                    className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="text-xl font-black text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors leading-tight mb-1">
                    Sri B. M. Sreenivasaiah
                  </h4>
                  <p className="text-sm font-bold tracking-widest uppercase text-gray-500 dark:text-gray-400">Visionary Founder</p>
                </div>
              </div>
            </div>
            
            {/* The Legacy Card */}
            <div className="lead-card bg-navy-900 dark:bg-slate-900 rounded-[2rem] p-8 md:p-10 shadow-2xl relative overflow-hidden flex-grow flex flex-col justify-center group border border-navy-800 dark:border-white/5">
              
              {/* Card Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-gold-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <h4 className="text-3xl font-black text-white mb-6 flex items-center">
                  The <span className="text-gold-500 ml-2">Legacy</span>
                </h4>
                <p className="text-base text-gray-300 leading-relaxed font-light">
                  Started in 1946 by Bhusanayana Mukundadas Sreenivasaiah, B.M.S. College of Engineering is run by the B.M.S. Educational Trust. It was founded with a singular vision: <strong className="text-white font-semibold">to create a center of excellence that provides accessible, high-quality technical education</strong> for the betterment of society.
                </p>
                
                <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center">
                  <span className="text-4xl font-black text-white/10">1946</span>
                  <Link to="/about/history" className="text-xs font-bold uppercase tracking-widest text-gold-500 hover:text-white transition-colors flex items-center">
                    Explore History <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}