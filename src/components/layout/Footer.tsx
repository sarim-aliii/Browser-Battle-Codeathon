import { MapPin, Phone, Mail, Facebook, Twitter, Linkedin, Instagram, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="bg-navy-900 text-white pt-24 pb-12 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-10">
        <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-gold-500/20 blur-[150px] rounded-full animate-float" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-navy-600/20 blur-[150px] rounded-full animate-float" style={{ animationDelay: '3s' }} />
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-20"
        >
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-4">
            <div className="flex items-center mb-8 group cursor-pointer">
              <img 
                src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/BMS_College_of_Engineering.svg/1200px-BMS_College_of_Engineering.svg.png" 
                alt="BMSCE Logo" 
                className="h-16 w-16 mr-4 object-contain group-hover:scale-110 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="flex flex-col">
                <span className="font-black text-2xl tracking-tighter leading-none">B.M.S. <span className="text-gold-500">COLLEGE</span></span>
                <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 mt-1">Engineering Excellence</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-10 font-medium">
              Established in 1946, B.M.S. College of Engineering is a premier institution dedicated to fostering innovation, leadership, and technical excellence in the heart of Bengaluru.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, idx) => (
                <a 
                  key={idx}
                  href="#" 
                  className="w-10 h-10 rounded-2xl glass-dark flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-all hover:-translate-y-1 border border-white/10"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8">Navigation</h3>
            <ul className="space-y-4">
              {['Admissions 2026', 'Academic Calendar', 'Examination Results', 'Placement Cell', 'Central Library'].map((item, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-gold-500 text-xs font-bold uppercase tracking-widest transition-all flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 text-gold-500 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Important Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8">Governance</h3>
            <ul className="space-y-4">
              {['Grievance Redressal', 'Anti-Ragging', 'Women Empowerment', 'Mandatory Disclosures', 'Alumni Association'].map((item, idx) => (
                <li key={idx}>
                  <Link to="#" className="text-gray-400 hover:text-gold-500 text-xs font-bold uppercase tracking-widest transition-all flex items-center group">
                    <ChevronRight className="w-3 h-3 mr-2 text-gold-500 group-hover:translate-x-1 transition-transform" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="lg:col-span-4">
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gold-500 mb-8">Get In Touch</h3>
            <div className="glass-dark p-8 rounded-[2rem] border border-white/10">
              <ul className="space-y-6">
                <li className="flex items-start group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-gold-500 transition-colors">
                    <MapPin className="w-4 h-4 text-gold-500 group-hover:text-navy-900" />
                  </div>
                  <span className="text-gray-400 text-xs font-bold leading-relaxed uppercase tracking-widest">
                    Bull Temple Rd, Basavanagudi,<br />
                    Bengaluru, Karnataka 560004
                  </span>
                </li>
                <li className="flex items-center group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-gold-500 transition-colors">
                    <Phone className="w-4 h-4 text-gold-500 group-hover:text-navy-900" />
                  </div>
                  <a href="tel:+918026622130" className="text-gray-400 hover:text-gold-500 text-xs font-bold uppercase tracking-widest transition-colors">+91 80 2662 2130</a>
                </li>
                <li className="flex items-center group">
                  <div className="w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center mr-4 group-hover:bg-gold-500 transition-colors">
                    <Mail className="w-4 h-4 text-gold-500 group-hover:text-navy-900" />
                  </div>
                  <a href="mailto:info@bmsce.ac.in" className="text-gray-400 hover:text-gold-500 text-xs font-bold uppercase tracking-widest transition-colors">info@bmsce.ac.in</a>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em]">
          <p className="text-gray-500 mb-6 md:mb-0">
            © {new Date().getFullYear()} B.M.S. College of Engineering. Crafted for Excellence.
          </p>
          <div className="flex space-x-8">
            <Link to="#" className="text-gray-500 hover:text-gold-500 transition-colors">Privacy Policy</Link>
            <Link to="#" className="text-gray-500 hover:text-gold-500 transition-colors">Terms of Use</Link>
            <Link to="#" className="text-gray-500 hover:text-gold-500 transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
