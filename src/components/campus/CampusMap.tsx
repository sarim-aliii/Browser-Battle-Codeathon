import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { MapPin, Info, Navigation, BookOpen, Home, Building, Coffee, ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const locations = [
  {
    id: 'admin',
    name: 'Main Administrative Block',
    category: 'admin',
    x: 35, y: 28,
    icon: Building,
    description: 'The central administrative hub housing the Principal\'s office, admissions, and student affairs.',
    image: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'library',
    name: 'Central Library',
    category: 'academic',
    x: 64, y: 28,
    icon: BookOpen,
    description: 'A multi-story library with over 100,000 volumes, digital resources, and quiet study zones.',
    image: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'cs-dept',
    name: 'Computer Science & IT Block',
    category: 'academic',
    x: 35, y: 75,
    icon: Navigation,
    description: 'State-of-the-art computer labs, AI research centers, and lecture halls for CS/IT students.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'mech-dept',
    name: 'Mechanical Engineering Workshop',
    category: 'academic',
    x: 64, y: 75,
    icon: Navigation,
    description: 'Heavy machinery, robotics labs, and automotive testing facilities.',
    image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'hostel-boys',
    name: 'Boys Hostel (Block A)',
    category: 'residential',
    x: 82, y: 28,
    icon: Home,
    description: 'Residential facility for male students with dining and recreation areas.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'hostel-girls',
    name: 'Girls Hostel (Block B)',
    category: 'residential',
    x: 8, y: 28,
    icon: Home,
    description: 'Secure residential facility for female students with modern amenities.',
    image: 'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=500&auto=format&fit=crop'
  },
  {
    id: 'cafeteria',
    name: 'Student Center & Cafeteria',
    category: 'facility',
    x: 50, y: 50,
    icon: Coffee,
    description: 'Multi-cuisine food court, student club offices, and lounge areas.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=500&auto=format&fit=crop'
  }
];

export function CampusMap() {
  const [selectedLoc, setSelectedLoc] = useState(locations[0]);

  return (
    <section className="py-16 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 dark:text-white mb-4">Interactive Campus Map</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto rounded"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Explore our 150-acre lush green campus. Use your mouse or touch to pan and zoom. Click on markers to view facility details.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 h-[600px]">
          {/* Map Area */}
          <div className="flex-grow lg:w-2/3 bg-gray-100 dark:bg-slate-800 rounded-2xl overflow-hidden shadow-inner border border-gray-200 dark:border-slate-700 relative">
            <TransformWrapper
              initialScale={1}
              minScale={0.5}
              maxScale={4}
              centerOnInit={true}
            >
              {({ zoomIn, zoomOut, resetTransform }) => (
                <>
                  <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 bg-white dark:bg-slate-900 p-2 rounded-lg shadow-md">
                    <button onClick={() => zoomIn()} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-navy-900 dark:text-white transition-colors" aria-label="Zoom In">
                      <ZoomIn className="w-5 h-5" />
                    </button>
                    <button onClick={() => zoomOut()} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-navy-900 dark:text-white transition-colors" aria-label="Zoom Out">
                      <ZoomOut className="w-5 h-5" />
                    </button>
                    <button onClick={() => resetTransform()} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded text-navy-900 dark:text-white transition-colors" aria-label="Reset Map">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <TransformComponent wrapperClass="w-full h-full cursor-grab active:cursor-grabbing" contentClass="w-full h-full">
                    <div className="w-[1200px] h-[800px] relative origin-top-left">
                      {/* SVG Background Map */}
                      <svg width="100%" height="100%" viewBox="0 0 1200 800" className="absolute inset-0 z-0" preserveAspectRatio="none">
                        <rect width="1200" height="800" fill="#f1f5f9" />
                        {/* Roads */}
                        <path d="M 0 400 Q 300 450 600 400 T 1200 400 L 1200 440 Q 900 490 600 440 T 0 440 Z" fill="#cbd5e1" />
                        <path d="M 600 0 L 640 0 L 640 800 L 600 800 Z" fill="#cbd5e1" />
                        <path d="M 200 100 L 240 100 L 240 700 L 200 700 Z" fill="#cbd5e1" />
                        <path d="M 900 100 L 940 100 L 940 700 L 900 700 Z" fill="#cbd5e1" />
                        {/* Grass/Blocks */}
                        <rect x="280" y="100" width="280" height="250" rx="20" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="4" />
                        <rect x="680" y="100" width="180" height="250" rx="20" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="4" />
                        <rect x="50" y="100" width="110" height="250" rx="20" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="4" />
                        <rect x="280" y="500" width="280" height="200" rx="20" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="4" />
                        <rect x="680" y="500" width="180" height="200" rx="20" fill="#dcfce7" stroke="#bbf7d0" strokeWidth="4" />
                      </svg>

                      {/* Markers */}
                      {locations.map((loc) => {
                        const isSelected = selectedLoc.id === loc.id;
                        const Icon = loc.icon;
                        return (
                          <button
                            key={loc.id}
                            onClick={() => setSelectedLoc(loc)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedLoc(loc);
                              }
                            }}
                            tabIndex={0}
                            className={`absolute z-10 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center group transition-transform focus:outline-none focus:ring-4 focus:ring-gold-500 focus:ring-opacity-50 rounded-full ${isSelected ? 'scale-125 z-20' : 'hover:scale-110'}`}
                            style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
                            aria-label={`View details for ${loc.name}`}
                            aria-pressed={isSelected}
                          >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg border-2 transition-colors ${isSelected ? 'bg-gold-500 border-navy-900 text-navy-900' : 'bg-navy-900 border-white text-white group-hover:bg-navy-700'}`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className={`mt-2 px-2 py-1 rounded text-xs font-bold shadow-sm whitespace-nowrap transition-colors ${isSelected ? 'bg-navy-900 text-white' : 'bg-white text-navy-900 opacity-0 group-hover:opacity-100'}`}>
                              {loc.name}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>

          {/* Details Panel */}
          <div className="lg:w-1/3 bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedLoc.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col h-full"
              >
                <div className="h-48 w-full relative flex-shrink-0">
                  <img src={selectedLoc.image} alt={selectedLoc.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-navy-900 dark:text-white uppercase tracking-wider shadow-sm">
                    {selectedLoc.category}
                  </div>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <div className="flex items-start mb-4">
                    <div className="bg-gold-50 dark:bg-gold-900/20 p-2 rounded-lg mr-4 flex-shrink-0">
                      <selectedLoc.icon className="w-6 h-6 text-gold-600 dark:text-gold-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-navy-900 dark:text-white leading-tight">{selectedLoc.name}</h3>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-grow">
                    {selectedLoc.description}
                  </p>
                  <a href={`#${selectedLoc.id}`} className="inline-flex items-center justify-center w-full bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 py-3 rounded-lg font-semibold hover:bg-navy-800 dark:hover:bg-gold-400 transition-colors shadow-md hover:shadow-lg">
                    <Info className="w-5 h-5 mr-2" />
                    View Facility Details
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
