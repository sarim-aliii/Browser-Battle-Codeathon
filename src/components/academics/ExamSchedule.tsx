import { useState, useRef } from 'react';
import { Search, Filter, Calendar, Clock, MapPin, Download } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Magnetic } from '../ui/Magnetic'; // Assuming you have this from previous steps

interface Exam {
  id: string;
  course: string;
  semester: string;
  date: string;
  time: string;
  location: string;
}

const mockExams: Exam[] = [
  { id: '1', course: 'Structural Analysis', semester: '5th', date: '2026-05-15', time: '10:00 AM - 1:00 PM', location: 'Block A, Room 302' },
  { id: '2', course: 'Geotechnical Engineering', semester: '5th', date: '2026-05-18', time: '2:00 PM - 5:00 PM', location: 'Block A, Room 304' },
  { id: '3', course: 'Environmental Engineering', semester: '7th', date: '2026-05-20', time: '10:00 AM - 1:00 PM', location: 'Block B, Room 101' },
  { id: '4', course: 'Transportation Engineering', semester: '7th', date: '2026-05-22', time: '2:00 PM - 5:00 PM', location: 'Block B, Room 105' },
  { id: '5', course: 'Fluid Mechanics', semester: '3rd', date: '2026-05-25', time: '10:00 AM - 1:00 PM', location: 'Block A, Room 201' },
  { id: '6', course: 'Surveying', semester: '3rd', date: '2026-05-27', time: '2:00 PM - 5:00 PM', location: 'Block A, Room 205' },
];

export function ExamSchedule({ department }: { department: string }) {
  const [semesterFilter, setSemesterFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const semesters = ['All', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const filteredExams = mockExams.filter(exam => {
    const matchesSemester = semesterFilter === 'All' || exam.semester === semesterFilter;
    const matchesSearch = exam.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  // GSAP Animation for staggered list rendering
  useGSAP(() => {
    // Animate the header and controls on initial load
    gsap.fromTo('.schedule-header',
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Animate table rows whenever the filtered data changes
    gsap.fromTo('.exam-row',
      { opacity: 0, x: -20 },
      { 
        opacity: 1, 
        x: 0, 
        stagger: 0.05, 
        duration: 0.4, 
        ease: "power2.out",
        overwrite: true // Prevents animation conflicts when typing fast
      }
    );
  }, { dependencies: [filteredExams], scope: containerRef });

  return (
    <div ref={containerRef} className="mt-12 space-y-6 relative">
      {/* Decorative background glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-32 bg-gold-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="schedule-header flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-navy-900 dark:text-white flex items-center group">
          <Calendar className="w-6 h-6 mr-3 text-gold-500 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110" />
          Exam Schedule - {department}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          {/* Search Input with Focus Glow */}
          <div className="relative group/search w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within/search:text-gold-500" />
            <input
              type="text"
              placeholder="Search course..."
              className="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all w-full shadow-sm hover:border-gray-300 dark:hover:border-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Filter Dropdown */}
          <div className="relative group/filter w-full sm:w-auto">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within/filter:text-gold-500" />
            <select
              className="pl-10 pr-10 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-slate-900 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-gold-500/50 focus:border-gold-500 outline-none transition-all appearance-none cursor-pointer w-full shadow-sm hover:border-gray-300 dark:hover:border-white/20 font-medium"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem} {sem !== 'All' && 'Semester'}</option>
              ))}
            </select>
            {/* Custom dropdown arrow */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-2 h-2 border-b-2 border-r-2 border-gray-400 rotate-45 group-focus-within/filter:border-gold-500 transition-colors" />
            </div>
          </div>

          {/* Magnetic Export Button */}
          <Magnetic intensity={0.2}>
            <button className="hidden lg:flex items-center px-4 py-2.5 bg-navy-900 dark:bg-white text-white dark:text-navy-900 font-bold rounded-xl hover:bg-gold-500 dark:hover:bg-gold-500 hover:text-navy-900 transition-all shadow-lg hover:shadow-gold-500/25 group">
              <Download className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:-translate-y-1" />
              Export
            </button>
          </Magnetic>
        </div>
      </div>

      {/* Table Container with Glassmorphism */}
      <div className="schedule-header overflow-x-auto rounded-2xl border border-gray-200 dark:border-white/10 shadow-xl bg-white dark:bg-slate-900/50 backdrop-blur-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 dark:bg-slate-800/80 border-b border-gray-200 dark:border-white/10">
              <th className="px-6 py-5 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Course Name</th>
              <th className="px-6 py-5 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Semester</th>
              <th className="px-6 py-5 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Date</th>
              <th className="px-6 py-5 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Time</th>
              <th className="px-6 py-5 text-xs font-bold text-navy-900 dark:text-gray-300 uppercase tracking-wider">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-white/5">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <tr 
                  key={exam.id} 
                  className="exam-row group hover:bg-gold-50/50 dark:hover:bg-white/5 transition-colors duration-300"
                >
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900 dark:text-white group-hover:text-gold-600 dark:group-hover:text-gold-400 transition-colors">
                      {exam.course}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-white/10 dark:text-gray-300">
                      {exam.semester}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gold-500 transition-colors" />
                      {exam.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gold-500 transition-colors" />
                      {exam.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gold-500 transition-colors" />
                      {exam.location}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No exams found matching your criteria.</p>
                    <button 
                      onClick={() => { setSearchQuery(''); setSemesterFilter('All'); }}
                      className="text-sm text-gold-500 hover:text-gold-600 font-bold tracking-wide"
                    >
                      Clear Filters
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}