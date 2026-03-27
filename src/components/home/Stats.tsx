import { useRef } from "react";
import { Award, Users, BookOpen, Briefcase } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "../ui/Magnetic"; // Ensure the path is correct

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { id: 1, label: "NAAC Grade", value: "A++", isNumeric: false, icon: Award, suffix: "" },
  { id: 2, label: "NIRF Ranking", value: "15", isNumeric: true, icon: BookOpen, suffix: "th" },
  { id: 3, label: "Placement Rate", value: "98", isNumeric: true, icon: Briefcase, suffix: "%" },
  { id: 4, label: "Alumni Network", value: "50", isNumeric: true, icon: Users, suffix: "k+" },
];

export function Stats() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // 1. Staggered Entrance for Cards
    gsap.fromTo(".stat-card",
      { opacity: 0, y: 50, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        stagger: 0.15, 
        duration: 0.8, 
        ease: "back.out(1.2)", 
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top 80%" 
        } 
      }
    );

    // 2. Animated Number Counters
    const numericStats = gsap.utils.toArray('.stat-number') as HTMLElement[];
    numericStats.forEach((el) => {
      const targetStr = el.getAttribute('data-target');
      if (targetStr) {
        const target = parseFloat(targetStr);
        gsap.to(el, {
          innerHTML: target,
          duration: 2.5,
          ease: "power3.out",
          snap: { innerHTML: 1 }, // Snaps the animating value to whole numbers
          scrollTrigger: { 
            trigger: containerRef.current, 
            start: "top 80%" 
          }
        });
      }
    });

    // 3. Header Reveal
    gsap.fromTo(".stats-header",
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 85%" }
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-24 bg-navy-900 dark:bg-slate-950 text-white relative overflow-hidden transition-colors">
      
      {/* Premium Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#f59e0b 2px, transparent 2px)', backgroundSize: '40px 40px' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold-500/10 blur-[150px] rounded-full pointer-events-none" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="stats-header text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
            Accreditations & <span className="text-gold-500">Achievements</span>
          </h2>
          <div className="flex items-center justify-center space-x-3">
            <div className="w-12 h-1 bg-white/20 rounded-full" />
            <div className="w-24 h-1.5 bg-gold-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            <div className="w-12 h-1 bg-white/20 rounded-full" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="stat-card relative group bg-white/5 dark:bg-slate-900/50 backdrop-blur-md border border-white/10 hover:border-gold-500/30 rounded-3xl p-8 flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(245,158,11,0.15)] overflow-hidden"
              >
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-b from-gold-500/0 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <Magnetic intensity={0.3}>
                  <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-500 group-hover:-rotate-6 relative z-10">
                    <Icon className="w-10 h-10 text-gold-500 group-hover:text-navy-900 transition-colors duration-500" />
                  </div>
                </Magnetic>

                <div className="flex items-baseline justify-center mb-3 relative z-10">
                  {stat.isNumeric ? (
                    <span 
                      className="stat-number text-5xl md:text-6xl font-black text-white tracking-tighter"
                      data-target={stat.value}
                    >
                      0
                    </span>
                  ) : (
                    <span className="text-5xl md:text-6xl font-black text-white tracking-tighter">
                      {stat.value}
                    </span>
                  )}
                  <span className="text-2xl md:text-3xl font-black text-gold-500 ml-1">
                    {stat.suffix}
                  </span>
                </div>
                
                <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em] relative z-10 group-hover:text-gray-200 transition-colors">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}