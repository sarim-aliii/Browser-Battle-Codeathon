import { useRef } from "react";
import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ChevronRight, ArrowUp } from "lucide-react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Magnetic } from "../ui/Magnetic"; // Ensure correct path

gsap.registerPlugin(ScrollTrigger);

export function Footer() {
  const containerRef = useRef<HTMLDivElement>(null);

  // GSAP Animation for staggered column entrance
  useGSAP(() => {
    gsap.fromTo(".footer-col",
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        stagger: 0.15, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: { 
          trigger: containerRef.current, 
          start: "top 85%" 
        }
      }
    );
  }, { scope: containerRef });

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer ref={containerRef} className="bg-navy-900 text-white pt-24 pb-12 relative overflow-hidden">
      
      {/* Decorative Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '8s' }} />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-navy-500/20 blur-[150px] rounded-full animate-pulse" style={{ animationDuration: '10s' }} />
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
          
          {/* Column 1: Brand & About */}
          <div className="footer-col lg:col-span-4">
            <Link to="/" className="flex items-center mb-8 group cursor-pointer inline-flex">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500 blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 rounded-full" />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/BMS_College_of_Engineering.svg/960px-BMS_College_of_Engineering.svg.png" 
                  alt="BMSCE Logo" 
                  className="h-16 w-16 mr-4 object-contain group-hover:scale-110 transition-transform duration-500 relative z-10"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none">B.M.S. <span className="text-gold-500">COLLEGE</span></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-1">Engineering Excellence</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium pr-4">
              Established in 1946, B.M.S. College of Engineering is a premier institution dedicated to fostering innovation, leadership, and technical excellence in the heart of Bengaluru.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: "#" },
                { Icon: Twitter, href: "#" },
                { Icon: Linkedin, href: "#" },
                { Icon: Instagram, href: "#" }
              ].map(({ Icon, href }, idx) => (
                <Magnetic key={idx} intensity={0.2}>
                  <a 
                    href={href} 
                    className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 text-gray-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all duration-300 border border-white/10 hover:border-gold-500 group"
                  >
                    <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-12" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8 flex items-center">
              <span className="w-2 h-2 bg-gold-500 mr-2 rounded-full" /> Navigation
            </h3>
            <ul className="space-y-5">
              {['Admissions 2026', 'Academic Calendar', 'Examination Results', 'Placement Cell', 'Central Library'].map((item, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center group w-fit">
                    <ChevronRight className="w-3 h-3 mr-2 text-gold-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="relative overflow-hidden pb-1 -ml-5 group-hover:ml-0 transition-all duration-300">
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div className="footer-col lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8 flex items-center">
              <span className="w-2 h-2 bg-gold-500 mr-2 rounded-full" /> Governance
            </h3>
            <ul className="space-y-5">
              {['Grievance Redressal', 'Anti-Ragging', 'Women Empowerment', 'Mandatory Disclosures', 'Alumni Association'].map((item, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-all flex items-center group w-fit">
                    <ChevronRight className="w-3 h-3 mr-2 text-gold-500 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                    <span className="relative overflow-hidden pb-1 -ml-5 group-hover:ml-0 transition-all duration-300">
                      {item}
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-gold-500 -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="footer-col lg:col-span-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8 flex items-center">
              <span className="w-2 h-2 bg-gold-500 mr-2 rounded-full" /> Get In Touch
            </h3>
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:border-gold-500/30 transition-colors duration-500 group">
              <ul className="space-y-6">
                <li className="flex items-start group/item">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-4 group-hover/item:bg-gold-500 transition-colors duration-300 shrink-0 border border-white/10 group-hover/item:border-gold-500">
                    <MapPin className="w-4 h-4 text-gold-500 group-hover/item:text-navy-900" />
                  </div>
                  <span className="text-gray-400 group-hover/item:text-gray-200 text-xs font-bold leading-relaxed uppercase tracking-widest transition-colors mt-1">
                    Bull Temple Rd, Basavanagudi,<br />
                    Bengaluru, Karnataka 560004
                  </span>
                </li>
                <li className="flex items-center group/item">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-4 group-hover/item:bg-gold-500 transition-colors duration-300 shrink-0 border border-white/10 group-hover/item:border-gold-500">
                    <Phone className="w-4 h-4 text-gold-500 group-hover/item:text-navy-900 group-hover/item:animate-bounce" />
                  </div>
                  <a href="tel:+918026622130" className="text-gray-400 hover:text-gold-500 text-xs font-bold uppercase tracking-widest transition-colors">+91 80 2662 2130</a>
                </li>
                <li className="flex items-center group/item">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-4 group-hover/item:bg-gold-500 transition-colors duration-300 shrink-0 border border-white/10 group-hover/item:border-gold-500">
                    <Mail className="w-4 h-4 text-gold-500 group-hover/item:text-navy-900" />
                  </div>
                  <a href="mailto:info@bmsce.ac.in" className="text-gray-400 hover:text-gold-500 text-xs font-bold uppercase tracking-widest transition-colors">info@bmsce.ac.in</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-col pt-8 pb-4 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] relative">
          <p className="text-gray-500 mb-6 md:mb-0 text-center md:text-left">
            © {new Date().getFullYear()} B.M.S. College of Engineering. Crafted for Excellence.
          </p>
          
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <div className="flex space-x-8">
              <Link to="#" className="text-gray-500 hover:text-gold-500 transition-colors">Privacy Policy</Link>
              <Link to="#" className="text-gray-500 hover:text-gold-500 transition-colors">Terms of Use</Link>
              <Link to="#" className="text-gray-500 hover:text-gold-500 transition-colors">Sitemap</Link>
            </div>
            
            {/* Magnetic Back to Top Button */}
            <Magnetic intensity={0.2}>
              <button 
                onClick={scrollToTop}
                className="w-10 h-10 rounded-xl bg-gold-500/10 hover:bg-gold-500 text-gold-500 hover:text-navy-900 border border-gold-500/20 hover:shadow-[0_0_15px_rgba(245,158,11,0.5)] flex items-center justify-center transition-all duration-300 group ml-0 md:ml-4"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  );
}