import { Award, Users, BookOpen, Briefcase } from "lucide-react";

const stats = [
  { id: 1, label: "NAAC Grade", value: "A++", icon: Award, suffix: "" },
  { id: 2, label: "NIRF Ranking", value: "15", icon: BookOpen, suffix: "th" },
  { id: 3, label: "Placement Rate", value: "98", icon: Briefcase, suffix: "%" },
  { id: 4, label: "Alumni Network", value: "50", icon: Users, suffix: "k+" },
];

export function Stats() {
  return (
    <section className="py-16 bg-navy-900 dark:bg-slate-950 text-white relative overflow-hidden transition-colors">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#f59e0b 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Accreditations & Achievements</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.id} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-navy-800 dark:bg-slate-900 border-2 border-navy-700 dark:border-slate-800 flex items-center justify-center mb-4 group-hover:border-gold-500 dark:group-hover:border-gold-400 group-hover:bg-navy-700 dark:group-hover:bg-slate-800 transition-all duration-300">
                  <Icon className="w-8 h-8 text-gold-500 dark:text-gold-400" />
                </div>
                <div className="flex items-baseline justify-center mb-2">
                  <span className="text-4xl md:text-5xl font-bold text-white">{stat.value}</span>
                  <span className="text-xl md:text-2xl font-bold text-gold-500 dark:text-gold-400 ml-1">{stat.suffix}</span>
                </div>
                <span className="text-sm md:text-base text-gray-300 font-medium uppercase tracking-wider">{stat.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
