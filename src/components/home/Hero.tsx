import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "../ui/Magnetic";

gsap.registerPlugin(useGSAP);

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
];

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const container = useRef<HTMLDivElement>(null);
  
  // GSAP Animation Timeline for Slide Changes
  useGSAP(() => {
    const tl = gsap.timeline();

    // 1. Image slow zoom-in effect (Ken Burns effect)
    tl.fromTo(".hero-bg-image", 
      { scale: 1.15, opacity: 0.5 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" }
    );

    // 2. Staggered text reveal (Masked clip-path effect)
    tl.fromTo(".hero-title-word",
      { y: 100, opacity: 0, rotate: 5 },
      { y: 0, opacity: 1, rotate: 0, duration: 0.8, stagger: 0.1, ease: "back.out(1.7)" },
      "-=1.0" // Start slightly before the image finishes
    );

    // 3. Subtitle fade up
    tl.fromTo(".hero-subtitle",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.6"
    );

    // 4. Buttons pop in
    tl.fromTo(".hero-btn",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: "elastic.out(1, 0.5)" },
      "-=0.4"
    );

  }, { dependencies: [currentSlide], scope: container });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 6000); // Slightly longer for the animations to breathe
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

  return (
    <div ref={container} className="relative h-[800px] w-full overflow-hidden bg-slate-900">
      
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-slate-900/90" />
      <img
        key={`img-${currentSlide}`}
        src={slides[currentSlide].image}
        alt={slides[currentSlide].title}
        className="hero-bg-image absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
        <div className="max-w-5xl overflow-hidden">
          <h1 className="text-5xl md:text-8xl font-extrabold text-white mb-6 tracking-tight leading-tight flex flex-wrap justify-center gap-4">
            {slides[currentSlide].title.split(' ').map((word, i) => (
              <span key={`${currentSlide}-${i}`} className="hero-title-word inline-block origin-bottom-left">
                {word}
              </span>
            ))}
          </h1>
          <p className="hero-subtitle text-xl md:text-3xl text-gray-200 font-light max-w-3xl mx-auto mb-10 opacity-90">
            {slides[currentSlide].subtitle}
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Magnetic>
              <Link 
              to="/admissions"
              className="hero-btn px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold rounded-full transition-colors shadow-[0_0_30px_rgba(245,158,11,0.3)] flex items-center"
            >
              Explore Programs <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            </Magnetic>
            <Magnetic>
              <Link 
              to="/about"
              className="hero-btn px-8 py-4 border border-white/30 backdrop-blur-md text-white font-bold rounded-full transition-all hover:bg-white/10 flex items-center"
            >
              Virtual Tour
            </Link>
            </Magnetic>
            
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute inset-y-0 left-0 right-0 z-30 flex items-center justify-between px-6 pointer-events-none">
        <button onClick={prevSlide} className="p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-amber-500 hover:text-slate-900 transition-all pointer-events-auto group">
          <ChevronLeft className="w-8 h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button onClick={nextSlide} className="p-4 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-amber-500 hover:text-slate-900 transition-all pointer-events-auto group">
          <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}