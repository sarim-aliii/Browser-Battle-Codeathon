import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
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
    <header className="bg-white/95 dark:bg-navy-900/95 backdrop-blur-md sticky top-0 z-50 transition-all border-b border-gray-200 dark:border-white/10 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          
          {/* Logo Section */}
          <Magnetic intensity={0.1}>
            <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer group">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500 blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 rounded-full" />
                <img 
                  src="https://upload.wikimedia.org/wikipedia/en/thumb/8/87/BMS_College_of_Engineering.svg/960px-BMS_College_of_Engineering.svg.png" 
                  alt="BMSCE Logo" 
                  className="h-12 w-12 md:h-14 md:w-14 mr-4 object-contain relative z-10 transition-transform duration-500 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-extrabold text-xl md:text-2xl text-navy-900 dark:text-white leading-none tracking-tight">
                  B.M.S. <span className="text-gold-500">College of Engineering</span>
                </span>
                <span className="text-[8px] md:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] font-bold mt-1">Autonomous Institute • Estd. 1946</span>
              </div>
            </Link>
          </Magnetic>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1">
            {navItems.map((item, idx) => (
              <div 
                key={item.name}
                className="relative h-14 flex items-center"
                onMouseEnter={() => setActiveDropdown(item.name)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Magnetic intensity={0.15}>
                  {item.hasDropdown ? (
                    <button className={`relative group px-3 py-2 text-[11px] font-bold tracking-wider transition-all flex items-center gap-1.5 ${activeDropdown === item.name ? 'text-gold-500' : 'text-navy-900 dark:text-gray-200 hover:text-gold-500'}`}>
                      {item.name}
                      <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      <span className={`absolute -bottom-1 left-1/2 h-[2px] bg-gold-500 transition-all duration-300 -translate-x-1/2 rounded-full ${activeDropdown === item.name ? 'w-full' : 'w-0 group-hover:w-3/4'}`} />
                    </button>
                  ) : (
                    <Link 
                      to={`/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      className="relative group px-3 py-2 text-[11px] font-bold tracking-wider transition-all flex items-center text-navy-900 dark:text-gray-200 hover:text-gold-500"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-1/2 w-0 h-[2px] bg-gold-500 transition-all duration-300 group-hover:w-full -translate-x-1/2 rounded-full" />
                    </Link>
                  )}
                </Magnetic>
                
                {/* Enhanced Dropdown Menu */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.name && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.98 }}
                      transition={{ duration: 0.2 }}
                      className={`absolute ${idx >= 8 ? 'right-0' : 'left-0'} top-full z-50 pt-2`}
                    >
                      <div className={`bg-white dark:bg-slate-900 shadow-[0_20px_50px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] p-8 rounded-2xl border border-gray-100 dark:border-white/10 ${item.columns === 3 ? 'w-[850px]' : 'w-72'}`}>
                        <div className="mb-5 flex items-center gap-4">
                          <h3 className="text-gold-600 dark:text-gold-500 font-black tracking-widest text-[10px] uppercase">{item.name}</h3>
                          <div className="h-px flex-1 bg-gradient-to-r from-gold-500/30 to-transparent" />
                        </div>
                        
                        <div className={`${item.columns === 3 ? 'grid grid-cols-3 gap-x-8 gap-y-1' : 'flex flex-col gap-1'}`}>
                          {item.dropdownItems?.map((dropdownItem, dropdownIdx) => {
                            const isAboutUs = item.name === "ABOUT US";
                            const categorySlug = isAboutUs ? 'about' : item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
                            const slug = dropdownItem.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            const toPath = `/${categorySlug}/${slug}`;
                            
                            return (
                              <Link 
                                key={dropdownIdx} 
                                to={toPath} 
                                className="text-[13px] text-gray-600 dark:text-gray-400 hover:text-navy-900 dark:hover:text-white transition-all duration-200 py-2.5 px-3 rounded-xl hover:bg-gold-500/5 dark:hover:bg-gold-500/10 flex items-center group/item"
                              >
                                <ChevronRight className="w-3 h-3 text-gold-500 mr-2 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all" />
                                <span className="font-medium">{dropdownItem}</span>
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
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl bg-gray-100 dark:bg-white/10 text-navy-900 dark:text-white transition-all active:scale-95"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gold-500" />
              ) : (
                <Menu className="h-6 w-6 text-gold-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="xl:hidden fixed inset-0 z-40 bg-white dark:bg-navy-900 pt-24 px-6 overflow-y-auto"
          >
            <div className="space-y-2 pb-12">
              {navItems.map((item) => (
                <div key={item.name} className="border-b border-gray-100 dark:border-white/5 py-1">
                  {item.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="w-full text-left py-4 text-lg font-bold text-navy-900 dark:text-white flex justify-between items-center"
                      >
                        <span className={activeDropdown === item.name ? 'text-gold-500' : ''}>{item.name}</span>
                        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${activeDropdown === item.name ? 'rotate-180 text-gold-500' : 'text-gray-400'}`} />
                      </button>
                      
                      <AnimatePresence>
                        {activeDropdown === item.name && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-gray-50 dark:bg-white/5 rounded-2xl mb-4 px-4 py-2"
                          >
                            {item.dropdownItems?.map((dropdownItem, idx) => (
                              <Link
                                key={idx}
                                to={`/${item.name.toLowerCase()}/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block py-3 text-sm text-gray-600 dark:text-gray-400 font-medium"
                              >
                                {dropdownItem}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={`/${item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-4 text-lg font-bold text-navy-900 dark:text-white"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}