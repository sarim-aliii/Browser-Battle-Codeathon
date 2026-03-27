import React, { useState } from 'react';
import { Search, Filter, Calendar, Clock, MapPin } from 'lucide-react';

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

  const semesters = ['All', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th'];

  const filteredExams = mockExams.filter(exam => {
    const matchesSemester = semesterFilter === 'All' || exam.semester === semesterFilter;
    const matchesSearch = exam.course.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSemester && matchesSearch;
  });

  return (
    <div className="mt-12 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-2xl font-bold text-navy-900 dark:text-white flex items-center">
          <Calendar className="w-6 h-6 mr-2 text-gold-500" />
          Exam Schedule - {department}
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search course..."
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-navy-500 outline-none transition-all w-full sm:w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              className="pl-10 pr-8 py-2 rounded-lg border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-navy-500 outline-none transition-all appearance-none cursor-pointer"
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
            >
              {semesters.map(sem => (
                <option key={sem} value={sem}>{sem} Semester</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-slate-700 shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-slate-800/50">
              <th className="px-6 py-4 text-sm font-semibold text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">Course</th>
              <th className="px-6 py-4 text-sm font-semibold text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">Semester</th>
              <th className="px-6 py-4 text-sm font-semibold text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">Date</th>
              <th className="px-6 py-4 text-sm font-semibold text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">Time</th>
              <th className="px-6 py-4 text-sm font-semibold text-navy-900 dark:text-white border-b border-gray-200 dark:border-slate-700">Location</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
            {filteredExams.length > 0 ? (
              filteredExams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{exam.course}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{exam.semester}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-navy-500" />
                      {exam.date}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-2 text-navy-500" />
                      {exam.time}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-navy-500" />
                      {exam.location}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                  No exams found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
