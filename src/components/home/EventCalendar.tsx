import { useState } from "react";
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
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Sample events data
const eventsData = [
  {
    id: 1,
    date: "2026-10-15",
    title: "International Conference on AI & Robotics",
    type: "conference"
  },
  {
    id: 2,
    date: "2026-11-22",
    title: "Annual Tech Symposium 2026",
    type: "symposium"
  },
  {
    id: 3,
    date: "2026-12-05",
    title: "Workshop on Sustainable Energy Solutions",
    type: "workshop"
  },
  {
    id: 4,
    date: "2026-03-20",
    title: "Spring Semester Midterms Begin",
    type: "academic"
  },
  {
    id: 5,
    date: "2026-03-25",
    title: "Guest Lecture: Future of Quantum Computing",
    type: "lecture"
  },
  {
    id: 6,
    date: "2026-04-10",
    title: "Campus Placement Drive",
    type: "career"
  }
];

export function EventCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const onDateClick = (day: Date) => setSelectedDate(day);

  const renderHeader = () => {
    return (
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-lg font-black text-navy-900 dark:text-white flex items-center tracking-tighter uppercase">
          <CalendarIcon className="w-5 h-5 mr-3 text-gold-500" />
          {format(currentMonth, "MMMM yyyy")}
        </h3>
        <div className="flex space-x-2">
          <button 
            onClick={prevMonth}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gold-500 hover:text-navy-900 text-navy-900 dark:text-white transition-all active:scale-95"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button 
            onClick={nextMonth}
            className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gold-500 hover:text-navy-900 text-navy-900 dark:text-white transition-all active:scale-95"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
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

    return <div className="grid grid-cols-7 mb-2">{days}</div>;
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
              relative p-2 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
              ${!isCurrentMonth ? "opacity-20" : "opacity-100"}
              ${isSelected ? "scale-110 z-10" : "hover:scale-105"}
            `}
          >
            <span className={`
              w-10 h-10 flex items-center justify-center rounded-2xl text-xs font-bold transition-all
              ${isSelected ? "bg-gold-500 text-navy-900 shadow-lg shadow-gold-500/30" : "text-navy-900 dark:text-white group-hover:bg-white/10"}
              ${isToday && !isSelected ? "border-2 border-gold-500 text-gold-500" : ""}
            `}>
              {formattedDate}
            </span>
            
            {hasEvents && (
              <div className="absolute bottom-1 flex space-x-0.5">
                {dayEvents.slice(0, 3).map((_, idx) => (
                  <div key={idx} className={`w-1 h-1 rounded-full ${isSelected ? 'bg-navy-900' : 'bg-gold-500'}`} />
                ))}
              </div>
            )}
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="grid grid-cols-7 gap-1" key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="mb-4">{rows}</div>;
  };

  const renderSelectedDateEvents = () => {
    const selectedEvents = eventsData.filter(e => isSameDay(parseISO(e.date), selectedDate));

    return (
      <div className="mt-8 border-t border-gray-100 dark:border-white/5 pt-8">
        <h4 className="text-[10px] font-black text-gray-400 dark:text-gray-500 mb-6 uppercase tracking-[0.3em]">
          Events for {format(selectedDate, "MMMM d, yyyy")}
        </h4>
        
        <AnimatePresence mode="wait">
          {selectedEvents.length > 0 ? (
            <motion.ul 
              key="events-list"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {selectedEvents.map(event => (
                <li key={event.id} className="flex items-start p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5 group hover:border-gold-500/30 transition-all">
                  <div className="w-2 h-2 mt-1.5 rounded-full bg-gold-500 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
                  <div>
                    <p className="text-sm font-bold text-navy-900 dark:text-white mb-1">{event.title}</p>
                    <span className="text-[10px] font-black text-gold-500 uppercase tracking-widest">{event.type}</span>
                  </div>
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.div 
              key="no-events"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-12 text-gray-400 dark:text-gray-500 text-xs font-bold uppercase tracking-widest"
            >
              No events scheduled
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-navy-900/40 rounded-[2.5rem] p-8 h-full flex flex-col transition-all">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <div className="flex-grow"></div>
      {renderSelectedDateEvents()}
    </div>
  );
}
