import { Phone, Mail, LogIn, LogOut, User as UserIcon, Sun, Moon, Shield } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { useTheme } from "../../lib/ThemeContext";
import { Link } from "react-router-dom";
import { Magnetic } from "../ui/Magnetic";

export function TopBar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-navy-900 text-white py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative z-50">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase">
        <div className="flex items-center space-x-6">
          {/* Phone - Ringing effect on hover */}
          <a href="tel:+918026622130" className="flex items-center hover:text-gold-500 transition-colors group">
            <Phone className="h-3 w-3 mr-2 text-gold-500 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[15deg]" />
            <span>+91-80-26622130</span>
          </a>
          
          {/* Mail - Flying effect on hover */}
          <a href="mailto:principal@bmsce.ac.in" className="flex items-center hover:text-gold-500 transition-colors group">
            <Mail className="h-3 w-3 mr-2 text-gold-500 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span>principal@bmsce.ac.in</span>
          </a>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden lg:flex items-center space-x-6 border-r border-white/10 pr-6 mr-6">
            <Link to="/documents/overview" className="hover:text-gold-500 transition-colors">Results</Link>
            <Link to="/about/about-bmsce" className="hover:text-gold-500 transition-colors">Alumni</Link>
            <Link to="/about/e-governance" className="hover:text-gold-500 transition-colors">Tenders</Link>
          </div>

          <div className="flex items-center space-x-4">
            
            {/* Theme Toggle - Spin effect + Magnetic */}
            <Magnetic intensity={0.2}>
              <button 
                onClick={toggleTheme}
                className="group p-1.5 hover:bg-white/10 rounded-full transition-all hover:text-gold-500"
                aria-label="Toggle Dark Mode"
              >
                {theme === 'dark' ? (
                  <Sun className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110" />
                ) : (
                  <Moon className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                )}
              </button>
            </Magnetic>

            {user ? (
              <div className="flex items-center space-x-4 border-l border-white/10 pl-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="group flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                    <Shield className="h-3 w-3 mr-1.5 transition-transform duration-300 group-hover:scale-110 group-hover:text-emerald-200" /> Admin
                  </Link>
                )}
                <span className="group flex items-center text-gold-500 cursor-default">
                  <UserIcon className="h-3 w-3 mr-1.5 transition-transform duration-300 group-hover:scale-110" /> {user.displayName?.split(' ')[0]}
                </span>
                <button 
                  onClick={signOut}
                  className="group flex items-center hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-3 w-3 mr-1.5 transition-transform duration-300 group-hover:translate-x-1" /> Logout
                </button>
              </div>
            ) : (
              // Login - Arrow pushes inward + Magnetic
              <Magnetic intensity={0.2}>
                <Link 
                  to="/login"
                  className="group flex items-center hover:text-gold-500 transition-colors border-l border-white/10 pl-4"
                >
                  <LogIn className="h-3 w-3 mr-1.5 text-gold-500 transition-transform duration-300 group-hover:translate-x-1" /> Campus Login
                </Link>
              </Magnetic>
            )}

            {/* Contact Us - Main Magnetic CTA */}
            <Magnetic intensity={0.3}>
              <Link 
                to="/about/contact-us" 
                className="bg-gold-500 hover:bg-gold-400 text-navy-900 px-4 py-1.5 rounded-full text-[9px] font-black transition-all shadow-[0_0_10px_rgba(245,158,11,0.2)] hover:shadow-[0_0_20px_rgba(245,158,11,0.5)] ml-2 inline-block"
              >
                Contact Us
              </Link>
            </Magnetic>
            
          </div>
        </div>
      </div>
    </div>
  );
}