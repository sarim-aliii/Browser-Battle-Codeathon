import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Magnetic } from "../ui/Magnetic";

const navItems = [
  { 
    name: "ABOUT US", 
    hasDropdown: true,
    columns: 3,
    dropdownItems: [
      "About BMSCE", "Governing Body", "Administration", "Staff Details", "Statutory Committee",
      "Executive Council", "e-Governance", "Institute Industry Interaction Cell (IIIC)", "Internal Quality Assurance Cell (IQAC)", "Annual Reports (Finance)",
      "Life at BMSCE", "Group Institutions", "Tenders", "Consultancy Page"
    ]
  },
  { 
    name: "ACADEMICS", 
    hasDropdown: true,
    columns: 3,
    dropdownItems: [
      "Civil Engineering", "Mechanical Engineering", "Electrical and Electronics Engineering", "Electronics and Communication Engineering", "Industrial Engineering and Management", "Computer Science and Engineering", "Electronics and Telecommunication Engineering", "Information Science and Engineering",
      "Electronics and Instrumentation Engineering", "Medical Electronics Engineering", "Chemical Engineering", "Bio-Technology", "Computer Applications (MCA)", "Management Studies and Research Centre", "Mathematics Department", "Physics Department",
      "Chemistry Department", "Aerospace Engineering", "Machine Learning (AI and ML)", "Computer Science and Engineering (DS)", "Computer Science and Engineering (IoT and CS)", "Artificial Intelligence and Data Science", "Computer Science and Business Systems"
    ]
  },
  { 
    name: "ADMISSIONS", 
    hasDropdown: true,
    columns: 1,
    dropdownItems: [
      "Under Graduation", "Post Graduation", "Ph.D", "International Admissions", "Syllabus", "Admission Process"
    ]
  },
  { 
    name: "RESEARCH", 
    hasDropdown: true,
    columns: 3,
    dropdownItems: [
      "About R & D", "R & D Committee", "Staff", "Application Downloads", "Research Centers", "Innovative Labs",
      "Funded Research Projects", "MoU's With Industries & Research Center", "List of Ph.D Awarded", "List of M.Sc Awarded", "Ph.D Enrollment in Research Centres", "B S Narayan Ph.D Fellowship",
      "B S Narayan Centre for Nano-Materials & Displays", "Journal Publications", "Patents Filed", "Gallery", "IRINS Portal", "Contact Us"
    ]
  },
  { name: "INNOVATION", hasDropdown: false },
  { name: "LABS", hasDropdown: false },
  { name: "COE", hasDropdown: false },
  { name: "TEQIP", hasDropdown: false },
  { 
    name: "FACILITIES", 
    hasDropdown: true,
    columns: 1,
    dropdownItems: [
      "BMS Hospital", "Library", "Hostel", "Data Center", "Sports", "Counselling Center"
    ]
  },
  { 
    name: "PLACEMENTS", 
    hasDropdown: true,
    columns: 1,
    dropdownItems: [
      "About Placements", "Placement Training", "Placement Achievements", "Staff", "Placement Statistics", "Placement Activities", "Recruiting Companies", "Gallery", "Contact Us"
    ]
  },
  { name: "DOCUMENTS", hasDropdown: false },
  { name: "ACTIVITIES", hasDropdown: false },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="bg-white/80 dark:bg-navy-900/80 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-gray-200 dark:border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo with Magnetic pull and glow */}
          <Magnetic intensity={0.1}>
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/5/5a/BMS_College_of_Engineering.svg/1200px-BMS_College_of_Engineering.svg.png" 
                  alt="BMSCE Logo" 
                  className="h-14 w-14 mr-4 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-2xl md:text-3xl text-navy-900 dark:text-white leading-none tracking-tighter">
                  B.M.S. <span className="text-gold-500">College</span>
                </span>
                <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] font-bold mt-1">Engineering • Innovation • Excellence</span>
              </div>
            </Link>
          </Magnetic>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-2">
            {navItems.map((item, idx) => (
              <div 
                key={item.name}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {/* Magnetic Wrapper on Links */}
                <Magnetic intensity={0.2}>
                  {item.hasDropdown ? (
                    <button className={`relative group px-2 py-2 text-[11px] font-bold tracking-widest transition-colors flex items-center ${activeDropdown === item.name ? 'text-gold-500' : 'text-navy-900 dark:text-gray-200 hover:text-gold-500'}`}>
                      {item.name}
                      {/* Premium Animated Underline */}
                      <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-gold-500 transition-all duration-300 -translate-x-1/2 rounded-full ${activeDropdown === item.name ? 'w-1/2' : 'w-0 group-hover:w-3/4'}`} />
                    </button>
                  ) : (
                    <Link 
                      to={`/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="relative group px-2 py-2 text-[11px] font-bold tracking-widest transition-colors flex items-center text-navy-900 dark:text-gray-200 hover:text-gold-500"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-3/4 -translate-x-1/2 rounded-full" />
                    </Link>
                  )}
                </Magnetic>
                
                {/* Mega Menu Dropdown - Fancy Glass Version */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.97 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className={`absolute ${idx >= 8 ? 'right-0' : 'left-0'} top-full pt-6 z-50`}
                    >
                      <div className={`glass-dark shadow-2xl p-8 rounded-3xl border border-white/10 ${item.columns === 3 ? 'w-[850px]' : 'w-72'}`}>
                        <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                          <h3 className="text-gold-500 font-bold tracking-widest text-xs uppercase">{item.name}</h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-gold-500/50 to-transparent mx-4" />
                        </div>
                        <div className={`${item.columns === 3 ? 'columns-3 gap-10' : 'columns-1'}`}>
                          {item.dropdownItems?.map((dropdownItem, dropdownIdx) => {
                            const isAboutUs = item.name === "ABOUT US";
                            const categorySlug = isAboutUs ? 'about' : item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            const slug = dropdownItem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            const toPath = `/${categorySlug}/${slug}`;
                            
                            return (
                              <Link 
                                key={dropdownIdx} 
                                to={toPath} 
                                className="text-[13px] text-gray-300 hover:text-white transition-all duration-300 py-2.5 block break-inside-avoid group/item flex items-center hover:translate-x-1.5"
                              >
                                <div className="w-1.5 h-1.5 bg-gold-500 rounded-full mr-3 opacity-0 group-hover/item:opacity-100 transition-opacity" />
                                <span className="group-hover/item:text-gold-400 transition-colors">{dropdownItem}</span>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center xl:hidden">
            <Magnetic intensity={0.3}>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="group p-2 rounded-xl bg-gray-100 dark:bg-white/10 text-navy-900 dark:text-white transition-all active:scale-95"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90 text-gold-500" />
                ) : (
                  <Menu className="h-6 w-6 transition-transform duration-300 group-hover:-translate-y-0.5 text-gold-500" />
                )}
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Fancy Version */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="xl:hidden fixed inset-0 z-40 bg-navy-900/98 backdrop-blur-2xl pt-24 px-6 overflow-y-auto"
          >
            <div className="space-y-4 pb-12">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-white/10 pb-4">
                  {item.hasDropdown ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="w-full text-left py-3 text-lg font-black tracking-tighter text-white flex justify-between items-center group"
                    >
                      <span className={`transition-colors duration-300 ${activeDropdown === item.name ? 'text-gold-500' : 'group-hover:text-gold-400'}`}>{item.name}</span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-90 text-gold-500' : 'text-gray-500 group-hover:translate-x-1'}`} />
                    </button>
                  ) : (
                    <Link
                      to={`/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3 text-lg font-black tracking-tighter text-white hover:text-gold-500 transition-colors duration-300"
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  <AnimatePresence>
                    {item.hasDropdown && activeDropdown === item.name && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden pl-4 space-y-2 mt-2 border-l border-gold-500/30 ml-2"
                      >
                        {item.dropdownItems?.map((dropdownItem, idx) => {
                          const isAboutUs = item.name === "ABOUT US";
                          const categorySlug = isAboutUs ? 'about' : item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                          const slug = dropdownItem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                          const toPath = `/${categorySlug}/${slug}`;
                          
                          return (
                            <Link
                              key={idx}
                              to={toPath}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-2 text-sm text-gray-400 hover:text-gold-400 transition-all duration-300 hover:translate-x-2"
                            >
                              {dropdownItem}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}