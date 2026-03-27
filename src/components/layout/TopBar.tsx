import { Phone, Mail, LogIn, LogOut, User as UserIcon, Sun, Moon, Shield, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import { useAuth } from "../../lib/AuthContext";
import { useTheme } from "../../lib/ThemeContext";
import { Link } from "react-router-dom";

export function TopBar() {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="bg-navy-900 text-white py-2.5 px-4 sm:px-6 lg:px-8 border-b border-white/5 relative z-50">
      <div className="max-w-[1400px] mx-auto flex flex-wrap justify-between items-center text-[10px] font-bold tracking-[0.2em] uppercase">
        <div className="flex items-center space-x-6">
          <a href="tel:+918026622130" className="flex items-center hover:text-gold-500 transition-colors group">
            <Phone className="h-3 w-3 mr-2 text-gold-500 group-hover:scale-110 transition-transform" />
            <span>+91-80-26622130</span>
          </a>
          <a href="mailto:principal@bmsce.ac.in" className="flex items-center hover:text-gold-500 transition-colors group">
            <Mail className="h-3 w-3 mr-2 text-gold-500 group-hover:scale-110 transition-transform" />
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
            <button 
              onClick={toggleTheme}
              className="p-1.5 hover:bg-white/10 rounded-full transition-all hover:text-gold-500"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
            </button>

            {user ? (
              <div className="flex items-center space-x-4 border-l border-white/10 pl-4">
                {user.role === 'admin' && (
                  <Link to="/admin" className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors">
                    <Shield className="h-3 w-3 mr-1.5" /> Admin
                  </Link>
                )}
                <span className="flex items-center text-gold-500">
                  <UserIcon className="h-3 w-3 mr-1.5" /> {user.displayName?.split(' ')[0]}
                </span>
                <button 
                  onClick={signOut}
                  className="flex items-center hover:text-red-400 transition-colors"
                >
                  <LogOut className="h-3 w-3 mr-1.5" /> Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login"
                className="flex items-center hover:text-gold-500 transition-colors border-l border-white/10 pl-4"
              >
                <LogIn className="h-3 w-3 mr-1.5 text-gold-500" /> Campus Login
              </Link>
            )}

            <Link 
              to="/about/contact-us" 
              className="bg-gold-500 hover:bg-gold-600 text-navy-900 px-4 py-1.5 rounded-full text-[9px] font-black transition-all hover:scale-105 active:scale-95 ml-2"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

