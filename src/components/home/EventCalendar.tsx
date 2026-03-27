import { useState, useRef } from "react";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays,
  parseISO
} from "date-fns";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, CalendarDays, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Magnetic } from "../ui/Magnetic"; // Ensure correct path

// Sample events data
const eventsData = [
  {
    id: 1,
    date: "2026-10-15",
    title: "International Conference on AI & Robotics",
    type: "conference",
    time: "09:00 AM",
    location: "Main Auditorium"
  },
  {
    id: 2,
    date: "2026-11-22",
    title: "Annual Tech Symposium 2026",
    type: "symposium",
    time: "10:30 AM",
    location: "Tech Park"
  },
  {
    id: 3,
    date: "2026-12-05",
    title: "Workshop on Sustainable Energy Solutions",
    type: "workshop",
    time: "02:00 PM",
    location: "Block B, Room 304"
  },
  {
    id: 4,
    date: "2026-03-20",
    title: "Spring Semester Midterms Begin",
    type: "academic",
    time: "08:00 AM",
    location: "Campus-wide"
  },
  {
    id: 5,
    date: "2026-03-25",
    title: "Guest Lecture: Future of Quantum Computing",
    type: "lecture",
    time: "11:00 AM",
    location: "Seminar Hall 1"
  },
  {
    id: 6,
    date: "2026-04-10",
    title: "Campus Placement Drive",
    type: "career",
    time: "09:00 AM",
    location: "Placement Cell"
  }
];

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const containerRef = useRef<HTMLDivElement>(null);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const onDateClick = (day: Date) => setSelectedDate(day);

  // GSAP Animation: Cascade the calendar cells when the month changes
  useGSAP(() => {
    gsap.fromTo('.calendar-cell',
      { opacity: 0, scale: 0.8, y: 10 },
      { 
        opacity: 1, 
        scale: 1, 
        y: 0,
        stagger: 0.015, 
        duration: 0.4, 
        ease: "back.out(1.5)",
        overwrite: true 
      }
    );
  }, { dependencies: [currentMonth], scope: containerRef });

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-8 relative z-10">
        <h3 className="text-xl font-black text-navy-900 dark:text-white flex items-center tracking-tighter uppercase group">
          <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center mr-3 transition-transform group-hover:scale-110 group-hover:-rotate-6">
            <CalendarIcon className="w-5 h-5 text-gold-500" />
          </div>
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex space-x-2">
          <Magnetic intensity={0.2}>
            <button 
              onClick={prevMonth}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gold-500 hover:text-navy-900 text-gray-600 dark:text-gray-300 transition-all active:scale-95 group shadow-sm hover:shadow-gold-500/30"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
            </button>
          </Magnetic>
          <Magnetic intensity={0.2}>
            <button 
              onClick={nextMonth}
              className="p-2.5 rounded-xl bg-gray-100 dark:bg-slate-800 hover:bg-gold-500 hover:text-navy-900 text-gray-600 dark:text-gray-300 transition-all active:scale-95 group shadow-sm hover:shadow-gold-500/30"
            >
              <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
            </button>
          </Magnetic>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const startDate = startOfWeek(currentMonth);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-black text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] py-4">
          {format(addDays(startDate, i), "EEE")}
        </div>
      );
    }

    return <div className="grid grid-cols-7 mb-2 border-b border-gray-100 dark:border-white/5 relative z-10">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        
        const dayEvents = eventsData.filter(e => isSameDay(parseISO(e.date), cloneDay));
        const hasEvents = dayEvents.length > 0;
        const isSelected = isSameDay(day, selectedDate);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isToday = isSameDay(day, new Date());

        days.push(
          <div
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
            className={`
              calendar-cell relative p-1.5 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
              ${!isCurrentMonth ? "opacity-30 grayscale" : "opacity-100"}
              ${isSelected ? "z-10" : "hover:z-10"}
            `}
          >
            {/* The actual Date Bubble */}
            <span className={`
              w-10 h-10 flex items-center justify-center rounded-2xl text-xs font-bold transition-all duration-300
              ${isSelected ? "bg-gold-500 text-navy-900 shadow-[0_0_20px_rgba(245,158,11,0.4)] scale-110" : "text-navy-900 dark:text-white group-hover:bg-gray-100 dark:group-hover:bg-white/10 group-hover:scale-105"}
              ${isToday && !isSelected ? "ring-2 ring-inset ring-gold-500 text-gold-500" : ""}
            `}>
              {formattedDate}
            </span>
            
            {/* Event Dots underneath */}
            <div className="absolute bottom-0 flex space-x-1 transition-transform group-hover:-translate-y-1">
              {dayEvents.slice(0, 3).map((_, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full shadow-sm transition-colors ${isSelected ? 'bg-navy-900' : 'bg-gold-500'}`} 
                />
              ))}
            </div>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-y-2 gap-x-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-4 relative z-10">{rows}</div>;
  };

  const renderSelectedDateEvents = () => {
    const selectedEvents = eventsData.filter(e => isSameDay(parseISO(e.date), selectedDate));

    return (
      <div className="mt-6 border-t border-gray-100 dark:border-white/5 pt-6 relative z-10 flex-grow flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.3em] flex items-center">
            <span className="w-2 h-2 rounded-full bg-gold-500 mr-2 animate-pulse" />
            Schedule for {format(selectedDate, "MMM d, yyyy")}
          </h4>
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            {selectedEvents.length} Event{selectedEvents.length !== 1 ? 's' : ''}
          </span>
        </div>
        
        <div className="flex-grow overflow-hidden">
          <AnimatePresence mode="wait">
            {selectedEvents.length > 0 ? (
              <motion.ul 
                key="events-list"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ staggerChildren: 0.1, duration: 0.3 }}
                className="space-y-4 pr-2 max-h-[250px] overflow-y-auto custom-scrollbar"
              >
                {selectedEvents.map((event, idx) => (
                  <motion.li 
                    key={event.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="group relative overflow-hidden flex flex-col p-5 bg-white dark:bg-slate-800/80 rounded-2xl border border-gray-100 dark:border-white/10 hover:border-gold-500/50 shadow-sm hover:shadow-xl transition-all duration-300"
                  >
                    {/* Hover Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gold-500/0 via-gold-500/0 to-gold-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                    
                    <div className="flex justify-between items-start mb-3 relative z-10">
                      <span className="text-[9px] font-black text-gold-500 uppercase tracking-widest bg-gold-500/10 px-2.5 py-1 rounded-md">
                        {event.type}
                      </span>
                    </div>

                    <h5 className="text-sm font-bold text-navy-900 dark:text-white mb-3 leading-snug group-hover:text-gold-500 transition-colors relative z-10">
                      {event.title}
                    </h5>

                    <div className="flex items-center space-x-4 text-xs font-medium text-gray-500 dark:text-gray-400 relative z-10">
                      {event.time && (
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mr-2">
                            <Clock className="w-3 h-3 text-gold-500" />
                          </div>
                          {event.time}
                        </div>
                      )}
                      {event.location && (
                        <div className="flex items-center">
                          <div className="w-5 h-5 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center mr-2">
                            <MapPin className="w-3 h-3 text-gold-500" />
                          </div>
                          <span className="truncate max-w-[120px]">{event.location}</span>
                        </div>
                      )}
                    </div>
                  </motion.li>
                ))}
              </motion.ul>
            ) : (
              <motion.div 
                key="no-events"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col items-center justify-center h-full py-8 text-center"
              >
                <div className="w-16 h-16 rounded-3xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center mb-4 shadow-inner">
                  <CalendarDays className="w-8 h-8 text-gray-300 dark:text-gray-600" />
                </div>
                <p className="text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Free Day</p>
                <p className="text-sm text-gray-400 dark:text-gray-600 font-medium">No events scheduled for this date.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative bg-white dark:bg-slate-900/60 backdrop-blur-2xl border border-gray-200 dark:border-white/10 rounded-[2.5rem] p-8 h-full flex flex-col transition-all shadow-xl overflow-hidden">
      {/* Decorative Ambient Background Glow */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-navy-500/10 blur-[100px] rounded-full pointer-events-none" />

      {renderHeader()}
      {renderDays()}
      {renderCells()}
      {renderSelectedDateEvents()}
    </div>
  );
}

// Helper SVG Icon (since you might not have Clock imported from lucide-react initially)
function Clock(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}