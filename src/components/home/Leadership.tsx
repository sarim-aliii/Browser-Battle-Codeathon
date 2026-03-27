import { Quote } from "lucide-react";
import { Link } from "react-router-dom";

export function Leadership() {
  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">Leadership & Vision</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Principal's Message */}
          <div className="bg-navy-50 dark:bg-slate-900 rounded-2xl p-8 md:p-12 relative shadow-sm border border-navy-100 dark:border-slate-800">
            <Quote className="absolute top-6 left-6 w-12 h-12 text-navy-200 dark:text-slate-700 opacity-50" />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-6">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-md flex-shrink-0">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=256&auto=format&fit=crop" 
                    alt="Principal" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-center sm:text-left mt-2">
                  <h3 className="text-2xl font-bold text-navy-900 dark:text-white">Dr. Bheemsha Arya</h3>
                  <p className="text-gold-600 dark:text-gold-400 font-medium">Principal</p>
                </div>
              </div>
              <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed text-lg">
                "Our mission is to cultivate a dynamic learning environment that empowers students to become innovative thinkers, ethical leaders, and global citizens. We bridge the gap between theoretical knowledge and practical application, preparing our graduates to tackle the complex engineering challenges of tomorrow."
              </blockquote>
              <div className="mt-6 text-right">
                <Link to="/about/administration" className="text-navy-700 dark:text-gray-300 font-semibold text-sm hover:text-gold-600 dark:hover:text-gold-400 transition-colors">Read Full Message →</Link>
              </div>
            </div>
          </div>

          {/* Founders */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-navy-900 dark:text-white mb-6 flex items-center">
                Our Founder
              </h3>
              <div className="space-y-6">
                <div className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200 dark:border-slate-700 group-hover:border-gold-500 dark:group-hover:border-gold-400 transition-colors flex-shrink-0">
                    <img 
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=256&auto=format&fit=crop" 
                      alt="Founder" 
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-navy-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">Sri B. M. Sreenivasaiah</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Visionary Founder</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 dark:bg-slate-900 p-6 rounded-lg border-l-4 border-navy-900 dark:border-gold-500">
              <h4 className="font-bold text-navy-900 dark:text-white mb-2">The Legacy</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                Started in 1946 by Bhusanayana Mukundadas Sreenivasaiah, B.M.S. College of Engineering is run by the B.M.S. Educational Trust. It was founded with a singular vision: to create a center of excellence that provides accessible, high-quality technical education.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
