import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2866&auto=format&fit=crop",
    title: "Excellence in Engineering Education",
    subtitle: "Empowering the next generation of innovators and leaders.",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2940&auto=format&fit=crop",
    title: "State-of-the-Art Research Facilities",
    subtitle: "Pioneering breakthroughs in technology and applied sciences.",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2940&auto=format&fit=crop",
    title: "Vibrant Campus Life",
    subtitle: "A diverse community fostering holistic development.",
  },
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div className="relative h-[800px] w-full overflow-hidden bg-navy-900">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold-500/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-navy-600/20 blur-[120px] rounded-full animate-float" style={{ animationDelay: '2s' }} />
      </div>

      {/* Carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-navy-900/80 z-10" />
          <img
            src={slides[currentSlide].image}
            alt={slides[currentSlide].title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="max-w-5xl"
            >
              <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tighter leading-tight drop-shadow-2xl">
                {slides[currentSlide].title.split(' ').map((word, i) => (
                  <span key={i} className={i === slides[currentSlide].title.split(' ').length - 1 ? "text-gold-500" : ""}>
                    {word}{' '}
                  </span>
                ))}
              </h1>
              <p className="text-xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto mb-10 serif-italic opacity-90">
                {slides[currentSlide].subtitle}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  to="/admissions/under-graduation"
                  className="px-8 py-4 bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold rounded-full transition-all transform hover:scale-105 shadow-xl flex items-center"
                >
                  Explore Programs <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link 
                  to="/about/about-bmsce"
                  className="px-8 py-4 glass text-white font-bold rounded-full transition-all hover:bg-white/20 flex items-center"
                >
                  Virtual Tour
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-6 pointer-events-none">
        <button 
          onClick={prevSlide}
          className="p-4 rounded-full glass text-white hover:bg-gold-500 hover:text-navy-900 transition-all pointer-events-auto group"
        >
          <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button 
          onClick={nextSlide}
          className="p-4 rounded-full glass text-white hover:bg-gold-500 hover:text-navy-900 transition-all pointer-events-auto group"
        >
          <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`transition-all duration-500 rounded-full ${idx === currentSlide ? 'w-12 h-2 bg-gold-500' : 'w-2 h-2 bg-white/30 hover:bg-white/60'}`}
          />
        ))}
      </div>

      {/* Scroll Down Hint */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-36 left-1/2 -translate-x-1/2 z-30 text-white/50 hidden md:block"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-gold-500 rounded-full" />
        </div>
      </motion.div>

      {/* Urgent Alerts Banner - Fancy Version */}
      <div className="absolute bottom-0 left-0 w-full z-40 glass-dark py-4 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center font-semibold text-white mb-3 sm:mb-0">
            <div className="w-10 h-10 rounded-full bg-gold-500/20 flex items-center justify-center mr-4">
              <AlertCircle className="w-6 h-6 text-gold-500 animate-pulse" />
            </div>
            <div>
              <span className="block text-xs uppercase tracking-widest text-gold-500 font-bold">Important Notice</span>
              <span className="text-sm md:text-base">Admissions Open for Academic Year 2026-27</span>
            </div>
          </div>
          <Link to="/admissions/under-graduation" className="bg-gold-500 hover:bg-white text-navy-900 px-8 py-2 rounded-full text-sm font-bold transition-all transform hover:scale-105 shadow-lg">
            Apply Now
          </Link>
        </div>
      </div>
    </div>
  );
}
